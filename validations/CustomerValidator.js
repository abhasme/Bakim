const { validationResult } = require('express-validator');
const { validatioErrorResponse } = require('../helpers/Response');
const customer = require('./MembershipValidation')
const commonfield = require('./CommonValidation')

exports.GetNotificationValidation = [
  commonfield.REQUIRED_USERID,
  (req, res, next) => {
    var errors = validationResult(req)
    if (!errors.isEmpty()) return validatioErrorResponse(res, errors.array());
    next();
  },
];

exports.RequiredSalonIdValidation = [
  commonfield.REQUIRED_SALONID,
  (req, res, next) => {
    var errors = validationResult(req);
    if (!errors.isEmpty()) return validatioErrorResponse(res, errors.array());
    next();
  },
];

exports.RequiredEmployeeValidation = [
  commonfield.REQUIRED_SALONID,
  commonfield.REQUIRED_EMPLOYEEID,
  (req, res, next) => {
    var errors = validationResult(req);
    if (!errors.isEmpty()) return validatioErrorResponse(res, errors.array());
    next();
  },
];

exports.OptionalSalonIdValidation = [
  commonfield.OPTIONAL_SALONID,
  (req, res, next) => {
    var errors = validationResult(req);
    if (!errors.isEmpty()) return validatioErrorResponse(res, errors.array());
    next();
  },
];

// exports.MembershipValidation = [
//     membership.REQUIRED_MEMBERSHIP_PLANNAME,
//     membership.REQUIRED_MEMBERSHIP_STAFFLIMIT,
//     membership.REQUIRED_MEMBERSHIP_COMMISIONPERCENT,
//     membership.REQUIRED_MEMBERSHIP_PLANTYPE,
//     membership.OPTIONAL_MEMBERSHIP_MONTHLY_PRICE,
//     membership.OPTIONAL_MEMBERSHIP_YEARLY_PRICE,      
//     membership.REQUIRED_MEMBERSHIP_SUBDOMAIN,   
//     membership.REQUIRED_MEMBERSHIP_UNIQUEDOMAIN, 
//     (req, res, next) => {
//       var errors = validationResult(req)
//       if (!errors.isEmpty())  return validatioErrorResponse(res, errors.array());
//       next();
//     },
// ];

exports.addReviewValidation = [
  commonfield.REQUIRED_REVIEW,
  // commonfield.OPTIONAL_USERID,
  commonfield.REQUIRED_BOOKING_ID,
  commonfield.REQUIRED_OVERALL,
  commonfield.REQUIRED_AMBIENCE,
  // commonfield.REQUIRED_STAFF,
  commonfield.REQUIRED_CLEANLINESS,
  // commonfield.REQUIRED_SERVICE,
  (req, res, next) => {
    var errors = validationResult(req)
    if (!errors.isEmpty()) return validatioErrorResponse(res, errors.array());
    next();
  },
];

exports.WorkIdValidation = [
  commonfield.REQUIRED_WORK_ID_EXIST,
  (req, res, next) => {
    var errors = validationResult(req);
    if (!errors.isEmpty()) return validatioErrorResponse(res, errors.array());
    next();
  },
];


