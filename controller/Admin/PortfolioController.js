const { successResponse, errorResponse, successResponseWithData, responsePaginate, successResponseAggregatePaginate } = require('../../helpers/Response');
const apiResponse = require('../../helpers/Response');
var ObjectID = require('mongoose').Types.ObjectId
const portfolioservice = require('../../services/portfolio-service')
const translate = require('../../locales/translate')

/*========== Create Portfolio ===================*/
const addPortfolio = async (req, res) => {
    portfolioservice.addPortfolioServices(req).then((data) => {
        return successResponseWithData(res, translate[req.headers["x-language-key"]].DATA_INSERTED_SUCCESS, data);
    })
        .catch((err) => {
            return errorResponse(res, translate[req.headers["x-language-key"]].ERROR_DATA_INSERTED);
        });
}
/*========== Update Portfolio ===================*/
const updatePortfolio = async (req, res) => {
    portfolioservice.updatePortfolioService(req).then((data) => {
        return successResponseWithData(res, translate[req.headers["x-language-key"]].DATA_UPDATED_SUCCESS, data);
    })
        .catch((err) => {
            return errorResponse(res, translate[req.headers["x-language-key"]][err.message]);
        });
}

/*========== Get Portfolio ===================*/
const getPortfolio = async (req, res) => {
    portfolioservice.getPortfolioService(req).then((data) => {
        return successResponseWithData(res, translate[req.headers["x-language-key"]].DATA_RETRIVED_SUCCESS, data);
    })
        .catch((err) => {
            return errorResponse(res, translate[req.headers["x-language-key"]][err.message]);
        });
}

/*========== Get Portfolio Info ===================*/
const getPortfolioInfo = async (req, res) => {
    portfolioservice.getPortfolioInfoService(req).then((data) => {
        return successResponseWithData(res, translate[req.headers["x-language-key"]].DATA_RETRIVED_SUCCESS, data);
    })
        .catch((err) => {
            return errorResponse(res, translate[req.headers["x-language-key"]][err.message]);
        });
}

/*========== Delete Portfolio ===================*///
const deletePortfolio = async (req, res) => {
    portfolioservice.deletePortfolioServices(req).then((data) => {
        return successResponse(res, translate[req.headers["x-language-key"]].DATA_DELETED_SUCCESS, data); //ERROR_DATA_DELETE
    })
        .catch((err) => {
            return errorResponse(res, translate[req.headers["x-language-key"]].ERROR_DATA_DELETE); //[err.message]
        });
}

module.exports = {
    addPortfolio,
    updatePortfolio,
    getPortfolio,
    deletePortfolio,
    getPortfolioInfo,
};