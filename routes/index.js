var express = require('express');
require('express-group-routes');
const router = express.Router();
const GlobalController = require('../controller/GlobalController')
const AuthController = require('../controller/AuthController')
const { adminAuthCheck, customerAuthCheck } = require('../middlewares/AuthTypeCheck')
const validator = require('../validations/Validator');
const adminRouter = require("./admin")
const salonRouter = require("./salon")
const customerRouter = require("./customer")
const destroyAuthToken = require("../helpers/Utility")
router.use("/admin/", [adminAuthCheck], adminRouter);
router.use("/salon/", salonRouter);
router.use("/customer/", customerRouter);

/*== Category Routes ==*/
router.get("/getHeaderMenuList", GlobalController.getHeaderMenuList);
/*== Country Routes ==*/
router.get("/getCountryList", GlobalController.getCountryList);
/*== State Routes ==*/
router.post("/getStateList", GlobalController.getStateList); //:id
/*= City Routes ==*/
router.post("/getCityList", GlobalController.getCityList);
/*== Check Mobile Exist Routes ==*/
router.post("/checkMobileAvailable", validator.mobileValidation, AuthController.checkMobileAvailable);
/*== Check Email Exist Routes ==*/
router.post("/checkEmailAvailable", validator.emailValidation, AuthController.checkEmailAvailable);
/*============== Auth Routes =======================*/
/*== User Signup Routes ==*/
router.post("/signup", [validator.CustomerSignupValidation], AuthController.userSignup);
/*== Login Routes ==*/
router.post("/login", [validator.LoginValidation], AuthController.Login);
/*== Check Social Login Routes ==*/
router.post("/socialLogin", [validator.socialLoginValidation], AuthController.socialLogin);
/*== Phone Verified  Routes ==*/
router.post("/phoneVerified", [validator.AuthOtpMobileValidation], AuthController.phoneVerified);
/*== Email Verified  Routes ==*/
router.get("/emailVerified", [customerAuthCheck], AuthController.emailVerified);
/*== Forgot Password Routes ==*/
router.post("/forgotPassword", [validator.requiredEmailOrMobile], AuthController.forgotPassword);
/*== Reset Password  Routes ==*/
router.post("/resetPassword", [customerAuthCheck, validator.AuthResetPasswordValidation], AuthController.resetPassword);
/*== Set New Password  Routes ==*/
router.post("/setNewPassword", [customerAuthCheck, validator.AuthSetNewPasswordValidation], AuthController.setNewPassword);
/*== Send Otp Routes ==*/
router.post("/newOtpRequest", [validator.UsernameValidation], AuthController.newOtpRequest);
/*== Resend Send Otp Routes ==*/
router.post("/resendOtpRequest", [validator.UsernameValidation], AuthController.resendOtpRequest);
/*== Get Service All List ==*/
router.get("/getAllServiceList", GlobalController.getAllServiceList);
/*== Get Category All List ==*/
router.get("/getAllCategoryList", GlobalController.getAllCategoryList);
/*== Get Salon All List ==*/
router.get("/getAllSalonList", GlobalController.getAllSalonList);
/*== Get User All List ==*/
router.get("/getAllUserList", GlobalController.getAllUserList);
/*== Get Membership Plan All List ==*/
router.get("/getAllMembershipPlanList", GlobalController.getAllMembershipPlanList);
/*== Auth User Info ==*/
router.get("/authTokenInfo", customerAuthCheck, AuthController.authTokenInfo);
router.post("/logout", customerAuthCheck, AuthController.Logout);
// router.post("/resendEmailVerfication",[validator.AuthOtpEmailValidation], AuthController.resendEmailVerfication)
router.post("/resendEmailVerfication", validator.emailValidation, AuthController.resendEmailVerfication)
router.get("/getTopCategoryList", GlobalController.getTopCategoryList);
router.post("/check",AuthController.Check );


module.exports = router;
