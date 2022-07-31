const { validationResult } = require('express-validator');
const { validatioErrorResponse } = require('../helpers/Response');
const membership = require('./MembershipValidation')
const commonfield = require('./CommonValidation')
const authfield = require('./AuthValidation')

exports.MembershipValidation = [
  membership.REQUIRED_MEMBERSHIP_PLANNAME,
  membership.USER_UNIQUE_PLAN_NAME,
  membership.REQUIRED_MEMBERSHIP_STAFFLIMIT,
  membership.REQUIRED_MEMBERSHIP_COMMISIONPERCENT,
  membership.REQUIRED_MEMBERSHIP_PLANTYPE,
  membership.OPTIONAL_MEMBERSHIP_MONTHLY_PRICE,
  membership.OPTIONAL_MEMBERSHIP_YEARLY_PRICE,
  membership.REQUIRED_MEMBERSHIP_SUBDOMAIN,
  membership.REQUIRED_MEMBERSHIP_UNIQUEDOMAIN,
  (req, res, next) => {
    var errors = validationResult(req)
    if (!errors.isEmpty()) return validatioErrorResponse(res, errors.array());
    next();
  },
];

exports.MembershipAddonValidation = [
  membership.REQUIRED_MEMBERSHIP_PLAN_ADDON_NAME,
  membership.REQUIRED_MEMBERSHIP_STAFFLIMIT,
  commonfield.REQUIRED_PRICE,
  membership.REQUIRED_MEMBERSHIP_SUBDOMAIN,
  membership.REQUIRED_MEMBERSHIP_UNIQUEDOMAIN,
  (req, res, next) => {
    var errors = validationResult(req)
    if (!errors.isEmpty()) return validatioErrorResponse(res, errors.array());
    next();
  },
];

exports.CountryCreateValidation = [
  commonfield.UNIQUE_COUNTRY_NAME,
  commonfield.REQUIRED_STRING_NAME,
  commonfield.REQUIRED_STRING_CODE,
  commonfield.REQUIRED_STRING_FLAG,
  commonfield.REQUIRED_STRING_DOMAIN,
  commonfield.REQUIRED_STRING_NUMERIC_CODE,
  (req, res, next) => {
    var errors = validationResult(req)
    if (!errors.isEmpty()) return validatioErrorResponse(res, errors.array());
    next();
  },
];

exports.StateCreateValidation = [
  commonfield.REQUIRED_COUNTRY_ID_EXIST,
  commonfield.REQUIRED_STRING_NAME,
  (req, res, next) => {
    var errors = validationResult(req)
    if (!errors.isEmpty()) return validatioErrorResponse(res, errors.array());
    next();
  },
];

exports.CityCreateValidation = [
  commonfield.REQUIRED_COUNTRY_ID_EXIST,
  commonfield.REQUIRED_STRING_NAME,
  commonfield.UNIQUE_CITY_NAME,
  // commonfield.REQUIRED_STATE_ID_EXIST,
  (req, res, next) => {
    var errors = validationResult(req)
    if (!errors.isEmpty()) return validatioErrorResponse(res, errors.array());
    next();
  },
];
exports.CustomerSignupValidation = [
  commonfield.REQUIRED_FIRSTNAME,
  commonfield.REQUIRED_LASTNAME,
  commonfield.REQUIRED_MOBILE,
  commonfield.USER_UNIQUE_MOBILE,
  commonfield.REQUIRED_EMAIL,
  commonfield.USER_UNIQUE_EMAIL,
  authfield.REQUIRED_GENDER,
  commonfield.REQUIRED_POSTALCODE,
  // authfield.LOGIN_PASSWORD,
  // commonfield.REQUIRED_TERMSPOLICY,
  commonfield.REQUIRED_MARKETINGEMAIL,
  (req, res, next) => {
    var errors = validationResult(req)
    if (!errors.isEmpty()) return validatioErrorResponse(res, errors.array());
    next();
  },
];

