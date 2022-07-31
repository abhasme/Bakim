const { successResponse, errorResponse, successResponseWithData, responsePaginate, successResponseAggregatePaginate } = require('../../helpers/Response');
const apiResponse = require('../../helpers/Response');
var ObjectID = require('mongoose').Types.ObjectId
const languageservice = require('../../services/language-service')
const translate = require('../../locales/translate')

/*========== Language Add ===================*/
const addLanguage = async (req, res) => {
    languageservice.addLanguageServices(req).then((data) => {
        return successResponseWithData(res, translate[req.headers["x-language-key"]].DATA_INSERTED_SUCCESS, data);
    })
        .catch((err) => {
            return errorResponse(res, translate[req.headers["x-language-key"]].ERROR_DATA_INSERTED);
        });
}

/*========== Language Update ===================*/
const updateLanguage = async(req, res) => {
    languageservice.updateLanguageServices(req).then((data) => {
        return successResponseWithData(res, translate[req.headers["x-language-key"]].DATA_UPDATED_SUCCESS, data);
    })
    .catch((err) => {
        return errorResponse(res, translate[req.headers["x-language-key"]][err.message]);
    });
}

/*========== Get Language Info ===================*/
const getLanguageInfo = async(req, res) => {
    languageservice.getLanguageInfoService(req).then((data) => {
        return successResponseWithData(res, translate[req.headers["x-language-key"]].DATA_RETRIVED_SUCCESS, data);
    })
    .catch((err) => {
        return errorResponse(res, translate[req.headers["x-language-key"]][err.message]);
    });
}

/*========== Language Get ===================*/
const getLanguage = async (req, res) => {
    languageservice.getLanguageService(req).then((data) => {
        return successResponseAggregatePaginate(req, res, translate[req.headers["x-language-key"]].DATA_RETRIVED_SUCCESS, data);
        //return successResponseWithData(res, translate[req.headers["x-language-key"]].DATA_RETRIVED_SUCCESS, data); //ERROR_DATA_DELETE
    })
        .catch((err) => {
            return errorResponse(res, translate[req.headers["x-language-key"]][err.message]); //[err.message]
        });
}

/*========== Language Delete ===================*/
const deleteLanguage = async(req, res) => {
    languageservice.deleteLanguageServices(req).then((data) => {
        return successResponse(res, translate[req.headers["x-language-key"]].DATA_DELETED_SUCCESS, data); //ERROR_DATA_DELETE
    })
    .catch((err) => {
        return errorResponse(res, translate[req.headers["x-language-key"]].ERROR_DATA_DELETE); //[err.message]
    });
}

module.exports = {
    addLanguage,
    getLanguage,
    updateLanguage,
    deleteLanguage,
    getLanguageInfo,
};