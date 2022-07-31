const { check, validationResult, body } = require('express-validator');
const { Users } = require("../models/UserModel");
const { validatioErrorResponse } = require('../helpers/Response');
const translate = require('../locales/translate')

module.exports = {
  /*=========Salon Name Validation ==============*/
  REQUIRED_SALON_NAME: check('salonName').trim().escape().not().isEmpty().withMessage((value, { req }) => {
    return translate[req.headers["x-language-key"]].VALIDATION_FIELD_REQUIRED;
  }).bail().isLength({ min: 3, max: 126 }).withMessage((value, { req }) => {
    return translate[req.headers["x-language-key"]].VALIDATION_FIELD_LENGTH_3TO126;
  }).bail().isString().withMessage((value, { req }) => {
    return translate[req.headers["x-language-key"]].VALIDATION_FIELD_STRING;
  }).bail(),

  /*=========User Name Validation For login ==============*/
  LOGIN_USERNAME: check('username').trim().escape().not().isEmpty().withMessage((value, { req }) => {
    return translate[req.headers["x-language-key"]].VALIDATION_FIELD_REQUIRED;
  }).bail().isLength({ min: 3, max: 126 }).withMessage((value, { req }) => {
    return translate[req.headers["x-language-key"]].VALIDATION_FIELD_LENGTH_3TO126;
  }).bail(),

  /*=========Password Validation ==============*/
  LOGIN_PASSWORD: check('password').not().isEmpty().trim().escape().withMessage((value, { req }) => {
    return translate[req.headers["x-language-key"]].VALIDATION_FIELD_REQUIRED;
  }).bail().isLength({ min: 3, max: 126 }).withMessage((value, { req }) => {
    return translate[req.headers["x-language-key"]].VALIDATION_FIELD_LENGTH_3TO126;
  }).bail(),

  /*=========Gender Validation ==============*/
  REQUIRED_GENDER: check('gender').not().isEmpty().trim().escape().withMessage((value, { req }) => {
    return translate[req.headers["x-language-key"]].VALIDATION_FIELD_REQUIRED;
  }).bail()
    .isIn(['Male', 'Female', 'Prefer Not to say']).withMessage((value, { req }) => {
      return translate[req.headers["x-language-key"]].VALIDATION_FIELD_GENDER;
    }).bail(),

  /*=========Required Social ID Validation ==============*/
  REQUIRED_SOCIALID: check('socialID').trim().escape().not().isEmpty().withMessage((value, { req }) => {
    return translate[req.headers["x-language-key"]].VALIDATION_FIELD_REQUIRED;
  }).bail().isLength({ min: 3, max: 126 }).withMessage((value, { req }) => {
    return translate[req.headers["x-language-key"]].VALIDATION_FIELD_LENGTH_3TO126;
  }).bail(),

  /*=========Required Social Type Validation ==============*/
  REQUIRED_SOCIAL_TYPE: check('socialtype').trim().escape().not().isEmpty().withMessage((value, { req }) => {
    return translate[req.headers["x-language-key"]].VALIDATION_FIELD_REQUIRED;
  }).bail()
    .isIn(['Apple', 'Facebook', 'Google']).withMessage((value, { req }) => {
      return translate[req.headers["x-language-key"]].VALIDATION_FIELD_GENDER;
    }).bail(),

  /*=========Required OTP Validation ==============*/
  USER_REQUIRED_OTP: check('otp').trim().escape().not().isEmpty().withMessage((value, { req }) => {
    return translate[req.headers["x-language-key"]].VALIDATION_FIELD_REQUIRED;
  }).bail().isLength({ min: 4, max: 4 }).withMessage((value, { req }) => {
    return translate[req.headers["x-language-key"]].VALIDATION_FIELD_LENGTH;
  }).bail().isNumeric().withMessage((value, { req }) => {
    return translate[req.headers["x-language-key"]].VALIDATION_FIELD_NUMBER;
  }).bail(),

  /*=========Required OTP Validation ==============*/
  REQUIRED_CURRENT_PASSWORD: check('currentpassword').not().isEmpty().trim().escape().withMessage((value, { req }) => {
    return translate[req.headers["x-language-key"]].VALIDATION_FIELD_REQUIRED;
  }).bail().isLength({ min: 3, max: 126 }).withMessage((value, { req }) => {
    return translate[req.headers["x-language-key"]].VALIDATION_FIELD_LENGTH_3TO126;
  }).bail(),

  /*=========Admin Membership Validation ==============*/
  //Membership Plan NAme
  REQUIRED_MEMBERSHIP_PLANNAME: check('planName').trim().escape().not().isEmpty().withMessage((value, { req }) => {
    return translate[req.headers["x-language-key"]].VALIDATION_FIELD_REQUIRED;
  }).bail().isLength({ min: 3, max: 50 }).withMessage((value, { req }) => {
    return translate[req.headers["x-language-key"]].VALIDATION_FIELD_LENGTH_3TO256;
  }).bail(),

  //Membership Staff Limit
  REQUIRED_MEMBERSHIP_STAFFLIMIT: check('staffLimit').trim().escape().not().isEmpty().withMessage((value, { req }) => {
    return translate[req.headers["x-language-key"]].VALIDATION_FIELD_REQUIRED;
  }).bail().isNumeric().withMessage((value, { req }) => {
    return translate[req.headers["x-language-key"]].VALIDATION_FIELD_NUMBER;
  }).bail(),

  //Membership Staff Limit
  REQUIRED_MEMBERSHIP_COMMISIONPERCENT: check('commisionPercent').trim().escape().not().isEmpty().withMessage((value, { req }) => {
    return translate[req.headers["x-language-key"]].VALIDATION_FIELD_REQUIRED;
  }).bail().isNumeric().withMessage((value, { req }) => {
    return translate[req.headers["x-language-key"]].VALIDATION_FIELD_NUMBER;
  }).bail(),
};
