const { Users } = require("../models/UserModel")
const { PasswordCheck } = require("../models/PasswordCheck")
const { Subscription } = require("../models//SubscriptionModel")
var ObjectID = require("mongoose").Types.ObjectId
const Utility = require("../helpers/Utility")
const {
  resetPasswordEmailTemplate,
  sendOtpEmailTemplate,
  welComeEmailTemplate,
  emailVerificationEmailTemplate,
} = require("../helpers/Templates/EmailTemplate")

const { JWT_SECRET } = require("../config/constants")
const { newRegisteredStatus, rejectedStatus } = require("../config/data")
const { WEB_HOST_URL } = require("../config/constants")

/* == Exist Mobile No in Users Service == */
const checkMobileService = async req => {
  return new Promise(async (resolve, reject) => {
    var userData = await Users.isMobileExists(req.body.mobile)
    if (!userData) {
      resolve(true)
    } else {
      reject({ message: "VALIDATION_FIELD_EXISTS" })
    }
  })
}

/* == Exist Email in Users Service == */
const checkEmailService = async req => {
  return new Promise(async (resolve, reject) => {
    var userData = await Users.isEmailExists(req.body.email)
    if (!userData) {
      resolve(true)
    } else {
      reject({ message: "VALIDATION_FIELD_EXISTS" })
    }
  })
}

/* == User Signup Service == */
const userSignupService = async req => {
  return new Promise(async (resolve, reject) => {
    if (req.body.password) {
      req.body.password = await Utility.encryptPassword(req.body.password)
    }
    req.body.otp = await Utility.generateRandomNumber()
    req.body.active = true
    req.body.location = {
      postalCode: req.body.postalCode ? req.body.postalCode : "",
      address: req.body.address ? req.body.address : "",
      city: req.body.city ? req.body.city : "",
      state: req.body.state ? req.body.state : "",
      country: req.body.country ? req.body.country : "",
      coordinates: req.body.coordinates ? req.body.coordinates : [],
    }
    req.body.salonDetail = {
      salonName: req.body.salonName ? req.body.salonName : "",
      employees: req.body.employees ? req.body.employees : 0,
      businessType: req.body.businessType ? req.body.businessType : "Shop",
      interestedmembershipid: req.body.interestedmembershipid,
    }
    const query = new Users(req.body)
    query
      .save()
      .then(async result => {
        result = await Utility.convertObject(result)
        result["token"] = await Utility.generateAuthToken(result)
        var emailVerification = await emailVerificationEmailTemplate(
          WEB_HOST_URL + "email-verification/" + result["token"]
        )
        Utility.sendEmail(
          result.email,
          "Verifiyed your Email.",
          emailVerification
        )
        var welcomeEmail = await welComeEmailTemplate(result)
        Utility.sendEmail(
          result.email,
          "Welcome to Bakim Randevu.",
          welcomeEmail
        )
        var sendOtpEmail = await sendOtpEmailTemplate(result.otp)
        Utility.sendEmail(result.email, "Send Otp", sendOtpEmail)
        resolve(result)
      })
      .catch(err => {
        reject(err)
      })
  })
}

/* == Login Service == */
const LoginService = async req => {
  return new Promise(async (resolve, reject) => {
    var userData = await Users.findUserForLogin(req.body.username)
   if (!userData) {
      reject({ message: "USER_NOT_FOUND" })
    }
    // else if (userData.email && !userData.emailVerified) {
    //   reject({ message: "USER_EMAIL_NOT_VERIFIED", data : { otp : userData.otp , email : userData.email , mobile : userData.mobile } });
    // }
    else if (userData.mobile && !userData.mobileVerified) {
      reject({
        message: "USER_MOBILE_NOT_VERIFIED",
        data: {
          otp: userData.otp,
          email: userData.email,
          mobile: userData.mobile,
        },
      })
    } else if (userData && !userData.active) {
      reject({ message: "USER_NOT_ACTIVE" })
    } else if (
      userData.userType === "Salon" &&
      newRegisteredStatus.includes(userData.status)
    ) {
      reject({ message: "SALON_NEW_REGISTERED", data: userData })
    } else if (
      userData.userType === "Salon" &&
      rejectedStatus.includes(userData.status)
    ) {
      reject({ message: "SALON_REJECTED", data: userData })
    } else {
      var isPasswordMatched = await Utility.checkPassword(
        req.body.password,
        userData.password
      )
      if (isPasswordMatched) {
    const status= await Users.findOne({_id:userData._id})
    const employee =await Users.countDocuments({salonid:userData._id})
    const Membership =await Subscription.find({salonid:userData._id,startDate:{$lte:new Date()},endDate:{$gte:new Date()}})
    
    let statusCheck = (status.status === "Final review Approved") ?true : false;
    let employeeCheck = (employee >=1)?true : false;
    let MembershipCheck = (Membership.length >= 1) ?true : false;
        userData = await Utility.convertObject(userData)
        delete userData["password"]
        userData["token"] = await Utility.generateAuthToken(userData)
        let data ={
          ...userData,
          statusCheck :statusCheck,
          employeeCheck :employeeCheck,
          MembershipCheck :MembershipCheck
        }
          resolve(data)
      } else {
        reject({ message: "USER_PASSWORD_NOT_MATCH" })
      }
    }
  })
}

