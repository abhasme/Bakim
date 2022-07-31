var ObjectID = require("mongoose").Types.ObjectId
const { Users } = require("../models/UserModel")
const { Setting } = require("../models/SettingModel")
const { Booking } = require("../models/BookingModel")
const { Amenity } = require("../models/AmenityModel")
const { Notification } = require("../models/NotificationModel")
const { SalonServiceGroup } = require("../models/SalonServiceGroupModel")
const {
  salonOnbordedEmailTemplate,
} = require("../helpers/Templates/EmailTemplate")
const query = require("express/lib/middleware/query")
const Utility = require("../helpers/Utility")
const { contentSecurityPolicy } = require("helmet")

const getAboutCompanyService = async req => {
  return new Promise(async (resolve, reject) => {
    if (req.body.salonid) {
      var salonid = req.body.salonid
      Users.aggregate([
        { $match: { _id: ObjectID(salonid) } },
        {
          $lookup: {
            from: "settings",
            localField: "_id",
            foreignField: "userid",
            as: "settingInfo",
          },
        },
        {
          $lookup: {
            from: "memberships",
            localField: "salonDetail.interestedmembershipid",
            foreignField: "_id",
            as: "membershipInfo",
          },
        },
        { $unwind: "$membershipInfo" },
        { $unwind: "$settingInfo" },
        {
          $project: {
            _id: 1,
            profileImage: { $ifNull: ["$profileImage", ""] },
            salonName: { $ifNull: ["$salonDetail.salonName", ""] },
            businessType: { $ifNull: ["$salonDetail.businessType", ""] },
            membershipPlanName: { $ifNull: ["$membershipInfo.planName", ""] },
            address: { $ifNull: ["$location.address", ""] },
            country: { $ifNull: ["$location.country", ""] },
            state: { $ifNull: ["$location.state", ""] },
            city: { $ifNull: ["$location.city", ""] },
            postalCode: { $ifNull: ["$location.postalCode", ""] },
            coordinates: { $ifNull: ["$location.coordinates", ""] },
            shopPhone: {
              $cond: [
                { $eq: [{ $strLenCP: "$salonDetail.shopPhone" }, 0] },
                "$mobile",
                "$salonDetail.shopPhone",
              ],
            },
            shopEmail: {
              $cond: [
                { $eq: [{ $strLenCP: "$salonDetail.shopEmail" }, 0] },
                "$email",
                "$salonDetail.shopEmail",
              ],
            },
            website: { $ifNull: ["$salonDetail.website", ""] },
            logo: { $ifNull: ["$salonDetail.logo", ""] },
            description: { $ifNull: ["$description", ""] },
            contactPersion: {
              $ifNull: ["$settingInfo.financeInfo.contactPersion", ""],
            },
            bussinessPhone: {
              $ifNull: ["$settingInfo.financeInfo.bussinessPhone", ""],
            },
            infoAddress: { $ifNull: ["$settingInfo.financeInfo.address", ""] },
            infoCity: { $ifNull: ["$settingInfo.financeInfo.city", ""] },
            infoCountry: { $ifNull: ["$settingInfo.financeInfo.country", ""] },
            bussinessEmail: {
              $ifNull: ["$settingInfo.financeInfo.bussinessEmail", ""],
            },
            registrationNo: {
              $ifNull: ["$settingInfo.financeInfo.registrationNo", ""],
            },
            infoPostalCode: {
              $ifNull: ["$settingInfo.financeInfo.postalCode", ""],
            },
            vatNO: { $ifNull: ["$settingInfo.financeInfo.vatNO", ""] },
            verifiedShopImages: {
              $ifNull: ["$salonDetail.verifiedShopImages", []],
            },
            shopImages: { $ifNull: ["$salonDetail.shopImages", []] },
          },
        },
      ]).exec(async (err, results) => {
        if (err) reject({ message: err })
        if (!results)
          reject({
            message: "Company Info Not Found",
          })
        resolve(results[0])
      })
    } else {
      var salonid = req.body.salonid ? req.body.salonid : req.user._id
      Users.aggregate([
        { $match: { _id: ObjectID(salonid) } },
        {
          $project: {
            _id: 1,
            mobile: 1,
            profileImage: { $ifNull: ["$profileImage", ""] },
            salonName: { $ifNull: ["$salonDetail.salonName", ""] },
            address: { $ifNull: ["$location.address", ""] },
            country: { $ifNull: ["$location.country", ""] },
            state: { $ifNull: ["$location.state", ""] },
            city: { $ifNull: ["$location.city", ""] },
            postalCode: { $ifNull: ["$location.postalCode", ""] },
            coordinates: { $ifNull: ["$location.coordinates", ""] },
            shopPhone: {
              $cond: [
                { $eq: [{ $strLenCP: "$salonDetail.shopPhone" }, 0] },
                "$mobile",
                "$salonDetail.shopPhone",
              ],
            },
            shopEmail: {
              $cond: [
                { $eq: [{ $strLenCP: "$salonDetail.shopEmail" }, 0] },
                "$email",
                "$salonDetail.shopEmail",
              ],
            },
            website: { $ifNull: ["$salonDetail.website", ""] },
            logo: { $ifNull: ["$salonDetail.logo", ""] },
            description: { $ifNull: ["$description", ""] },
            verifiedShopImages: {
              $ifNull: ["$salonDetail.verifiedShopImages", []],
            },
            shopImages: { $ifNull: ["$salonDetail.shopImages", []] },
          },
        },
      ]).exec(async (err, results) => {
        if (err) reject({ message: err })
        if (!results)
          reject({
            message: "Company Info Not Found",
          })
        resolve(results[0])
      })
    }
  })
}

const aboutCompanyService = async req => {
  return new Promise(async (resolve, reject) => {
    var salonid = req.body.salonid ? req.body.salonid : req.user._id
    Users.findOneAndUpdate(
      { _id: salonid },
      {
        description: req.body.description,
        "location.postalCode": req.body.postalCode,
        "location.address": req.body.address,
        "location.city": req.body.city,
        "location.state": req.body.state,
        "location.country": req.body.country,
        "location.coordinates": req.body.coordinates
          ? req.body.coordinates
          : [],
        "salonDetail.shopEmail": req.body.shopEmail,
        "salonDetail.shopPhone": req.body.shopPhone,
        "salonDetail.website": req.body.website,
      },
      { new: true, useFindAndModify: false }
    )
      .then(user => {
        if (!user) reject({ message: "USER_NOT_FOUND" })
        resolve(user)
      })
      .catch(err => reject({ message: "USER_NOT_FOUND" }))
  })
}

const updateaboutCompanyService = async req => {
  return new Promise(async (resolve, reject) => {
    var salonid = req.body.salonid
    if (req.file && req.file.path) {
      req.body.logo = req.file.path
    }
    if (req.body.description) {
      req.body.description
    }
    if (req.body.postalCode) {
      req.body.postalCode
    }
    if (req.body.address) {
      req.body.address
    }
    if (req.body.city) {
      req.body.city
    }
    if (req.body.country) {
      req.body.country
    }
    if (req.body.coordinates) {
      req.body.coordinates
    }
    if (req.body.shopEmail) {
      req.body.shopEmail
    }
    if (req.body.shopPhone) {
      req.body.shopPhone
    }
    if (req.body.website) {
      req.body.website
    }
    if (req.body.businessType) {
      req.body.businessType
    }
    if (req.body.salonName) {
      req.body.salonName
    }
    if (req.body.contactPersion) {
      req.body.contactPersion
    } //
    if (req.body.bussinessPhone) {
      req.body.bussinessPhone
    }
    if (req.body.infoAddress) {
      req.body.infoAddress
    }
    if (req.body.infoCity) {
      req.body.infoCity
    }
    if (req.body.infoCountry) {
      req.body.infoCountry
    }
    if (req.body.bussinessEmail) {
      req.body.bussinessEmail
    }
    if (req.body.registrationNo) {
      req.body.registrationNo
    }
    if (req.body.infoPostalCode) {
      req.body.infoPostalCode
    }
    if (req.body.vatNO) {
      req.body.vatNO
    }
    await Users.findOneAndUpdate(
      { _id: ObjectID(salonid) },
      {
        profileImage: req.body.logo,
        description: req.body.description,
        "location.postalCode": req.body.postalCode,
        "location.address": req.body.address,
        "location.city": req.body.city,
        "location.country": req.body.country,
        "location.coordinates": req.body.coordinates
          ? req.body.coordinates
          : [],
        "salonDetail.shopEmail": req.body.shopEmail,
        "salonDetail.shopPhone": req.body.shopPhone,
        "salonDetail.website": req.body.website,
        "salonDetail.businessType": req.body.businessType,
        "salonDetail.salonName": req.body.salonName,
      },
      { new: true, useFindAndModify: false }
    )
    await Setting.findOneAndUpdate(
      { userid: ObjectID(salonid) },
      {
        "financeInfo.contactPersion": req.body.contactPersion,
        "financeInfo.bussinessPhone": req.body.bussinessPhone,
        "financeInfo.address": req.body.infoAddress,
        "financeInfo.city": req.body.infoCity,
        "financeInfo.country": req.body.infoCountry,
        "financeInfo.bussinessEmail": req.body.bussinessEmail,
        "financeInfo.registrationNo": req.body.registrationNo,
        "financeInfo.postalCode": req.body.infoPostalCode,
        "financeInfo.vatNO": req.body.vatNO,
      },
      { new: true, useFindAndModify: false }
    )
      .then(user => {
        if (!user) reject({ message: "USER_NOT_FOUND" })
        resolve(user)
      })
      .catch(err => reject({ message: "USER_NOT_FOUND" }))
  })
}

