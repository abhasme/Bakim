const { successResponse, errorResponse, successResponseWithData, responsePaginate, successResponseAggregatePaginate } = require('../../helpers/Response');
const apiResponse = require('../../helpers/Response');
var ObjectID = require('mongoose').Types.ObjectId
const aminityservice = require('../../services/aminity-service')
const translate = require('../../locales/translate')

// Add New Category
const createAminity = async (req, res) => {
    aminityservice.createAminityServices(req).then((data) => {
        return successResponseWithData(res, translate[req.headers["x-language-key"]].DATA_INSERTED_SUCCESS, data);
    })
        .catch((err) => {
            return errorResponse(res, translate[req.headers["x-language-key"]].ERROR_DATA_INSERTED);
        });
}
// Update Category
const updateAminity = async (req, res) => {
    aminityservice.updateAminityServices(req).then((data) => {
        return successResponseWithData(res, translate[req.headers["x-language-key"]].DATA_UPDATED_SUCCESS, data);
    })
        .catch((err) => {
            return errorResponse(res, translate[req.headers["x-language-key"]][err.message]);
        });
}
/*========== Get Amenity ===================*///
const getAminity = async (req, res) => {
    aminityservice.getAminityService(req).then((data) => {
        return successResponseAggregatePaginate(req, res, translate[req.headers["x-language-key"]].DATA_RETRIVED_SUCCESS, data);
    })
        .catch((err) => {
            return errorResponse(res, translate[req.headers["x-language-key"]][err.message]);
        });
}
/*========== Get Amenity Info ===================*/
const getAminityInfo = async(req, res) => {
    aminityservice.getAminityInfoService(req).then((data) => {
        return successResponseWithData(res, translate[req.headers["x-language-key"]].DATA_RETRIVED_SUCCESS, data);
    })
    .catch((err) => {
        return errorResponse(res, translate[req.headers["x-language-key"]][err.message]);
    });
}

/*========== Delete Amenity ===================*///
const deleteAmenity = async (req, res) => {
    aminityservice.deleteAmenityServices(req).then((data) => {
        return successResponse(res, translate[req.headers["x-language-key"]].DATA_DELETED_SUCCESS, data); //ERROR_DATA_DELETE
    })
        .catch((err) => {
            return errorResponse(res, translate[req.headers["x-language-key"]].ERROR_DATA_DELETE); //[err.message]
        });
}

module.exports = {
    createAminity,
    updateAminity,
    getAminity,
    deleteAmenity,
    getAminityInfo,
};