exports.SalonSignupValidation = [
  authfield.REQUIRED_SALON_NAME,
  commonfield.REQUIRED_FIRSTNAME,
  commonfield.REQUIRED_LASTNAME,
  commonfield.REQUIRED_MOBILE,
  commonfield.USER_UNIQUE_MOBILE,
  commonfield.REQUIRED_EMAIL,
  commonfield.USER_UNIQUE_EMAIL,
  commonfield.REQUIRED_ADDRESS,
  commonfield.REQUIRED_COUNTRY_NAME,
  commonfield.REQUIRED_STATE_NAME,
  commonfield.REQUIRED_CITY_NAME,
  commonfield.REQUIRED_POSTALCODE,
  commonfield.REQUIRED_TERMSPOLICY,
  commonfield.REQUIRED_MARKETINGEMAIL,
  commonfield.REQUIRED_EMPLOYEE_STRING,
  commonfield.REQUIRED_MEMBERSHIP_ID_EXIST,
  commonfield.OPTIONAL_NOTES,
  commonfield.REQUIRED_SALON_BUSINESS_TYPE,
  authfield.LOGIN_PASSWORD,
  (req, res, next) => {
    var errors = validationResult(req)
    if (!errors.isEmpty()) return validatioErrorResponse(res, errors.array());
    next();
  },
];

exports.salonServiceIdValidation = [
  commonfield.REQUIRED_SALONID,
  commonfield.REQUIRED_SERVICE_ID_EXIST,
  (req, res, next) => {
    var errors = validationResult(req)
    if (!errors.isEmpty()) return validatioErrorResponse(res, errors.array());
    next();
  },
];

exports.salonIdValidation = [
  commonfield.REQUIRED_SALONID,
  (req, res, next) => {
    var errors = validationResult(req)
    if (!errors.isEmpty()) return validatioErrorResponse(res, errors.array());
    next();
  },
];
exports.salonStatusValidation = [
  commonfield.REQUIRED_SALONID,
  commonfield.REQUIRED_SALON_STATUS,
  (req, res, next) => {
    var errors = validationResult(req)
    if (!errors.isEmpty()) return validatioErrorResponse(res, errors.array());
    next();
  },
];



exports.createCategoryValidation = [
  commonfield.UNIQUE_CATEGORY_NAME,
  commonfield.REQUIRED_STRING_NAME,
  (req, res, next) => {
    var errors = validationResult(req)
    if (!errors.isEmpty()) return validatioErrorResponse(res, errors.array());
    next();
  },
];
exports.updateCategoryValidation = [
  commonfield.REQUIRED_CATEGORY_ID_EXIST,
  (req, res, next) => {
    var errors = validationResult(req)
    if (!errors.isEmpty()) return validatioErrorResponse(res, errors.array());
    next();
  },
];

exports.addServiceValidation = [
  commonfield.UNIQUE_SERVICE_NAME,
  commonfield.REQUIRED_STRING_NAME,
  commonfield.REQUIRED_CATEGORY_ID_EXIST,
  (req, res, next) => {
    var errors = validationResult(req)
    if (!errors.isEmpty()) return validatioErrorResponse(res, errors.array());
    next();
  },
];
exports.updateServiceValidation = [
  commonfield.REQUIRED_SERVICE_ID_EXIST,
  (req, res, next) => {
    var errors = validationResult(req)
    if (!errors.isEmpty()) return validatioErrorResponse(res, errors.array());
    next();
  },
];