const getWorkingHoursService = async req => {
  return new Promise(async (resolve, reject) => {
    if (req.body.employeeid) {
      req.body.salonid = req.body.employeeid
    } else {
      req.body.salonid = req.body.salonid ? req.body.salonid : req.user._id
    }
    Users.aggregate([
      {
        $match: {
          _id: ObjectID(req.body.salonid),
        },
      },
      { $limit: 1 },
      {
        $project: {
          _id: 1,
          monday: { $ifNull: ["$workingHour.monday", {}] },
          tuesday: { $ifNull: ["$workingHour.tuesday", {}] },
          wednesday: { $ifNull: ["$workingHour.wednesday", {}] },
          thursday: { $ifNull: ["$workingHour.thursday", {}] },
          friday: { $ifNull: ["$workingHour.friday", {}] },
          saturday: { $ifNull: ["$workingHour.saturday", {}] },
          sunday: { $ifNull: ["$workingHour.sunday", {}] },
        },
      },
    ]).exec(async (err, results) => {
      if (err) reject({ message: err })
      if (!results) reject({ message: "ERROR_DATA_RETRIVED" })
      resolve(results[0])
    })
  })
}

const updateWorkingHoursTeamService = async req => {
  return new Promise(async (resolve, reject) => {
    // var salonid = req.body.salonid ? req.body.salonid : req.user._id
    Users.findOneAndUpdate(
      { _id: req.body.employeeid },
      {
       "workingHour.monday": req.body.monday,
       "workingHour.tuesday": req.body.tuesday,
       "workingHour.wednesday": req.body.wednesday,
       "workingHour.thursday": req.body.thursday,
       "workingHour.friday": req.body.friday,
       "workingHour.saturday": req.body.saturday,
       "workingHour.sunday": req.body.sunday, 
      },
      { new: true, useFindAndModify: false }
    )
      .then(user => {
        if (!user) reject({ message: "USER_NOT_FOUND" })
        resolve(user)
      })
      .catch(err => reject({ message: "USER_NOT_FOUND" }))
  })
}

const salonRequestedService = async req => {
  return new Promise(async (resolve, reject) => {
    var { pagesize, page, sortBy } = await Utility.convertReqtoPaginate(
      req.query
    )
    var query = {}
    if (req.body.search) {
      query = {
        $or: [
          { email: RegExp(req.query.search, "i") },
          { salonName: RegExp(req.query.search, "i") },
          { employees: RegExp(req.query.search, "i") },
          { businessType: RegExp(req.query.search, "i") },
          { status: RegExp(req.query.search, "i") },
        ],
      }
    }
    Users.aggregate([
      {
        $match: {
          status: {
            $in: [
              "Registered",
              "Rejected",
              "Had first call",
              "Scheduled photoshoot",
              "Verified",
            ],
          },
        },
      },
      { $match: { userType: "Salon" } },
      {
        $lookup: {
          from: "memberships",
          localField: "salonDetail.interestedmembershipid",
          foreignField: "_id",
          as: "membershipInfo",
        },
      },
      { $unwind: "$membershipInfo" },
      {
        $project: {
          _id: 1,
          salonName: { $ifNull: ["$salonDetail.salonName", ""] },
          ownerName: {
            $concat: [
              { $ifNull: ["$firstName", ""] },
              " ",
              { $ifNull: ["$lastName", ""] },
            ],
          },
          businessType: { $ifNull: ["$salonDetail.businessType", ""] },
          notes: { $ifNull: ["$notes", ""] },
          status: { $ifNull: ["$status", ""] },
          employees: { $ifNull: ["$salonDetail.employees", 0] },
          interestedMembershipid: { $ifNull: ["$membershipInfo.planName", ""] },
          googleMap: { $ifNull: ["$location.coordinates", []] },
          location: {
            $concat: [
              { $ifNull: ["$location.country", ""] },
              ", ",
              { $ifNull: ["$location.state", ""] },
              ", ",
              { $ifNull: ["$location.city", ""] },
              ", ",
              { $ifNull: ["$location.postalCode", ""] },
              ", ",
              { $ifNull: ["$location.address", ""] },
            ],
          },
          mobile: { $ifNull: ["$mobile", ""] },
          email: { $ifNull: ["$email", ""] },
          source: { $ifNull: ["$source", ""] },
          requestedAt: { $ifNull: ["$createdAt", ""] },
          approvedAt: { $ifNull: ["$approvedAt", ""] },
          profileImage: { $ifNull: ["$profileImage", ""] },
          logoImage: { $ifNull: ["$salonDetail.logo", ""] },
          userType: { $ifNull: ["$userType", ""] },
          createdAt: { $ifNull: ["$createdAt", ""] },
          updatedAt: { $ifNull: ["$updatedAt", ""] },
          active: { $ifNull: ["$active", ""] },
          userUniqueId: { $ifNull: ["$userUniqueId", ""] },
          country: { $ifNull: ["$location.country", ""] },
          state: { $ifNull: ["$location.state", ""] },
          city: { $ifNull: ["$location.city", ""] },
          address: { $ifNull: ["$location.address", ""] },
          postalcode: { $ifNull: ["$location.postalCode", ""] },
          membershipId: { $ifNull: ["$membershipInfo._id", ""] },
          firstname: { $ifNull: ["$firstName", ""] },
          lastname: { $ifNull: ["$lastName", ""] },
        },
      },
      { $match: query },
      { $sort: sortBy },
      {
        $facet: {
          docs: [{ $skip: (page - 1) * pagesize }, { $limit: pagesize }],
          totalDocs: [{ $count: "count" }],
        },
      },
    ]).exec(async (err, results) => {
      if (err) reject({ message: err })
      if (!results) reject({ message: "ERROR_DATA_RETRIVED" })
      resolve(results)
    })
  })
}

