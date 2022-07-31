const { successResponse, errorResponse, successResponseWithData, responsePaginate, successResponseAggregatePaginate } = require('../../helpers/Response');
const apiResponse = require('../../helpers/Response');
var ObjectID = require('mongoose').Types.ObjectId
const reviewservice = require('../../services/review-service')
const translate = require('../../locales/translate')

/*========== Create Review ===================*/
const addReview = async (req, res) => {
    reviewservice.addReviewSalonService(req).then((data) => {
        return successResponseWithData(res, translate[req.headers["x-language-key"]].DATA_INSERTED_SUCCESS, data);
    })
        .catch((err) => {
            return errorResponse(res, translate[req.headers["x-language-key"]][err.message]);
        });
}

/*========== Get Review ===================*/
const getReview = async (req, res) => {
    reviewservice.getReviewService(req).then((data) => {
        return successResponseAggregatePaginate(req, res, translate[req.headers["x-language-key"]].DATA_RETRIVED_SUCCESS, data);
    })
        .catch((err) => {
            return errorResponse(res, translate[req.headers["x-language-key"]][err.message]);
        });
}

/*========== Delete Review ===================*/
const deleteReview = async (req, res) => {
    reviewservice.deleteReviewServices(req).then((data) => {
        return successResponse(res, translate[req.headers["x-language-key"]].DATA_DELETED_SUCCESS, data);
    })
        .catch((err) => {
            return errorResponse(res, translate[req.headers["x-language-key"]][err.message]);
        });
}

module.exports = {
    addReview,
    getReview,
    deleteReview,
};