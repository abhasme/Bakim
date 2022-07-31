const { successResponse, errorResponse, successResponseWithData } = require('../helpers/Response');
const categoryservices = require('../services/category-service')
const countryservices = require('../services/country-service')
const globalservices = require('../services/global-services')
const translate = require('../locales/translate')

const getHeaderMenuList = async (req, res) => {
    categoryservices.headerMenuListService(req).then((data) => {
        return successResponseWithData(res, translate[req.headers["x-language-key"]].DATA_RETRIVED_SUCCESS, data);
    })
        .catch((err) => {
            return errorResponse(res, translate[req.headers["x-language-key"]].ERROR_DATA_RETRIVED);
        });
}

const getCountryList = async (req, res) => {
    countryservices.countryListService(req).then((data) => {
        return successResponseWithData(res, translate[req.headers["x-language-key"]].DATA_RETRIVED_SUCCESS, data);
    })
        .catch((err) => {
            return errorResponse(res, translate[req.headers["x-language-key"]].ERROR_DATA_RETRIVED);
        });
}

const getStateList = async (req, res) => {
    countryservices.stateListService(req).then((data) => {
        return successResponseWithData(res, translate[req.headers["x-language-key"]].DATA_RETRIVED_SUCCESS, data);
    })
        .catch((err) => {
            return errorResponse(res, translate[req.headers["x-language-key"]].ERROR_DATA_RETRIVED);
        });
}

const getCityList = async (req, res) => {
    countryservices.cityListService(req).then((data) => {
        return successResponseWithData(res, translate[req.headers["x-language-key"]].DATA_RETRIVED_SUCCESS, data);
    })
        .catch((err) => {
            return errorResponse(res, translate[req.headers["x-language-key"]].ERROR_DATA_RETRIVED);
        });
}

const getTopCategoryList = async (req, res) => {
    globalservices.topCategoryListService(req).then((data) => {
        return successResponseWithData(res, translate[req.headers["x-language-key"]].DATA_RETRIVED_SUCCESS, data);
    })
        .catch((err) => {
            return errorResponse(res, translate[req.headers["x-language-key"]].ERROR_DATA_RETRIVED);
        });
}

const getAllServiceList = async (req, res) => {
    globalservices.getAllServiceListService(req).then((data) => {
        return successResponseWithData(res, translate[req.headers["x-language-key"]].DATA_RETRIVED_SUCCESS, data);
    })
        .catch((err) => {
            return errorResponse(res, translate[req.headers["x-language-key"]].ERROR_DATA_RETRIVED);
        });
}

const getAllCategoryList = async (req, res) => {
    globalservices.getAllCategoryListService(req).then((data) => {
        return successResponseWithData(res, translate[req.headers["x-language-key"]].DATA_RETRIVED_SUCCESS, data);
    })
        .catch((err) => {
            return errorResponse(res, translate[req.headers["x-language-key"]].ERROR_DATA_RETRIVED);
        });
}

const getAllSalonList = async (req, res) => {
    globalservices.getAllSalonListService(req).then((data) => {
        return successResponseWithData(res, translate[req.headers["x-language-key"]].DATA_RETRIVED_SUCCESS, data);
    })
        .catch((err) => {
            return errorResponse(res, translate[req.headers["x-language-key"]].ERROR_DATA_RETRIVED);
        });
}

const getAllMembershipPlanList = async (req, res) => {
    globalservices.getAllMembershipPlanListService(req).then((data) => {
        return successResponseWithData(res, translate[req.headers["x-language-key"]].DATA_RETRIVED_SUCCESS, data);
    })
        .catch((err) => {
            return errorResponse(res, translate[req.headers["x-language-key"]].ERROR_DATA_RETRIVED);
        });
}

const getAllUserList = async (req, res) => {
    globalservices.getAllUserListService(req).then((data) => {
        return successResponseWithData(res, translate[req.headers["x-language-key"]].DATA_RETRIVED_SUCCESS, data);
    })
        .catch((err) => {
            return errorResponse(res, translate[req.headers["x-language-key"]].ERROR_DATA_RETRIVED);
        });
}

module.exports = {
    getHeaderMenuList,
    getCountryList,
    getStateList,
    getCityList,
    getTopCategoryList,
    getAllServiceList,
    getAllCategoryList,
    getAllSalonList,
    getAllMembershipPlanList,
    getAllUserList,
};