const salonApprovedService = async req => {
  return new Promise(async (resolve, reject) => {
    var { pagesize, page, sortBy } = await Utility.convertReqtoPaginate(
      req.query
    )
    var query = {
      userType: { $in: ["Salon"] },
      status: { $in: ["Onborded", "Final review Approved"] },
    }
    if (req.query.search) {
      query = {
        $or: [
          { firstName: RegExp(req.query.search, "i") },
          { lastName: RegExp(req.query.search, "i") },
          { salonName: RegExp(req.query.search, "i") },
          { employees: RegExp(req.query.search, "i") },
          { businessType: RegExp(req.query.search, "i") },
        ],
      }
    }
    Users.aggregate([
      {
        $lookup: {
          from: "memberships",
          localField: "salonDetail.interestedmembershipid",
          foreignField: "_id",
          as: "membershipInfo",
        },
      },
      { $unwind: "$membershipInfo" },
      {
        $project: {
          _id: 1,
          userUniqueId: { $ifNull: ["$userUniqueId", ""] },
          salonName: { $ifNull: ["$salonDetail.salonName", ""] },
          ownerName: {
            $concat: [
              { $ifNull: ["$firstName", ""] },
              " ",
              { $ifNull: ["$lastName", ""] },
            ],
          },
          businessType: { $ifNull: ["$salonDetail.businessType", ""] },
          source: { $ifNull: ["$source", ""] },
          employees: { $ifNull: ["$salonDetail.employees", 0] },
          bookingCount: { $ifNull: ["$bookingCount", 0] },
          clientCount: { $ifNull: ["$clientCount", 0] },
          acceptMarketingEmail: { $ifNull: ["$acceptMarketingEmail", ""] },
          location: {
            $concat: [
              { $ifNull: ["$location.country", ""] },
              ", ",
              { $ifNull: ["$location.state", ""] },
              ", ",
              { $ifNull: ["$location.city", ""] },
              ", ",
              { $ifNull: ["$location.postalCode", ""] },
              ", ",
              { $ifNull: ["$location.address", ""] },
            ],
          },
          mobile: { $ifNull: ["$mobile", ""] },
          membershipPlan: { $ifNull: ["$membershipInfo.planName", ""] },
          membershipExpireDate: "05-07-2022",
          requestedAt: { $ifNull: ["$createdAt", ""] },
          approvedAt: { $ifNull: ["$salonDetail.approvedAt", ""] },
          profileImage: { $ifNull: ["$profileImage", ""] },
          source: { $ifNull: ["$source", ""] },
          userType: { $ifNull: ["$userType", ""] },
          active: { $ifNull: ["$active", ""] },
          status: { $ifNull: ["$status", ""] },
        },
      },
      { $match: query },
      { $sort: sortBy },
      {
        $facet: {
          docs: [{ $skip: (page - 1) * pagesize }, { $limit: pagesize }],
          totalDocs: [{ $count: "count" }],
        },
      },
    ]).exec(async (err, results) => {
      if (err) reject({ message: err })
      if (!results) reject({ message: "ERROR_DATA_RETRIVED" })
      resolve(results)
    })
  })
}

const salonPhotoUploadService = async req => {
  return new Promise(async (resolve, reject) => {
    await Users.findOne({ _id: req.body.salonid })
      .then(user => {
        if (req.files.photos) {
          req.files.photos.map(file => {
            user.salonDetail.verifiedShopImages.push({ image: file.path })
          })
        }
        if (req.files.profile) {
          var profilepath =
            req.files.profile && req.files.profile.map(file => file.path)
          user.salonDetail.logo = profilepath && profilepath[0]
        }
        return user.save()
      })
      .then(user => {
        resolve(user)
      })
  })
}

const salonUpdateStatusService = async req => {
  return new Promise(async (resolve, reject) => {
    if (req.body.status === "Final review Approved") {
      let saloninfo = await Users.SalonImagesAndLocation(req.body.salonid)
      if (saloninfo.salonDetail.verifiedShopImages.length === 0) {
        reject({ message: "SALON_VERIFIED_IMAGES_NOT_EXIST" })
      }
      if (saloninfo.location.coordinates.length === 0) {
        reject({ message: "SALON_LOCATION_NOT_EXIST" })
      }
    }
    Users.findOneAndUpdate(
      { _id: req.body.salonid },
      {
        status: req.body.status,
        updatedAt: Date.now(),
        "salonDetail.approvedAt":
          req.body.status === "Final review Approved" ? Date.now() : null,
      },
      { new: true, useFindAndModify: false }
    )
      .then(async user => {
        if (!user) reject({ message: "USER_NOT_FOUND" })
        if (req.body.status === "Final review Approved") {
          var welcomeEmail = await salonOnbordedEmailTemplate(user)
          Utility.sendEmail(
            user.email,
            "Welcome to Bakim Randevu Onborded.",
            welcomeEmail
          )
        }
        resolve(user)
      })
      .catch(err => reject({ message: "USER_NOT_FOUND" }))
  })
}

const salonProfileInfoService = async req => {
  return new Promise(async (resolve, reject) => {
    Users.aggregate([
      { $match: { _id: ObjectID(req.body.salonid) } },
      {
        $lookup: {
          from: "settings",
          localField: "_id",
          foreignField: "userid",
          as: "financeData",
        },
      },
      { $unwind: "$financeData" },
      {
        $project: {
          _id: 1,
          profileImage: { $ifNull: ["$profileImage", ""] },
          salonName: { $ifNull: ["$salonDetail.salonName", ""] },
          address: { $ifNull: ["$location.address", ""] },
          city: { $ifNull: ["$location.city", ""] },
          state: { $ifNull: ["$location.state", ""] },
          postalCode: { $ifNull: ["$location.postalCode", ""] },
          country: { $ifNull: ["$location.country", ""] },
          shopPhone: { $ifNull: ["$salonDetail.shopPhone", ""] },
          shopEmail: { $ifNull: ["$salonDetail.shopEmail", ""] },
          website: { $ifNull: ["$salonDetail.website", ""] },
          ownerName: {
            $concat: [
              { $ifNull: ["$firstName", ""] },
              " ",
              { $ifNull: ["$lastName", ""] },
            ],
          },
          address: { $ifNull: ["$location.address", ""] },
          description: { $ifNull: ["$description", ""] },
          verifiedShopImages: {
            $ifNull: ["$salonDetail.verifiedShopImages", []],
          },
          postalCode1: { $ifNull: ["$financeData.financeInfo.postalCode", ""] },
          address1: { $ifNull: ["$financeData.financeInfo.address", ""] },
          city1: { $ifNull: ["$financeData.financeInfo.city", ""] },
          country1: { $ifNull: ["$financeData.financeInfo.country", ""] },
          state1: { $ifNull: ["$financeData.financeInfo.state", ""] },
          bussinessEmail: {
            $ifNull: ["$financeData.financeInfo.bussinessEmail", ""],
          },
          bussinessPhone: {
            $ifNull: ["$financeData.financeInfo.bussinessPhone", ""],
          },
          vatNO: { $ifNull: ["$financeData.financeInfo.vatNO", ""] },
          registrationNo: {
            $ifNull: ["$financeData.financeInfo.registrationNo", ""],
          },
          contactPersion: {
            $ifNull: ["$financeData.financeInfo.contactPersion", ""],
          },
          status: { $ifNull: ["$status", ""] },
          userType: { $ifNull: ["$userType", ""] },
          createdAt: { $ifNull: ["$createdAt", ""] },
          updatedAt: { $ifNull: ["$updatedAt", ""] },
        },
      },
    ]).exec(async (err, results) => {
      if (err) reject({ message: err })
      if (!results) reject({ message: "ERROR_DATA_RETRIVED" })
      resolve(results[0])
    })
  })
}

const addPortfolioService = async req => {
  return new Promise(async (resolve, reject) => {
    var salonid = req.body.salonid ? req.body.salonid : req.user._id
    var createdBy = req.body.createdBy ? req.body.createdBy : req.user._id
    req.body.employeeid = req.body.employeeid ? req.body.employeeid : salonid
    req.body.image = req.file.path ? req.file.path : ""
    Users.findOneAndUpdate(
      { _id: ObjectID(salonid) },
      {
        $push: {
          portfolio: {
            image: req.body.image,
            createdBy: createdBy,
            serviceid: req.body.serviceid,
            employeeid: req.body.employeeid,
            serviceid: req.body.serviceid,
            description: req.body.description,
          },
        },
      },
      { new: true, useFindAndModify: false }
    )
      .then(async portfolio => {
        if (!portfolio) reject({ message: "SERVICE_NOT_FOUND" })
        resolve(portfolio)
      })
      .catch(err => {
        reject({ message: err })
      })
  })
}

const updatePortfolioService = async req => {
  return new Promise(async (resolve, reject) => {
    var salonid = req.body.salonid ? req.body.salonid : req.user._id
    var workid = req.body.workid
    if (req.file && req.file.path) {
      var reqimage = req.file.path
    }
    await Users.findOneAndUpdate(
      { _id: salonid, "portfolio._id": workid },
      {
        $set: {
          "portfolio.$.description": req.body.description,
          "portfolio.$.image": reqimage,
          "portfolio.$.serviceid": req.body.serviceid,
        },
      },
      { new: true, useFindAndModify: false }
    ).then(user => {
      resolve(user)
    })
  })
}

