const {successResponse,errorResponse,successResponseWithData,unauthorizedResponse,emailUnVerfiedResponse,mobileUnVerfiedResponse,registeredUserResponse,rejectedUserResponse,} = require("../helpers/Response")
const authservices = require("../services/auth-service")
const translate = require("../locales/translate")

const checkMobileAvailable = async (req, res) => {
  authservices.checkMobileService(req).then(data => {
      return successResponse(res,translate[req.headers["x-language-key"]].USER_MOBILE_AVAILABLE)
    })
    .catch(err => {
      return errorResponse(res,translate[req.headers["x-language-key"]].VALIDATION_FIELD_EXISTS)
    })
}

const checkEmailAvailable = async (req, res) => {
  authservices.checkEmailService(req).then(data => {
      return successResponse(res,translate[req.headers["x-language-key"]].USER_EMAIL_AVAILABLE
      )
    })
    .catch(err => {
      return errorResponse(res,translate[req.headers["x-language-key"]].VALIDATION_FIELD_EXISTS)
    })
}

const userSignup = async (req, res) => {
  authservices.userSignupService(req).then(data => {
      return successResponseWithData(res,translate[req.headers["x-language-key"]].DATA_INSERTED_SUCCESS,data)
    })
    .catch(err => {
      return errorResponse(res,translate[req.headers["x-language-key"]].ERROR_DATA_INSERTED)
    })
}

const Login = async (req, res) => {
  authservices.LoginService(req).then(data => {
      return successResponseWithData(res,translate[req.headers["x-language-key"]].LOGIN_SUCCESS,data)
    })
    .catch(err => {switch (err.message) {case "USER_EMAIL_NOT_VERIFIED":
          return emailUnVerfiedResponse(res,translate[req.headers["x-language-key"]][err.message],err.data)
          break
        case "USER_MOBILE_NOT_VERIFIED":
          return mobileUnVerfiedResponse(res,translate[req.headers["x-language-key"]][err.message],err.data)
          break
        case "SALON_REJECTED":
          return rejectedUserResponse(res,translate[req.headers["x-language-key"]][err.message],err.data)
          break
        case "SALON_NEW_REGISTERED":
          return registeredUserResponse(res,translate[req.headers["x-language-key"]][err.message],err.data)
          break
        default:
          break
      }
      return unauthorizedResponse(res,translate[req.headers["x-language-key"]][err.message])
    })
}

const socialLogin = async (req, res) => {
  authservices.socialLoginService(req).then(data => {
      return successResponseWithData(res,translate[req.headers["x-language-key"]].LOGIN_SUCCESS,data)
    })
    .catch(err => {
      return errorResponse(res,translate[req.headers["x-language-key"]].VALIDATION_FIELD_EXISTS)
    })
}

const forgotPassword = async (req, res) => {
  authservices.forgotPasswordService(req).then(data => {
      return successResponse(res,translate[req.headers["x-language-key"]].SENT_TO_PASSWORD_RESET_LINK)
    })
    .catch(err => {
      return errorResponse(res,translate[req.headers["x-language-key"]][err.message])
    })
}

const phoneVerified = async (req, res) => {
  authservices.phoneVerifiedService(req).then(data => {
      return successResponse(res,translate[req.headers["x-language-key"]].USER_PHONE_VERIFIED)
    })
    .catch(err => {
      return errorResponse(res,translate[req.headers["x-language-key"]].USER_PHONE_VERIFIED_ERROR)
    })
}

const emailVerified = async (req, res) => {
  authservices.emailVerifiedService(req).then(data => {
      return successResponse(res,translate[req.headers["x-language-key"]].USER_EMAIL_VERIFIED)
    })
    .catch(err => {
      return errorResponse(res,translate[req.headers["x-language-key"]].USER_EMAIL_VERIFIED_ERROR)
    })
}

const resetPassword = async (req, res) => {
  authservices.resetPasswordService(req)
    .then(data => {
      return successResponse(res,translate[req.headers["x-language-key"]].USER_PASSWORD_UPDATE)
    })
    .catch(err => {
      return errorResponse(res,translate[req.headers["x-language-key"]].USER_PASSWORD_UPDATE_ERROR)
    })
}

const setNewPassword = async (req, res) => {
  authservices.setNewPasswordService(req).then(data => {
      return successResponse(res,translate[req.headers["x-language-key"]].USER_PASSWORD_UPDATE)
    })
    .catch(err => {
      return errorResponse(res,translate[req.headers["x-language-key"]].USER_PASSWORD_UPDATE_ERROR)
    })
}

const newOtpRequest = async (req, res) => {
  authservices.requestOtpService(req).then(data => {
      return successResponse(res,translate[req.headers["x-language-key"]].SEND_OTP_SUCCESS)
    })
    .catch(err => {
      return errorResponse(res,translate[req.headers["x-language-key"]].ERROR_SENT_OTP)
    })
}

const resendOtpRequest = async (req, res) => {
  authservices.resendOtpService(req).then(data => {
      return successResponse(res,translate[req.headers["x-language-key"]].SEND_OTP_SUCCESS)
    })
    .catch(err => {
      return errorResponse(res,translate[req.headers["x-language-key"]].ERROR_SENT_OTP)
    })
}

const authTokenInfo = async (req, res) => {
  authservices.authTokenInfoService(req).then(data => {
      return successResponseWithData(res,translate[req.headers["x-language-key"]].DATA_INSERTED_SUCCESS,data)
    })
    .catch(err => {
      return errorResponse(res,translate[req.headers["x-language-key"]][err.message])
    })
}

const Logout = async (req, res) => {
  authservices.logoutService(req).then(data => {
      return successResponseWithData(res,translate[req.headers["x-language-key"]].DATA_INSERTED_SUCCESS,data)
    })
    .catch(err => {
      return errorResponse(res,translate[req.headers["x-language-key"]][err.message])
    })
}

const resendEmailVerfication = async (req, res) => {
  authservices.resendEmailVerficationService(req).then(data => {
      return successResponse(res,translate[req.headers["x-language-key"]].SENT_TO_PASSWORD_RESET_LINK)
    })
    .catch(err => {
      return errorResponse(res,translate[req.headers["x-language-key"]][err.message])
    })
}

const Check = async (req, res) => {
  authservices.CheckService(req).then(data => {
      return successResponseWithData(res,translate[req.headers["x-language-key"]].DATA_INSERTED_SUCCESS,data)
    })
    .catch(err => {
      return errorResponse(res,translate[req.headers["x-language-key"]][err.message])
    })
}

module.exports = {
  checkMobileAvailable,
  checkEmailAvailable,
  userSignup,
  Login,
  socialLogin,
  forgotPassword,
  phoneVerified,
  emailVerified,
  resetPassword,
  setNewPassword,
  newOtpRequest,
  resendOtpRequest,
  authTokenInfo,
  Logout,
  resendEmailVerfication,
  Check
}
