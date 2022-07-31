const { successResponse, errorResponse, successResponseWithData, unauthorizedResponse, emailUnVerfiedResponse, mobileUnVerfiedResponse, successResponseAggregatePaginate } = require('../../helpers/Response');
var ObjectID = require('mongoose').Types.ObjectId
const authservices = require('../../services/auth-service')
const translate = require('../../locales/translate')
const employeervices = require('../../services/employee-service')

/*==== Employee Registration ====*/
const employeeRegistration = async (req, res) => {
    req.body.userType = 'Employee';
    req.body.salonid = req.body.salonid ? req.body.salonid : '',
        req.body.profileImage = req.file.path ? req.file.path : "";
    // req.body.provideService = req.body.provideService ? req.body.provideService : '',
    authservices.employeeSignupService(req).then((data) => {
        return successResponseWithData(res, translate[req.headers["x-language-key"]].DATA_INSERTED_SUCCESS, data);
    })
        .catch((err) => {
            return errorResponse(res, translate[req.headers["x-language-key"]].ERROR_DATA_INSERTED);
        });
}

/*==== Get Employee List ====*/
const getEmployeeList = async (req, res) => {
    employeervices.getEmployeeListService(req).then((data) => {
        return successResponseAggregatePaginate(req, res, translate[req.headers["x-language-key"]].DATA_RETRIVED_SUCCESS, data);
    })
        .catch((err) => {
            return errorResponse(res, translate[req.headers["x-language-key"]][err.message]);
        });
}

/*==== Get Employee List ====*/
const getEmployeeInfo = async (req, res) => {
    employeervices.getEmployeeInfoService(req).then((data) => {
        return successResponseWithData(res, translate[req.headers["x-language-key"]].DATA_RETRIVED_SUCCESS, data);
    })
        .catch((err) => {
            return errorResponse(res, translate[req.headers["x-language-key"]][err.message]);
        });
}

// /*====Salon Update About Company ====*/
const updateEmployee = async (req, res) => {
    employeervices.updateEmployeeService(req).then((data) => {
        return successResponseWithData(res, translate[req.headers["x-language-key"]].DATA_UPDATED_SUCCESS, data);
    })
        .catch((err) => {
            return errorResponse(res, translate[req.headers["x-language-key"]].ERROR_DATA_UPDATE);
        });
}

/*========== Create Portfolio ===================*/
const updateEmployeeStortBio = async (req, res) => {
    employeervices.updateTeamMemberDetailServices(req).then((data) => {
        return successResponseWithData(res, translate[req.headers["x-language-key"]].DATA_INSERTED_SUCCESS, data);
    })
        .catch((err) => {
            return errorResponse(res, translate[req.headers["x-language-key"]].ERROR_DATA_INSERTED);
        });
}
/*========== add Services Employee ===================*/
const addTeamMemberService = async (req, res) => {
    employeervices.addTeamMemberServiceService(req).then((data) => {
        return successResponseWithData(res, translate[req.headers["x-language-key"]].DATA_UPDATED_SUCCESS, data);
    })
        .catch((err) => {
            return errorResponse(res, translate[req.headers["x-language-key"]].ERROR_DATA_UPDATE);
        });
}
/*========== Get Services Employee ===================*/
const getTeamMemberService = async (req, res) => {
    employeervices.getTeamMemberServiceService(req).then((data) => {
        return successResponseWithData(res, translate[req.headers["x-language-key"]].DATA_RETRIVED_SUCCESS, data);
    })
        .catch((err) => {
            return errorResponse(res, translate[req.headers["x-language-key"]].ERROR_DATA_RETRIVED);
        });
}

const deleteEmployee = async (req, res) => {
    employeervices.deleteEmployeeService(req).then((data) => {
        return successResponse(res, translate[req.headers["x-language-key"]].DATA_DELETED_SUCCESS, data);
    })
        .catch((err) => {
            return errorResponse(res, translate[req.headers["x-language-key"]][err.message]);
        });
}

module.exports = {
    employeeRegistration,
    getEmployeeList,
    updateEmployee,
    updateEmployeeStortBio,
    addTeamMemberService,
    getTeamMemberService,
    getEmployeeInfo,
    deleteEmployee,
};