const deletePortfolioService = async req => {
  return new Promise(async (resolve, reject) => {
    var salonid = req.body.salonid ? req.body.salonid : req.user._id
    var workid = req.body.workid
    Users.findOneAndUpdate(
      { _id: ObjectID(salonid) },
      { $pull: { portfolio: { _id: ObjectID(workid) } } },
      { new: true, useFindAndModify: false }
    )
      .then(setting => {
        if (!setting) reject({ message: "USER_NOT_FOUND" })
        resolve(setting)
      })
      .catch(err => reject({ message: "USER_NOT_FOUND" }))
  })
}

const deletePortfolioImageService = async req => {
  return new Promise(async (resolve, reject) => {
    var salonid = req.body.salonid ? req.body.salonid : req.user._id
    var workid = req.body.workid
    await Users.findOne({ "portfolio._id": workid })
      .then(async portfolio => {
        let deleteImage
        for await (const image of portfolio.portfolio) {
          if (image._id.toString() === workid) {
            deleteImage = image.image
          }
        }
        if (req.file && req.file.path) {
          req.body.image = req.file.path

          await Utility.removeFileFromPath(deleteImage)
        } else if (req.body.deleteImage) {
          req.body.image = ""
          await Utility.removeFileFromPath(deleteImage)
        } else {
          req.body.image = deleteImage
        }
        await Users.findOneAndUpdate(
          { "portfolio._id": workid },
          {
            "portfolio.$.image": req.body.image,
            "portfolio.$.description": req.body.description,
            "portfolio.$.serviceid": req.body.serviceid,
          },
          { new: true, useFindAndModify: false }
        )
      })
      .then(portfolio => {
        resolve(portfolio)
      })
  })
}

const getWorkPortfolioService = async req => {
  return new Promise(async (resolve, reject) => {
    var salonid = req.body.salonid ? req.body.salonid : req.user._id
    var { pagesize, page, sortBy } = await Utility.convertReqtoPaginate(
      req.query
    )
    Users.aggregate([
      { $match: { _id: ObjectID(salonid) } },
      { $unwind: "$portfolio" },
      {
        $lookup: {
          from: "services",
          localField: "portfolio.serviceid",
          foreignField: "_id",
          as: "serviceInfo",
        },
      },
      { $unwind: "$serviceInfo" },
      {
        $lookup: {
          from: "users",
          localField: "portfolio.employeeid",
          foreignField: "_id",
          as: "employeeInfo",
        },
      },
      { $unwind: "$employeeInfo" },
      {
        $project: {
          _id: 1,
          portfolioImages: { $ifNull: ["$portfolio.image", {}] },
          description: { $ifNull: ["$portfolio.description", ""] },
          portfolioId: { $ifNull: ["$portfolio._id", {}] },
          servicename: { $ifNull: ["$serviceInfo.name", ""] },
          updodedBy: {
            $concat: [
              { $ifNull: ["$firstName", ""] },
              " ",
              { $ifNull: ["$lastName", ""] },
            ],
          },
          employeeName: {
            $concat: [
              { $ifNull: ["$employeeInfo.firstName", ""] },
              " ",
              { $ifNull: ["$employeeInfo.lastName", ""] },
            ],
          },
          profileImage: { $ifNull: ["$profileImage", "$profileImage"] },
        },
      },
      { $sort: sortBy },
      {
        $facet: {
          docs: [{ $skip: (page - 1) * pagesize }, { $limit: pagesize }],
          totalDocs: [{ $count: "count" }],
        },
      },
    ]).exec(async (err, results) => {
      if (err) reject({ message: err })
      if (!results) reject({ message: "ERROR_DATA_RETRIVED" })
      resolve(results)
    })
  })
}

const updateSalonAminityService = req => {
  return new Promise(async (resolve, reject) => {
    var salonid = req.body.salonid ? req.body.salonid : req.user._id
    Users.findOneAndUpdate(
      { _id: ObjectID(salonid) },
      {
        $set: {
          "salonDetail.amenities": req.body.amenities,
          // "salonDetail.prefferedLanguage": req.body.prefferedLanguage,
        },
      },
      { new: true, useFindAndModify: false }
    )
      .then(async amenities => {
        if (!amenities) reject({ message: "SERVICE_NOT_FOUND" })
        resolve(amenities)
      })
      .catch(err => {
        reject({ message: err })
      })
  })
}

const getSalonAminityService = async req => {
  return new Promise(async (resolve, reject) => {
    req.body.salonid = req.body.salonid ? req.body.salonid : req.user._id
    var amenitiesInfo = await Users.SalonAmenitiesIds(req.body.salonid)
    var amenityids = amenitiesInfo.salonDetail.amenities.map(
      data => data.amenityid
    )
    Amenity.aggregate([
      {
        $project: {
          _id: 1,
          name: { $ifNull: ["$name", ""] },
          active: { $ifNull: ["$active", ""] },
          has_amenity: {
            $in: ["$_id", amenityids],
          },
        },
      },
    ]).exec(async (err, results) => {
      if (err) reject({ message: err })
      if (!results)
        reject({
          message: "Saloon Not Found",
        })
      resolve(results)
    })
  })
}

const getNotificationService = async req => {
  return new Promise(async (resolve, reject) => {
    var { pagesize, page, sortBy } = await Utility.convertReqtoPaginate(
      req.query
    )
    var query = {}
    if (req.body.search) {
      query = { $or: [{ users: RegExp(req.query.search, "i") }] }
    }
    var salonid = req.body.salonid ? req.body.salonid : req.user._id
    Notification.aggregate([
      { $match: { "users.userid": ObjectID(salonid) } },
      {
        $project: {
          _id: 1,
          users: { $ifNull: ["$users", ""] },
          title: { $ifNull: ["$title", ""] },
          description: { $ifNull: ["$description", ""] },
          active: { $ifNull: ["$active", ""] },
          createdAt: { $ifNull: ["$createdAt", ""] },
          createdBy: { $ifNull: ["$createdBy", ""] },
          deletedBy: { $ifNull: ["$deletedBy", ""] },
          isDeleted: { $ifNull: ["$isDeleted", ""] },
        },
      },
      { $match: query },
      { $sort: sortBy },
      {
        $facet: {
          docs: [{ $skip: (page - 1) * pagesize }, { $limit: pagesize }],
          totalDocs: [{ $count: "count" }],
        },
      },
    ]).exec(async (err, results) => {
      if (err) reject({ message: err })
      if (!results) reject({ message: "ERROR_DATA_RETRIVED" })
      resolve(results)
    })
  })
}

/*========== Salon Active Inactive ===================*/ //
const salonActiveInactiveService = async req => {
  return new Promise(async (resolve, reject) => {
    await Users.findOne({ _id: ObjectID(req.body.salonid) })
      .then(async users => {
        if (req.body.active) {
          users.active = req.body.active
        }
        return users.save()
      })
      .then(users => {
        resolve(users)
      })
  })
}

const updateNotesAndStatusService = async req => {
  return new Promise(async (resolve, reject) => {
    if (req.body.status) {
      req.body.status
    }
    if (req.body.notes) {
      req.body.notes
    }
    Users.findOneAndUpdate(
      { _id: ObjectID(req.body.salonid) },
      {
        status: req.body.status,
        notes: req.body.notes,
      },
      { new: true, useFindAndModify: false }
    )
      .then(users => {
        if (!users) reject({ message: "USER_NOT_FOUND" })
        resolve(users)
      })
      .catch(err => reject({ message: "USER_NOT_FOUND" }))
  })
}

const addTeamMemberServiceService = async req => {
  return new Promise(async (resolve, reject) => {
    await Users.findOneAndUpdate(
      {
        $and: [
          { _id: ObjectID(req.body.employeeid) },
          { "employeeDetail.provideService ": true },
        ],
      },
      {
        $set: {
          "employeeDetail.assignedService":
            req.body.employeeDetail.assignedService,
        },
      },
      { new: true, useFindAndModify: false }
    )
      .then(users => {
        if (!users) reject({ message: "USER_NOT_FOUND" })
        resolve(users)
      })
      .catch(err => reject({ message: "USER_NOT_FOUND" }))
  })
}

