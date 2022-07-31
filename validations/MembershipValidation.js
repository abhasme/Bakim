const { check, validationResult, body } = require('express-validator');
const { Membership } = require("../models/MembershipModel");
const { MembershipAddOn } = require("../models/MembershipAddOn");
const { validatioErrorResponse } = require('../helpers/Response');
const translate = require('../locales/translate')

module.exports = {
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

  //Membership Commision Percent
  REQUIRED_MEMBERSHIP_COMMISIONPERCENT: check('commisionPercent').trim().escape().not().isEmpty().withMessage((value, { req }) => {
    return translate[req.headers["x-language-key"]].VALIDATION_FIELD_REQUIRED;
  }).bail().isNumeric().withMessage((value, { req }) => {
    return translate[req.headers["x-language-key"]].VALIDATION_FIELD_NUMBER;
  }).bail(),

  //Membership Commision Percent
  REQUIRED_MEMBERSHIP_PLANTYPE: check('planType').trim().escape().not().isEmpty().withMessage((value, { req }) => {
    return translate[req.headers["x-language-key"]].VALIDATION_FIELD_REQUIRED;
  }).bail().isIn(['Monthly', 'Yearly', 'Both']).withMessage((value, { req }) => {
    return translate[req.headers["x-language-key"]].VALIDATION_FIELD_GENDER;
  }).bail(),

  //Membership Monthly Price
  OPTIONAL_MEMBERSHIP_MONTHLY_PRICE: check('monthlyPrice').optional({ checkFalsy: true, nullable: true }).bail()
    .isNumeric().withMessage((value, { req }) => {
      return translate[req.headers["x-language-key"]].VALIDATION_FIELD_NUMBER;
    }).bail(),

  //Membership Yearly Price
  OPTIONAL_MEMBERSHIP_YEARLY_PRICE: check('yearlyPrice').optional({ checkFalsy: true, nullable: true }).bail()
    .isNumeric().withMessage((value, { req }) => {
      return translate[req.headers["x-language-key"]].VALIDATION_FIELD_NUMBER;
    }).bail(),

  //Membership Plan Addon NAme
  REQUIRED_MEMBERSHIP_PLAN_ADDON_NAME: check('planAddonName').trim().escape().not().isEmpty().withMessage((value, { req }) => {
    return translate[req.headers["x-language-key"]].VALIDATION_FIELD_REQUIRED;
  }).bail().isLength({ min: 3, max: 50 }).withMessage((value, { req }) => {
    return translate[req.headers["x-language-key"]].VALIDATION_FIELD_LENGTH_3TO256;
  }).bail(),

  //Membership SubDomain
  REQUIRED_MEMBERSHIP_SUBDOMAIN: check('subDomain').trim().escape().not().isEmpty().withMessage((value, { req }) => {
    return translate[req.headers["x-language-key"]].VALIDATION_FIELD_REQUIRED;
  }).bail().isBoolean().withMessage((value, { req }) => {
    return translate[req.headers["x-language-key"]].VALIDATION_FIELD_BOOLEAN;
  }).bail(),

  //Membership Unique Domain
  REQUIRED_MEMBERSHIP_UNIQUEDOMAIN: check('uniqueDomain').trim().escape().not().isEmpty().withMessage((value, { req }) => {
    return translate[req.headers["x-language-key"]].VALIDATION_FIELD_REQUIRED;
  }).bail().isBoolean().withMessage((value, { req }) => {
    return translate[req.headers["x-language-key"]].VALIDATION_FIELD_BOOLEAN;
  }).bail(),

  /*== Required Exist Membership Validation  ===*/
  REQUIRED_MEMBERSHIP_ID: check('membershipid').trim().escape().not().isEmpty().withMessage((value, { req }) => {
    return translate[req.headers["x-language-key"]].VALIDATION_FIELD_REQUIRED;
  }).bail()
    .isMongoId().withMessage((value, { req }) => {
      return translate[req.headers["x-language-key"]].VALIDATION_FIELD_MONGOID;
    }).bail()
    .custom((value, { req }) => {
      return Membership.findOne({ _id: value }).select('_id').then((membership) => {
        if (!membership) {
          return Promise.reject(translate[req.headers["x-language-key"]].VALIDATION_FIELD_MONGOID);
        }
      });
    }).bail(),

  /*== Optional Exist Membership Validation  ===*/
  OPTIONAL_MEMBERSHIP_ID: check('membershipid').optional({ checkFalsy: true, nullable: true }).bail()
    .isMongoId().withMessage((value, { req }) => {
      return translate[req.headers["x-language-key"]].VALIDATION_FIELD_MONGOID;
    }).bail()
    .custom((value, { req }) => {
      return Membership.findOne({ _id: value }).select('_id').then((membership) => {
        if (!membership) {
          return Promise.reject(translate[req.headers["x-language-key"]].VALIDATION_FIELD_MONGOID);
        }
      });
    }).bail(),

  //Membership Plan NAme
  REQUIRED_MEMBERSHIP_TRANSACTIONID: check('transactionid').trim().escape().not().isEmpty().withMessage((value, { req }) => {
    return translate[req.headers["x-language-key"]].VALIDATION_FIELD_REQUIRED;
  }).bail().isLength({ min: 3, max: 50 }).withMessage((value, { req }) => {
    return translate[req.headers["x-language-key"]].VALIDATION_FIELD_LENGTH_3TO256;
  }).bail(),

  /*=========Required Membership Id Validation ==============*/
  REQUIRED_MEMBERSHIP_ID_EXIST: check('membershipid').trim().escape().not().isEmpty().withMessage((value, { req }) => {
    return translate[req.headers["x-language-key"]].VALIDATION_FIELD_REQUIRED;
  }).bail()
    .isMongoId().withMessage((value, { req }) => {
      return translate[req.headers["x-language-key"]].VALIDATION_FIELD_MONGOID;
    }).bail()
    .custom((value, { req }) => {
      return Membership.findOne({ _id: value }).select('_id').then((membership) => {
        if (!membership) {
          return Promise.reject(translate[req.headers["x-language-key"]].VALIDATION_FIELD_MONGOID);
        }
      });
    }).bail(),

  /*=========Required Membership Id Validation ==============*/
  REQUIRED_MEMBERSHIP_ADDON_ID_EXIST: check('membershipaddonid').trim().escape().not().isEmpty().withMessage((value, { req }) => {
    return translate[req.headers["x-language-key"]].VALIDATION_FIELD_REQUIRED;
  }).bail()
    .isMongoId().withMessage((value, { req }) => {
      return translate[req.headers["x-language-key"]].VALIDATION_FIELD_MONGOID;
    }).bail()
    .custom((value, { req }) => {
      return MembershipAddOn.findOne({ _id: value }).select('_id').then((membershipaddon) => {
        if (!membershipaddon) {
          return Promise.reject(translate[req.headers["x-language-key"]].VALIDATION_FIELD_MONGOID);
        }
      });
    }).bail(),

  //===============================================================//
  USER_UNIQUE_PLAN_NAME: check('planName').custom((value, { req }) => {
    return Membership.findOne({ planName: value, _id: { $nin: [req.params.id] } }).select('planName').then((user) => {
      if (user) {
        return Promise.reject(translate[req.headers["x-language-key"]].VALIDATION_FIELD_EXISTS);
      }
    });
  }).bail(),

  REQUIRED_MEMBERSHIP_ADDON_ID: check('membershipid').trim().escape().not().isEmpty().withMessage((value, { req }) => {
    return translate[req.headers["x-language-key"]].VALIDATION_FIELD_REQUIRED;
  }).bail()
    .isMongoId().withMessage((value, { req }) => {
      return translate[req.headers["x-language-key"]].VALIDATION_FIELD_MONGOID;
    }).bail()
    .custom((value, { req }) => {
      return MembershipAddOn.findOne({ _id: value }).select('_id').then((membership) => {
        if (!membership) {
          return Promise.reject(translate[req.headers["x-language-key"]].VALIDATION_FIELD_MONGOID);
        }
      });
    }).bail(),
};