/*=========Required Membership Validation ==============*/
exports.updateMembershipValidation = [
  membership.REQUIRED_MEMBERSHIP_ID_EXIST,
  (req, res, next) => {
    var errors = validationResult(req)
    if (!errors.isEmpty()) return validatioErrorResponse(res, errors.array());
    next();
  },
];
/*=========Required Membership Addon Validation ==============*/
exports.updateMembershipAddonValidation = [
  membership.REQUIRED_MEMBERSHIP_ADDON_ID_EXIST,
  (req, res, next) => {
    var errors = validationResult(req)
    if (!errors.isEmpty()) return validatioErrorResponse(res, errors.array());
    next();
  },
];
/*=========Required Country Id Validation ==============*/
exports.UpdateCountryValidation = [
  // commonfield.REQUIRED_COUNTRY_ID_EXIST,
  (req, res, next) => {
    var errors = validationResult(req)
    if (!errors.isEmpty()) return validatioErrorResponse(res, errors.array());
    next();
  },
];
/*=========update state Validation ==============*/
exports.UpdateStateValidation = [
  commonfield.REQUIRED_COUNTRY_ID_EXIST,
  commonfield.REQUIRED_STATE_ID_EXIST,
  (req, res, next) => {
    var errors = validationResult(req)
    if (!errors.isEmpty()) return validatioErrorResponse(res, errors.array());
    next();
  },
];
/*=========update City Validation ==============*/
exports.UpdateCityValidation = [
  commonfield.REQUIRED_CITY_ID_EXIST,
  (req, res, next) => {
    var errors = validationResult(req)
    if (!errors.isEmpty()) return validatioErrorResponse(res, errors.array());
    next();
  },
];
/*=========Active Deactive Category Validation ==============*/
exports.activeCategoryValidation = [
  commonfield.REQUIRED_CATEGORY_ID_EXIST,
  commonfield.REQUIRED_ACTIVE_FIELD,
  (req, res, next) => {
    var errors = validationResult(req)
    if (!errors.isEmpty()) return validatioErrorResponse(res, errors.array());
    next();
  },
];
/*=========Active Deactive Service Validation ==============*/
exports.activeServiceValidation = [
  commonfield.REQUIRED_SERVICE_ID_EXIST,
  commonfield.REQUIRED_ACTIVE_FIELD,
  (req, res, next) => {
    var errors = validationResult(req)
    if (!errors.isEmpty()) return validatioErrorResponse(res, errors.array());
    next();
  },
];
/*=========Create Aminity Admin Validation ==============*/
exports.CreateAmenityValidation = [
  commonfield.REQUIRED_STRING_NAME,
  (req, res, next) => {
    var errors = validationResult(req)
    if (!errors.isEmpty()) return validatioErrorResponse(res, errors.array());
    next();
  },
];
/*=========Update Aminity Admin Validation ==============*/
exports.UpdateAmenityValidation = [
  commonfield.REQUIRED_AMENITY_ID_EXIST,
  (req, res, next) => {
    var errors = validationResult(req)
    if (!errors.isEmpty()) return validatioErrorResponse(res, errors.array());
    next();
  },
];
/*=========Update Aminity Admin Validation ==============*/
exports.CreateNotificationValidation = [
  // commonfield.REQUIRED_USERID,
  commonfield.REQUIRED_DESCRIPTION,
  commonfield.REQUIRED_TITLE,
  (req, res, next) => {
    var errors = validationResult(req)
    if (!errors.isEmpty()) return validatioErrorResponse(res, errors.array());
    next();
  },
];
/*========= Create Award Admin Validation ==============*/
exports.createAwardValidation = [
  commonfield.REQUIRED_STRING_NAME,
  (req, res, next) => {
    var errors = validationResult(req)
    if (!errors.isEmpty()) return validatioErrorResponse(res, errors.array());
    next();
  },
];

/*=========Update Award Admin Validation ==============*/
exports.updateAwardValidation = [
  commonfield.REQUIRED_AWARD_ID,
  (req, res, next) => {
    var errors = validationResult(req)
    if (!errors.isEmpty()) return validatioErrorResponse(res, errors.array());
    next();
  },
];
/*=========Update Award Admin Validation ==============*/
exports.userIdValidation = [
  commonfield.REQUIRED_USERID,
  // commonfield.REQUIRED_SERVICE_ID_EXIST,
  (req, res, next) => {
    var errors = validationResult(req)
    if (!errors.isEmpty()) return validatioErrorResponse(res, errors.array());
    next();
  },
];
/*=========Update Saloon Validation ==============*/
exports.updateSaloonValidation = [
  commonfield.REQUIRED_SALONID,
  (req, res, next) => {
    var errors = validationResult(req)
    if (!errors.isEmpty()) return validatioErrorResponse(res, errors.array());
    next();
  },
];
/*=========Add Service Group Validation ==============*/
exports.addServiceGroupValidation = [
  // commonfield.REQUIRED_SERVICE_ID_EXIST,
  commonfield.REQUIRED_STRING_NAME,
  commonfield.UNIQUE_SERVICEGROUP_NAME,
  (req, res, next) => {
    var errors = validationResult(req)
    if (!errors.isEmpty()) return validatioErrorResponse(res, errors.array());
    next();
  },
];
/*=========Add Service Group Id Validation ==============*/
exports.updateServiceGroupValidation = [
  commonfield.REQUIRED_SERVICEGROUP_ID,
  (req, res, next) => {
    var errors = validationResult(req)
    if (!errors.isEmpty()) return validatioErrorResponse(res, errors.array());
    next();
  },
];
/*========= Customer ID Validation ==============*/
exports.updateCustomerValidation = [
  commonfield.OPTIONAL_USERID,
  (req, res, next) => {
    var errors = validationResult(req)
    if (!errors.isEmpty()) return validatioErrorResponse(res, errors.array());
    next();
  },
];
/*========== Salon Active Inactive ===================*///
exports.salonActiveInactiveValidation = [
  commonfield.REQUIRED_SALONID,
  (req, res, next) => {
    var errors = validationResult(req)
    if (!errors.isEmpty()) return validatioErrorResponse(res, errors.array());
    next();
  },
];

