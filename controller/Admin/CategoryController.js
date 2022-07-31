const {successResponse , errorResponse, successResponseWithData, responsePaginate, successResponseAggregatePaginate} = require('../../helpers/Response');
const apiResponse = require('../../helpers/Response');
var ObjectID = require('mongoose').Types.ObjectId
const categoryservice = require('../../services/category-service')
const translate = require('../../locales/translate')
// // Get Category List
// const getCategoriesList = async(req, res) => {
//     categoryservice.categoryListService(req).then((data) => {
//         return responsePaginate(res, translate[req.headers["x-language-key"]].DATA_RETRIVED_SUCCESS, data);
//     })
//     .catch((err) => {
//         return errorResponse(res, translate[req.headers["x-language-key"]][err.message]);
//     }); 
// }
// Add New Category
const categoryCreate = async(req, res) => {
    categoryservice.createCategoryServices(req).then((data) => {
        return successResponseWithData(res, translate[req.headers["x-language-key"]].DATA_INSERTED_SUCCESS, data);
    })
    .catch((err) => {
        return errorResponse(res, translate[req.headers["x-language-key"]].ERROR_DATA_INSERTED);
    });
}
// Update Category
const categoryUpdate = async(req, res) => {
    categoryservice.updateCategoryServices(req).then((data) => {
        return successResponseWithData(res, translate[req.headers["x-language-key"]].DATA_UPDATED_SUCCESS, data);
    })
    .catch((err) => {
        return errorResponse(res, translate[req.headers["x-language-key"]][err.message]);
    });
}

//Get Service List
const getCategoryList = async(req, res) => {
    categoryservice.getCategoryService(req).then((data) => {
        return successResponseAggregatePaginate(req, res, translate[req.headers["x-language-key"]].DATA_RETRIVED_SUCCESS, data);
    })
    .catch((err) => {
        return errorResponse(res, translate[req.headers["x-language-key"]][err.message]);
    }); 
}

//Active Deactive Category
const activeDeactiveCategory = async(req, res) => {
    categoryservice.activeDeactiveCategoryService(req).then((data) => {
        return successResponseWithData(res, translate[req.headers["x-language-key"]].DATA_UPDATED_SUCCESS, data);
    })
    .catch((err) => {
        return errorResponse(res, translate[req.headers["x-language-key"]].ERROR_DATA_UPDATE);
    }); 
}

// Deleye Category
const categoryDelete = async(req, res) => {
    categoryservice.categoryDeleteServices(req).then((data) => {
        return successResponse(res, translate[req.headers["x-language-key"]].DATA_DELETED_SUCCESS, data);
    })
    .catch((err) => {
        return errorResponse(res, translate[req.headers["x-language-key"]][err.message]);
    });
}

const getCategoryInfo = async(req, res) => {
    categoryservice.getCategoryInfoService(req).then((data) => {
        return successResponseWithData(res, translate[req.headers["x-language-key"]].DATA_RETRIVED_SUCCESS, data);
    })
    .catch((err) => {
        return errorResponse(res, translate[req.headers["x-language-key"]][err.message]);
    });
}

module.exports = {
    getCategoryList,
    categoryCreate,
    categoryUpdate,
    activeDeactiveCategory,
    categoryDelete,
    getCategoryInfo,
};
