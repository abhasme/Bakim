const { successResponse, errorResponse, successResponseWithData, unauthorizedResponse, successResponseAggregatePaginate } = require('../../helpers/Response');
const translate = require('../../locales/translate')
const bookingservice = require("../../services/booking-service")

const addToMyBasket = async (req, res) => {
    bookingservice.addToBasketServices(req).then((data) => {
        return successResponseWithData(res, translate[req.headers["x-language-key"]].DATA_INSERTED_SUCCESS, data);
    })
        .catch((err) => {
            return errorResponse(res, translate[req.headers["x-language-key"]].ERROR_DATA_INSERTED);
        });
}
const submitBooking = async (req, res) => {
    bookingservice.addBookingServices(req).then((data) => {
        return successResponseWithData(res, translate[req.headers["x-language-key"]].DATA_INSERTED_SUCCESS, data);
    })
        .catch((err) => {
            return errorResponse(res, translate[req.headers["x-language-key"]].ERROR_DATA_INSERTED);
        });
}
const getServiceEmployee = async (req, res) => {
    bookingservice.getServiceEmployeeServices(req).then((data) => {
        return successResponseWithData(res, translate[req.headers["x-language-key"]].DATA_INSERTED_SUCCESS, data);
    })
        .catch((err) => {
            return errorResponse(res, translate[req.headers["x-language-key"]].ERROR_DATA_INSERTED);
        });
}
const getSelectedService = async (req, res) => {
    bookingservice.getSelectedServiceServices(req).then((data) => {
        return successResponseWithData(res, translate[req.headers["x-language-key"]].DATA_INSERTED_SUCCESS, data);
    })
        .catch((err) => {
            return errorResponse(res, translate[req.headers["x-language-key"]].ERROR_DATA_INSERTED);
        });
}

const getBookingDateAndTime = async (req, res) => {
    bookingservice.getBookingDateAndTimeServices(req).then((data) => {
        return successResponseWithData(res, translate[req.headers["x-language-key"]].DATA_INSERTED_SUCCESS, data);
    })
        .catch((err) => {
            return errorResponse(res, translate[req.headers["x-language-key"]].ERROR_DATA_INSERTED);
        });
}
const getResourceAvailable = async (req, res) => {
    bookingservice.getResourceAvailableServices(req).then((data) => {
        return successResponseWithData(res, translate[req.headers["x-language-key"]].DATA_INSERTED_SUCCESS, data);
    })
        .catch((err) => {
            return errorResponse(res, translate[req.headers["x-language-key"]].ERROR_DATA_INSERTED);
        });
}

const getEmployeeSlots = async (req, res) => {
    bookingservice.getEmployeeSlotsServices(req).then((data) => {
        return successResponseWithData(res, translate[req.headers["x-language-key"]].DATA_INSERTED_SUCCESS, data);
    })
        .catch((err) => {
            return errorResponse(res, translate[req.headers["x-language-key"]].ERROR_DATA_INSERTED);
        });
}
module.exports = {
    addToMyBasket,
    submitBooking,
    getServiceEmployee,
    getSelectedService,
    getBookingDateAndTime,
    getResourceAvailable,
    getEmployeeSlots
};