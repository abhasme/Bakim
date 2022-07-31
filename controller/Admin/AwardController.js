const { successResponse, errorResponse, successResponseWithData, responsePaginate, successResponseAggregatePaginate } = require('../../helpers/Response');
const apiResponse = require('../../helpers/Response');
var ObjectID = require('mongoose').Types.ObjectId
const awardservice = require('../../services/award-service')
const translate = require('../../locales/translate')


/*==== Add New Award ====*/
const createAward = async (req, res) => {
    awardservice.createAwardServices(req).then((data) => {
        return successResponseWithData(res, translate[req.headers["x-language-key"]].DATA_INSERTED_SUCCESS, data);
    })
        .catch((err) => {
            return errorResponse(res, translate[req.headers["x-language-key"]].ERROR_DATA_INSERTED);
        });
}

/*==== Update Award ====*/
const updateAward = async (req, res) => {
    awardservice.updateAwardServices(req).then((data) => {
        return successResponseWithData(res, translate[req.headers["x-language-key"]].DATA_UPDATED_SUCCESS, data);
    })
        .catch((err) => {
            return errorResponse(res, translate[req.headers["x-language-key"]][err.message]);
        });
}
/*==== Get Award ====*/
const getAward = async (req, res) => {
    awardservice.getAwardService(req).then((data) => {
        return successResponseAggregatePaginate(req, res, translate[req.headers["x-language-key"]].DATA_RETRIVED_SUCCESS, data);
    })
        .catch((err) => {
            return errorResponse(res, translate[req.headers["x-language-key"]][err.message]);
        });
}

/*==== Get Award Info ====*/
const getAwardInfo = async (req, res) => {
    awardservice.getAwardInfoService(req).then((data) => {
        return successResponseWithData(res, translate[req.headers["x-language-key"]].DATA_RETRIVED_SUCCESS, data);
    })
        .catch((err) => {
            return errorResponse(res, translate[req.headers["x-language-key"]][err.message]);
        });
}

/*==== Delete Award ====*/
const deleteAward = async (req, res) => {
    awardservice.deleteAwardServices(req).then((data) => {
        return successResponse(res, translate[req.headers["x-language-key"]].DATA_DELETED_SUCCESS, data); //ERROR_DATA_DELETE
    })
        .catch((err) => {
            return errorResponse(res, translate[req.headers["x-language-key"]].ERROR_DATA_DELETE); //[err.message]
        });
}

/*========== Update Salon Award ===================*/
const updateSalonAward = async (req, res) => {
    awardservice.updateSalonAwardService(req).then((data) => {
        return successResponseWithData(res, translate[req.headers["x-language-key"]].DATA_UPDATED_SUCCESS, data);
    })
        .catch((err) => {
            return errorResponse(res, translate[req.headers["x-language-key"]][err.message]);
        });
}
/*========== Get Salon Award ===================*/
const getSalonAwardList = async (req, res) => {
    awardservice.getSalonAwardListService(req).then((data) => {
        return successResponseAggregatePaginate(req, res, translate[req.headers["x-language-key"]].DATA_RETRIVED_SUCCESS, data);
    })
        .catch((err) => {
            return errorResponse(res, translate[req.headers["x-language-key"]][err.message]);
        });
}

/*==== Get Salon Award Info ====*/
const salonAwardInfo = async (req, res) => {
    awardservice.salonAwardInfoService(req).then((data) => {
        return successResponseWithData(res, translate[req.headers["x-language-key"]].DATA_RETRIVED_SUCCESS, data);
    })
        .catch((err) => {
            return errorResponse(res, translate[req.headers["x-language-key"]][err.message]);
        });
}

/*==== Delete Award ====*/
const deleteSalonAward = async (req, res) => {
    awardservice.deleteSalonAwardServices(req).then((data) => {
        return successResponse(res, translate[req.headers["x-language-key"]].DATA_DELETED_SUCCESS, data); //ERROR_DATA_DELETE
    })
        .catch((err) => {
            return errorResponse(res, translate[req.headers["x-language-key"]].ERROR_DATA_DELETE); //[err.message]
        });
}

module.exports = {
    createAward,
    getAward,
    updateAward,
    deleteAward,
    getSalonAwardList,
    updateSalonAward,
    getAwardInfo,
    salonAwardInfo,
    deleteSalonAward,
};