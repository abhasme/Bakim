const { check, validationResult, body } = require('express-validator');
const { validatioErrorResponse } = require('../helpers/Response');
const { Users } = require("../models/UserModel");
const { Country } = require("../models/CountryModel");
const { City } = require("../models/CityModel");
const { Category } = require("../models/CategoryModel");
const { Service } = require("../models/ServiceModel");
const { Amenity } = require("../models/AmenityModel");
const { MembershipAddOn } = require("../models/MembershipAddOn");
const { Membership } = require("../models/MembershipModel");
const { Setting } = require("../models/SettingModel");
const { Award } = require("../models/AwardModel");
const { Product } = require("../models/ProductModel");
const { ServiceGroup } = require("../models/ServiceGroupModel");
const { Resource } = require("../models/ResourceModel");
const { GiftCard } = require("../models/GiftCardModel");
const { Cms } = require("../models/CmsModel");
const { Language } = require("../models/LanguageModel");
const { Voucher } = require("../models/VoucherModel");
const { SalonServices } = require("../models/SalonServiceModel");
const { Booking } = require("../models/BookingModel")
const translate = require('../locales/translate')
const { salonStatus, SourceStatus, scheduletype } = require('../config/data')
const { Discount } = require("../models/DiscountModel")
const { Client } = require("../models/ClientModel")
const { Package } = require("../models/PackageModel")
const { SalonServiceGroup } = require("../models/SalonServiceGroupModel")
const { Rota } = require("../models/RotaModel")

