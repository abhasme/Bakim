const { successResponse, errorResponse, successResponseWithData, unauthorizedResponse, successResponseAggregatePaginate } = require('../../helpers/Response');
const translate = require('../../locales/translate')
const salonservice = require('../../services/salon-service')
const serviceservice = require('../../services/service-service')
const portfolioservice = require('../../services/portfolio-service')
const productservice = require('../../services/product-service')
const awardservice = require('../../services/award-service')

const salonDetail = async (req, res) => {
    salonservice.salonDetailServices(req).then((data) => {
        return successResponseWithData(res, translate[req.headers["x-language-key"]].DATA_RETRIVED_SUCCESS, data);
    })
        .catch((err) => {
            return errorResponse(res, translate[req.headers["x-language-key"]].ERROR_DATA_RETRIVED);
        });
}

const salonServices = async (req, res) => {
    serviceservice.salonServiceListService(req).then((data) => {
        return successResponseWithData(res, translate[req.headers["x-language-key"]].DATA_RETRIVED_SUCCESS, data);
    })
        .catch((err) => {
            return errorResponse(res, translate[req.headers["x-language-key"]].ERROR_DATA_RETRIVED);
        });
}

const salonWorkinfo = async (req, res) => {
    req.body.userid = req.body.userid ? req.body.userid : req.body.salonid;
    portfolioservice.getPortfolioService(req).then((data) => {
        return successResponseWithData(res, translate[req.headers["x-language-key"]].DATA_RETRIVED_SUCCESS, data);
    })
        .catch((err) => {
            return errorResponse(res, translate[req.headers["x-language-key"]].ERROR_DATA_RETRIVED);
        });
}

const salonReviews = async (req, res) => {
    salonservice.salonReviewListService(req).then((data) => {
        return successResponseWithData(res, translate[req.headers["x-language-key"]].DATA_RETRIVED_SUCCESS, data);
    })
        .catch((err) => {
            return errorResponse(res, translate[req.headers["x-language-key"]].ERROR_DATA_RETRIVED);
        });
}

const salonTeamMembers = async (req, res) => {
    salonservice.salonTeamMembersService(req).then((data) => {
        return successResponseAggregatePaginate(req, res, translate[req.headers["x-language-key"]].DATA_RETRIVED_SUCCESS, data);
    })
        .catch((err) => {
            return errorResponse(res, translate[req.headers["x-language-key"]].ERROR_DATA_RETRIVED);
        });
}

const salonTeamMembersInfo = async (req, res) => {
    salonservice.salonTeamMembersInfoService(req).then((data) => {
        return successResponseWithData(res, translate[req.headers["x-language-key"]].DATA_RETRIVED_SUCCESS, data);
    })
        .catch((err) => {
            return errorResponse(res, translate[req.headers["x-language-key"]].ERROR_DATA_RETRIVED);
        });
}

const getSalonAmenities = async (req, res) => {
    salonservice.salonAmenitiesService(req).then((data) => {
        return successResponseWithData(res, translate[req.headers["x-language-key"]].DATA_RETRIVED_SUCCESS, data);
    })
        .catch((err) => {
            return errorResponse(res, translate[req.headers["x-language-key"]].ERROR_DATA_RETRIVED);
        });
}

const getSalonProducts = async (req, res) => {
    productservice.getProductService(req).then((data) => {
        return successResponseWithData(res, translate[req.headers["x-language-key"]].DATA_RETRIVED_SUCCESS, data);
    })
        .catch((err) => {
            return errorResponse(res, translate[req.headers["x-language-key"]].ERROR_DATA_RETRIVED);
        });
}

const getSalonAwards = async (req, res) => {
    awardservice.getSalonAwardListService(req).then((data) => {
        return successResponseAggregatePaginate(req, res, translate[req.headers["x-language-key"]].DATA_RETRIVED_SUCCESS, data);
    })
        .catch((err) => {
            return errorResponse(res, translate[req.headers["x-language-key"]].ERROR_DATA_RETRIVED);
        });
}

module.exports = {
    salonDetail,
    salonServices,
    salonWorkinfo,
    salonReviews,
    salonTeamMembers,
    salonTeamMembersInfo,
    getSalonAmenities,
    getSalonProducts,
    getSalonAwards,
};