const getTeamMemberServiceService = async req => {
  return new Promise(async (resolve, reject) => {
    req.body.salonid = req.body.salonid ? req.body.salonid : req.user._id
    let serviceInfo
    if (req.body.employeeid) {
      serviceInfo = await Users.EmployeeServiceInfo(
        ObjectID(req.body.employeeid),
        ObjectID(req.body.salonid)
      )
    } else {
      serviceInfo = await Users.SalonServiceInfo(req.body.salonid)
    }
    await SalonServiceGroup.aggregate([
      { $match: { salonid: ObjectID(req.body.salonid) } },
      {
        $lookup: {
          from: "salonservices",
          localField: "services",
          foreignField: "serviceid",
          pipeline: [{ $match: { salonid: ObjectID(req.body.salonid) } }],
          as: "servicesinfo",
        },
      },
      {
        $project: {
          _id: 1,
          salonid: 1,
          groupid: 1,
          name: { $ifNull: ["$name", ""] },
          servicelist: {
            $map: {
              input: {
                $filter: {
                  input: "$servicesinfo",
                  as: "servicesrow",
                  cond: "$$servicesrow.active",
                },
              },
              as: "servicesls",
              in: {
                name: "$$servicesls.name",
                serviceid: "$$servicesls.serviceid",
                has_service: {
                  $in: ["$$servicesls.serviceid", serviceInfo],
                },
              },
            },
          },
        },
      },
    ]).exec(async (err, results) => {
      if (err) reject({ message: err })
      if (!serviceInfo) reject({ message: "ERROR_DATA_RETRIVED" })
      var data = {
        groupservice: results,
      }
      resolve(data)
    })
    // }
  })
}

const getEmployeeListService = async req => {
  return new Promise(async (resolve, reject) => {
    req.body.salonid = req.body.salonid ? req.body.salonid : req.user._id
    var query = {}
    query = { userType: { $in: ["Employee"] } }
    if (req.body.search === "false" || req.body.search === false) {
      query = { active: false }
    } else {
      query = { active: true }
    }
    Users.aggregate([
      {
        $match: { salonid: ObjectID(req.body.salonid), userType: "Employee" },
      },
      {
        $lookup: {
          from: "services",
          localField: "portfolio.serviceid",
          foreignField: "_id",
          as: "portfolio.services",
        },
      },
      {
        $project: {
          _id: 1,
          firstName: { $ifNull: ["$firstName", ""] },
          lastName: { $ifNull: ["$lastName", ""] },
          profileImage: { $ifNull: ["$profileImage", ""] },
          email: { $ifNull: ["$email", ""] },
          mobile: { $ifNull: ["$mobile", ""] },
          userType: { $ifNull: ["$userType", ""] },
          active: { $ifNull: ["$active", false] },
          provideService: {
            $ifNull: ["$employeeDetail.provideService", false],
          },
          access: { $ifNull: ["$employeeDetail.access", ""] },
          permission: { $ifNull: ["$employeeDetail.permission", ""] },
          overallRating: { $ifNull: ["$averageRating.overall", 0] },
          reviewCount: { $ifNull: ["$reviewCount", 0] },
          jobTitle: { $ifNull: ["$employeeDetail.jobTitle", ""] },
          aboutUs: { $ifNull: ["$aboutUs", ""] },
          assignedService: { $ifNull: ["$employeeDetail.assignedService", []] },
          portfolio: 1,
        },
      },
      { $match: query },
      { $sort: { _id: -1 } },
    ]).exec(async (err, results) => {
      if (err) reject({ message: err })
      if (!results) reject({ message: "ERROR_DATA_RETRIVED" })
      resolve(results)
    })
  })
}

const getEmployeeInfoService = async req => {
  return new Promise(async (resolve, reject) => {
    Users.aggregate([
      {
        $match: { _id: ObjectID(req.body.employeeid), userType: "Employee" },
      },
      {
        $project: {
          _id: 1,
          profileImage: { $ifNull: ["$profileImage", ""] },
          firstName: { $ifNull: ["$firstName", ""] },
          lastName: { $ifNull: ["$lastName", ""] },
          employeeName: {
            $concat: [
              { $ifNull: ["$firstName", ""] },
              " ",
              { $ifNull: ["$lastName", ""] },
            ],
          },
          mobile: { $ifNull: ["$mobile", ""] },
          email: { $ifNull: ["$email", ""] },
          provideService: { $ifNull: ["$employeeDetail.provideService", ""] },
          access: { $ifNull: ["$employeeDetail.access", ""] },
          permission: { $ifNull: ["$employeeDetail.permission", []] },
          userType: { $ifNull: ["$userType", ""] },
          active: { $ifNull: ["$active", ""] },
          updatedAt: { $ifNull: ["$updatedAt", ""] },
        },
      },
    ]).exec(async (err, results) => {
      if (err) reject({ message: err })
      if (!results) reject({ message: "ERROR_DATA_RETRIVED" })
      resolve(results)
    })
  })
}

const getEmployeeDropDownService = async req => {
  return new Promise(async (resolve, reject) => {
    req.body.salonid = req.body.salonid ? req.body.salonid : req.user._id
    Users.aggregate([
      {
        $match: {
          salonid: ObjectID(req.body.salonid),
          userType: "Employee",
          active: true,
        },
      },
      {
        $project: {
          _id: 1,
          teamMember: {
            $concat: [
              { $ifNull: ["$firstName", ""] },
              " ",
              { $ifNull: ["$lastName", ""] },
            ],
          },
        },
      },
    ]).exec(async (err, results) => {
      if (err) reject({ message: err })
      if (!results) reject({ message: "ERROR_DATA_RETRIVED" })
      resolve(results)
    })
  })
}

