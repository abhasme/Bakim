const { validationResult } = require('express-validator');
const { validatioErrorResponse } = require('../helpers/Response');
const authfield = require('./AuthValidation')
const commonfield = require('./CommonValidation')

exports.LoginValidation = [
  authfield.LOGIN_USERNAME,
  authfield.LOGIN_PASSWORD,
  (req, res, next) => {
    var errors = validationResult(req)
    if (!errors.isEmpty()) return validatioErrorResponse(res, errors.array());
    next();
  },
];

exports.mobileValidation = [
  commonfield.REQUIRED_MOBILE,
  (req, res, next) => {
    var errors = validationResult(req)
    if (!errors.isEmpty()) return validatioErrorResponse(res, errors.array());
    next();
  },
];

exports.emailValidation = [
  commonfield.REQUIRED_EMAIL,
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
  authfield.LOGIN_PASSWORD,
  (req, res, next) => {
    var errors = validationResult(req)
    if (!errors.isEmpty()) return validatioErrorResponse(res, errors.array());
    next();
  },
];

exports.socialLoginValidation = [
  commonfield.REQUIRED_MOBILE,
  commonfield.REQUIRED_EMAIL,
  authfield.REQUIRED_SOCIALID,
  authfield.REQUIRED_SOCIAL_TYPE,
  (req, res, next) => {
    var errors = validationResult(req)
    if (!errors.isEmpty()) return validatioErrorResponse(res, errors.array());
    next();
  },
];

exports.requiredEmailOrMobile = [
  authfield.LOGIN_USERNAME,
  (req, res, next) => {
    var errors = validationResult(req)
    if (!errors.isEmpty()) return validatioErrorResponse(res, errors.array());
    next();
  },
];

exports.AuthOtpMobileValidation = [
  authfield.USER_REQUIRED_OTP,
  // commonfield.REQUIRED_MOBILE,       
  (req, res, next) => {
    var errors = validationResult(req)
    if (!errors.isEmpty()) return validatioErrorResponse(res, errors.array());
    next();
  },
];

exports.AuthOtpEmailValidation = [
  commonfield.REQUIRED_EMAIL,
  authfield.USER_REQUIRED_OTP,
  (req, res, next) => {
    var errors = validationResult(req)
    if (!errors.isEmpty()) return validatioErrorResponse(res, errors.array());
    next();
  },
];

exports.AuthResetPasswordValidation = [
  authfield.LOGIN_PASSWORD,
  (req, res, next) => {
    var errors = validationResult(req)
    if (!errors.isEmpty()) return validatioErrorResponse(res, errors.array());
    next();
  },
];

exports.AuthSetNewPasswordValidation = [
  authfield.REQUIRED_CURRENT_PASSWORD,
  authfield.LOGIN_PASSWORD,
  (req, res, next) => {
    var errors = validationResult(req)
    if (!errors.isEmpty()) return validatioErrorResponse(res, errors.array());
    next();
  },
];

exports.UsernameValidation = [
  authfield.LOGIN_USERNAME,
  (req, res, next) => {
    var errors = validationResult(req)
    if (!errors.isEmpty()) return validatioErrorResponse(res, errors.array());
    next();
  },
];