/*========= Delete Award Validation ==============*/
exports.deleteAwardValidation = [
  commonfield.REQUIRED_AWARD_ID,
  (req, res, next) => {
    var errors = validationResult(req)
    if (!errors.isEmpty()) return validatioErrorResponse(res, errors.array());
    next();
  },
];
/*========= Delete Aminity Validation ==============*/
exports.deleteAmenityValidation = [
  commonfield.REQUIRED_AMENITY_ID_EXIST,
  (req, res, next) => {
    var errors = validationResult(req)
    if (!errors.isEmpty()) return validatioErrorResponse(res, errors.array());
    next();
  },
];
/*========== Create Salon Award ===================*///
exports.updateSalonAwardValidation = [
  commonfield.REQUIRED_SALONID,
  (req, res, next) => {
    var errors = validationResult(req)
    if (!errors.isEmpty()) return validatioErrorResponse(res, errors.array());
    next();
  },
];
/*========== Create Employee ===================*///
exports.EmployeeSignupValidation = [
  commonfield.REQUIRED_SALONID,
  commonfield.REQUIRED_FIRSTNAME,
  commonfield.REQUIRED_LASTNAME,
  commonfield.REQUIRED_MOBILE,
  commonfield.USER_UNIQUE_MOBILE,
  commonfield.REQUIRED_EMAIL,
  commonfield.USER_UNIQUE_EMAIL,
  (req, res, next) => {
    var errors = validationResult(req)
    if (!errors.isEmpty()) return validatioErrorResponse(res, errors.array());
    next();
  },
];
/*========== Update Employee ===================*///
exports.EmployeeUpdateValidation = [
  commonfield.REQUIRED_EMPLOYEEID,
  (req, res, next) => {
    var errors = validationResult(req)
    if (!errors.isEmpty()) return validatioErrorResponse(res, errors.array());
    next();
  },
];

/*========== Get Employee By Saloon ===================*///
exports.EmployeeGetValidation = [
  commonfield.REQUIRED_SALONID,
  (req, res, next) => {
    var errors = validationResult(req)
    if (!errors.isEmpty()) return validatioErrorResponse(res, errors.array());
    next();
  },
];

////////////////////////////////////////
exports.ResourceAddValidation = [
  commonfield.REQUIRED_STRING_NAME,
  commonfield.UNIQUE_RESOURCE_NAME,
  commonfield.REQUIRED_QUANTITY,
  commonfield.REQUIRED_SALONID,
  (req, res, next) => {
    var errors = validationResult(req)
    if (!errors.isEmpty()) return validatioErrorResponse(res, errors.array());
    next();
  },
];
exports.ResourceUpdateValidation = [
  // commonfield.REQUIRED_STRING_NAME,
  // commonfield.UNIQUE_RESOURCE_NAME,
  // commonfield.REQUIRED_QUANTITY,
  commonfield.REQUIRED_SALONID,
  commonfield.REQUIRED_RESOURCE_ID,
  (req, res, next) => {
    var errors = validationResult(req)
    if (!errors.isEmpty()) return validatioErrorResponse(res, errors.array());
    next();
  },
];

exports.ResourceIDValidation = [
  commonfield.REQUIRED_RESOURCE_ID,
  (req, res, next) => {
    var errors = validationResult(req)
    if (!errors.isEmpty()) return validatioErrorResponse(res, errors.array());
    next();
  },
];

exports.ResourceGetValidation = [
  commonfield.REQUIRED_SALONID,
  (req, res, next) => {
    var errors = validationResult(req)
    if (!errors.isEmpty()) return validatioErrorResponse(res, errors.array());
    next();
  },
];