const updateEmployeeService = async req => {
  return new Promise(async (resolve, reject) => {
    var deleteImage = await Users.findOne({
      _id: ObjectID(req.body.employeeid),
    })
    if (req.file && req.file.path) {
      req.body.profileImage = req.file.path
      await Utility.removeFileFromPath(deleteImage.profileImage)
    }
    /*==== Controle Access Logic Start ====*/
    var employeeDetail
    if (req.body.access === "BasicAccess") {
      employeeDetail = { permission: [{ ownCalendar: true }] }
    } else if (req.body.access === "OwnerAccess") {
      employeeDetail = {
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
    } else {
      employeeDetail = {
        permission: deleteImage.employeeDetail.permission,
      }
    }
    /*==== Controle Access Logic End ====*/
    await Users.findOneAndUpdate(
      { _id: ObjectID(req.body.employeeid) },
      {
        // $set: req.body,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        profileImage: req.body.profileImage,
        active: req.body.active,
        "employeeDetail.access": req.body.access,
        "employeeDetail.permission": employeeDetail.permission,
        "employeeDetail.provideService": req.body.provideService,
      },
      { new: true, useFindAndModify: false }
    )

      .then(users => {
        if (!users) reject({ message: "USER_NOT_FOUND" })
        resolve(users)
      })
      .catch(err => reject({ message: "USER_NOT_FOUND" }))
  })
}

const updateTeamMemberDetailServices = async req => {
  return new Promise(async (resolve, reject) => {
    var employeeid = req.body.employeeid
    Users.findOneAndUpdate(
      { _id: ObjectID(employeeid) },
      {
        aboutUs: req.body.aboutUs,
        "employeeDetail.jobTitle": req.body.jobTitle,
      },
      { new: true, useFindAndModify: false }
    )
      .then(async portfolio => {
        if (!portfolio) reject({ message: "USER_NOT_FOUND" })
        resolve(portfolio)
      })
      .catch(err => {
        reject({ message: err })
      })
  })
}

const salonDetailServices = async req => {
  return new Promise(async (resolve, reject) => {
    var salonid = req.body.salonid ? req.body.salonid : req.user._id
    Users.aggregate([
      { $match: { _id: ObjectID(salonid) } },
      {
        $project: {
          _id: 1,
          shopImages: { $ifNull: ["$salonDetail.shopImages", []] },
          salonName: { $ifNull: ["$salonDetail.salonName", ""] },
          shopPhone: { $ifNull: ["$salonDetail.shopPhone", ""] },
          shopEmail: { $ifNull: ["$salonDetail.shopEmail", ""] },
          website: { $ifNull: ["$salonDetail.website", ""] },
          businessType: { $ifNull: ["$salonDetail.businessType", ""] },
          overallRating: { $ifNull: ["$averageRating.overall", 0] },
          reviewCount: { $ifNull: ["$reviewCount", 0] },
          // overallRating: { $ifNull: [{ $avg: "$rewiews.overall" }, 0] },
          // reviewCount: { $ifNull: [{ $size: "$rewiews" }, 0] },
          location: {
            $concat: [
              { $ifNull: ["$location.country", ""] },
              ", ",
              { $ifNull: ["$location.state", ""] },
              ", ",
              { $ifNull: ["$location.city", ""] },
              ", ",
              { $ifNull: ["$location.postalCode", ""] },
              ", ",
              { $ifNull: ["$location.address", ""] },
            ],
          },
          aboutUs: { $ifNull: ["$aboutUs", ""] },
          description: { $ifNull: ["$description", ""] },
        },
      },
    ]).exec(async (err, results) => {
      if (err) reject({ message: err })
      if (!results) reject({ message: "ERROR_DATA_RETRIVED" })
      resolve(results)
    })
  })
}

const addTeamMemberPortfolioService = async req => {
  return new Promise(async (resolve, reject) => {
    var salonid = req.body.salonid ? req.body.salonid : req.user._id
    var createdBy = req.body.createdBy ? req.body.createdBy : req.user._id
    req.body.image = req.file.path ? req.file.path : ""

    Users.findOneAndUpdate(
      { _id: ObjectID(req.body.employeeid) },
      {
        $push: {
          portfolio: {
            image: req.body.image,
            createdBy: createdBy,
            description: req.body.description,
            serviceid: req.body.serviceid,
          },
        },
      },
      { new: true, useFindAndModify: false }
    )
      .then(async portfolio => {
        if (!portfolio) reject({ message: "SERVICE_NOT_FOUND" })
        resolve(portfolio)
      })
      .catch(err => {
        reject({ message: err })
      })
  })
}

const setNewPasswordInstructrctionService = async req => {
  return new Promise(async (resolve, reject) => {
    Users.findOne({ email: req.body.email })
      .then(async result => {
        if (!result) reject({ message: "EMAIL_NOT_FOUND" })
        Utility.sendEmail(
          result.email,
          "Password",
          `<h4><b>hello Sir or Madam</b></h4>
          <h5><a href="http://localhost:3000/team-setpassword></a></h5>`
        )
        resolve(result)
      })
      .catch(err => {
        reject({ message: err })
      })
  })
}

//${strNumPassword}
const getTeamMemberPortfolioService = async req => {
  return new Promise(async (resolve, reject) => {
    var salonid = await Users.SalonPortfolio(req.body.employeeid)
    Users.aggregate([
      { $match: { _id: ObjectID(salonid.salonid) } },
      {
        $lookup: {
          from: "salonservices",
          localField: "portfolio.serviceid",
          foreignField: "serviceid",
          pipeline: [{ $match: { salonid: ObjectID(salonid.salonid) } }],
          as: "servicesinfo",
        },
      },
      {
        $project: {
          _id: 1,
          aboutUs: { $ifNull: ["$aboutUs", ""] },
          jobTitle: { $ifNull: ["$employeeDetail.jobTitle", ""] },
          portfolio: {
            $map: {
              input: {
                $filter: {
                  input: "$portfolio",
                  as: "portfoliorow",
                  cond: {
                    $eq: [
                      "$$portfoliorow.employeeid",
                      ObjectID(req.body.employeeid),
                    ],
                  },
                },
              },
              as: "portfoliols",
              in: {
                image: "$$portfoliols.image",
                description: "$$portfoliols.description",
                portfolioId: "$$portfoliols._id",
                employeeid: "$$portfoliols.employeeid",
                serviceid: "$$portfoliols.serviceid",

                services: {
                  $filter: {
                    input: "$servicesinfo",
                    as: "item",
                    cond: {
                      $eq: ["$$item.serviceid", "$$portfoliols.serviceid"],
                    },
                  },
                },
              },
            },
          },
        },
      },
    ]).exec(async (err, results) => {
      if (err) reject({ message: err })
      if (!results) reject({ message: "ERROR_DATA_RETRIVED" })
      resolve(results)
    })
  })
}

const salonReviewListService = async req => {
  return new Promise(async (resolve, reject) => {
    var salonid = req.body.salonid ? req.body.salonid : req.user._id
    Users.aggregate([
      { $match: { _id: ObjectID(salonid) } },
      {
        $lookup: {
          from: "bookings",
          localField: "rewiews.bookingid",
          foreignField: "_id",
          pipeline: [{ $match: { salonid: ObjectID(req.body.salonid) } }],
          as: "bookingInfo",
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "bookingInfo.services.teamid",
          foreignField: "_id",
          pipeline: [{ $match: { salonid: ObjectID(req.body.salonid) } }],
          as: "teamInfo",
        },
      },
      {
        $lookup: {
          from: "salonservices",
          localField: "teamInfo.rewiews.service.serviceid",
          foreignField: "serviceid",
          pipeline: [{ $match: { salonid: ObjectID(req.body.salonid) } }],
          as: "reviewDetail",
        },
      },
      // {
      //   $lookup: {
      //     from: "services",
      //     localField: "rewiews.service.serviceid",
      //     foreignField: "_id",
      //     as: "serviceInfo",
      //   },
      // },
      //  {
      //   $project: {
      //     // _id: 1,
      //     // overall: { $ifNull: ["$averageRating.overall", 0] },
      //     // ambience: { $ifNull: ["$averageRating.ambience", 0] },
      //     // staff: { $ifNull: ["$averageRating.staff", 0] },
      //     // cleanliness: { $ifNull: ["$averageRating.cleanliness", ""] },
      //     // service: { $ifNull: ["$averageRating.service", ""] },
      //     // rewiews: { $ifNull: [{ $size: "$rewiews" }, 0] },
      //     // createdAt: { $ifNull: ["$createdAt", ""] },
      // // servicelist: {
      // //   $map: {
      // //     input: {
      // //       $filter: {
      // //         input: "$servicesinfo",
      // //         as: "servicesrow",
      // //         cond: "$$servicesrow.active",
      // //       },
      // //     },
      // //     as: "servicesls",
      // //     in: {
      // //       name: "$$servicesls.name",
      // //       serviceid: "$$servicesls.serviceid",
      // //       has_service: {
      // //         $in: ["$$servicesls.serviceid", serviceInfo],
      // //       },
      // //     },
      // //   },
      // // },
      // //    // rewiews: { $ifNull: ["$rewiews.skillLevel", ""] },
      // //     // replied: { $ifNull: ["$rewiews.replied", []] },
      // //     // serviceInfo: { $ifNull: ["$serviceInfo", []] },
      //   },
      // },
    ]).exec(async (err, results) => {
      if (err) reject({ message: err })
      if (!results) reject({ message: "ERROR_DATA_RETRIVED" })
      resolve(results)
    })
  })
}
const salonAmenitiesService = async req => {
  return new Promise(async (resolve, reject) => {
    var salonid = req.body.salonid ? req.body.salonid : req.user._id
    Users.aggregate([
      { $match: { _id: ObjectID(salonid) } },

      { $unwind: "$salonDetail.amenities" },
      {
        $lookup: {
          from: "amenities",
          localField: "salonDetail.amenities.amenityid",
          foreignField: "_id",
          as: "amenityInfo",
        },
      },
      { $unwind: "$amenityInfo" },
      {
        $project: {
          _id: 1,
          amenityid: { $ifNull: ["$amenityInfo._id", ""] },
          name: { $ifNull: ["$amenityInfo.name", ""] },
        },
      },
    ]).exec(async (err, results) => {
      if (err) reject({ message: err })
      if (!results) reject({ message: "ERROR_DATA_RETRIVED" })
      resolve(results)
    })
  })
}

/*==== Salon Edit Service ====*/
const salonUserInfoUpdateServiceAdmin = async req => {
  return new Promise(async (resolve, reject) => {
    if (req.file && req.file.path) {
      req.body.profileImage = req.file.path
    }
    if (req.body.acceptTermsPolicy) {
      req.body.acceptTermsPolicy
    }
    if (req.body.acceptMarketingEmail) {
      req.body.acceptMarketingEmail
    }
    if (req.body.firstName) {
      req.body.firstName
    }
    if (req.body.lastName) {
      req.body.lastName
    }
    if (req.body.salonName) {
      var salonName = req.body.salonName
    }
    if (req.body.employees) {
      var employees = req.body.employees
    }
    if (req.body.businessType) {
      var businessType = req.body.businessType
    }
    if (req.body.postalCode) {
      var postalCode = req.body.postalCode
    }
    if (req.body.address) {
      var address = req.body.address
    }
    if (req.body.city) {
      var city = req.body.city
    }
    if (req.body.country) {
      var country = req.body.country
    }
    if (req.body.state) {
      var state = req.body.state
    }
    if (req.body.interestedmembershipid) {
      var interestedmembershipid = req.body.interestedmembershipid
    }
    if (req.body.notes) {
      req.body.notes
    }
    if (req.body.coordinates) {
      req.body.coordinates
    }
    if (req.body.status === "Final review Approved") {
      let saloninfo = await Users.SalonImagesAndLocation(req.body.salonid)
      if (saloninfo.salonDetail.verifiedShopImages.length === 0) {
        reject({ message: "SALON_VERIFIED_IMAGES_NOT_EXIST" })
      }
      if (saloninfo.location.coordinates.length === 0) {
        reject({ message: "SALON_LOCATION_NOT_EXIST" })
      }
    }
    Users.findOneAndUpdate(
      { _id: ObjectID(req.body.salonid) },
      {
        acceptTermsPolicy: req.body.acceptTermsPolicy,
        acceptMarketingEmail: req.body.acceptMarketingEmail,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        profileImage: req.body.profileImage,
        notes: req.body.notes,
        "salonDetail.salonName": salonName,
        "salonDetail.employees": employees,
        "salonDetail.businessType": businessType,
        "salonDetail.interestedmembershipid": interestedmembershipid,
        "location.postalCode": postalCode,
        "location.address": address,
        "location.city": city,
        "location.country": country,
        "location.state": state,
        "location.coordinates": req.body.coordinates
          ? req.body.coordinates
          : [],
        status: req.body.status,
        updatedAt: new Date(),
      },
      { new: true, useFindAndModify: false }
    )
      .then(users => {
        if (!users) reject({ message: "USER_NOT_FOUND" })
        resolve(users)
      })
      .catch(err => reject({ message: "USER_NOT_FOUND" }))
  })
}

/*==== Get Salon Edit Service ====*/
const getSalonUserInfoServiceAdmin = async req => {
  return new Promise(async (resolve, reject) => {
    var salonid = req.body.salonid
    Users.aggregate([
      { $match: { _id: ObjectID(salonid) } },
      {
        $lookup: {
          from: "memberships",
          localField: "salonDetail.interestedmembershipid",
          foreignField: "_id",
          as: "membershipInfo",
        },
      },
      { $unwind: "$membershipInfo" },
      {
        $project: {
          _id: 1,
          firstName: { $ifNull: ["$firstName", ""] },
          lastName: { $ifNull: ["$lastName", ""] },
          email: { $ifNull: ["$email", ""] },
          mobile: { $ifNull: ["$mobile", ""] },
          acceptTermsPolicy: { $ifNull: ["$acceptTermsPolicy", ""] },
          acceptMarketingEmail: { $ifNull: ["$acceptMarketingEmail", ""] },
          profileImage: { $ifNull: ["$profileImage", ""] },
          salonName: { $ifNull: ["$salonDetail.salonName", ""] },
          employees: { $ifNull: ["$salonDetail.employees", 0] },
          businessType: { $ifNull: ["$salonDetail.businessType", ""] },
          postalCode: { $ifNull: ["$location.postalCode", ""] },
          address: { $ifNull: ["$location.address", ""] },
          country: { $ifNull: ["$location.country", ""] },
          state: { $ifNull: ["$location.state", ""] },
          city: { $ifNull: ["$location.city", ""] },
          interestedmembershipname: {
            $ifNull: ["$membershipInfo.planName", ""],
          },
          interestedmembershipid: {
            $ifNull: ["$salonDetail.interestedmembershipid", ""],
          },
          password: { $ifNull: ["$password", ""] },
          notes: { $ifNull: ["$notes", ""] },
          status: { $ifNull: ["$status", ""] },
          verifiedShopImages: {
            $ifNull: ["$salonDetail.verifiedShopImages", []],
          },
          logo: { $ifNull: ["$salonDetail.logo", ""] },
        },
      },
    ]).exec(async (err, results) => {
      if (err) reject({ message: err })
      if (!results) reject({ message: "ERROR_DATA_RETRIVED" })
      resolve(results[0])
    })
  })
}

/*==== Get Salon Uploded Photo Service ====*/
const salonPhotoUploadGetServiceAdmin = async req => {
  return new Promise(async (resolve, reject) => {
    var salonid = req.body.salonid
    Users.aggregate([
      { $match: { _id: ObjectID(salonid) } },
      {
        $project: {
          _id: 1,
          profileImage: { $ifNull: ["$profileImage", ""] },
          logo: { $ifNull: ["$salonDetail.logo", ""] },
          verifiedShopImages: {
            $ifNull: ["$salonDetail.verifiedShopImages", []],
          },
        },
      },
    ]).exec(async (err, results) => {
      if (err) reject({ message: err })
      if (!results) reject({ message: "ERROR_DATA_RETRIVED" })
      resolve(results)
    })
  })
}

const salonDeleteImageServiceAdmin = async req => {
  return new Promise(async (resolve, reject) => {
    var salonid = req.body.salonid
    var imageid = req.body.imageid
    Users.findOneAndUpdate(
      {
        _id: ObjectID(salonid),
        "salonDetail.verifiedShopImages._id": ObjectID(imageid),
      },
      {
        $pull: { "salonDetail.verifiedShopImages": { _id: ObjectID(imageid) } },
      },
      { new: true, useFindAndModify: false }
    )
      .then(setting => {
        if (!setting) reject({ message: "USER_NOT_FOUND" })
        resolve(setting)
      })
      .catch(err => reject({ message: "USER_NOT_FOUND" }))
  })
}

const updateOpeningHourService = async req => {
  return new Promise(async (resolve, reject) => {
    var salonid = req.body.salonid ? req.body.salonid : req.user._id
    Users.findOneAndUpdate(
      { _id: salonid },
      {
        workingHour: {
          monday: req.body.monday,
          tuesday: req.body.tuesday,
          wednesday: req.body.wednesday,
          thursday: req.body.thursday,
          friday: req.body.friday,
          saturday: req.body.saturday,
          sunday: req.body.sunday,
        },
      },
      { new: true, useFindAndModify: false }
    )
      .then(user => {
        if (!user) reject({ message: "USER_NOT_FOUND" })
        resolve(user)
      })
      .catch(err => reject({ message: "USER_NOT_FOUND" }))
  })
}

const deleteSalonService = async req => {
  return new Promise(async (resolve, reject) => {
    var salonid = req.body.salonid
    // Language.findOneAndUpdate(
    //   { _id: ObjectID(languageid) },
    //   { isDeleted: true },
    //   { new: true, useFindAndModify: false }
    // )
    await Users.updateMany(
      { "salonDetail.prefferedLanguage.languageid": ObjectID(salonid) },
      {
        $pull: {
          "salonDetail.prefferedLanguage": { salonid: ObjectID(salonid) },
        },
      }
    )
    await Users.findByIdAndDelete({ _id: req.body.salonid })
      .then(salon => {
        if (!salon) reject({ message: "SALON_NOT_FOUND" })
        resolve(salon)
      })
      .catch(err => reject({ message: "SALON_NOT_FOUND" }))
  })
}

const getSalonShopService = async req => {
  return new Promise(async (resolve, reject) => {
    var query = {}
    if (req.body.salonid) {
      var query = { _id: ObjectID(req.body.salonid) }
    } else {
      var query = {}
    }
    Users.aggregate([
      { $match: { userType: "Salon" } },
      { $match: query },
      {
        $project: {
          _id: 1,
          shopImages: { $ifNull: [{ $first: "$salonDetail.shopImages" }, ""] },
          salonName: { $ifNull: ["$salonDetail.salonName", ""] },
          overallRating: { $ifNull: ["$averageRating.overall", 0] },
          reviewCount: { $ifNull: ["$reviewCount", 0] },
          location: {
            $concat: [
              { $ifNull: ["$location.country", ""] },
              ", ",
              { $ifNull: ["$location.city", ""] },
            ],
          },
        },
      },
    ]).exec(async (err, results) => {
      if (err) reject({ message: err })
      if (!results) reject({ message: "ERROR_DATA_RETRIVED" })
      resolve(results)
    })
  })
}

const salonTeamMembersService = async req => {
  return new Promise(async (resolve, reject) => {
    var { pagesize, page, sortBy } = await Utility.convertReqtoPaginate(
      req.query
    )
    var query = {}
    query = { userType: { $in: ["Employee"] } }
    if (req.query.search === "false" || req.query.search === false) {
      query = { active: false }
    } else {
      query = { active: true }
    }
    Users.aggregate([
      {
        $match: { salonid: ObjectID(req.query.salonid), userType: "Employee" },
      },
      {
        $lookup: {
          from: "salonservices",
          localField: "employeeDetail.assignedService.serviceid",
          foreignField: "serviceid",
          as: "serviceInfo",
        },
      },
      {
        $project: {
          _id: 1,
          firstName: { $ifNull: ["$firstName", ""] },
          lastName: { $ifNull: ["$lastName", ""] },
          profileImage: { $ifNull: ["$profileImage", ""] },
          overallRating: { $ifNull: ["$averageRating.overall", 0] },
          reviewCount: { $ifNull: ["$reviewCount", 0] },
          // overallRating: { $ifNull: [{ $avg: "$rewiews.overall" }, 0] },
          // reviewCount: { $ifNull: [{ $size: "$rewiews" }, 0] },
          aboutUs: { $ifNull: ["$aboutUs", ""] },
          userType: { $ifNull: ["$userType", ""] },
          active: { $ifNull: ["$active", false] },
          servicelist: {
            $map: {
              input: {
                $filter: {
                  input: "$serviceInfo",
                  as: "servicesrow",
                  cond: "$$servicesrow.active",
                },
              },
              as: "servicesls",
              in: {
                name: "$$servicesls.name",
                serviceid: "$$servicesls.serviceid",
              },
            },
          },
        },
      },
      { $match: query },
      { $sort: sortBy },
      {
        $facet: {
          docs: [{ $skip: (page - 1) * pagesize }, { $limit: pagesize }],
          totalDocs: [{ $count: "count" }],
        },
      },
    ]).exec(async (err, results) => {
      if (err) reject({ message: err })
      if (!results) reject({ message: "ERROR_DATA_RETRIVED" })
      resolve(results)
    })
  })
}
const salonTeamMembersInfoService = async req => {
  return new Promise(async (resolve, reject) => {
    Users.aggregate([
      {
        $match: {
          _id: ObjectID(req.query.employeeid),
          salonid: ObjectID(req.query.salonid),
          userType: "Employee",
          active: true,
        },
      },
      {
        $lookup: {
          from: "salonservices",
          localField: "employeeDetail.assignedService.serviceid",
          foreignField: "serviceid",
          as: "serviceInfo",
        },
      },
      {
        $project: {
          _id: 1,
          firstName: { $ifNull: ["$firstName", ""] },
          lastName: { $ifNull: ["$lastName", ""] },
          profileImage: { $ifNull: ["$profileImage", ""] },
          overallRating: { $ifNull: ["$averageRating.overall", 0] },
          reviewCount: { $ifNull: ["$reviewCount", 0] },
          // overallRating: { $ifNull: [{ $avg: "$rewiews.overall" }, 0] },
          // reviewCount: { $ifNull: [{ $size: "$rewiews" }, 0] },
          aboutUs: { $ifNull: ["$aboutUs", ""] },
          userType: { $ifNull: ["$userType", ""] },
          active: { $ifNull: ["$active", false] },
          servicelist: {
            $map: {
              input: {
                $filter: {
                  input: "$serviceInfo",
                  as: "servicesrow",
                  cond: "$$servicesrow.active",
                },
              },
              as: "servicesls",
              in: {
                name: "$$servicesls.name",
                serviceid: "$$servicesls.serviceid",
              },
            },
          },
          Beginer: {
            $size: {
              $filter: {
                input: "$rewiews",
                as: "item",
                cond: {
                  $eq: ["$$item.skillLevel", "Beginer"],
                },
              },
            },
          },
          Average: {
            $size: {
              $filter: {
                input: "$rewiews",
                as: "item",
                cond: {
                  $eq: ["$$item.skillLevel", "Average"],
                },
              },
            },
          },
          Exprienced: {
            $size: {
              $filter: {
                input: "$rewiews",
                as: "item",
                cond: {
                  $eq: ["$$item.skillLevel", "Exprienced"],
                },
              },
            },
          },
          Exceptional: {
            $size: {
              $filter: {
                input: "$rewiews",
                as: "item",
                cond: {
                  $eq: ["$$item.skillLevel", "Exceptional"],
                },
              },
            },
          },
        },
      },
    ]).exec(async (err, results) => {
      if (err) reject({ message: err })
      if (!results) reject({ message: "ERROR_DATA_RETRIVED" })
      resolve(results)
    })
  })
}

const employeeCalenderService = async req => {
  return new Promise(async (resolve, reject) => {
    let salonid = req.body.salonid ? req.body.salonid : req.user._id
    Booking.aggregate([
      {
        $match: { salonid: ObjectID(salonid) },
      },
      // {
      //   $lookup: {
      //     from: "users",
      //     localField: "services.teamid",
      //     foreignField: "_id",
      //     as: "teamInfo",
      //   },
      // },
      // {
      //   $project: {
      //   bookingdate:1,
      //     teamList: {
      //       $map: {
      //         input: {
      //           $filter: {
      //             input: "$teamInfo",
      //             as: "servicesrow",
      //             cond: "$$servicesrow.active"
      //           }
      //         },
      //         as: "teamls",
      //         in: {
      //           firstName: "$$teamls.firstName",
      //           lastName: "$$teamls.lastName",
      //           profileImage: "$$teamls.profileImage",
      //         }
      //       }
      //     }
      //     // email: { $ifNull: ["$email", ""] },
      //     // mobile: { $ifNull: ["$mobile", ""] },
      //     // userType: { $ifNull: ["$userType", ""] },
      //     // active: { $ifNull: ["$active", false] },
      //     // provideService: {
      //     //   $ifNull: ["$employeeDetail.provideService", false],
      //     // },
      //     // access: { $ifNull: ["$employeeDetail.access", ""] },
      //     // permission: { $ifNull: ["$employeeDetail.permission", ""] },
      //     // overallRating: { $ifNull: ["$averageRating.overall", 0] },
      //     // reviewCount: { $ifNull: ["$reviewCount", 0] },
      //     // jobTitle: { $ifNull: ["$employeeDetail.jobTitle", ""] },
      //     // aboutUs: { $ifNull: ["$aboutUs", ""] },
      //     // assignedService: { $ifNull: ["$employeeDetail.assignedService", []] },
      //   },
      // },
      // { $match: query },
      // { $sort: { _id: -1 } },
    ]).exec(async (err, results) => {
      if (err) reject({ message: err })
      if (!results) reject({ message: "ERROR_DATA_RETRIVED" })
      resolve(results)
    })
  })
}

module.exports = {
  getAboutCompanyService,
  aboutCompanyService,
  updateOpeningHourService,
  salonRequestedService,
  salonApprovedService,
  salonPhotoUploadService,
  salonUpdateStatusService,
  salonProfileInfoService,
  addPortfolioService,
  updatePortfolioService,
  deletePortfolioService,
  getWorkPortfolioService,
  deletePortfolioImageService,
  getWorkingHoursService,
  updateSalonAminityService,
  getSalonAminityService,
  getNotificationService,
  salonActiveInactiveService,
  updateTeamMemberDetailServices,
  setNewPasswordInstructrctionService,
  addTeamMemberPortfolioService,
  getTeamMemberPortfolioService,
  getEmployeeListService,
  getEmployeeInfoService,
  getEmployeeDropDownService,
  addTeamMemberServiceService,
  getTeamMemberServiceService,
  updateEmployeeService,
  updateNotesAndStatusService,
  salonDetailServices,
  salonReviewListService,
  salonAmenitiesService,
  salonUserInfoUpdateServiceAdmin,
  getSalonUserInfoServiceAdmin,
  salonPhotoUploadGetServiceAdmin,
  salonDeleteImageServiceAdmin,
  updateaboutCompanyService,
  updateWorkingHoursTeamService,
  deleteSalonService,
  getSalonShopService,
  salonTeamMembersService,
  salonTeamMembersInfoService,
  employeeCalenderService,
}
