const { successResponse, errorResponse, successResponseWithData, unauthorizedResponse, emailUnVerfiedResponse, mobileUnVerfiedResponse, successResponseAggregatePaginate } = require('../../helpers/Response');
var ObjectID = require('mongoose').Types.ObjectId
const authservices = require('../../services/auth-service')
const customerservices = require('../../services/customer-service')
const translate = require('../../locales/translate')

/*==== Customer Registration ====*/
const customerRegistration = async (req, res) => {
    if (req.file && req.file.path) {
        req.body.profileImage = req.file.path ? req.file.path : "";
    }
    if (req.body.notes) { req.body.notes }
    if (req.body.prepaymentRequired) { req.body.prepaymentRequired }
    authservices.userSignupService(req).then((data) => {
        return successResponseWithData(res, translate[req.headers["x-language-key"]].DATA_INSERTED_SUCCESS, data);
    })
    .catch((err) => {
        return errorResponse(res, translate[req.headers["x-language-key"]].ERROR_DATA_INSERTED);
    });
}
//
/*==== Get Customer List ====*/
const getCustomerList = async (req, res) => {
    customerservices.getCustomerService(req).then((data) => {
        return successResponseAggregatePaginate(req, res, translate[req.headers["x-language-key"]].DATA_RETRIVED_SUCCESS, data);
    })
        .catch((err) => {
            return errorResponse(res, translate[req.headers["x-language-key"]][err.message]);
        });
}

/*==== Customer Profile Info ====*/
const customerProfileInfo = async (req, res) => {
    customerservices.customerProfileInfoService(req).then((data) => {
        return successResponseWithData(res, translate[req.headers["x-language-key"]].DATA_RETRIVED_SUCCESS, data);
    })
        .catch((err) => {
            return errorResponse(res, translate[req.headers["x-language-key"]][err.message]);
        });
}
/*====Customer Update ====*/
const updateCustomer = async (req, res) => {
    customerservices.updateCustomerService(req).then((data) => {
        return successResponseWithData(res, translate[req.headers["x-language-key"]].DATA_UPDATED_SUCCESS, data);
    })
        .catch((err) => {
            return errorResponse(res, translate[req.headers["x-language-key"]][err.message]);
        });
}
/*====Customer Update ====*/
const customerBookingHistory = async (req, res) => {
    customerservices.customerBookingHistoryService(req).then((data) => {
        return successResponseWithData(res, translate[req.headers["x-language-key"]].DATA_UPDATED_SUCCESS, data);
    })
        .catch((err) => {
            return errorResponse(res, translate[req.headers["x-language-key"]][err.message]);
        });
}
const customerDelete = async (req, res) => {
    customerservices.customerDeleteService(req).then((data) => {
        return successResponse(res, translate[req.headers["x-language-key"]].DATA_DELETED_SUCCESS, data);
    })
        .catch((err) => {
            return errorResponse(res, translate[req.headers["x-language-key"]][err.message]);
        });
}

module.exports = {
    customerRegistration,
    getCustomerList,
    customerProfileInfo,
    updateCustomer,
    customerBookingHistory,
    customerDelete,
};