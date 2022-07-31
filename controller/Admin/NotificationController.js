const {successResponse , errorResponse, successResponseWithData, responsePaginate, successResponseAggregatePaginate} = require('../../helpers/Response');
const apiResponse = require('../../helpers/Response');
var ObjectID = require('mongoose').Types.ObjectId
const notificationservice = require('../../services/notification-service')
const translate = require('../../locales/translate')

// Add New Notification
const createNotification = async(req, res) => {
    notificationservice.createNotificationServices(req).then((data) => {
        return successResponseWithData(res, translate[req.headers["x-language-key"]].DATA_INSERTED_SUCCESS, data);
    })
    .catch((err) => {
        return errorResponse(res, translate[req.headers["x-language-key"]].ERROR_DATA_INSERTED);
    });
}

//Get Notification List
const getNotification = async(req, res) => {
    notificationservice.getNotificationService(req).then((data) => {
        return successResponseAggregatePaginate(req, res, translate[req.headers["x-language-key"]].DATA_RETRIVED_SUCCESS, data);
    })
    .catch((err) => {
        return errorResponse(res, translate[req.headers["x-language-key"]][err.message]);
    }); 
}

module.exports = {
    createNotification,
    getNotification,
};