module.exports = {
    /*=========First Name Validation ==============*/
    REQUIRED_FIRSTNAME: check('firstName').trim().escape().not().isEmpty().withMessage((value, { req }) => {
        return translate[req.headers["x-language-key"]].VALIDATION_FIELD_REQUIRED;
    }).bail().isLength({ min: 3, max: 126 }).withMessage((value, { req }) => {
        return translate[req.headers["x-language-key"]].VALIDATION_FIELD_LENGTH_3TO126;
    }).bail().isString().withMessage((value, { req }) => {
        return translate[req.headers["x-language-key"]].VALIDATION_FIELD_STRING;
    }).bail(),
    /*=========Last Name Validation ==============*/
    REQUIRED_LASTNAME: check('lastName').trim().escape().not().isEmpty().withMessage((value, { req }) => {
        return translate[req.headers["x-language-key"]].VALIDATION_FIELD_REQUIRED;
    }).bail().isLength({ min: 3, max: 126 }).withMessage((value, { req }) => {
        return translate[req.headers["x-language-key"]].VALIDATION_FIELD_LENGTH_3TO126;
    }).bail().isString().withMessage((value, { req }) => {
        return translate[req.headers["x-language-key"]].VALIDATION_FIELD_STRING;
    }).bail(),
    /*=========Mobile Validation ==============*/
    REQUIRED_MOBILE: check('mobile').trim().escape().not().isEmpty().withMessage((value, { req }) => {
        return translate[req.headers["x-language-key"]].VALIDATION_FIELD_REQUIRED;
    }).bail().isLength({ min: 7, max: 12 }).withMessage((value, { req }) => {
        return translate[req.headers["x-language-key"]].VALIDATION_FIELD_PHONE_LENGTH;
    }).bail().isNumeric().withMessage((value, { req }) => {
        return translate[req.headers["x-language-key"]].VALIDATION_FIELD_NUMBER;
    }).bail(),
    /*== User Unique Mobile Validation  ===*/
    USER_UNIQUE_MOBILE: check('mobile').custom((value, { req }) => {
        return Users.findOne({ mobile: value, _id: { $nin: [req.params.id] } }).select('mobile').then((user) => {
            if (user) {
                return Promise.reject(translate[req.headers["x-language-key"]].VALIDATION_FIELD_EXISTS);
            }
        });
    }).bail(),
    /*=========Email Validation ==============*/
    REQUIRED_EMAIL: check('email').trim().escape().not().isEmpty().withMessage((value, { req }) => {
        return translate[req.headers["x-language-key"]].VALIDATION_FIELD_REQUIRED;
    }).bail().isLength({ min: 4, max: 256 }).withMessage((value, { req }) => {
        return translate[req.headers["x-language-key"]].VALIDATION_FIELD_LENGTH_3TO256;
    }).bail().isEmail().normalizeEmail().withMessage((value, { req }) => {
        return translate[req.headers["x-language-key"]].VALIDATION_FIELD_VALIDEMAIL;
    }).bail(),
    /*== User Unique Email Validation  ===*/
    USER_UNIQUE_EMAIL: check('email').custom((value, { req }) => {
        return Users.findOne({ email: value, _id: { $nin: [req.params.id] } }).select('email').then((user) => {
            if (user) {
                return Promise.reject(translate[req.headers["x-language-key"]].VALIDATION_FIELD_EXISTS);
            }
        });
    }).bail(),
    /*=========Address Validation ==============*/
    REQUIRED_ADDRESS: check('address').trim().escape().not().isEmpty().withMessage((value, { req }) => {
        return translate[req.headers["x-language-key"]].VALIDATION_FIELD_REQUIRED;
    }).bail().isLength({ min: 3, max: 126 }).withMessage((value, { req }) => {
        return translate[req.headers["x-language-key"]].VALIDATION_FIELD_LENGTH_3TO126;
    }).bail().isString().withMessage((value, { req }) => {
        return translate[req.headers["x-language-key"]].VALIDATION_FIELD_STRING;
    }).bail(),
    /*=========Country Validation ==============*/
    REQUIRED_COUNTRY_NAME: check('country').trim().escape().not().isEmpty().withMessage((value, { req }) => {
        return translate[req.headers["x-language-key"]].VALIDATION_FIELD_REQUIRED;
    }).bail().isLength({ min: 2, max: 126 }).withMessage((value, { req }) => {
        return translate[req.headers["x-language-key"]].VALIDATION_FIELD_LENGTH_3TO126;
    }).bail().isString().withMessage((value, { req }) => {
        return translate[req.headers["x-language-key"]].VALIDATION_FIELD_STRING;
    }).bail(),
    /*=========State Validation ==============*/
    REQUIRED_STATE_NAME: check('state').trim().escape().not().isEmpty().withMessage((value, { req }) => {
        return translate[req.headers["x-language-key"]].VALIDATION_FIELD_REQUIRED;
    }).bail().isLength({ min: 2, max: 126 }).withMessage((value, { req }) => {
        return translate[req.headers["x-language-key"]].VALIDATION_FIELD_LENGTH_3TO126;
    }).bail().isString().withMessage((value, { req }) => {
        return translate[req.headers["x-language-key"]].VALIDATION_FIELD_STRING;
    }).bail(),
    /*=========City Validation ==============*/
    REQUIRED_CITY_NAME: check('city').trim().escape().not().isEmpty().withMessage((value, { req }) => {
        return translate[req.headers["x-language-key"]].VALIDATION_FIELD_REQUIRED;
    }).bail().isLength({ min: 2, max: 126 }).withMessage((value, { req }) => {
        return translate[req.headers["x-language-key"]].VALIDATION_FIELD_LENGTH_3TO126;
    }).bail().isString().withMessage((value, { req }) => {
        return translate[req.headers["x-language-key"]].VALIDATION_FIELD_STRING;
    }).bail(),
    /*=========Postal Code Validation ==============*/
    REQUIRED_POSTALCODE: check('postalCode').trim().escape().not().isEmpty().withMessage((value, { req }) => {
        return translate[req.headers["x-language-key"]].VALIDATION_FIELD_REQUIRED;
    }).bail().isLength({ min: 3, max: 50 }).withMessage((value, { req }) => {
        return translate[req.headers["x-language-key"]].VALIDATION_FIELD_LENGTH_3TO256;
    }).bail(),
    //Required Start Date
    REQUIRED_START_DATE: check('startDate').trim().escape().not().isEmpty().withMessage((value, { req }) => {
        return translate[req.headers["x-language-key"]].VALIDATION_FIELD_REQUIRED;
    }).bail().isISO8601().withMessage((value, { req }) => {
        return translate[req.headers["x-language-key"]].VALIDATION_FIELD_DATE;
    }).bail(),
    //Required Start Date
    REQUIRED_END_DATE: check('endDate').trim().escape().not().isEmpty().withMessage((value, { req }) => {
        return translate[req.headers["x-language-key"]].VALIDATION_FIELD_REQUIRED;
    }).bail().isISO8601().withMessage((value, { req }) => {
        return translate[req.headers["x-language-key"]].VALIDATION_FIELD_DATE;
    }).bail(),
    //Required Price
    REQUIRED_PRICE: check('price').trim().escape().not().isEmpty().withMessage((value, { req }) => {
        return translate[req.headers["x-language-key"]].VALIDATION_FIELD_REQUIRED;
    }).bail().isNumeric().withMessage((value, { req }) => {
        return translate[req.headers["x-language-key"]].VALIDATION_FIELD_NUMBER;
    }).bail(),
    //Required Amount
    REQUIRED_MEMBERSHIP_AMOUNT: check('amount').trim().escape().not().isEmpty().withMessage((value, { req }) => {
        return translate[req.headers["x-language-key"]].VALIDATION_FIELD_REQUIRED;
    }).bail().isNumeric().withMessage((value, { req }) => {
        return translate[req.headers["x-language-key"]].VALIDATION_FIELD_NUMBER;
    }).bail(),
    //Required Description
    REQUIRED_DESCRIPTION: check('description').trim().escape().not().isEmpty().withMessage((value, { req }) => {
        return translate[req.headers["x-language-key"]].VALIDATION_FIELD_REQUIRED;
    }).bail().isLength({ min: 3, max: 1000 }).withMessage((value, { req }) => {
        return translate[req.headers["x-language-key"]].VALIDATION_FIELD_LENGTH_3TO1000;
    }).bail(),
    /*== Required Exist UserId Validation  ===*/
    REQUIRED_USERID: check('userid').trim().escape().not().isEmpty().withMessage((value, { req }) => {
        return translate[req.headers["x-language-key"]].VALIDATION_FIELD_REQUIRED;
    }).bail()
        .isMongoId().withMessage((value, { req }) => {
            return translate[req.headers["x-language-key"]].VALIDATION_FIELD_MONGOID;
        }).bail()
        .custom((value, { req }) => {
            return Users.findOne({ _id: value }).select('_id').then((user) => {
                if (!user) {
                    return Promise.reject(translate[req.headers["x-language-key"]].VALIDATION_FIELD_MONGOID);
                }
            });
        }).bail(),
    /*== Optional ExistUserId Validation  ===*/
    OPTIONAL_USERID: check('customerid').optional({ checkFalsy: true, nullable: true }).bail()
        .isMongoId().withMessage((value, { req }) => {
            return translate[req.headers["x-language-key"]].VALIDATION_FIELD_MONGOID;
        }).bail()
        .custom((value, { req }) => {
            return Users.findOne({ _id: value, userType: "User" }).select('_id').then((user) => {
                if (!user) {
                    return Promise.reject(translate[req.headers["x-language-key"]].VALIDATION_FIELD_MONGOID);
                }
            });
        }).bail(),
    /*== Required Exist Salonid Validation  ===*/
    REQUIRED_SALONID: check('salonid').trim().escape().not().isEmpty().withMessage((value, { req }) => {
        return translate[req.headers["x-language-key"]].VALIDATION_FIELD_REQUIRED;
    }).bail()
        .isMongoId().withMessage((value, { req }) => {
            return translate[req.headers["x-language-key"]].VALIDATION_FIELD_MONGOID;
        }).bail()
        .custom((value, { req }) => {
            return Users.findOne({ _id: value, userType: "Salon" }).select('_id').then((user) => {
                if (!user) {
                    return Promise.reject(translate[req.headers["x-language-key"]].VALIDATION_FIELD_MONGOID);
                }
            });
        }).bail(),
    /*== Optional Exist Salonid Validation  ===*/
    OPTIONAL_SALONID: check('salonid').optional({ checkFalsy: true, nullable: true }).bail()
        .isMongoId().withMessage((value, { req }) => {
            return translate[req.headers["x-language-key"]].VALIDATION_FIELD_MONGOID;
        }).bail()
        .custom((value, { req }) => {
            return Users.findOne({ _id: value, userType: "Salon" }).select('_id').then((user) => {
                if (!user) {
                    return Promise.reject(translate[req.headers["x-language-key"]].VALIDATION_FIELD_MONGOID);
                }
            });
        }).bail(),
    /*=========Email Validation ==============*/
    REQUIRED_SHOP_EMAIL: check('shopEmail').trim().escape().not().isEmpty().withMessage((value, { req }) => {
        return translate[req.headers["x-language-key"]].VALIDATION_FIELD_REQUIRED;
    }).bail().isLength({ min: 4, max: 256 }).withMessage((value, { req }) => {
        return translate[req.headers["x-language-key"]].VALIDATION_FIELD_LENGTH_3TO256;
    }).bail().isEmail().normalizeEmail().withMessage((value, { req }) => {
        return translate[req.headers["x-language-key"]].VALIDATION_FIELD_VALIDEMAIL;
    }).bail(),
    /*=========Shop Phone Validation ==============*/
    REQUIRED_STOP_PHONE: check('shopPhone').trim().escape().not().isEmpty().withMessage((value, { req }) => {
        return translate[req.headers["x-language-key"]].VALIDATION_FIELD_REQUIRED;
    }).bail().isLength({ min: 7, max: 12 }).withMessage((value, { req }) => {
        return translate[req.headers["x-language-key"]].VALIDATION_FIELD_PHONE_LENGTH;
    }).bail().isNumeric().withMessage((value, { req }) => {
        return translate[req.headers["x-language-key"]].VALIDATION_FIELD_NUMBER;
    }).bail(),
    /*== Optional ExistUserId Validation  ===*/
    OPTIONAL_NOTES: check('notes').optional({ checkFalsy: true, nullable: true }).bail()
        .isLength({ min: 1, max: 1000 }).withMessage((value, { req }) => {
            return translate[req.headers["x-language-key"]].VALIDATION_FIELD_LENGTH_3TO126;
        }).bail().isString().withMessage((value, { req }) => {
            return translate[req.headers["x-language-key"]].VALIDATION_FIELD_STRING;
        }).bail(),
    /*== Optional ExistUserId Validation  ===*/
    OPTIONAL_WEBSITE: check('website').optional({ checkFalsy: true, nullable: true }).bail()
        .isLength({ min: 3, max: 126 }).withMessage((value, { req }) => {
            return translate[req.headers["x-language-key"]].VALIDATION_FIELD_LENGTH_3TO126;
        }).bail().isString().withMessage((value, { req }) => {
            return translate[req.headers["x-language-key"]].VALIDATION_FIELD_STRING;
        }).bail(),
    /*=========Required Name Validation ==============*/
    REQUIRED_STRING_NAME: check('name').trim().escape().not().isEmpty().withMessage((value, { req }) => {
        return translate[req.headers["x-language-key"]].VALIDATION_FIELD_REQUIRED;
    }).bail().isLength({ min: 2, max: 126 }).withMessage((value, { req }) => {
        return translate[req.headers["x-language-key"]].VALIDATION_FIELD_LENGTH_3TO126;
    }).bail().isString().withMessage((value, { req }) => {
        return translate[req.headers["x-language-key"]].VALIDATION_FIELD_STRING;
    }).bail(),
    /*=========Required Code Validation ==============*/
    REQUIRED_STRING_CODE: check('code').trim().escape().not().isEmpty().withMessage((value, { req }) => {
        return translate[req.headers["x-language-key"]].VALIDATION_FIELD_REQUIRED;
    }).bail().isLength({ min: 2, max: 126 }).withMessage((value, { req }) => {
        return translate[req.headers["x-language-key"]].VALIDATION_FIELD_LENGTH_3TO126;
    }).bail().isString().withMessage((value, { req }) => {
        return translate[req.headers["x-language-key"]].VALIDATION_FIELD_STRING;
    }).bail(),
    /*=========Required Flag Validation ==============*/
    REQUIRED_STRING_FLAG: check('flag').trim().escape().not().isEmpty().withMessage((value, { req }) => {
        return translate[req.headers["x-language-key"]].VALIDATION_FIELD_REQUIRED;
    }).bail().isLength({ min: 2, max: 126 }).withMessage((value, { req }) => {
        return translate[req.headers["x-language-key"]].VALIDATION_FIELD_LENGTH_3TO126;
    }).bail().isString().withMessage((value, { req }) => {
        return translate[req.headers["x-language-key"]].VALIDATION_FIELD_STRING;
    }).bail(),
    /*=========Required Domain Validation ==============*/
    REQUIRED_STRING_DOMAIN: check('domain').trim().escape().not().isEmpty().withMessage((value, { req }) => {
        return translate[req.headers["x-language-key"]].VALIDATION_FIELD_REQUIRED;
    }).bail().isLength({ min: 2, max: 126 }).withMessage((value, { req }) => {
        return translate[req.headers["x-language-key"]].VALIDATION_FIELD_LENGTH_3TO126;
    }).bail().isString().withMessage((value, { req }) => {
        return translate[req.headers["x-language-key"]].VALIDATION_FIELD_STRING;
    }).bail(),
    /*=========Required Numeric Code Validation ==============*/
    REQUIRED_STRING_NUMERIC_CODE: check('numericCode').trim().escape().not().isEmpty().withMessage((value, { req }) => {
        return translate[req.headers["x-language-key"]].VALIDATION_FIELD_REQUIRED;
    }).bail()
        .isLength({ min: 1, max: 8 }).withMessage((value, { req }) => {
            return translate[req.headers["x-language-key"]].VALIDATION_FIELD_PHONE_LENGTH;
        }).bail()
        .isNumeric().withMessage((value, { req }) => {
            return translate[req.headers["x-language-key"]].VALIDATION_FIELD_NUMBER;
        }).bail(),
    /*=========Unique Country Name Validation ==============*/
    UNIQUE_COUNTRY_NAME: check('name').custom((value, { req }) => {
        return Country.findOne({ name: value, _id: { $nin: [req.params.id] } }).select('name').then((country) => {
            if (country) {
                return Promise.reject(translate[req.headers["x-language-key"]].VALIDATION_FIELD_EXISTS);
            }
        });
    }).bail(),
    /*=========Unique City Name Validation ==============*/
    UNIQUE_CITY_NAME: check('name').custom((value, { req }) => {
        return City.findOne({ name: value, _id: { $nin: [req.params.id] } }).select('name').then((city) => {
            if (city) {
                return Promise.reject(translate[req.headers["x-language-key"]].VALIDATION_FIELD_EXISTS);
            }
        });
    }).bail(),
    /*=========Required Country id Validation ==============*/
    REQUIRED_COUNTRY_ID_EXIST: check('country_id').trim().escape().not().isEmpty().withMessage((value, { req }) => {
        return translate[req.headers["x-language-key"]].VALIDATION_FIELD_REQUIRED;
    }).bail()
        .isMongoId().withMessage((value, { req }) => {
            return translate[req.headers["x-language-key"]].VALIDATION_FIELD_MONGOID;
        }).bail()
        .custom((value, { req }) => {
            return Country.findOne({ _id: value }).select('_id').then((country) => {
                if (!country) {
                    return Promise.reject(translate[req.headers["x-language-key"]].VALIDATION_FIELD_MONGOID);
                }
            });
        }).bail(),
    /*=========Required State id Validation (Not Working)==============*/
    REQUIRED_STATE_ID_EXIST: check('stateid').trim().escape().not().isEmpty().withMessage((value, { req }) => { //incomplete
        return translate[req.headers["x-language-key"]].VALIDATION_FIELD_REQUIRED;
    }).bail()
        .isMongoId().withMessage((value, { req }) => {
            return translate[req.headers["x-language-key"]].VALIDATION_FIELD_MONGOID;
        }).bail()
        .custom((value, { req }) => {
            // return Country.findOne({ "states._id": value, _id: req.body.country }).select('states._id').then((state) => { //"portfolio._id": req.body.workid
            return Country.findOne({ "states._id": req.body.stateid }).select('states._id').then((state) => { //"portfolio._id": req.body.workid
                if (!state) {
                    return Promise.reject(translate[req.headers["x-language-key"]].VALIDATION_FIELD_MONGOID);
                }
            });
        }).bail(),
    /*=========Required Social Type Validation ==============*/
    REQUIRED_SALON_STATUS: check('status').trim().escape().not().isEmpty().withMessage((value, { req }) => {
        return translate[req.headers["x-language-key"]].VALIDATION_FIELD_REQUIRED;
    }).bail()
        .isIn(salonStatus).withMessage((value, { req }) => {
            return translate[req.headers["x-language-key"]].VALIDATION_FIELD_SALON_STATUS;
        }).bail(),

    /*=========Required Image Validation ==============*/
    REQUIRED_STRING_IMAGE: check('image').trim().escape().not().isEmpty().withMessage((value, { req }) => {
        return translate[req.headers["x-language-key"]].VALIDATION_FIELD_REQUIRED;
    }).bail().isLength({ min: 2, max: 126 }).withMessage((value, { req }) => {
        return translate[req.headers["x-language-key"]].VALIDATION_FIELD_LENGTH_3TO126;
    }).bail().isString().withMessage((value, { req }) => {
        return translate[req.headers["x-language-key"]].VALIDATION_FIELD_STRING;
    }).bail(),
    /*=========Required Category Id Validation ==============*/
    REQUIRED_CATEGORY_ID_EXIST: check('categoryid').trim().escape().not().isEmpty().withMessage((value, { req }) => {
        return translate[req.headers["x-language-key"]].VALIDATION_FIELD_REQUIRED;
    }).bail()
        .isMongoId().withMessage((value, { req }) => {
            return translate[req.headers["x-language-key"]].VALIDATION_FIELD_MONGOID;
        }).bail()
        .custom((value, { req }) => {
            return Category.findOne({ _id: value }).select('_id').then((category) => {
                if (!category) {
                    return Promise.reject(translate[req.headers["x-language-key"]].VALIDATION_FIELD_MONGOID);
                }
            });
        }).bail(),
    /*=========Required Service Id Validation ==============*/
    REQUIRED_SERVICE_ID_EXIST: check('serviceid').trim().escape().not().isEmpty().withMessage((value, { req }) => {
        return translate[req.headers["x-language-key"]].VALIDATION_FIELD_REQUIRED;
    }).bail()
        .isMongoId().withMessage((value, { req }) => {
            return translate[req.headers["x-language-key"]].VALIDATION_FIELD_MONGOID;
        }).bail()
        .custom((value, { req }) => {
            return Service.findOne({ _id: value }).select('_id').then((service) => {
                if (!service) {
                    return Promise.reject(translate[req.headers["x-language-key"]].VALIDATION_FIELD_MONGOID);
                }
            });
        }).bail(),
    /*=========Unique Category Name Validation ==============*/
    UNIQUE_CATEGORY_NAME: check('name').custom((value, { req }) => {
        return Category.findOne({ name: value, _id: { $nin: [req.params.id] } }).select('name').then((category) => {
            if (category) {
                return Promise.reject(translate[req.headers["x-language-key"]].VALIDATION_FIELD_EXISTS);
            }
        });
    }).bail(),
    /*=========Unique Service Name Validation ==============*/
    UNIQUE_SERVICE_NAME: check('name').custom((value, { req }) => {
        return Service.findOne({ name: value, _id: { $nin: [req.params.id] } }).select('name').then((service) => {
            if (service) {
                return Promise.reject(translate[req.headers["x-language-key"]].VALIDATION_FIELD_EXISTS);
            }
        });
    }).bail(),
    /*=========Check Work Id Validation ==============*/
    REQUIRED_WORK_ID_EXIST: check('workid').trim().escape().not().isEmpty().withMessage((value, { req }) => {
        return translate[req.headers["x-language-key"]].VALIDATION_FIELD_REQUIRED;
    }).bail()
        .isMongoId().withMessage((value, { req }) => {
            return translate[req.headers["x-language-key"]].VALIDATION_FIELD_MONGOID;
        }).bail()
        .custom((value, { req }) => {
            return Users.findOne({ "portfolio._id": req.body.workid }).select('portfolio._id').then((work) => {
                if (!work) {
                    return Promise.reject(translate[req.headers["x-language-key"]].VALIDATION_FIELD_MONGOID);
                }
            });
        }).bail(),
    /*=========Required City Id Validation ==============*/
    REQUIRED_CITY_ID_EXIST: check('cityid').trim().escape().not().isEmpty().withMessage((value, { req }) => {
        return translate[req.headers["x-language-key"]].VALIDATION_FIELD_REQUIRED;
    }).bail()
        .isMongoId().withMessage((value, { req }) => {
            return translate[req.headers["x-language-key"]].VALIDATION_FIELD_MONGOID;
        }).bail()
        .custom((value, { req }) => {
            return City.findOne({ _id: value }).select('_id').then((city) => {
                if (!city) {
                    return Promise.reject(translate[req.headers["x-language-key"]].VALIDATION_FIELD_MONGOID);
                }
            });
        }).bail(),
    /*=========Required Active Field Validation ==============*/
    REQUIRED_ACTIVE_FIELD: check('active').trim().escape().not().isEmpty().withMessage((value, { req }) => {
        return translate[req.headers["x-language-key"]].VALIDATION_FIELD_REQUIRED;
    }).bail(),
    /*=========Required Aminity id Validation ==============*/
    REQUIRED_AMENITY_ID_EXIST: check('amenityid').trim().escape().not().isEmpty().withMessage((value, { req }) => {
        return translate[req.headers["x-language-key"]].VALIDATION_FIELD_REQUIRED;
    }).bail()
        .isMongoId().withMessage((value, { req }) => {
            return translate[req.headers["x-language-key"]].VALIDATION_FIELD_MONGOID;
        }).bail()
        .custom((value, { req }) => {
            return Amenity.findOne({ _id: value }).select('_id').then((amenity) => {
                if (!amenity) {
                    return Promise.reject(translate[req.headers["x-language-key"]].VALIDATION_FIELD_MONGOID);
                }
            });
        }).bail(),
    //Required Title Validation
    REQUIRED_TITLE: check('title').trim().escape().not().isEmpty().withMessage((value, { req }) => {
        return translate[req.headers["x-language-key"]].VALIDATION_FIELD_REQUIRED;
    }).bail().isLength({ min: 3, max: 1000 }).withMessage((value, { req }) => {
        return translate[req.headers["x-language-key"]].VALIDATION_FIELD_LENGTH_3TO1000;
    }).bail(),
    /*== Required bOOKING sETTING iD Validation  ===*/
    REQUIRED_BOOKING_SETTING_ID: check('bookingsettingid').trim().escape().not().isEmpty().withMessage((value, { req }) => {
        return translate[req.headers["x-language-key"]].VALIDATION_FIELD_REQUIRED;
    }).bail()
        .isMongoId().withMessage((value, { req }) => {
            return translate[req.headers["x-language-key"]].VALIDATION_FIELD_MONGOID;
        }).bail()
        .custom((value, { req }) => {
            return Setting.findOne({ _id: value }).select('_id').then((setting) => {
                if (!setting) {
                    return Promise.reject(translate[req.headers["x-language-key"]].VALIDATION_FIELD_MONGOID);
                }
            });
        }).bail(),
    /*== Required Award ID Validation  ===*/
    REQUIRED_AWARD_ID: check('awardid').trim().escape().not().isEmpty().withMessage((value, { req }) => {
        return translate[req.headers["x-language-key"]].VALIDATION_FIELD_REQUIRED;
    }).bail()
        .isMongoId().withMessage((value, { req }) => {
            return translate[req.headers["x-language-key"]].VALIDATION_FIELD_MONGOID;
        }).bail()
        .custom((value, { req }) => {
            return Award.findOne({ _id: value }).select('_id').then((setting) => {
                if (!setting) {
                    return Promise.reject(translate[req.headers["x-language-key"]].VALIDATION_FIELD_MONGOID);
                }
            });
        }).bail(),
    /*== Required Saloon Product ID Validation  ===*/
    REQUIRED_PRODUCT_ID: check('productid').trim().escape().not().isEmpty().withMessage((value, { req }) => {
        return translate[req.headers["x-language-key"]].VALIDATION_FIELD_REQUIRED;
    }).bail()
        .isMongoId().withMessage((value, { req }) => {
            return translate[req.headers["x-language-key"]].VALIDATION_FIELD_MONGOID;
        }).bail()
        .custom((value, { req }) => {
            return Product.findOne({ _id: value }).select('_id').then((product) => {
                if (!product) {
                    return Promise.reject(translate[req.headers["x-language-key"]].VALIDATION_FIELD_MONGOID);
                }
            });
        }).bail(),
    /*=========Required Stock Validation ==============*/
    REQUIRED_STOCK: check('stock').trim().escape().not().isEmpty().withMessage((value, { req }) => {
        return translate[req.headers["x-language-key"]].VALIDATION_FIELD_REQUIRED;
    }).bail()
        .isLength({ min: 1, max: 8 }).withMessage((value, { req }) => {
            return translate[req.headers["x-language-key"]].VALIDATION_FIELD_PHONE_LENGTH;
        }).bail()
        .isNumeric().withMessage((value, { req }) => {
            return translate[req.headers["x-language-key"]].VALIDATION_FIELD_NUMBER;
        }).bail(),

    /*== Required Service Group ID Validation  ===*/
    REQUIRED_SERVICEGROUP_ID: check('servicegroupid').trim().escape().not().isEmpty().withMessage((value, { req }) => {
        return translate[req.headers["x-language-key"]].VALIDATION_FIELD_REQUIRED;
    }).bail()
        .isMongoId().withMessage((value, { req }) => {
            return translate[req.headers["x-language-key"]].VALIDATION_FIELD_MONGOID;
        }).bail()
        .custom((value, { req }) => {
            return ServiceGroup.findOne({ _id: value }).select('_id').then((product) => {
                if (!product) {
                    return Promise.reject(translate[req.headers["x-language-key"]].VALIDATION_FIELD_MONGOID);
                }
            });
        }).bail(),

    /*== Required Employee Id Validation  ===*/
    REQUIRED_EMPLOYEEID: check('employeeid').trim().escape().not().isEmpty().withMessage((value, { req }) => {
        return translate[req.headers["x-language-key"]].VALIDATION_FIELD_REQUIRED;
    }).bail()
        .isMongoId().withMessage((value, { req }) => {
            return translate[req.headers["x-language-key"]].VALIDATION_FIELD_MONGOID;
        }).bail()
        .custom((value, { req }) => {
            return ServiceGroup.findOne({ _id: value }).select('_id').then((product) => {
                if (!product) {
                    return Promise.reject(translate[req.headers["x-language-key"]].VALIDATION_FIELD_MONGOID);
                }
            });
        }).bail(),
    // }).bail(),

    /*== Required Employee Id Validation  ===*/
    REQUIRED_EMPLOYEEID: check('employeeid').trim().escape().not().isEmpty().withMessage((value, { req }) => {
        return translate[req.headers["x-language-key"]].VALIDATION_FIELD_REQUIRED;
    }).bail()
        .isMongoId().withMessage((value, { req }) => {
            return translate[req.headers["x-language-key"]].VALIDATION_FIELD_MONGOID;
        }).bail()
        .custom((value, { req }) => {
            return Users.findOne({ _id: value, userType: "Employee" }).select('_id').then((user) => {
                if (!user) {
                    return Promise.reject(translate[req.headers["x-language-key"]].VALIDATION_FIELD_MONGOID);
                }
            });
        }).bail(),
    /*========= About Us OR Short Bio Validation ==============*/
    REQUIRED_ABOUTUS_OR_SHORTBIO: check('aboutUs').trim().escape().not().isEmpty().withMessage((value, { req }) => {
        return translate[req.headers["x-language-key"]].VALIDATION_FIELD_REQUIRED;
    }).bail().isLength({ min: 3, max: 126 }).withMessage((value, { req }) => {
        return translate[req.headers["x-language-key"]].VALIDATION_FIELD_LENGTH_3TO126;
    }).bail().isString().withMessage((value, { req }) => {
        return translate[req.headers["x-language-key"]].VALIDATION_FIELD_STRING;
    }).bail(),
    /*========= Job Title Validation ==============*/
    REQUIRED_JOBTITLE: check('jobTitle').trim().escape().not().isEmpty().withMessage((value, { req }) => {
        return translate[req.headers["x-language-key"]].VALIDATION_FIELD_REQUIRED;
    }).bail().isLength({ min: 3, max: 126 }).withMessage((value, { req }) => {
        return translate[req.headers["x-language-key"]].VALIDATION_FIELD_LENGTH_3TO126;
    }).bail().isString().withMessage((value, { req }) => {
        return translate[req.headers["x-language-key"]].VALIDATION_FIELD_STRING;
    }).bail(),
    /*=========Required Resource ID Validation ==============*/
    REQUIRED_RESOURCE_ID: check('resourceid').trim().escape().not().isEmpty().withMessage((value, { req }) => {
        return translate[req.headers["x-language-key"]].VALIDATION_FIELD_REQUIRED;
    }).bail()
        .isMongoId().withMessage((value, { req }) => {
            return translate[req.headers["x-language-key"]].VALIDATION_FIELD_MONGOID;
        }).bail()
        .custom((value, { req }) => {
            return Resource.findOne({ _id: value }).select('_id').then((resource) => {
                if (!resource) {
                    return Promise.reject(translate[req.headers["x-language-key"]].VALIDATION_FIELD_MONGOID);
                }
            });
        }).bail(),
    /*=========Unique Service Name Validation ==============*/
    UNIQUE_RESOURCE_NAME: check('name').custom((value, { req }) => {
        return Resource.findOne({ name: value, salonid: { $in: [req.body.salonid ? req.body.salonid : req.user._id] } }).select('name').then((resource) => {
            if (resource) {
                return Promise.reject(translate[req.headers["x-language-key"]].VALIDATION_FIELD_EXISTS);
            }
        });
    }).bail(),

    /*========= Require Quantity Validation ==============*/
    REQUIRED_QUANTITY: check('quantity').trim().escape().not().isEmpty().withMessage((value, { req }) => {
        return translate[req.headers["x-language-key"]].VALIDATION_FIELD_REQUIRED;
    }).bail().isNumeric().withMessage((value, { req }) => {
        return translate[req.headers["x-language-key"]].VALIDATION_FIELD_NUMBER;
    }).bail(),
    /*=========Required Resource ID Validation ==============*/
    REQUIRED_RESOURCE_ID: check('resourceid').trim().escape().not().isEmpty().withMessage((value, { req }) => {
        return translate[req.headers["x-language-key"]].VALIDATION_FIELD_REQUIRED;
    }).bail().isMongoId().withMessage((value, { req }) => {
        return translate[req.headers["x-language-key"]].VALIDATION_FIELD_MONGOID;
    }).bail().custom((value, { req }) => {
        return Resource.findOne({ _id: value }).select('_id').then((resource) => {
            if (!resource) {
                return Promise.reject(translate[req.headers["x-language-key"]].VALIDATION_FIELD_MONGOID);
            }
        });
    }).bail(),

    /*== Required Employee Id Validation  ===*/
    REQUIRED_EMPLOYEEID: check('employeeid').trim().escape().not().isEmpty().withMessage((value, { req }) => {
        return translate[req.headers["x-language-key"]].VALIDATION_FIELD_REQUIRED;
    }).bail()
        .isMongoId().withMessage((value, { req }) => {
            return translate[req.headers["x-language-key"]].VALIDATION_FIELD_MONGOID;
        }).bail()
        .custom((value, { req }) => {
            return Users.findOne({ _id: value, userType: "Employee" }).select('_id').then((user) => {
                if (!user) {
                    return Promise.reject(translate[req.headers["x-language-key"]].VALIDATION_FIELD_MONGOID);
                }
            });
        }).bail(),
    /*=========Bussiness Email Validation ==============*/
    REQUIRED_BUSSINESSEMAIL: check('bussinessEmail').trim().escape().not().isEmpty().withMessage((value, { req }) => {
        return translate[req.headers["x-language-key"]].VALIDATION_FIELD_REQUIRED;
    }).bail().isLength({ min: 4, max: 256 }).withMessage((value, { req }) => {
        return translate[req.headers["x-language-key"]].VALIDATION_FIELD_LENGTH_3TO256;
    }).bail().isEmail().normalizeEmail().withMessage((value, { req }) => {
        return translate[req.headers["x-language-key"]].VALIDATION_FIELD_VALIDEMAIL;
    }).bail(),

    /*=========Bussiness Phone Validation ==============*/
    REQUIRED_BUSSINESSPHONE: check('bussinessPhone').trim().escape().not().isEmpty().withMessage((value, { req }) => {
        return translate[req.headers["x-language-key"]].VALIDATION_FIELD_REQUIRED;
    }).bail().isLength({ min: 7, max: 12 }).withMessage((value, { req }) => {
        return translate[req.headers["x-language-key"]].VALIDATION_FIELD_PHONE_LENGTH;
    }).bail().isNumeric().withMessage((value, { req }) => {
        return translate[req.headers["x-language-key"]].VALIDATION_FIELD_NUMBER;
    }).bail(),
    /*========= First Name Validation ==============*/
    REQUIRED_CONTACTPERSION: check('contactPersion').trim().escape().not().isEmpty().withMessage((value, { req }) => {
        return translate[req.headers["x-language-key"]].VALIDATION_FIELD_REQUIRED;
    }).bail().isLength({ min: 3, max: 126 }).withMessage((value, { req }) => {
        return translate[req.headers["x-language-key"]].VALIDATION_FIELD_LENGTH_3TO126;
    }).bail().isString().withMessage((value, { req }) => {
        return translate[req.headers["x-language-key"]].VALIDATION_FIELD_STRING;
    }).bail(),

    /*=========Required Business Type Validation ==============*/
    REQUIRED_SALON_BUSINESS_TYPE: check('businessType').trim().escape().not().isEmpty().withMessage((value, { req }) => {
        return translate[req.headers["x-language-key"]].VALIDATION_FIELD_REQUIRED;
    }).bail()
        .isIn(['Shop', 'Mobile', 'Home']).withMessage((value, { req }) => {
            return translate[req.headers["x-language-key"]].VALIDATION_FIELD_STRING;
        }).bail()
        .isString().withMessage((value, { req }) => {
            return translate[req.headers["x-language-key"]].VALIDATION_FIELD_STRING;
        }).bail(),
    /*========= Required Code Validation ==============*/
    REQUIRED_NUMERIC_CODE: check('code').trim().escape().not().isEmpty().withMessage((value, { req }) => {
        return translate[req.headers["x-language-key"]].VALIDATION_FIELD_REQUIRED;
    }).bail()
        .isLength({ min: 1, max: 8 }).withMessage((value, { req }) => {
            return translate[req.headers["x-language-key"]].VALIDATION_FIELD_PHONE_LENGTH;
        }).bail()
        .isNumeric().withMessage((value, { req }) => {
            return translate[req.headers["x-language-key"]].VALIDATION_FIELD_NUMBER;
        }).bail(),
    /*========= Benifit Number Validation ==============*/
    REQUIRED_BENIFIT: check('benifit').trim().escape().not().isEmpty().withMessage((value, { req }) => {
        return translate[req.headers["x-language-key"]].VALIDATION_FIELD_REQUIRED;
    }).bail().isLength({ min: 1, max: 126 }).withMessage((value, { req }) => {
        return translate[req.headers["x-language-key"]].VALIDATION_FIELD_LENGTH_3TO126;
    }).bail().isString().withMessage((value, { req }) => {
        return translate[req.headers["x-language-key"]].VALIDATION_FIELD_STRING;
    }).bail(),
    /*=========Required Aminity id Validation ==============*/
    REQUIRED_GIFTCARD_ID_EXIST: check('giftid').trim().escape().not().isEmpty().withMessage((value, { req }) => {
        return translate[req.headers["x-language-key"]].VALIDATION_FIELD_REQUIRED;
    }).bail()
        .isMongoId().withMessage((value, { req }) => {
            return translate[req.headers["x-language-key"]].VALIDATION_FIELD_MONGOID;
        }).bail()
        .custom((value, { req }) => {
            return GiftCard.findOne({ _id: value }).select('_id').then((gift) => {
                if (!gift) {
                    return Promise.reject(translate[req.headers["x-language-key"]].VALIDATION_FIELD_MONGOID);
                }
            });
        }).bail(),
    //Required Policy
    REQUIRED_TERMSPOLICY: check('acceptTermsPolicy').trim().escape().not().isEmpty().withMessage((value, { req }) => {
        return translate[req.headers["x-language-key"]].VALIDATION_FIELD_REQUIRED;
    }).bail().isBoolean().withMessage((value, { req }) => {
        return translate[req.headers["x-language-key"]].VALIDATION_FIELD_BOOLEAN;
    }).bail(),
    REQUIRED_MARKETINGEMAIL: check('acceptMarketingEmail').trim().escape().not().isEmpty().withMessage((value, { req }) => {
        return translate[req.headers["x-language-key"]].VALIDATION_FIELD_REQUIRED;
    }).bail().isBoolean().withMessage((value, { req }) => {
        return translate[req.headers["x-language-key"]].VALIDATION_FIELD_BOOLEAN;
    }).bail(),
    /*========= Employees Validation ==============*/
    REQUIRED_EMPLOYEE_STRING: check('employees').trim().escape().not().isEmpty().withMessage((value, { req }) => {
        return translate[req.headers["x-language-key"]].VALIDATION_FIELD_REQUIRED;
    }).bail().isLength({ min: 1, max: 126 }).withMessage((value, { req }) => {
        return translate[req.headers["x-language-key"]].VALIDATION_FIELD_LENGTH_3TO126;
    }).bail().isString().withMessage((value, { req }) => {
        return translate[req.headers["x-language-key"]].VALIDATION_FIELD_STRING;
    }).bail(),

    /*=========Required Name Validation ==============*/
    REQUIRED_PAGENAME: check('pageName').trim().escape().not().isEmpty().withMessage((value, { req }) => {
        return translate[req.headers["x-language-key"]].VALIDATION_FIELD_REQUIRED;
    }).bail().isLength({ min: 2, max: 126 }).withMessage((value, { req }) => {
        return translate[req.headers["x-language-key"]].VALIDATION_FIELD_LENGTH_3TO126;
    }).bail().isString().withMessage((value, { req }) => {
        return translate[req.headers["x-language-key"]].VALIDATION_FIELD_STRING;
    }).bail(),
    /*=========Required Name Validation ==============*/
    REQUIRED_CONTENT: check('content').trim().escape().not().isEmpty().withMessage((value, { req }) => {
        return translate[req.headers["x-language-key"]].VALIDATION_FIELD_REQUIRED;
    }).bail().isString().withMessage((value, { req }) => {
        return translate[req.headers["x-language-key"]].VALIDATION_FIELD_STRING;
    }).bail(),
    /*=========Required CMS id Validation ==============*/
    REQUIRED_CMS_ID_EXIST: check('cmsid').trim().escape().not().isEmpty().withMessage((value, { req }) => {
        return translate[req.headers["x-language-key"]].VALIDATION_FIELD_REQUIRED;
    }).bail()
        .isMongoId().withMessage((value, { req }) => {
            return translate[req.headers["x-language-key"]].VALIDATION_FIELD_MONGOID;
        }).bail()
        .custom((value, { req }) => {
            return Cms.findOne({ _id: value }).select('_id').then((cms) => {
                if (!cms) {
                    return Promise.reject(translate[req.headers["x-language-key"]].VALIDATION_FIELD_MONGOID);
                }
            });
        }).bail(),
    /*=========Required Membership Id Validation ==============*/
    REQUIRED_MEMBERSHIP_ID_EXIST: check('interestedmembershipid').trim().escape().not().isEmpty().withMessage((value, { req }) => {
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
    /*=========Required Name Validation ==============*/
    REQUIRED_STRING_LANGUAGE_NAME: check('name').trim().escape().not().isEmpty().withMessage((value, { req }) => {
        return translate[req.headers["x-language-key"]].VALIDATION_FIELD_REQUIRED;
    }).bail().isLength({ min: 2, max: 126 }).withMessage((value, { req }) => {
        return translate[req.headers["x-language-key"]].VALIDATION_FIELD_LENGTH_3TO126;
    }).bail().isString().withMessage((value, { req }) => {
        return translate[req.headers["x-language-key"]].VALIDATION_FIELD_STRING;
    }).bail(),
    /*=========Required LANGUAGE id Validation ==============*/
    REQUIRED_LANGUAGE_ID_EXIST: check('languageid').trim().escape().not().isEmpty().withMessage((value, { req }) => {
        return translate[req.headers["x-language-key"]].VALIDATION_FIELD_REQUIRED;
    }).bail()
        .isMongoId().withMessage((value, { req }) => {
            return translate[req.headers["x-language-key"]].VALIDATION_FIELD_MONGOID;
        }).bail()
        .custom((value, { req }) => {
            return Language.findOne({ _id: value }).select('_id').then((language) => {
                if (!language) {
                    return Promise.reject(translate[req.headers["x-language-key"]].VALIDATION_FIELD_MONGOID);
                }
            });
        }).bail(),
    /*========= Required Discount id Validation ==============*/
    REQUIRED_DISCOUNT: check('discount').trim().escape().not().isEmpty().withMessage((value, { req }) => {
        return translate[req.headers["x-language-key"]].VALIDATION_FIELD_REQUIRED;
    }).bail().isNumeric().withMessage((value, { req }) => {
        return translate[req.headers["x-language-key"]].VALIDATION_FIELD_NUMBER;
    }).bail(),
    /*========= Required Date id Validation ==============*/
    REQUIRED_START_DATE: check('statrtDate').trim().escape().not().isEmpty().withMessage((value, { req }) => {
        return translate[req.headers["x-language-key"]].VALIDATION_FIELD_REQUIRED;
    }).bail().isString().withMessage((value, { req }) => {
        return translate[req.headers["x-language-key"]].VALIDATION_FIELD_NUMBER;
    }).bail(),
    /*========= Required Date id Validation ==============*/
    REQUIRED_END_DATE: check('endDate').trim().escape().not().isEmpty().withMessage((value, { req }) => {
        return translate[req.headers["x-language-key"]].VALIDATION_FIELD_REQUIRED;
    }).bail().isString().withMessage((value, { req }) => {
        return translate[req.headers["x-language-key"]].VALIDATION_FIELD_NUMBER;
    }).bail(),
    /*========= Required Date id Validation ==============*/
    REQUIRED_VOUCHER_ID: check('voucherid').trim().escape().not().isEmpty().withMessage((value, { req }) => {
        return translate[req.headers["x-language-key"]].VALIDATION_FIELD_REQUIRED;
    }).bail()
        .isMongoId().withMessage((value, { req }) => {
            return translate[req.headers["x-language-key"]].VALIDATION_FIELD_MONGOID;
        }).bail()
        .custom((value, { req }) => {
            return Voucher.findOne({ _id: value }).select('_id').then((voucher) => {
                if (!voucher) {
                    return Promise.reject(translate[req.headers["x-language-key"]].VALIDATION_FIELD_MONGOID);
                }
            });
        }).bail(),

    /*=========Required Setting Notification Validation ==============*/

    REQUIRED_NOTIFICATION_SETTING_ID: check('notificationsettingid').trim().escape().not().isEmpty().withMessage((value, { req }) => {
        return translate[req.headers["x-language-key"]].VALIDATION_FIELD_REQUIRED;
    }).bail()
        .isMongoId().withMessage((value, { req }) => {
            return translate[req.headers["x-language-key"]].VALIDATION_FIELD_MONGOID;
        }).bail()
        .custom((value, { req }) => {
            return Setting.findOne({ _id: value }).select('_id').then((setting) => {
                if (!setting) {
                    return Promise.reject(translate[req.headers["x-language-key"]].VALIDATION_FIELD_MONGOID);
                }
            });
        }).bail(),

    REQUIRED_RECEVICE_TEXT_MESSAGE: check('receviceTextMessage').trim().escape().not().isEmpty().withMessage((value, { req }) => {
        return translate[req.headers["x-language-key"]].VALIDATION_FIELD_REQUIRED;
    }).bail().isBoolean().withMessage((value, { req }) => {
        return translate[req.headers["x-language-key"]].VALIDATION_FIELD_BOOLEAN;
    }).bail(),

    REQUIRED_RECEVICE_EMAIL_MESSAGE: check('receviceEmailMessage').trim().escape().not().isEmpty().withMessage((value, { req }) => {
        return translate[req.headers["x-language-key"]].VALIDATION_FIELD_REQUIRED;
    }).bail().isBoolean().withMessage((value, { req }) => {
        return translate[req.headers["x-language-key"]].VALIDATION_FIELD_BOOLEAN;
    }).bail(),

    REQUIRED_RECEVICE_BOOKING_MESSAGE: check('booking').trim().escape().not().isEmpty().withMessage((value, { req }) => {
        return translate[req.headers["x-language-key"]].VALIDATION_FIELD_REQUIRED;
    }).bail().isBoolean().withMessage((value, { req }) => {
        return translate[req.headers["x-language-key"]].VALIDATION_FIELD_BOOLEAN;
    }).bail(),

    REQUIRED_RECEVICE_CHANGE_CALENDAR_MESSAGE: check('changeCalendar').trim().escape().not().isEmpty().withMessage((value, { req }) => {
        return translate[req.headers["x-language-key"]].VALIDATION_FIELD_REQUIRED;
    }).bail().isBoolean().withMessage((value, { req }) => {
        return translate[req.headers["x-language-key"]].VALIDATION_FIELD_BOOLEAN;
    }).bail(),

    REQUIRED_RECEVICE_REVIEW_ONPOST_MESSAGE: check('reviewOnPost').trim().escape().not().isEmpty().withMessage((value, { req }) => {
        return translate[req.headers["x-language-key"]].VALIDATION_FIELD_REQUIRED;
    }).bail().isBoolean().withMessage((value, { req }) => {
        return translate[req.headers["x-language-key"]].VALIDATION_FIELD_BOOLEAN;
    }).bail(),

    REQUIRED_RECEVICE_BEFORE_APPOINMENT_MESSAGE: check('beforeAppointment').trim().escape().not().isEmpty().withMessage((value, { req }) => {
        return translate[req.headers["x-language-key"]].VALIDATION_FIELD_REQUIRED;
    }).bail().isBoolean().withMessage((value, { req }) => {
        return translate[req.headers["x-language-key"]].VALIDATION_FIELD_BOOLEAN;
    }).bail(),
    /*== Required Salon ID Validation  ===*/
    REQUIRED_SALON_SERVICE_ID: check('salonserviceid').trim().escape().not().isEmpty().withMessage((value, { req }) => {
        return translate[req.headers["x-language-key"]].VALIDATION_FIELD_REQUIRED;
    }).bail()
        .isMongoId().withMessage((value, { req }) => {
            return translate[req.headers["x-language-key"]].VALIDATION_FIELD_MONGOID;
        }).bail()
        .custom((value, { req }) => {
            return SalonServices.findOne({ serviceid: value }).select('serviceid').then((salonservices) => {
                if (!salonservices) {
                    return Promise.reject(translate[req.headers["x-language-key"]].VALIDATION_FIELD_MONGOID);
                }
            });
        }).bail(),

    //Required Restriction
    REQUIRED_RESTRICTIONS: check('restriction').trim().escape().not().isEmpty().withMessage((value, { req }) => {
        return translate[req.headers["x-language-key"]].VALIDATION_FIELD_REQUIRED;
    }).bail().isLength({ min: 3, max: 1000 }).withMessage((value, { req }) => {
        return translate[req.headers["x-language-key"]].VALIDATION_FIELD_LENGTH_3TO1000;
    }).bail(),

    //Required Restriction
    REQUIRED_GOOD_TO_KNOW: check('goodToKnow').trim().escape().not().isEmpty().withMessage((value, { req }) => {
        return translate[req.headers["x-language-key"]].VALIDATION_FIELD_REQUIRED;
    }).bail().isLength({ min: 3, max: 1000 }).withMessage((value, { req }) => {
        return translate[req.headers["x-language-key"]].VALIDATION_FIELD_LENGTH_3TO1000;
    }).bail(),

    //Required Featured Service
    REQUIRED_FEATURED_SERVICE: check('isFeatured').trim().escape().not().isEmpty().withMessage((value, { req }) => {
        return translate[req.headers["x-language-key"]].VALIDATION_FIELD_REQUIRED;
    }).bail().isBoolean().withMessage((value, { req }) => {
        return translate[req.headers["x-language-key"]].VALIDATION_FIELD_BOOLEAN;
    }).bail(),

    //Required Sell Online Service
    REQUIRED_SELL_SERVICE_ONLINE: check('sellServiceOnline').trim().escape().not().isEmpty().withMessage((value, { req }) => {
        return translate[req.headers["x-language-key"]].VALIDATION_FIELD_REQUIRED;
    }).bail().isBoolean().withMessage((value, { req }) => {
        return translate[req.headers["x-language-key"]].VALIDATION_FIELD_BOOLEAN;
    }).bail(),

    //Required Appointment Time
    REQUIRED_APPOINTMENT_LEAD_TIME: check('appointmentleadTime').trim().escape().not().isEmpty().withMessage((value, { req }) => {
        return translate[req.headers["x-language-key"]].VALIDATION_FIELD_REQUIRED;
    }).bail().isNumeric().withMessage((value, { req }) => {
        return translate[req.headers["x-language-key"]].VALIDATION_FIELD_NUMBER;
    }).bail(),

    //Required Service Availability On Monday
    REQUIRED_SERVICE_AVAILABILITY_ON_MONDAY: check('monday').trim().escape().not().isEmpty().withMessage((value, { req }) => {
        return translate[req.headers["x-language-key"]].VALIDATION_FIELD_REQUIRED;
    }).bail().isBoolean().withMessage((value, { req }) => {
        return translate[req.headers["x-language-key"]].VALIDATION_FIELD_BOOLEAN;
    }).bail(),
    //Required Service Availability On tuesday
    REQUIRED_SERVICE_AVAILABILITY_ON_TUESDAY: check('tuesday').trim().escape().not().isEmpty().withMessage((value, { req }) => {
        return translate[req.headers["x-language-key"]].VALIDATION_FIELD_REQUIRED;
    }).bail().isBoolean().withMessage((value, { req }) => {
        return translate[req.headers["x-language-key"]].VALIDATION_FIELD_BOOLEAN;
    }).bail(),
    //Required Service Availability On wednesday
    REQUIRED_SERVICE_AVAILABILITY_ON_WEDNESDAY: check('wednesday').trim().escape().not().isEmpty().withMessage((value, { req }) => {
        return translate[req.headers["x-language-key"]].VALIDATION_FIELD_REQUIRED;
    }).bail().isBoolean().withMessage((value, { req }) => {
        return translate[req.headers["x-language-key"]].VALIDATION_FIELD_BOOLEAN;
    }).bail(),

    //Required Service Availability On thursday
    REQUIRED_SERVICE_AVAILABILITY_ON_THURSDAY: check('thursday').trim().escape().not().isEmpty().withMessage((value, { req }) => {
        return translate[req.headers["x-language-key"]].VALIDATION_FIELD_REQUIRED;
    }).bail().isBoolean().withMessage((value, { req }) => {
        return translate[req.headers["x-language-key"]].VALIDATION_FIELD_BOOLEAN;
    }).bail(),

    //Required Service Availability On friday
    REQUIRED_SERVICE_AVAILABILITY_ON_FRIDAY: check('friday').trim().escape().not().isEmpty().withMessage((value, { req }) => {
        return translate[req.headers["x-language-key"]].VALIDATION_FIELD_REQUIRED;
    }).bail().isBoolean().withMessage((value, { req }) => {
        return translate[req.headers["x-language-key"]].VALIDATION_FIELD_BOOLEAN;
    }).bail(),

    //Required Service Availability On saturday
    REQUIRED_SERVICE_AVAILABILITY_ON_SATURDAY: check('saturday').trim().escape().not().isEmpty().withMessage((value, { req }) => {
        return translate[req.headers["x-language-key"]].VALIDATION_FIELD_REQUIRED;
    }).bail().isBoolean().withMessage((value, { req }) => {
        return translate[req.headers["x-language-key"]].VALIDATION_FIELD_BOOLEAN;
    }).bail(),

    //Required Service Availability On sunday
    REQUIRED_SERVICE_AVAILABILITY_ON_SUNDAY: check('sunday').trim().escape().not().isEmpty().withMessage((value, { req }) => {
        return translate[req.headers["x-language-key"]].VALIDATION_FIELD_REQUIRED;
    }).bail().isBoolean().withMessage((value, { req }) => {
        return translate[req.headers["x-language-key"]].VALIDATION_FIELD_BOOLEAN;
    }).bail(),

    //Required Review
    REQUIRED_REVIEW: check('review').trim().escape().not().isEmpty().withMessage((value, { req }) => {
        return translate[req.headers["x-language-key"]].VALIDATION_FIELD_REQUIRED;
    }).bail().isLength({ min: 3, max: 1000 }).withMessage((value, { req }) => {
        return translate[req.headers["x-language-key"]].VALIDATION_FIELD_LENGTH_3TO1000;
    }).bail(),

    /*== Required Customer Booking ID Validation  ===*/
    REQUIRED_BOOKING_ID: check('bookingid').trim().escape().not().isEmpty().withMessage((value, { req }) => {
        return translate[req.headers["x-language-key"]].VALIDATION_FIELD_REQUIRED;
    }).bail()
        .isMongoId().withMessage((value, { req }) => {
            return translate[req.headers["x-language-key"]].VALIDATION_FIELD_MONGOID;
        }).bail()
        .custom((value, { req }) => {
            return Booking.findOne({ _id: value }).select('_id').then((product) => {
                if (!product) {
                    return Promise.reject(translate[req.headers["x-language-key"]].VALIDATION_FIELD_MONGOID);
                }
            });
        }).bail(),
    //Required overall
    REQUIRED_OVERALL: check('overall').trim().escape().not().isEmpty().withMessage((value, { req }) => {
        return translate[req.headers["x-language-key"]].VALIDATION_FIELD_REQUIRED;
    }).bail().isNumeric().withMessage((value, { req }) => {
        return translate[req.headers["x-language-key"]].VALIDATION_FIELD_NUMBER;
    }).bail(),

    //Required ambience
    REQUIRED_AMBIENCE: check('ambience').trim().escape().not().isEmpty().withMessage((value, { req }) => {
        return translate[req.headers["x-language-key"]].VALIDATION_FIELD_REQUIRED;
    }).bail().isNumeric().withMessage((value, { req }) => {
        return translate[req.headers["x-language-key"]].VALIDATION_FIELD_NUMBER;
    }).bail(),
    //Required staff

    REQUIRED_STAFF: check('staff').trim().escape().not().isEmpty().withMessage((value, { req }) => {
        return translate[req.headers["x-language-key"]].VALIDATION_FIELD_REQUIRED;
    }).bail().isNumeric().withMessage((value, { req }) => {
        return translate[req.headers["x-language-key"]].VALIDATION_FIELD_NUMBER;
    }).bail(),

    //Required cleanliness

    REQUIRED_CLEANLINESS: check('cleanliness').trim().escape().not().isEmpty().withMessage((value, { req }) => {
        return translate[req.headers["x-language-key"]].VALIDATION_FIELD_REQUIRED;
    }).bail().isNumeric().withMessage((value, { req }) => {
        return translate[req.headers["x-language-key"]].VALIDATION_FIELD_NUMBER;
    }).bail(),

    //Required Service

    REQUIRED_SERVICE: check('service').trim().escape().not().isEmpty().withMessage((value, { req }) => {
        return translate[req.headers["x-language-key"]].VALIDATION_FIELD_REQUIRED;
    }).bail().isNumeric().withMessage((value, { req }) => {
        return translate[req.headers["x-language-key"]].VALIDATION_FIELD_NUMBER;
    }).bail(),

    //Required skillLevel
    REQUIRED_SKILLLEVEL: check('skillLevel').trim().escape().not().isEmpty().withMessage((value, { req }) => {
        return translate[req.headers["x-language-key"]].VALIDATION_FIELD_REQUIRED;
    }).bail().isLength({ min: 2, max: 126 }).withMessage((value, { req }) => {
        return translate[req.headers["x-language-key"]].VALIDATION_FIELD_LENGTH_3TO126;
    }).bail().isString().withMessage((value, { req }) => {
        return translate[req.headers["x-language-key"]].VALIDATION_FIELD_STRING;
    }).bail(),
    /*========= Required Employee Number Validation ==============*/
    REQUIRED_EMPLOYEE_NUMBER: check('employees').trim().escape().not().isEmpty().withMessage((value, { req }) => {
        return translate[req.headers["x-language-key"]].VALIDATION_FIELD_REQUIRED;
    }).bail().isNumeric().withMessage((value, { req }) => {
        return translate[req.headers["x-language-key"]].VALIDATION_FIELD_NUMBER;
    }).bail(),

    /*=========Check Work Id Validation ==============*/
    REQUIRED_IMAGE_ID: check('imageid').trim().escape().not().isEmpty().withMessage((value, { req }) => {
        return translate[req.headers["x-language-key"]].VALIDATION_FIELD_REQUIRED;
    }).bail()
        .isMongoId().withMessage((value, { req }) => {
            return translate[req.headers["x-language-key"]].VALIDATION_FIELD_MONGOID;
        }).bail()
        .custom((value, { req }) => {
            return Users.findOne({ "salonDetail.verifiedShopImages._id": req.body.imageid }).select('salonDetail.verifiedShopImages._id').then((image) => {
                if (!image) {
                    return Promise.reject(translate[req.headers["x-language-key"]].VALIDATION_FIELD_MONGOID);
                }
            });
        }).bail(),

    //Required Discount Active
    REQUIRED_SERVICE_ACTIVE_STATUS: check('active').trim().escape().not().isEmpty().withMessage((value, { req }) => {
        return translate[req.headers["x-language-key"]].VALIDATION_FIELD_REQUIRED;
    }).bail().isBoolean().withMessage((value, { req }) => {
        return translate[req.headers["x-language-key"]].VALIDATION_FIELD_BOOLEAN;
    }).bail(),
    // Number Validatin
    REQUIRED_GENERAL_DISCOUNT: check('general.discount').trim().escape().not().isEmpty().withMessage((value, { req }) => {
        return translate[req.headers["x-language-key"]].VALIDATION_FIELD_REQUIRED;
    }).bail().isNumeric().withMessage((value, { req }) => {
        return translate[req.headers["x-language-key"]].VALIDATION_FIELD_NUMBER;
    }).bail().isInt({ min: 0, max: 100 }).withMessage((value, { req }) => {
        return translate[req.headers["x-language-key"]].VALIDATION_FIELD_NUMBER_0TO100;
    }).bail(),
    //Discount
    REQUIRED_LAST_MINUTE_DISCOUNT: check('lastMinute.discount').trim().escape().not().isEmpty().withMessage((value, { req }) => {
        return translate[req.headers["x-language-key"]].VALIDATION_FIELD_REQUIRED;
    }).bail().isNumeric().withMessage((value, { req }) => {
        return translate[req.headers["x-language-key"]].VALIDATION_FIELD_NUMBER;
    }).bail().isInt({ min: 0, max: 100 }).withMessage((value, { req }) => {
        return translate[req.headers["x-language-key"]].VALIDATION_FIELD_NUMBER_0TO100;
    }).bail(),

    //Discount
    REQUIRED_GENERAL_ENABLE_DISCOUNT: check('general.enableDiscount').trim().escape().not().isEmpty().withMessage((value, { req }) => {
        return translate[req.headers["x-language-key"]].VALIDATION_FIELD_REQUIRED;
    }).bail().isBoolean().withMessage((value, { req }) => {
        return translate[req.headers["x-language-key"]].VALIDATION_FIELD_BOOLEAN;
    }).bail(),
    //Discount
    REQUIRED_LAST_MINUTE_ENABLE_DISCOUNT: check('lastMinute.enableDiscount').trim().escape().not().isEmpty().withMessage((value, { req }) => {
        return translate[req.headers["x-language-key"]].VALIDATION_FIELD_REQUIRED;
    }).bail().isBoolean().withMessage((value, { req }) => {
        return translate[req.headers["x-language-key"]].VALIDATION_FIELD_BOOLEAN;
    }).bail(),

    //Discount Number
    REQUIRED_BEFORE_ACTIVE: check('lastMinute.beforeActive').trim().escape().not().isEmpty().withMessage((value, { req }) => {
        return translate[req.headers["x-language-key"]].VALIDATION_FIELD_REQUIRED;
    }).bail().isNumeric().withMessage((value, { req }) => {
        return translate[req.headers["x-language-key"]].VALIDATION_FIELD_NUMBER;
    }).bail(),

    //Discount
    REQUIRED_OFF_PIC_ENABLE_DISCOUNT: check('offPic.enableDiscount').trim().escape().not().isEmpty().withMessage((value, { req }) => {
        return translate[req.headers["x-language-key"]].VALIDATION_FIELD_REQUIRED;
    }).bail().isBoolean().withMessage((value, { req }) => {
        return translate[req.headers["x-language-key"]].VALIDATION_FIELD_BOOLEAN;
    }).bail(),

    //Discount Monday Validation

    REQUIRED_MONDAY_MORNING_DISCOUNT: check('monday.morning').trim().escape().not().isEmpty().withMessage((value, { req }) => {
        return translate[req.headers["x-language-key"]].VALIDATION_FIELD_REQUIRED;
    }).bail().isNumeric().withMessage((value, { req }) => {
        return translate[req.headers["x-language-key"]].VALIDATION_FIELD_NUMBER;
    }).bail().isInt({ min: 0, max: 100 }).withMessage((value, { req }) => {
        return translate[req.headers["x-language-key"]].VALIDATION_FIELD_NUMBER_0TO100;
    }).bail(),

    REQUIRED_MONDAY_EVENING_DISCOUNT: check('monday.evening').trim().escape().not().isEmpty().withMessage((value, { req }) => {
        return translate[req.headers["x-language-key"]].VALIDATION_FIELD_REQUIRED;
    }).bail().isNumeric().withMessage((value, { req }) => {
        return translate[req.headers["x-language-key"]].VALIDATION_FIELD_NUMBER;
    }).bail().isInt({ min: 0, max: 100 }).withMessage((value, { req }) => {
        return translate[req.headers["x-language-key"]].VALIDATION_FIELD_NUMBER_0TO100;
    }).bail(),

    REQUIRED_MONDAY_AFTRNOON_DISCOUNT: check('monday.afternoon').trim().escape().not().isEmpty().withMessage((value, { req }) => {
        return translate[req.headers["x-language-key"]].VALIDATION_FIELD_REQUIRED;
    }).bail().isNumeric().withMessage((value, { req }) => {
        return translate[req.headers["x-language-key"]].VALIDATION_FIELD_NUMBER;
    }).bail().isInt({ min: 0, max: 100 }).withMessage((value, { req }) => {
        return translate[req.headers["x-language-key"]].VALIDATION_FIELD_NUMBER_0TO100;
    }).bail(),

    REQUIRED_MONDAY_VENUE_STATUS_DISCOUNT: check('monday.venueStatus').trim().escape().not().isEmpty().withMessage((value, { req }) => {
        return translate[req.headers["x-language-key"]].VALIDATION_FIELD_REQUIRED;
    }).bail().isBoolean().withMessage((value, { req }) => {
        return translate[req.headers["x-language-key"]].VALIDATION_FIELD_BOOLEAN;
    }).bail(),

    //Discount Tuesday Validation

    REQUIRED_TUESDAY_MORNING_DISCOUNT: check('tuesday.morning').trim().escape().not().isEmpty().withMessage((value, { req }) => {
        return translate[req.headers["x-language-key"]].VALIDATION_FIELD_REQUIRED;
    }).bail().isNumeric().withMessage((value, { req }) => {
        return translate[req.headers["x-language-key"]].VALIDATION_FIELD_NUMBER;
    }).bail().isInt({ min: 0, max: 100 }).withMessage((value, { req }) => {
        return translate[req.headers["x-language-key"]].VALIDATION_FIELD_NUMBER_0TO100;
    }).bail(),

    REQUIRED_TUESDAY_EVENING_DISCOUNT: check('tuesday.evening').trim().escape().not().isEmpty().withMessage((value, { req }) => {
        return translate[req.headers["x-language-key"]].VALIDATION_FIELD_REQUIRED;
    }).bail().isNumeric().withMessage((value, { req }) => {
        return translate[req.headers["x-language-key"]].VALIDATION_FIELD_NUMBER;
    }).bail().isInt({ min: 0, max: 100 }).withMessage((value, { req }) => {
        return translate[req.headers["x-language-key"]].VALIDATION_FIELD_NUMBER_0TO100;
    }).bail(),

    REQUIRED_TUESDAY_AFTRNOON_DISCOUNT: check('tuesday.afternoon').trim().escape().not().isEmpty().withMessage((value, { req }) => {
        return translate[req.headers["x-language-key"]].VALIDATION_FIELD_REQUIRED;
    }).bail().isNumeric().withMessage((value, { req }) => {
        return translate[req.headers["x-language-key"]].VALIDATION_FIELD_NUMBER;
    }).bail().isInt({ min: 0, max: 100 }).withMessage((value, { req }) => {
        return translate[req.headers["x-language-key"]].VALIDATION_FIELD_NUMBER_0TO100;
    }).bail(),

    REQUIRED__TUESDAY_VENUE_STATUS_DISCOUNT: check('tuesday.venueStatus').trim().escape().not().isEmpty().withMessage((value, { req }) => {
        return translate[req.headers["x-language-key"]].VALIDATION_FIELD_REQUIRED;
    }).bail().isBoolean().withMessage((value, { req }) => {
        return translate[req.headers["x-language-key"]].VALIDATION_FIELD_BOOLEAN;
    }).bail(),

    //Discount Wednesday Validation

    REQUIRED_WEDNESDAY_MORNING_DISCOUNT: check('wednesday.morning').trim().escape().not().isEmpty().withMessage((value, { req }) => {
        return translate[req.headers["x-language-key"]].VALIDATION_FIELD_REQUIRED;
    }).bail().isNumeric().withMessage((value, { req }) => {
        return translate[req.headers["x-language-key"]].VALIDATION_FIELD_NUMBER;
    }).bail().isInt({ min: 0, max: 100 }).withMessage((value, { req }) => {
        return translate[req.headers["x-language-key"]].VALIDATION_FIELD_NUMBER_0TO100;
    }).bail(),

    REQUIRED_WEDNESDAY_EVENING_DISCOUNT: check('wednesday.evening').trim().escape().not().isEmpty().withMessage((value, { req }) => {
        return translate[req.headers["x-language-key"]].VALIDATION_FIELD_REQUIRED;
    }).bail().isNumeric().withMessage((value, { req }) => {
        return translate[req.headers["x-language-key"]].VALIDATION_FIELD_NUMBER;
    }).bail().isInt({ min: 0, max: 100 }).withMessage((value, { req }) => {
        return translate[req.headers["x-language-key"]].VALIDATION_FIELD_NUMBER_0TO100;
    }).bail(),

    REQUIRED_WEDNESDAY_AFTRNOON_DISCOUNT: check('wednesday.afternoon').trim().escape().not().isEmpty().withMessage((value, { req }) => {
        return translate[req.headers["x-language-key"]].VALIDATION_FIELD_REQUIRED;
    }).bail().isNumeric().withMessage((value, { req }) => {
        return translate[req.headers["x-language-key"]].VALIDATION_FIELD_NUMBER;
    }).bail().isInt({ min: 0, max: 100 }).withMessage((value, { req }) => {
        return translate[req.headers["x-language-key"]].VALIDATION_FIELD_NUMBER_0TO100;
    }).bail(),

    REQUIRED__WEDNESDAY_VENUE_STATUS_DISCOUNT: check('wednesday.venueStatus').trim().escape().not().isEmpty().withMessage((value, { req }) => {
        return translate[req.headers["x-language-key"]].VALIDATION_FIELD_REQUIRED;
    }).bail().isBoolean().withMessage((value, { req }) => {
        return translate[req.headers["x-language-key"]].VALIDATION_FIELD_BOOLEAN;
    }).bail(),

    //Discount Thursday Validation

    REQUIRED_THURSDAY_MORNING_DISCOUNT: check('thursday.morning').trim().escape().not().isEmpty().withMessage((value, { req }) => {
        return translate[req.headers["x-language-key"]].VALIDATION_FIELD_REQUIRED;
    }).bail().isNumeric().withMessage((value, { req }) => {
        return translate[req.headers["x-language-key"]].VALIDATION_FIELD_NUMBER;
    }).bail().isInt({ min: 0, max: 100 }).withMessage((value, { req }) => {
        return translate[req.headers["x-language-key"]].VALIDATION_FIELD_NUMBER_0TO100;
    }).bail(),

    REQUIRED_THURSDAY_EVENING_DISCOUNT: check('thursday.evening').trim().escape().not().isEmpty().withMessage((value, { req }) => {
        return translate[req.headers["x-language-key"]].VALIDATION_FIELD_REQUIRED;
    }).bail().isNumeric().withMessage((value, { req }) => {
        return translate[req.headers["x-language-key"]].VALIDATION_FIELD_NUMBER;
    }).bail().isInt({ min: 0, max: 100 }).withMessage((value, { req }) => {
        return translate[req.headers["x-language-key"]].VALIDATION_FIELD_NUMBER_0TO100;
    }).bail(),

    REQUIRED_THURSDAY_AFTRNOON_DISCOUNT: check('thursday.afternoon').trim().escape().not().isEmpty().withMessage((value, { req }) => {
        return translate[req.headers["x-language-key"]].VALIDATION_FIELD_REQUIRED;
    }).bail().isNumeric().withMessage((value, { req }) => {
        return translate[req.headers["x-language-key"]].VALIDATION_FIELD_NUMBER;
    }).bail().isInt({ min: 0, max: 100 }).withMessage((value, { req }) => {
        return translate[req.headers["x-language-key"]].VALIDATION_FIELD_NUMBER_0TO100;
    }).bail(),

    REQUIRED__THURSDAY_VENUE_STATUS_DISCOUNT: check('thursday.venueStatus').trim().escape().not().isEmpty().withMessage((value, { req }) => {
        return translate[req.headers["x-language-key"]].VALIDATION_FIELD_REQUIRED;
    }).bail().isBoolean().withMessage((value, { req }) => {
        return translate[req.headers["x-language-key"]].VALIDATION_FIELD_BOOLEAN;
    }).bail(),

    //Discount Friday Validation

    REQUIRED_FRIDAY_MORNING_DISCOUNT: check('friday.morning').trim().escape().not().isEmpty().withMessage((value, { req }) => {
        return translate[req.headers["x-language-key"]].VALIDATION_FIELD_REQUIRED;
    }).bail().isNumeric().withMessage((value, { req }) => {
        return translate[req.headers["x-language-key"]].VALIDATION_FIELD_NUMBER;
    }).bail().isInt({ min: 0, max: 100 }).withMessage((value, { req }) => {
        return translate[req.headers["x-language-key"]].VALIDATION_FIELD_NUMBER_0TO100;
    }).bail(),

    REQUIRED_FRIDAY_EVENING_DISCOUNT: check('friday.evening').trim().escape().not().isEmpty().withMessage((value, { req }) => {
        return translate[req.headers["x-language-key"]].VALIDATION_FIELD_REQUIRED;
    }).bail().isNumeric().withMessage((value, { req }) => {
        return translate[req.headers["x-language-key"]].VALIDATION_FIELD_NUMBER;
    }).bail().isInt({ min: 0, max: 100 }).withMessage((value, { req }) => {
        return translate[req.headers["x-language-key"]].VALIDATION_FIELD_NUMBER_0TO100;
    }).bail(),

    REQUIRED_FRIDAY_AFTRNOON_DISCOUNT: check('friday.afternoon').trim().escape().not().isEmpty().withMessage((value, { req }) => {
        return translate[req.headers["x-language-key"]].VALIDATION_FIELD_REQUIRED;
    }).bail().isNumeric().withMessage((value, { req }) => {
        return translate[req.headers["x-language-key"]].VALIDATION_FIELD_NUMBER;
    }).bail().isInt({ min: 0, max: 100 }).withMessage((value, { req }) => {
        return translate[req.headers["x-language-key"]].VALIDATION_FIELD_NUMBER_0TO100;
    }).bail(),

    REQUIRED__FRIDAY_VENUE_STATUS_DISCOUNT: check('friday.venueStatus').trim().escape().not().isEmpty().withMessage((value, { req }) => {
        return translate[req.headers["x-language-key"]].VALIDATION_FIELD_REQUIRED;
    }).bail().isBoolean().withMessage((value, { req }) => {
        return translate[req.headers["x-language-key"]].VALIDATION_FIELD_BOOLEAN;
    }).bail(),

    //Discount Saturday Validation

    REQUIRED_SATURDAY_MORNING_DISCOUNT: check('saturday.morning').trim().escape().not().isEmpty().withMessage((value, { req }) => {
        return translate[req.headers["x-language-key"]].VALIDATION_FIELD_REQUIRED;
    }).bail().isNumeric().withMessage((value, { req }) => {
        return translate[req.headers["x-language-key"]].VALIDATION_FIELD_NUMBER;
    }).bail().isInt({ min: 0, max: 100 }).withMessage((value, { req }) => {
        return translate[req.headers["x-language-key"]].VALIDATION_FIELD_NUMBER_0TO100;
    }).bail(),

    REQUIRED_SATURDAY_EVENING_DISCOUNT: check('saturday.evening').trim().escape().not().isEmpty().withMessage((value, { req }) => {
        return translate[req.headers["x-language-key"]].VALIDATION_FIELD_REQUIRED;
    }).bail().isNumeric().withMessage((value, { req }) => {
        return translate[req.headers["x-language-key"]].VALIDATION_FIELD_NUMBER;
    }).bail().isInt({ min: 0, max: 100 }).withMessage((value, { req }) => {
        return translate[req.headers["x-language-key"]].VALIDATION_FIELD_NUMBER_0TO100;
    }).bail(),

    REQUIRED_SATURDAY_AFTRNOON_DISCOUNT: check('saturday.afternoon').trim().escape().not().isEmpty().withMessage((value, { req }) => {
        return translate[req.headers["x-language-key"]].VALIDATION_FIELD_REQUIRED;
    }).bail().isNumeric().withMessage((value, { req }) => {
        return translate[req.headers["x-language-key"]].VALIDATION_FIELD_NUMBER;
    }).bail().isInt({ min: 0, max: 100 }).withMessage((value, { req }) => {
        return translate[req.headers["x-language-key"]].VALIDATION_FIELD_NUMBER_0TO100;
    }).bail(),

    REQUIRED__SATURDAY_VENUE_STATUS_DISCOUNT: check('saturday.venueStatus').trim().escape().not().isEmpty().withMessage((value, { req }) => {
        return translate[req.headers["x-language-key"]].VALIDATION_FIELD_REQUIRED;
    }).bail().isBoolean().withMessage((value, { req }) => {
        return translate[req.headers["x-language-key"]].VALIDATION_FIELD_BOOLEAN;
    }).bail(),

    //Discount sunday Validation

    REQUIRED_SUNDAY_MORNING_DISCOUNT: check('sunday.morning').trim().escape().not().isEmpty().withMessage((value, { req }) => {
        return translate[req.headers["x-language-key"]].VALIDATION_FIELD_REQUIRED;
    }).bail().isNumeric().withMessage((value, { req }) => {
        return translate[req.headers["x-language-key"]].VALIDATION_FIELD_NUMBER;
    }).bail().isInt({ min: 0, max: 100 }).withMessage((value, { req }) => {
        return translate[req.headers["x-language-key"]].VALIDATION_FIELD_NUMBER_0TO100;
    }).bail(),

    REQUIRED_SUNDAY_EVENING_DISCOUNT: check('sunday.evening').trim().escape().not().isEmpty().withMessage((value, { req }) => {
        return translate[req.headers["x-language-key"]].VALIDATION_FIELD_REQUIRED;
    }).bail().isNumeric().withMessage((value, { req }) => {
        return translate[req.headers["x-language-key"]].VALIDATION_FIELD_NUMBER;
    }).bail().isInt({ min: 0, max: 100 }).withMessage((value, { req }) => {
        return translate[req.headers["x-language-key"]].VALIDATION_FIELD_NUMBER_0TO100;
    }).bail(),

    REQUIRED_SUNDAY_AFTRNOON_DISCOUNT: check('sunday.afternoon').trim().escape().not().isEmpty().withMessage((value, { req }) => {
        return translate[req.headers["x-language-key"]].VALIDATION_FIELD_REQUIRED;
    }).bail().isNumeric().withMessage((value, { req }) => {
        return translate[req.headers["x-language-key"]].VALIDATION_FIELD_NUMBER;
    }).bail().isInt({ min: 0, max: 100 }).withMessage((value, { req }) => {
        return translate[req.headers["x-language-key"]].VALIDATION_FIELD_NUMBER_0TO100;
    }).bail(),

    REQUIRED__SUNDAY_VENUE_STATUS_DISCOUNT: check('sunday.venueStatus').trim().escape().not().isEmpty().withMessage((value, { req }) => {
        return translate[req.headers["x-language-key"]].VALIDATION_FIELD_REQUIRED;
    }).bail().isBoolean().withMessage((value, { req }) => {
        return translate[req.headers["x-language-key"]].VALIDATION_FIELD_BOOLEAN;
    }).bail(),

    REQUIRED_ENABLE_AUTO_RENEW: check('enableAutoRenew').trim().escape().not().isEmpty().withMessage((value, { req }) => {
        return translate[req.headers["x-language-key"]].VALIDATION_FIELD_REQUIRED;
    }).bail().isBoolean().withMessage((value, { req }) => {
        return translate[req.headers["x-language-key"]].VALIDATION_FIELD_BOOLEAN;
    }).bail(),

    REQUIRED_DISCOUNTID: check('discountid').trim().escape().not().isEmpty().withMessage((value, { req }) => {
        return translate[req.headers["x-language-key"]].VALIDATION_FIELD_REQUIRED;
    }).bail()
        .isMongoId().withMessage((value, { req }) => {
            return translate[req.headers["x-language-key"]].VALIDATION_FIELD_MONGOID;
        }).bail()
        .custom((value, { req }) => {
            return Discount.findOne({ _id: value }).select('_id').then((service) => {
                if (!service) {
                    return Promise.reject(translate[req.headers["x-language-key"]].VALIDATION_FIELD_MONGOID);
                }
            });
        }).bail(),

    REQUIRED_PREPAYMENT_REQUIRED: check('prepaymentRequired').trim().escape().not().isEmpty().withMessage((value, { req }) => {
        return translate[req.headers["x-language-key"]].VALIDATION_FIELD_REQUIRED;
    }).bail().isBoolean().withMessage((value, { req }) => {
        return translate[req.headers["x-language-key"]].VALIDATION_FIELD_BOOLEAN;
    }).bail(),
    /*== Optional ExistClientId Validation  ===*/
    OPTIONAL_CLIENTID: check('clientid').trim().escape().not().isEmpty().withMessage((value, { req }) => {
        return translate[req.headers["x-language-key"]].VALIDATION_FIELD_REQUIRED;
    }).bail()
        .isMongoId().withMessage((value, { req }) => {
            return translate[req.headers["x-language-key"]].VALIDATION_FIELD_MONGOID;
        }).bail()
        .custom((value, { req }) => {
            return Users.findOne({ _id: value, userType: "User" }).select('_id').then((user) => {
                if (!user) {
                    return Promise.reject(translate[req.headers["x-language-key"]].VALIDATION_FIELD_MONGOID);
                }
            });
        }).bail(),

    /*=========Required Social Type Validation ==============*/
    REQUIRED_SALON_SOURCE_STATUS: check('source').trim().escape().not().isEmpty().withMessage((value, { req }) => {
        return translate[req.headers["x-language-key"]].VALIDATION_FIELD_REQUIRED;
    }).bail()
        .isIn(SourceStatus).withMessage((value, { req }) => {
            return translate[req.headers["x-language-key"]].VALIDATION_FIELD_SALON_STATUS;
        }).bail(),

    /*=========Required service_title Validation ==============*/

    REQUIRED_SERVICE_TITLE: check('serviceTitle').trim().escape().not().isEmpty().withMessage((value, { req }) => {
        return translate[req.headers["x-language-key"]].VALIDATION_FIELD_REQUIRED;
    }).bail().isLength({ min: 3, max: 126 }).withMessage((value, { req }) => {
        return translate[req.headers["x-language-key"]].VALIDATION_FIELD_LENGTH_3TO126;
    }).bail().isString().withMessage((value, { req }) => {
        return translate[req.headers["x-language-key"]].VALIDATION_FIELD_STRING;
    }).bail(),

    /*=========priceType Validation ==============*/
    REQUIRED_PRICE_TYPE: check('priceType').not().isEmpty().trim().escape().withMessage((value, { req }) => {
        return translate[req.headers["x-language-key"]].VALIDATION_FIELD_REQUIRED;
    }).bail()
        .isIn(["CustomePrice", "ServicePrice"]).withMessage((value, { req }) => {
            return translate[req.headers["x-language-key"]].VALIDATION_FIELD_GENDER;
        }).bail(),
    /*=========package Validation ==============*/

    REQUIRED_PACKAGE_ID: check('packageid').trim().escape().not().isEmpty().withMessage((value, { req }) => {
        return translate[req.headers["x-language-key"]].VALIDATION_FIELD_REQUIRED;
    }).bail()
        .isMongoId().withMessage((value, { req }) => {
            return translate[req.headers["x-language-key"]].VALIDATION_FIELD_MONGOID;
        }).bail()
        .custom((value, { req }) => {
            return Package.findOne({ _id: value }).select('_id').then((package) => {
                if (!package) {
                    return Promise.reject(translate[req.headers["x-language-key"]].VALIDATION_FIELD_MONGOID);
                }
            });
        }).bail(),

    /*== Required Service Group ID Validation  ===*/
    REQUIRED_SALON_SERVICEGROUP_ID: check('servicegroupid').trim().escape().not().isEmpty().withMessage((value, { req }) => {
        return translate[req.headers["x-language-key"]].VALIDATION_FIELD_REQUIRED;
    }).bail()
        .isMongoId().withMessage((value, { req }) => {
            return translate[req.headers["x-language-key"]].VALIDATION_FIELD_MONGOID;
        }).bail()
        .custom((value, { req }) => {
            return SalonServiceGroup.findOne({ _id: value }).select('_id').then((group) => {
                if (!group) {
                    return Promise.reject(translate[req.headers["x-language-key"]].VALIDATION_FIELD_MONGOID);
                }
            });
        }).bail(),

    /*=========Required Rota Type Validation ==============*/
    REQUIRED_SET_TIME_TYPE: check('setTimeType').not().isEmpty().trim().escape().withMessage((value, { req }) => {
        return translate[req.headers["x-language-key"]].VALIDATION_FIELD_REQUIRED;
    }).bail()
        .isIn(['CustomHours', 'StandardTimes']).withMessage((value, { req }) => {
            return translate[req.headers["x-language-key"]].VALIDATION_FIELD_SET_TIME_TYPE;
        }).bail(),


    REQUIRED_ROTAID: check('rotaid').trim().escape().not().isEmpty().withMessage((value, { req }) => {
        return translate[req.headers["x-language-key"]].VALIDATION_FIELD_REQUIRED;
    }).bail()
        .isMongoId().withMessage((value, { req }) => {
            return translate[req.headers["x-language-key"]].VALIDATION_FIELD_MONGOID;
        }).bail()
        .custom((value, { req }) => {
            return Rota.findOne({ _id: value, userType: "Employee" }).select('_id').then((user) => {
                if (!user) {
                    return Promise.reject(translate[req.headers["x-language-key"]].VALIDATION_FIELD_MONGOID);
                }
            });
        }).bail(),

    REQUIRED_TEAMID: check('teamid').trim().escape().not().isEmpty().withMessage((value, { req }) => {
        return translate[req.headers["x-language-key"]].VALIDATION_FIELD_REQUIRED;
    }).bail()
        .isMongoId().withMessage((value, { req }) => {
            return translate[req.headers["x-language-key"]].VALIDATION_FIELD_MONGOID;
        }).bail()
        .custom((value, { req }) => {
            return Users.findOne({ _id: value, userType: "Employee" }).select('_id').then((user) => {
                if (!user) {
                    return Promise.reject(translate[req.headers["x-language-key"]].VALIDATION_FIELD_MONGOID);
                }
            });
        }).bail(),

    REQUIRED_SALON_SCHEDULE_TYPE: check('scheduletype').trim().escape().not().isEmpty().withMessage((value, { req }) => {
        return translate[req.headers["x-language-key"]].VALIDATION_FIELD_REQUIRED;
    }).bail()
        .isIn(scheduletype).withMessage((value, { req }) => {
            return translate[req.headers["x-language-key"]].VALIDATION_FIELD_SALON_STATUS;
        }).bail(),

    /*=========Unique Service group Name Validation ==============*/
    UNIQUE_SERVICEGROUP_NAME: check('name').custom((value, { req }) => {
        return ServiceGroup.findOne({ name: value, _id: { $nin: [req.params.id] } }).select('name').then((servicegroup) => {
            if (servicegroup) {
                return Promise.reject(translate[req.headers["x-language-key"]].VALIDATION_FIELD_EXISTS);
            }
        });
    }).bail(),
    /*== Required Exist UserId Validation  ===*/
    REQUIRED_USERID_BOOKING: check('customerid').trim().escape().not().isEmpty().withMessage((value, { req }) => {
        return translate[req.headers["x-language-key"]].VALIDATION_FIELD_REQUIRED;
    }).bail()
        .isMongoId().withMessage((value, { req }) => {
            return translate[req.headers["x-language-key"]].VALIDATION_FIELD_MONGOID;
        }).bail()
        .custom((value, { req }) => {
            return Booking.findOne({ userid: value }).select('userid').then((booking) => {
                if (!booking) {
                    return Promise.reject(translate[req.headers["x-language-key"]].VALIDATION_FIELD_MONGOID);
                }
            });
        }).bail(),
    /*== Required Customer Booking ID Validation  ===*/
    REQUIRED_REVIEW_ID: check('reviewid').trim().escape().not().isEmpty().withMessage((value, { req }) => {
        return translate[req.headers["x-language-key"]].VALIDATION_FIELD_REQUIRED;
    }).bail()
        .isMongoId().withMessage((value, { req }) => {
            return translate[req.headers["x-language-key"]].VALIDATION_FIELD_MONGOID;
        }).bail()
        .custom((value, { req }) => {
            return Users.findOne({ "rewiews._id": value }).select('rewiews._id').then((review) => {
                if (!review) {
                    return Promise.reject(translate[req.headers["x-language-key"]].VALIDATION_FIELD_MONGOID);
                }
            });
        }).bail(),

    REQUIRED_EMPLOYEE_ID: check('employeeid').optional({ checkFalsy: true, nullable: true }).bail()
        .isMongoId().withMessage((value, { req }) => {
            return translate[req.headers["x-language-key"]].VALIDATION_FIELD_MONGOID;
        }).bail()
        .custom((value, { req }) => {
            return Users.findOne({ _id: value, userType: "Employee" }).select('_id').then((user) => {
                if (!user) {
                    return Promise.reject(translate[req.headers["x-language-key"]].VALIDATION_FIELD_MONGOID);
                }
            });
        }).bail(),
};