exports.ResourceDeleteValidation = [
  commonfield.REQUIRED_RESOURCE_ID,
  commonfield.REQUIRED_SALONID,
  (req, res, next) => {
    var errors = validationResult(req)
    if (!errors.isEmpty()) return validatioErrorResponse(res, errors.array());
    next();
  },
];

exports.addPortfolioValidation = [
  commonfield.REQUIRED_USERID,
  commonfield.REQUIRED_SERVICE_ID_EXIST,
  commonfield.REQUIRED_DESCRIPTION,
  (req, res, next) => {
    var errors = validationResult(req)
    if (!errors.isEmpty()) return validatioErrorResponse(res, errors.array());
    next();
  },
];

exports.UpdatePortfolioValidation = [
  commonfield.REQUIRED_USERID,
  commonfield.REQUIRED_WORK_ID_EXIST,
  (req, res, next) => {
    var errors = validationResult(req)
    if (!errors.isEmpty()) return validatioErrorResponse(res, errors.array());
    next();
  },
];
exports.DeletePortfolioValidation = [
  // commonfield.REQUIRED_SALONID,
  commonfield.REQUIRED_USERID,
  commonfield.REQUIRED_WORK_ID_EXIST,
  (req, res, next) => {
    var errors = validationResult(req)
    if (!errors.isEmpty()) return validatioErrorResponse(res, errors.array());
    next();
  },
];

exports.GetPortfolioValidation = [
  commonfield.REQUIRED_USERID,
  (req, res, next) => {
    var errors = validationResult(req)
    if (!errors.isEmpty()) return validatioErrorResponse(res, errors.array());
    next();
  },
];

exports.UpdateTeamMemberDetailsValidation = [
  commonfield.REQUIRED_EMPLOYEEID,
  commonfield.REQUIRED_ABOUTUS_OR_SHORTBIO,
  commonfield.REQUIRED_JOBTITLE,
  (req, res, next) => {
    var errors = validationResult(req)
    if (!errors.isEmpty()) return validatioErrorResponse(res, errors.array());
    next();
  },
];
/*========= Create Salon Aminity Admin Validation ==============*/
exports.CreateSalonIdValidation = [
  commonfield.REQUIRED_SALONID,
  (req, res, next) => {
    var errors = validationResult(req)
    if (!errors.isEmpty()) return validatioErrorResponse(res, errors.array());
    next();
  },
];
/*========= Create Gift Card Admin Validation ==============*/
exports.CreateGiftCardValidation = [
  commonfield.REQUIRED_STRING_NAME,
  commonfield.REQUIRED_PRICE,
  commonfield.REQUIRED_STRING_CODE,
  commonfield.REQUIRED_QUANTITY,
  commonfield.REQUIRED_BENIFIT,
  (req, res, next) => {
    var errors = validationResult(req)
    if (!errors.isEmpty()) return validatioErrorResponse(res, errors.array());
    next();
  },
];
/*========= Gift Card Id Validation ==============*/
exports.IdGiftCardValidation = [
  commonfield.REQUIRED_GIFTCARD_ID_EXIST,
  (req, res, next) => {
    var errors = validationResult(req)
    if (!errors.isEmpty()) return validatioErrorResponse(res, errors.array());
    next();
  },
];

/*========= CMS Validation ==============*/
exports.cmsValidation = [
  commonfield.REQUIRED_PAGENAME,
  commonfield.REQUIRED_CONTENT,
  (req, res, next) => {
    var errors = validationResult(req)
    if (!errors.isEmpty()) return validatioErrorResponse(res, errors.array());
    next();
  },
];
/*========= CMS Validation ==============*/
exports.cmsIdValidation = [
  commonfield.REQUIRED_CMS_ID_EXIST,
  (req, res, next) => {
    var errors = validationResult(req)
    if (!errors.isEmpty()) return validatioErrorResponse(res, errors.array());
    next();
  },
];
/*========= CMS Validation ==============*/
exports.languageValidation = [
  commonfield.REQUIRED_STRING_NAME,
  (req, res, next) => {
    var errors = validationResult(req)
    if (!errors.isEmpty()) return validatioErrorResponse(res, errors.array());
    next();
  },
];
/*========= CMS Validation ==============*/
exports.languageIdValidation = [
  commonfield.REQUIRED_LANGUAGE_ID_EXIST,
  (req, res, next) => {
    var errors = validationResult(req)
    if (!errors.isEmpty()) return validatioErrorResponse(res, errors.array());
    next();
  },
];

