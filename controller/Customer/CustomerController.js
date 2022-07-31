const { successResponse, errorResponse, successResponseWithData, unauthorizedResponse, successResponseAggregatePaginate } = require('../../helpers/Response');
const translate = require('../../locales/translate')
const notificationservice = require('../../services/notification-service')
const customerservice = require("../../services/customer-service")
const reviewservice = require("../../services/review-service")
const categoryservice = require("../../services/category-service")
const salonservice = require("../../services/salon-service")

const getNotification = async (req, res) => {
    notificationservice.getCustomerNotificationService(req).then((data) => {
        return successResponseWithData(res, translate[req.headers["x-language-key"]].DATA_RETRIVED_SUCCESS, data);
    })
        .catch((err) => {
            return errorResponse(res, translate[req.headers["x-language-key"]][err.message]);
        });
}

const updateCustomer = async (req, res) => {
    customerservice.updateCustomerService(req).then((data) => {
        return successResponseWithData(res, translate[req.headers["x-language-key"]].DATA_UPDATED_SUCCESS, data);
    })
        .catch((err) => {
            return errorResponse(res, translate[req.headers["x-language-key"]][err.message]);
        });
}

const customerProfileInfo = async (req, res) => {
    customerservice.customerProfileInfoService(req).then((data) => {
        return successResponseWithData(res, translate[req.headers["x-language-key"]].DATA_RETRIVED_SUCCESS, data);
    })
        .catch((err) => {
            return errorResponse(res, translate[req.headers["x-language-key"]][err.message]);
        });
}
// const getNotification = async(req, res) => {
//     notificationservice.getNotificationService(req).then((data) => {
//         return successResponseAggregatePaginate(req, res, translate[req.headers["x-language-key"]].DATA_RETRIVED_SUCCESS, data);
//     })
//     .catch((err) => {
//         return errorResponse(res, translate[req.headers["x-language-key"]][err.message]);
//     });
// }
const getSalonList = async (req, res) => {
    customerservice.getSalonListService(req).then((data) => {
        return successResponseAggregatePaginate(req, res, translate[req.headers["x-language-key"]].DATA_RETRIVED_SUCCESS, data);
    })
        .catch((err) => {
            return errorResponse(res, translate[req.headers["x-language-key"]][err.message]);
        });

}

const getSalonListByCategory = async (req, res) => {
    customerservice.getSalonListByCategoryService(req).then((data) => {
        return successResponseAggregatePaginate(req, res, translate[req.headers["x-language-key"]].DATA_RETRIVED_SUCCESS, data);
    })
        .catch((err) => {
            return errorResponse(res, translate[req.headers["x-language-key"]][err.message]);
        });

}

const getSalonListByService = async (req, res) => {
    customerservice.getSalonListByServiceService(req).then((data) => {
        return successResponseAggregatePaginate(req, res, translate[req.headers["x-language-key"]].DATA_RETRIVED_SUCCESS, data);
    })
        .catch((err) => {
            return errorResponse(res, translate[req.headers["x-language-key"]][err.message]);
        });
}

const addReviewSalon = async (req, res) => {
    reviewservice.addReviewSalonService(req).then((data) => {
        return successResponseWithData(res, translate[req.headers["x-language-key"]].DATA_UPDATED_SUCCESS, data);
    })
        .catch((err) => {
            return errorResponse(res, translate[req.headers["x-language-key"]][err.message]);
        });
}

const getReview = async (req, res) => {
    reviewservice.getReviewService(req).then((data) => {
        return successResponseAggregatePaginate(req, res, translate[req.headers["x-language-key"]].DATA_RETRIVED_SUCCESS, data);
    })
        .catch((err) => {
            return errorResponse(res, translate[req.headers["x-language-key"]][err.message]);
        });
}

const categoryList = async (req, res) => {
    categoryservice.categoryListService(req).then((data) => {
        return successResponseWithData(res, translate[req.headers["x-language-key"]].DATA_RETRIVED_SUCCESS, data);
    })
        .catch((err) => {
            return errorResponse(res, translate[req.headers["x-language-key"]][err.message]);
        });
}

const getSalonShop = async (req, res) => {
    salonservice.getSalonShopService(req).then((data) => {
        return successResponseWithData(res, translate[req.headers["x-language-key"]].DATA_RETRIVED_SUCCESS, data);
    })
        .catch((err) => {
            return errorResponse(res, translate[req.headers["x-language-key"]][err.message]);
        });
}

const getTeamPortfolio = async (req, res) => {
    customerservice.getTeamPortfolioService(req).then((data) => {
        return successResponseWithData(res, translate[req.headers["x-language-key"]].DATA_RETRIVED_SUCCESS, data);
    })
        .catch((err) => {
            return errorResponse(res, translate[req.headers["x-language-key"]][err.message]);
        });
}

const employeeWorkDetail = async (req, res) => {
    customerservice.employeeWorkDetailService(req).then((data) => {
        return successResponseWithData(res, translate[req.headers["x-language-key"]].DATA_RETRIVED_SUCCESS, data);
    })
        .catch((err) => {
            return errorResponse(res, translate[req.headers["x-language-key"]][err.message]);
        });
}

module.exports = {
    getNotification,
    getSalonList,
    getSalonListByCategory,
    getSalonListByService,
    addReviewSalon,
    getReview,
    updateCustomer,
    customerProfileInfo,
    categoryList,
    getSalonShop,
    getTeamPortfolio,
    employeeWorkDetail,
};
