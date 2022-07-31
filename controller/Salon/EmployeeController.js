const config = require("../../config/data");
const { successResponse, errorResponse, successResponseWithData, unauthorizedResponse, successResponseAggregatePaginate } = require('../../helpers/Response');
const translate = require('../../locales/translate');
const authservices = require("../../services/auth-service");
const salonservice = require("../../services/salon-service");

const employeeRegistration = async (req, res) => {
    req.body.userType = 'Employee';
    req.body.salonid = req.body.salonid ? req.body.salonid : req.user._id
    req.body.profileImage = req.file.path ? req.file.path : "";
    authservices.employeeSignupService(req).then((data) => {
        return successResponseWithData(res, translate[req.headers["x-language-key"]].DATA_INSERTED_SUCCESS, data);
    })
        .catch((err) => {
            return errorResponse(res, translate[req.headers["x-language-key"]].ERROR_DATA_INSERTED);
        });
}

const getEmployeeList = async (req, res) => {
    salonservice.getEmployeeListService(req).then((data) => {
        return successResponseWithData(res, translate[req.headers["x-language-key"]].DATA_RETRIVED_SUCCESS, data);
    })
        .catch((err) => {
            return errorResponse(res, translate[req.headers["x-language-key"]].ERROR_DATA_RETRIVED);
        });
}

const getEmployeeInfo = async (req, res) => {
    salonservice.getEmployeeInfoService(req).then((data) => {
        return successResponseWithData(res, translate[req.headers["x-language-key"]].DATA_RETRIVED_SUCCESS, data);
    })
        .catch((err) => {
            return errorResponse(res, translate[req.headers["x-language-key"]].ERROR_DATA_RETRIVED);
        });
}

const updateEmployee = async (req, res) => {
    salonservice.updateEmployeeService(req).then((data) => {
        return successResponseWithData(res, translate[req.headers["x-language-key"]].DATA_UPDATED_SUCCESS, data);
    })
        .catch((err) => {
            return errorResponse(res, translate[req.headers["x-language-key"]].ERROR_DATA_UPDATE);
        });
}

const getEmployeeDropDown = async (req, res) => {
    salonservice.getEmployeeDropDownService(req).then((data) => {
        return successResponseWithData(res, translate[req.headers["x-language-key"]].DATA_RETRIVED_SUCCESS, data);
    })
        .catch((err) => {
            return errorResponse(res, translate[req.headers["x-language-key"]].ERROR_DATA_RETRIVED);
        });
}

const employeeCalender = async (req, res) => {
    salonservice.employeeCalenderService(req).then((data) => {
        return successResponseWithData(res, translate[req.headers["x-language-key"]].DATA_RETRIVED_SUCCESS, data);
    })
        .catch((err) => {
            return errorResponse(res, translate[req.headers["x-language-key"]].DATA_RETRIVED_SUCCESS);
        });
}

module.exports = {
    employeeRegistration,
    getEmployeeList,
    getEmployeeInfo,
    updateEmployee,
    getEmployeeDropDown,
    employeeCalender,
}