/*========= Review Validation ==============*/
exports.addReviewValidation = [
  commonfield.REQUIRED_SALONID,
  // commonfield.REQUIRED_SERVICE_ID_EXIST,
  commonfield.REQUIRED_USERID, //OPTIONAL_USERID
  (req, res, next) => {
    var errors = validationResult(req)
    if (!errors.isEmpty()) return validatioErrorResponse(res, errors.array());
    next();
  },
];

/*========= salonInfoUpdate Validation ==============*/
exports.salonInfoUpdateValidation = [
  commonfield.REQUIRED_SALONID,
  commonfield.REQUIRED_EMPLOYEE_NUMBER,
  commonfield.REQUIRED_FIRSTNAME,
  commonfield.REQUIRED_LASTNAME,
  commonfield.REQUIRED_TERMSPOLICY,
  commonfield.REQUIRED_MARKETINGEMAIL,
  (req, res, next) => {
    var errors = validationResult(req)
    if (!errors.isEmpty()) return validatioErrorResponse(res, errors.array());
    next();
  },
];
/*========= Review Validation ==============*/
exports.salonPhotoUploadGetValidation = [
  commonfield.REQUIRED_SALONID,
  commonfield.REQUIRED_EMPLOYEE_NUMBER,
  commonfield.REQUIRED_FIRSTNAME,
  commonfield.REQUIRED_LASTNAME,
  commonfield.REQUIRED_TERMSPOLICY,
  commonfield.REQUIRED_MARKETINGEMAIL,
  (req, res, next) => {
    var errors = validationResult(req)
    if (!errors.isEmpty()) return validatioErrorResponse(res, errors.array());
    next();
  },
];
/*========= Image ID Validation ==============*/
exports.salonDeleteImageValidation = [
  commonfield.REQUIRED_IMAGE_ID,
  (req, res, next) => {
    var errors = validationResult(req)
    if (!errors.isEmpty()) return validatioErrorResponse(res, errors.array());
    next();
  },
];
/*========= Booking Inside User ID Validation ==============*/
exports.bookingUserId = [
  commonfield.REQUIRED_USERID_BOOKING,
  (req, res, next) => {
    var errors = validationResult(req)
    if (!errors.isEmpty()) return validatioErrorResponse(res, errors.array());
    next();
  },
];

/////////////////////////////////////////////////////
/*========= Membership Purchase Validation ==============*/
exports.membershipPurchaseValidation = [
  membership.OPTIONAL_MEMBERSHIP_ID,
  commonfield.REQUIRED_MEMBERSHIP_AMOUNT,
  commonfield.REQUIRED_DESCRIPTION,
  commonfield.REQUIRED_SALONID,
  (req, res, next) => {
    var errors = validationResult(req)
    if (!errors.isEmpty()) return validatioErrorResponse(res, errors.array());
    next();
  },
];

exports.AddOnMembershipValidation = [
  membership.REQUIRED_MEMBERSHIP_ADDON_ID,
  commonfield.REQUIRED_SALONID,
  // commonfield.REQUIRED_START_DATE,
  // commonfield.REQUIRED_END_DATE,
  commonfield.REQUIRED_MEMBERSHIP_AMOUNT,
  commonfield.REQUIRED_DESCRIPTION,
  (req, res, next) => {
    var errors = validationResult(req);
    if (!errors.isEmpty()) return validatioErrorResponse(res, errors.array());
    next();
  },
];

exports.membershipAutoRenewValidation = [
  commonfield.REQUIRED_ENABLE_AUTO_RENEW,
  (req, res, next) => {
    var errors = validationResult(req);
    if (!errors.isEmpty()) return validatioErrorResponse(res, errors.array());
    next();
  },
];

exports.deleteReviewValidation = [
  commonfield.REQUIRED_REVIEW_ID,
  (req, res, next) => {
    var errors = validationResult(req);
    if (!errors.isEmpty()) return validatioErrorResponse(res, errors.array());
    next();
  },
];