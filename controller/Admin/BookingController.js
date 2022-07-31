const { successResponse, errorResponse, successResponseWithData, unauthorizedResponse, successResponseAggregatePaginate } = require('../../helpers/Response');
var ObjectID = require('mongoose').Types.ObjectId
const Utility = require('../../helpers/Utility')
const translate = require('../../locales/translate')
const bookingservice = require("../../services/booking-service")

const getBookingList = async (req, res) => {
    bookingservice.getBookingListServices(req).then((data) => {
        return successResponseAggregatePaginate(req, res, translate[req.headers["x-language-key"]].DATA_RETRIVED_SUCCESS, data);
    })
        .catch((err) => {
            return errorResponse(res, translate[req.headers["x-language-key"]][err.message]);
        });
}
module.exports = {
    getBookingList,
};