/* == Social Login Service == */
const socialLoginService = async req => {
  return new Promise(async (resolve, reject) => {
    var userData = await Users.findUserBySocialID(req.body.socialID)
    var userEmailData = await Users.findUserByEmail(req.body.email)
    var userMobileData = await Users.findUserByMobile(req.body.mobile)
    if (userData) {
      userData = await Utility.convertObject(userData)
      userData["token"] = await Utility.generateAuthToken(userData)
      resolve(userData)
    } else if (userEmailData) {
      userEmailData = await Utility.convertObject(userEmailData)
      userEmailData["token"] = await Utility.generateAuthToken(userEmailData)
      resolve(userEmailData)
    } else if (userMobileData) {
      userMobileData = await Utility.convertObject(userMobileData)
      userMobileData["token"] = await Utility.generateAuthToken(userMobileData)
      resolve(userMobileData)
    } else {
      req.body.active = true
      req.body.emailVerified = true
      req.body.mobileVerified = true
      const query = new Users(req.body)
      query
        .save()
        .then(async result => {
          result = await Utility.convertObject(result)
          result["token"] = await Utility.generateAuthToken(result)
          resolve(result)
        })
        .catch(err => {
          reject(err)
        })
    }
  })
}

/* == Forgot Password Service == */
const forgotPasswordService = async req => {
  return new Promise(async (resolve, reject) => {
    Users.findOne({
      $or: [{ email: req.body.username }, { mobile: req.body.username }],
    })
      .select(
        "firstName lastName mobile email mobileVerified emailVerified userType active"
      )
      .then(async user => {
        if (!user) reject({ message: "USER_NOT_FOUND" })
        var userData = await Utility.convertObject(user)
        userData["token"] = await Utility.generateAuthToken(userData)
        var emailTemplate = await resetPasswordEmailTemplate(
          WEB_HOST_URL + "reset-password/" + userData["token"]
        )
        await Utility.sendEmail(
          userData.email,
          "Reset your password.",
          emailTemplate
        )
        resolve(true)
      })
      .catch(err => reject({ message: "ERROR_PASSWORD_RESET_LINK" }))
  })
}

/* == Phone Verified Service == */
const phoneVerifiedService = async req => {
  return new Promise(async (resolve, reject) => {
    Users.findOneAndUpdate(
      { mobile: req.body.mobile, otp: req.body.otp },
      { $set: { mobileVerified: true } },
      { new: true, useFindAndModify: false }
    )
      .then(async user => {
        if (!user) reject({ message: "USER_NOT_FOUND" })
        resolve(user)
      })
      .catch(err => reject({ message: "USER_NOT_FOUND" }))
  })
}

/* == Email Verified Service == */
const emailVerifiedService = async req => {
  return new Promise(async (resolve, reject) => {
    Users.findOneAndUpdate(
      { email: req.body.email, otp: req.body.otp },
      { $set: { emailVerified: true } },
      { new: true, useFindAndModify: false }
    )
      .then(async user => {
        if (!user) reject({ message: "USER_NOT_FOUND" })
        resolve(user)
      })
      .catch(err => reject({ message: "USER_NOT_FOUND" }))
  })
}

/* == Reset Password Service == */
const resetPasswordService = async req => {
  return new Promise(async (resolve, reject) => {
    var password = await Utility.encryptPassword(req.body.password)
    Users.findOneAndUpdate(
      { _id: req.user._id },
      { $set: { password: password } },
      { new: true, useFindAndModify: false }
    )
      .then(async user => {
        if (!user) reject({ message: "USER_PASSWORD_UPDATE_ERROR" })
        resolve(user)
      })
      .catch(err => reject({ message: "USER_PASSWORD_UPDATE_ERROR" }))
  })
}

/* == Set New Password Service == */
const setNewPasswordService = async req => {
  return new Promise(async (resolve, reject) => {
    await Users.findOne({ _id: req.user._id })
      .then(async user => {
        var isPasswordMatched = await Utility.checkPassword(
          req.body.currentpassword,
          user.password
        )
        if (isPasswordMatched) {
          var newpassword = await Utility.encryptPassword(req.body.password)
          user.password = newpassword
        } else {
          reject({ message: "USER_PASSWORD_NOT_MATCH" })
        }
        return user.save()
      })
      .then(user => {
        resolve(user)
      })
  })
}

/* == Request Otp Service == */
const requestOtpService = async req => {
  return new Promise(async (resolve, reject) => {
    var otp = await Utility.generateRandomNumber()
    Users.findOneAndUpdate(
      { $or: [{ email: req.body.username }, { mobile: req.body.username }] },
      { $set: { otp: otp } },
      { new: true, useFindAndModify: false }
    )
      .then(async user => {
        if (!user) reject({ message: "USER_NOT_FOUND" })
        var sendOtpEmail = await sendOtpEmailTemplate(user.otp)
        Utility.sendEmail(user.email, "Resend Otp", sendOtpEmail)
        resolve(user)
      })
      .catch(err => reject({ message: "ERROR_PASSWORD_RESET_LINK" }))
  })
}

