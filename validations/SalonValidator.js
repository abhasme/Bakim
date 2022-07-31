const { validationResult } = require("express-validator");
const { validatioErrorResponse } = require("../helpers/Response");
const membership = require("./MembershipValidation");
const commonfield = require("./CommonValidation");
const authfield = require("./AuthValidation");

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
  authfield.LOGIN_PASSWORD,
  commonfield.REQUIRED_SALON_BUSINESS_TYPE,
  (req, res, next) => {
    var errors = validationResult(req);
    if (!errors.isEmpty()) return validatioErrorResponse(res, errors.array());
    next();
  },
];

exports.MembershipPurchaseValidation = [
  membership.REQUIRED_MEMBERSHIP_ID,
  // commonfield.REQUIRED_SALONID,
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

exports.AboutCompanyValidation = [
  commonfield.REQUIRED_ADDRESS,
  commonfield.REQUIRED_COUNTRY_NAME,
  commonfield.REQUIRED_CITY_NAME,
  commonfield.REQUIRED_POSTALCODE,
  commonfield.REQUIRED_SHOP_EMAIL,
  commonfield.REQUIRED_STOP_PHONE,
  commonfield.OPTIONAL_WEBSITE,
  // commonfield.REQUIRED_DESCRIPTION,
  (req, res, next) => {
    var errors = validationResult(req);
    if (!errors.isEmpty()) return validatioErrorResponse(res, errors.array());
    next();
  },
];

exports.InvoiceSettingValidation = [
  commonfield.REQUIRED_POSTALCODE,
  commonfield.REQUIRED_CITY_NAME,
  commonfield.REQUIRED_STATE_NAME,
  commonfield.REQUIRED_COUNTRY_NAME,
  commonfield.REQUIRED_ADDRESS,
  commonfield.REQUIRED_BUSSINESSEMAIL,
  commonfield.REQUIRED_BUSSINESSPHONE,
  commonfield.REQUIRED_CONTACTPERSION,
  (req, res, next) => {
    var errors = validationResult(req);
    if (!errors.isEmpty()) return validatioErrorResponse(res, errors.array());
    next();
  },
];

exports.workingHourValidation = [
  (req, res, next) => {
    var errors = validationResult(req);
    if (!errors.isEmpty()) return validatioErrorResponse(res, errors.array());
    next();
  },
];

exports.addPortfolioValidation = [
  commonfield.REQUIRED_SERVICE_ID_EXIST,
  commonfield.REQUIRED_DESCRIPTION,
  (req, res, next) => {
    var errors = validationResult(req);
    if (!errors.isEmpty()) return validatioErrorResponse(res, errors.array());
    next();
  },
];

exports.DeletePortfolioValidation = [
  commonfield.REQUIRED_WORK_ID_EXIST,
  (req, res, next) => {
    var errors = validationResult(req);
    if (!errors.isEmpty()) return validatioErrorResponse(res, errors.array());
    next();
  },
];

exports.ProductAddValidation = [
  commonfield.REQUIRED_STRING_NAME,
  commonfield.REQUIRED_PRICE,
  commonfield.REQUIRED_STOCK,
  (req, res, next) => {
    var errors = validationResult(req);
    if (!errors.isEmpty()) return validatioErrorResponse(res, errors.array());
    next();
  },
];

exports.ProductIDValidation = [
  commonfield.REQUIRED_PRODUCT_ID,
  (req, res, next) => {
    var errors = validationResult(req);
    if (!errors.isEmpty()) return validatioErrorResponse(res, errors.array());
    next();
  },
];

exports.ResourceAddValidation = [
  commonfield.REQUIRED_STRING_NAME,
  commonfield.UNIQUE_RESOURCE_NAME,
  commonfield.REQUIRED_QUANTITY,
  (req, res, next) => {
    var errors = validationResult(req);
    if (!errors.isEmpty()) return validatioErrorResponse(res, errors.array());
    next();
  },
];

exports.ResourceUpdateValidation = [
  commonfield.REQUIRED_STRING_NAME,
  commonfield.UNIQUE_RESOURCE_NAME,
  commonfield.REQUIRED_QUANTITY,
  commonfield.REQUIRED_RESOURCE_ID,
  (req, res, next) => {
    var errors = validationResult(req);
    if (!errors.isEmpty()) return validatioErrorResponse(res, errors.array());
    next();
  },
];

exports.ResourceIDValidation = [
  commonfield.REQUIRED_RESOURCE_ID,
  (req, res, next) => {
    var errors = validationResult(req);
    if (!errors.isEmpty()) return validatioErrorResponse(res, errors.array());
    next();
  },
];

/*========== Create Employee ===================*/ //
exports.EmployeeSalonSignupValidation = [
  //commonfield.REQUIRED_SALONID,
  commonfield.REQUIRED_FIRSTNAME,
  commonfield.REQUIRED_LASTNAME,
  commonfield.REQUIRED_MOBILE,
  commonfield.USER_UNIQUE_MOBILE,
  commonfield.REQUIRED_EMAIL,
  commonfield.USER_UNIQUE_EMAIL,
  (req, res, next) => {
    var errors = validationResult(req);
    if (!errors.isEmpty()) return validatioErrorResponse(res, errors.array());
    next();
  },
];

exports.EmployeeGetValidation = [
  commonfield.REQUIRED_SALONID,
  (req, res, next) => {
    var errors = validationResult(req);
    if (!errors.isEmpty()) return validatioErrorResponse(res, errors.array());
    next();
  },
];

/*========== Update Employee ===================*/ //
exports.EmployeeUpdateValidation = [
  commonfield.REQUIRED_EMPLOYEEID,
  // commonfield.REQUIRED_FIRSTNAME,
  // commonfield.REQUIRED_LASTNAME,
  // commonfield.REQUIRED_MOBILE,
  // commonfield.REQUIRED_EMAIL,

  (req, res, next) => {
    var errors = validationResult(req);
    if (!errors.isEmpty()) return validatioErrorResponse(res, errors.array());
    next();
  },
];

exports.ResourceAddValidation = [
  commonfield.REQUIRED_STRING_NAME,
  commonfield.UNIQUE_RESOURCE_NAME,
  commonfield.REQUIRED_QUANTITY,
  (req, res, next) => {
    var errors = validationResult(req);
    if (!errors.isEmpty()) return validatioErrorResponse(res, errors.array());
    next();
  },
];

exports.ResourceUpdateValidation = [
  commonfield.REQUIRED_STRING_NAME,
  commonfield.UNIQUE_RESOURCE_NAME,
  commonfield.REQUIRED_QUANTITY,
  commonfield.REQUIRED_RESOURCE_ID,
  (req, res, next) => {
    var errors = validationResult(req);
    if (!errors.isEmpty()) return validatioErrorResponse(res, errors.array());
    next();
  },
];

exports.ResourceIDValidation = [
  commonfield.REQUIRED_RESOURCE_ID,
  (req, res, next) => {
    var errors = validationResult(req);
    if (!errors.isEmpty()) return validatioErrorResponse(res, errors.array());
    next();
  },
];

exports.EmployeeSignupValidation = [
  commonfield.REQUIRED_SALONID,
  commonfield.REQUIRED_FIRSTNAME,
  commonfield.REQUIRED_LASTNAME,
  commonfield.REQUIRED_MOBILE,
  commonfield.USER_UNIQUE_MOBILE,
  commonfield.REQUIRED_EMAIL,
  commonfield.USER_UNIQUE_EMAIL,
  (req, res, next) => {
    var errors = validationResult(req);
    if (!errors.isEmpty()) return validatioErrorResponse(res, errors.array());
    next();
  },
];

exports.EmployeeGetValidation = [
  commonfield.REQUIRED_SALONID,
  (req, res, next) => {
    var errors = validationResult(req);
    if (!errors.isEmpty()) return validatioErrorResponse(res, errors.array());
    next();
  },
];

/*========== Update Employee ===================*/ //
exports.EmployeeIdGetValidation = [
  commonfield.REQUIRED_EMPLOYEE_ID,

  (req, res, next) => {
    var errors = validationResult(req);
    if (!errors.isEmpty()) return validatioErrorResponse(res, errors.array());
    next();
  },
];

exports.AddTeamMemberDetailsValidation = [
  commonfield.REQUIRED_EMPLOYEEID,
  commonfield.REQUIRED_ABOUTUS_OR_SHORTBIO,
  commonfield.REQUIRED_JOBTITLE,
  (req, res, next) => {
    var errors = validationResult(req);
    if (!errors.isEmpty()) return validatioErrorResponse(res, errors.array());
    next();
  },
];

exports.VoucherAddValidation = [
  commonfield.REQUIRED_STRING_CODE,
  commonfield.REQUIRED_STOCK,
  commonfield.REQUIRED_PRICE,
  commonfield.REQUIRED_DISCOUNT,
  commonfield.REQUIRED_START_DATE,
  commonfield.REQUIRED_END_DATE,
  (req, res, next) => {
    var errors = validationResult(req)
    if (!errors.isEmpty()) return validatioErrorResponse(res, errors.array());
    next();
  },
];
exports.VoucherIDValidation = [
  commonfield.REQUIRED_VOUCHER_ID,
  (req, res, next) => {
    var errors = validationResult(req)
    if (!errors.isEmpty()) return validatioErrorResponse(res, errors.array());
    next();
  },
];

exports.SettingNotificationTeamValidation = [
  commonfield.REQUIRED_NOTIFICATION_SETTING_ID,
  commonfield.REQUIRED_RECEVICE_BOOKING_MESSAGE,
  commonfield.REQUIRED_RECEVICE_CHANGE_CALENDAR_MESSAGE,
  commonfield.REQUIRED_RECEVICE_REVIEW_ONPOST_MESSAGE,
  commonfield.REQUIRED_RECEVICE_BEFORE_APPOINMENT_MESSAGE,

  (req, res, next) => {
    var errors = validationResult(req);
    if (!errors.isEmpty()) return validatioErrorResponse(res, errors.array());
    next();
  },
];

exports.SettingNotificationClientValidation = [
  commonfield.REQUIRED_NOTIFICATION_SETTING_ID,
  commonfield.REQUIRED_RECEVICE_TEXT_MESSAGE,
  commonfield.REQUIRED_RECEVICE_EMAIL_MESSAGE,

  (req, res, next) => {
    var errors = validationResult(req)
    if (!errors.isEmpty()) return validatioErrorResponse(res, errors.array());
    next();
  },
];


exports.SettingNotificationValidation = [
  commonfield.REQUIRED_NOTIFICATION_SETTING_ID,

  (req, res, next) => {
    var errors = validationResult(req);
    if (!errors.isEmpty()) return validatioErrorResponse(res, errors.array());
    next();
  },
];

exports.ServicePackageDescriptionValidation = [
  commonfield.REQUIRED_SALON_SERVICE_ID,
  commonfield.REQUIRED_DESCRIPTION,
  (req, res, next) => {
    var errors = validationResult(req);
    if (!errors.isEmpty()) return validatioErrorResponse(res, errors.array());
    next();
  },
];

exports.ServicePackageFinePrintValidation = [
  commonfield.REQUIRED_SALON_SERVICE_ID,
  commonfield.REQUIRED_GOOD_TO_KNOW,
  commonfield.REQUIRED_RESTRICTIONS,
  (req, res, next) => {
    var errors = validationResult(req);
    if (!errors.isEmpty()) return validatioErrorResponse(res, errors.array());
    next();
  },
];

exports.ServicePackageDistributionValidation = [
  commonfield.REQUIRED_SALON_SERVICE_ID,
  commonfield.REQUIRED_FEATURED_SERVICE,
  commonfield.REQUIRED_SELL_SERVICE_ONLINE,
  commonfield.REQUIRED_APPOINTMENT_LEAD_TIME,
  commonfield.REQUIRED_SERVICE_AVAILABILITY_ON_MONDAY,
  commonfield.REQUIRED_SERVICE_AVAILABILITY_ON_TUESDAY,
  commonfield.REQUIRED_SERVICE_AVAILABILITY_ON_WEDNESDAY,
  commonfield.REQUIRED_SERVICE_AVAILABILITY_ON_THURSDAY,
  commonfield.REQUIRED_SERVICE_AVAILABILITY_ON_FRIDAY,
  commonfield.REQUIRED_SERVICE_AVAILABILITY_ON_SATURDAY,
  commonfield.REQUIRED_SERVICE_AVAILABILITY_ON_SUNDAY,
  (req, res, next) => {
    var errors = validationResult(req);
    if (!errors.isEmpty()) return validatioErrorResponse(res, errors.array());
    next();
  },
];

/*========== add Employee Portfolio===================*/ //
exports.EmployeeAddPortfolioValidation = [
  commonfield.REQUIRED_EMPLOYEEID,
  commonfield.REQUIRED_SERVICE_ID_EXIST,
  commonfield.REQUIRED_DESCRIPTION,
  (req, res, next) => {
    var errors = validationResult(req);
    if (!errors.isEmpty()) return validatioErrorResponse(res, errors.array());
    next();
  },
];

/*========== language===================*/
exports.LanguageObjectValidation = [
  // commonfield.REQUIRED_LANGUAGES_OBJECTS,
  (req, res, next) => {
    var errors = validationResult(req);
    if (!errors.isEmpty()) return validatioErrorResponse(res, errors.array());
    next();
  },
];

/*========== Discount===================*/
exports.AddDiscountValidation = [
  commonfield.REQUIRED_STRING_NAME,
  commonfield.REQUIRED_SERVICE_ACTIVE_STATUS,
  commonfield.REQUIRED_GENERAL_ENABLE_DISCOUNT,
  commonfield.REQUIRED_GENERAL_DISCOUNT,
  commonfield.REQUIRED_LAST_MINUTE_DISCOUNT,
  commonfield.REQUIRED_LAST_MINUTE_ENABLE_DISCOUNT,
  commonfield.REQUIRED_BEFORE_ACTIVE,
  commonfield.REQUIRED_OFF_PIC_ENABLE_DISCOUNT,
  commonfield.REQUIRED_MONDAY_MORNING_DISCOUNT,
  commonfield.REQUIRED_MONDAY_EVENING_DISCOUNT,
  commonfield.REQUIRED_MONDAY_AFTRNOON_DISCOUNT,
  commonfield.REQUIRED_MONDAY_VENUE_STATUS_DISCOUNT,
  commonfield.REQUIRED_TUESDAY_MORNING_DISCOUNT,
  commonfield.REQUIRED_TUESDAY_EVENING_DISCOUNT,
  commonfield.REQUIRED_TUESDAY_AFTRNOON_DISCOUNT,
  commonfield.REQUIRED__TUESDAY_VENUE_STATUS_DISCOUNT,
  commonfield.REQUIRED_WEDNESDAY_MORNING_DISCOUNT,
  commonfield.REQUIRED_WEDNESDAY_EVENING_DISCOUNT,
  commonfield.REQUIRED_WEDNESDAY_AFTRNOON_DISCOUNT,
  commonfield.REQUIRED_WEDNESDAY_AFTRNOON_DISCOUNT,
  commonfield.REQUIRED_THURSDAY_MORNING_DISCOUNT,
  commonfield.REQUIRED_THURSDAY_EVENING_DISCOUNT,
  commonfield.REQUIRED_THURSDAY_AFTRNOON_DISCOUNT,
  commonfield.REQUIRED__THURSDAY_VENUE_STATUS_DISCOUNT,
  commonfield.REQUIRED_FRIDAY_MORNING_DISCOUNT,
  commonfield.REQUIRED_FRIDAY_EVENING_DISCOUNT,
  commonfield.REQUIRED_FRIDAY_AFTRNOON_DISCOUNT,
  commonfield.REQUIRED__FRIDAY_VENUE_STATUS_DISCOUNT,
  commonfield.REQUIRED_SATURDAY_MORNING_DISCOUNT,
  commonfield.REQUIRED_SATURDAY_EVENING_DISCOUNT,
  commonfield.REQUIRED_SATURDAY_AFTRNOON_DISCOUNT,
  commonfield.REQUIRED__SATURDAY_VENUE_STATUS_DISCOUNT,
  commonfield.REQUIRED_SUNDAY_MORNING_DISCOUNT,
  commonfield.REQUIRED_SUNDAY_EVENING_DISCOUNT,
  commonfield.REQUIRED_SUNDAY_AFTRNOON_DISCOUNT,
  commonfield.REQUIRED__SUNDAY_VENUE_STATUS_DISCOUNT,
  //commonfield.REQUIRED_SERVICE_ID_EXIST_,
  (req, res, next) => {
    var errors = validationResult(req);
    if (!errors.isEmpty()) return validatioErrorResponse(res, errors.array());
    next();
  },
];

exports.UpdateAutoRenewStatusValidation = [
  commonfield.REQUIRED_ENABLE_AUTO_RENEW,

  (req, res, next) => {
    var errors = validationResult(req);
    if (!errors.isEmpty()) return validatioErrorResponse(res, errors.array());
    next();
  },
];

/*========== Update Service ===================*/ //
exports.AddDiscountIdValidation = [
  commonfield.REQUIRED_DISCOUNTID,

  (req, res, next) => {
    var errors = validationResult(req);
    if (!errors.isEmpty()) return validatioErrorResponse(res, errors.array());
    next();
  },
];

/*========== Salon Client Validation  ===================*/ //
exports.ClientAddValidation = [
  commonfield.REQUIRED_FIRSTNAME,
  commonfield.REQUIRED_LASTNAME,
  commonfield.REQUIRED_EMAIL,
  commonfield.USER_UNIQUE_EMAIL,
  commonfield.REQUIRED_MOBILE,
  commonfield.USER_UNIQUE_MOBILE,
  commonfield.REQUIRED_POSTALCODE,
  authfield.REQUIRED_GENDER,
  commonfield.REQUIRED_PREPAYMENT_REQUIRED,
  commonfield.REQUIRED_MARKETINGEMAIL,
  commonfield.OPTIONAL_NOTES,
  commonfield.REQUIRED_SALON_SOURCE_STATUS,

  (req, res, next) => {
    var errors = validationResult(req);
    if (!errors.isEmpty()) return validatioErrorResponse(res, errors.array());
    next();
  },
];

exports.ClientGetValidation = [
  commonfield.OPTIONAL_CLIENTID,

  (req, res, next) => {
    var errors = validationResult(req);
    if (!errors.isEmpty()) return validatioErrorResponse(res, errors.array());
    next();
  },
];

exports.ClientUpdateValidation = [
  commonfield.OPTIONAL_CLIENTID,
  commonfield.REQUIRED_FIRSTNAME,
  commonfield.REQUIRED_LASTNAME,
  commonfield.REQUIRED_EMAIL,
  commonfield.REQUIRED_MOBILE,
  commonfield.REQUIRED_POSTALCODE,
  authfield.REQUIRED_GENDER,
  commonfield.REQUIRED_PREPAYMENT_REQUIRED,
  commonfield.REQUIRED_MARKETINGEMAIL,
  commonfield.OPTIONAL_NOTES,
  commonfield.REQUIRED_SALON_SOURCE_STATUS,

  (req, res, next) => {
    var errors = validationResult(req);
    if (!errors.isEmpty()) return validatioErrorResponse(res, errors.array());
    next();
  },
];

exports.PackageAddValidation = [
  commonfield.REQUIRED_SERVICE_TITLE,
  commonfield.REQUIRED_DISCOUNTID,
  commonfield.REQUIRED_PRICE_TYPE,
  function (req, res, next) {
    var errors = validationResult(req);
    if (!errors.isEmpty())
      return validatioErrorResponse(res, errors.array());
    next();
  },
];

exports.PackagUpdateValidation = [
  commonfield.REQUIRED_PACKAGE_ID,
  commonfield.REQUIRED_SERVICE_TITLE,
  commonfield.REQUIRED_DISCOUNTID,
  commonfield.REQUIRED_PRICE_TYPE,
  function (req, res, next) {
    var errors = validationResult(req);
    if (!errors.isEmpty())
      return validatioErrorResponse(res, errors.array());
    next();
  },
];

exports.PackageDescriptionValidation = [
  commonfield.REQUIRED_PACKAGE_ID,
  commonfield.REQUIRED_DESCRIPTION,
  (req, res, next) => {
    var errors = validationResult(req);
    if (!errors.isEmpty()) return validatioErrorResponse(res, errors.array());
    next();
  },
];

exports.PackageFinePrintValidation = [
  commonfield.REQUIRED_PACKAGE_ID,
  commonfield.REQUIRED_GOOD_TO_KNOW,
  commonfield.REQUIRED_RESTRICTIONS,
  (req, res, next) => {
    var errors = validationResult(req);
    if (!errors.isEmpty()) return validatioErrorResponse(res, errors.array());
    next();
  },
];

exports.PackageDistributionValidation = [
  commonfield.REQUIRED_PACKAGE_ID,
  commonfield.REQUIRED_FEATURED_SERVICE,
  commonfield.REQUIRED_SELL_SERVICE_ONLINE,
  commonfield.REQUIRED_APPOINTMENT_LEAD_TIME,
  commonfield.REQUIRED_SERVICE_AVAILABILITY_ON_MONDAY,
  commonfield.REQUIRED_SERVICE_AVAILABILITY_ON_TUESDAY,
  commonfield.REQUIRED_SERVICE_AVAILABILITY_ON_WEDNESDAY,
  commonfield.REQUIRED_SERVICE_AVAILABILITY_ON_THURSDAY,
  commonfield.REQUIRED_SERVICE_AVAILABILITY_ON_FRIDAY,
  commonfield.REQUIRED_SERVICE_AVAILABILITY_ON_SATURDAY,
  commonfield.REQUIRED_SERVICE_AVAILABILITY_ON_SUNDAY,
  (req, res, next) => {
    var errors = validationResult(req);
    if (!errors.isEmpty()) return validatioErrorResponse(res, errors.array());
    next();
  },
];

exports.addServiceGroupValidation = [
  commonfield.REQUIRED_STRING_NAME,
  function (req, res, next) {
    var errors = validationResult(req);
    if (!errors.isEmpty())
      return validatioErrorResponse(res, errors.array());
    next();
  },
];

exports.updateServiceGroupValidation = [
  //commonfield.REQUIRED_SALON_SERVICEGROUP_ID,
  function (req, res, next) {
    var errors = validationResult(req);
    if (!errors.isEmpty())
      return validatioErrorResponse(res, errors.array());
    next();
  },
];

/*========== Update Employee ===================*/ //
exports.EmployeeEmailValidation = [
  commonfield.REQUIRED_EMAIL,

  (req, res, next) => {
    var errors = validationResult(req);
    if (!errors.isEmpty()) return validatioErrorResponse(res, errors.array());
    next();
  },
];

exports.AddRotaValidation = [
  commonfield.REQUIRED_TEAMID,
  commonfield.REQUIRED_SALON_SCHEDULE_TYPE,
  commonfield.REQUIRED_SERVICE_ACTIVE_STATUS,

  (req, res, next) => {
    var errors = validationResult(req);
    if (!errors.isEmpty()) return validatioErrorResponse(res, errors.array());
    next();
  },
];

exports.GetRotaValidation = [
  commonfield.REQUIRED_ROTAID,

  (req, res, next) => {
    var errors = validationResult(req);
    if (!errors.isEmpty()) return validatioErrorResponse(res, errors.array());
    next();
  },
];

exports.UpdateRotaValidation = [
  commonfield.REQUIRED_SET_TIME_TYPE,

  (req, res, next) => {
    var errors = validationResult(req);
    if (!errors.isEmpty()) return validatioErrorResponse(res, errors.array());
    next();
  },
];

exports.AddOnMembershipValidation = [
  membership.REQUIRED_MEMBERSHIP_ADDON_ID,
  // commonfield.REQUIRED_SALONID,
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

/*========== Update Discount===================*/
exports.UpdateDiscountValidation = [
  (req, res, next) => {
    var errors = validationResult(req);
    if (!errors.isEmpty()) return validatioErrorResponse(res, errors.array());
    next();
  },
];

/*========== Update Discount===================*/
exports.UpdateDiscountServiceValidation = [

  (req, res, next) => {
    var errors = validationResult(req);
    if (!errors.isEmpty()) return validatioErrorResponse(res, errors.array());
    next();
  },
];
