const { successResponse, errorResponse, successResponseWithData, responsePaginate, successResponseAggregatePaginate } = require('../../helpers/Response');
const apiResponse = require('../../helpers/Response');
var ObjectID = require('mongoose').Types.ObjectId
const cmsservice = require('../../services/cms-service')
const translate = require('../../locales/translate')

/*========== CMS Add ===================*/
const addCms = async (req, res) => {
    cmsservice.addCmsServices(req).then((data) => {
        return successResponseWithData(res, translate[req.headers["x-language-key"]].DATA_INSERTED_SUCCESS, data);
    })
        .catch((err) => {
            return errorResponse(res, translate[req.headers["x-language-key"]].ERROR_DATA_INSERTED);
        });
}

/*========== CMS Update ===================*/
const updateCms = async(req, res) => {
    cmsservice.updateCmsServices(req).then((data) => {
        return successResponseWithData(res, translate[req.headers["x-language-key"]].DATA_UPDATED_SUCCESS, data);
    })
    .catch((err) => {
        return errorResponse(res, translate[req.headers["x-language-key"]][err.message]);
    });
}

/*========== CMS Get ===================*/
const getCms = async (req, res) => {
    cmsservice.getCmsService(req).then((data) => {
        return successResponseWithData(res, translate[req.headers["x-language-key"]].DATA_RETRIVED_SUCCESS, data); //ERROR_DATA_DELETE
    })
        .catch((err) => {
            return errorResponse(res, translate[req.headers["x-language-key"]][err.message]); //[err.message]
        });
}

/*========== CMS Active Dactive ===================*/
const activeDactiveCms = async(req, res) => {
    cmsservice.activeDactiveCmsServices(req).then((data) => {
        return successResponse(res, translate[req.headers["x-language-key"]].ACTIVE_DEACTIVE_SUCCESSFULLY, data); //ERROR_DATA_DELETE
    })
    .catch((err) => {
        return errorResponse(res, translate[req.headers["x-language-key"]].ACTIVE_DEACTIVE_ERROR); //[err.message]
    });
}

module.exports = {
    addCms,
    getCms,
    updateCms,
    activeDactiveCms,
};