/* == Resend Otp Service == */
const resendOtpService = async req => {
  return new Promise(async (resolve, reject) => {
    var otp = await Utility.generateRandomNumber()
    Users.findOne({
      $or: [{ email: req.body.username }, { mobile: req.body.username }],
    })
      .then(async user => {
        if (!user) reject({ message: "USER_NOT_FOUND" })
        var sendOtpEmail = await sendOtpEmailTemplate(user.otp)
        Utility.sendEmail(user.email, "Resend Otp", sendOtpEmail)
        resolve(user)
      })
      .catch(err => reject({ message: "ERROR_PASSWORD_RESET_LINK" }))
  })
}

/* == Auth Token Info Service == */
const authTokenInfoService = async req => {
  return new Promise(async (resolve, reject) => {
    await Users.findOne({ _id: req.user._id })
      .select(
        "firstName lastName mobile email password mobileVerified emailVerified userType active"
      )
      .then(async user => {
        if (!user) reject({ message: "USER_NOT_FOUND" })
        resolve(user)
      })
  })
}

const employeeSignupService = async req => {
  return new Promise(async (resolve, reject) => {
    req.body.active = true
    /*==== Controle Access Logic Start ====*/
    var employeeDetail
    if (req.body.access === "BasicAccess") {
      employeeDetail = {
        provideService: req.body.provideService,
        access: req.body.access,
        permission: [{ ownCalendar: true }],
      }
    } else if (req.body.access === "OwnerAccess") {
      employeeDetail = {
        provideService: req.body.provideService,
        access: req.body.access,
        permission: [
          {
            ownCalendar: true,
            allCalendar: true,
            menu: true,
            team: true,
            client: true,
            marketingTool: true,
            settings: true,
            reports: true,
          },
        ],
      }
    } else if (req.body.access === "CustomAccess") {
      employeeDetail = {
        provideService: req.body.provideService,
        access: req.body.access,
        permission: [
          {
            ownCalendar: req.body.ownCalendar,
            allCalendar: req.body.allCalendar,
            menu: req.body.menu,
            team: req.body.team,
            client: req.body.client,
            marketingTool: req.body.marketingTool,
            settings: req.body.settings,
            reports: req.body.reports,
          },
        ],
      }
    }
    /*==== Controle Access Logic End ====*/
    const query = new Users({ ...req.body, employeeDetail: employeeDetail })
    query
      .save()
      .then(async result => {
        result = await Utility.convertObject(result)
        result["token"] = await Utility.generateAuthToken(result)
        var emailVerification = await emailVerificationEmailTemplate(
          WEB_HOST_URL + "email-verification/" + result["token"]
        )
        Utility.sendEmail(
          result.email,
          "Verifiyed your Email.",
          emailVerification
        )
        var welcomeEmail = await welComeEmailTemplate(result)
        Utility.sendEmail(
          result.email,
          "Welcome to Bakim Randevu.",
          welcomeEmail
        )
        resolve(result)
      })
      .catch(err => {
        reject(err)
      })
  })
}

const logoutService = async req => {
  return new Promise(async (resolve, reject) => {
    await Users.findOne({ _id: req.user._id })
      // .select(
      //   "mobile email"
      // )
      .then(async user => {
        if (!user) {
          reject({ message: "USER_NOT_FOUND" })
        } else {
          // deleteToken(user)
          resolve("USER_LOGOUT_SUCCESSFULLY")
        }
      })
  })
}

const resendEmailVerficationService = req => {
  return new Promise(async (resolve, reject) => {
    await Users.findOne({ email: req.body.email })
      .select("firstName lastName mobile email userType active")
      .then(async user => {
        if (!user) {
          reject({ message: "USER_NOT_FOUND" })
        } else {
          userData = await Utility.convertObject(user)
          userData["token"] = await Utility.generateAuthToken(userData)
          var emailVerification = await emailVerificationEmailTemplate(
            WEB_HOST_URL + "email-verification/" + userData["token"]
          )
          Utility.sendEmail(
            userData.email,
            "Verifiyed your Email.",
            emailVerification
          )
          resolve("SENT_TO_PASSWORD_RESET_LINK")
        }
      })
  })
}

const CheckService = async req => {
  return new Promise(async (resolve, reject) => {
    PasswordCheck.aggregate([{ $match: { password: req.body.password } }]).exec(
      async (err, results) => {
        if (err) reject({ message: err })
        if (!results) reject({ message: "ERROR_DATA_RETRIVED" })
        if (results.length === 0) {
          resolve({ message: "Wrong Password" })
        } else {
          resolve({ message: "Password match" })
        }
      }
    )
  })
}

module.exports = {
  checkMobileService,
  checkEmailService,
  userSignupService,
  LoginService,
  socialLoginService,
  forgotPasswordService,
  phoneVerifiedService,
  emailVerifiedService,
  resetPasswordService,
  setNewPasswordService,
  requestOtpService,
  resendOtpService,
  authTokenInfoService,
  employeeSignupService,
  logoutService,
  resendEmailVerficationService,
  CheckService,
}
