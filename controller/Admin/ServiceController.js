const { successResponse, errorResponse, successResponseWithData, unauthorizedResponse, emailUnVerfiedResponse, mobileUnVerfiedResponse, successResponseAggregatePaginate } = require('../../helpers/Response');
var ObjectID = require('mongoose').Types.ObjectId
const servicesservice = require('../../services/service-service')
const translate = require('../../locales/translate')

const addService = async (req, res) => {
    servicesservice.addServicesService(req).then((data) => {
        return successResponseWithData(res, translate[req.headers["x-language-key"]].DATA_INSERTED_SUCCESS, data);
    })
        .catch((err) => {
            return errorResponse(res, translate[req.headers["x-language-key"]].ERROR_DATA_INSERTED);
        });
}

const updateService = async (req, res) => {
    servicesservice.updateServicesService(req).then((data) => {
        return successResponseWithData(res, translate[req.headers["x-language-key"]].DATA_UPDATED_SUCCESS, data);
    })
        .catch((err) => {
            return errorResponse(res, translate[req.headers["x-language-key"]][err.message]);
        });
}

//Get Service List
const getServiceList = async (req, res) => {
    servicesservice.getServicesService(req).then((data) => {
        return successResponseAggregatePaginate(req, res, translate[req.headers["x-language-key"]].DATA_RETRIVED_SUCCESS, data);
    })
        .catch((err) => {
            return errorResponse(res, translate[req.headers["x-language-key"]][err.message]);
        });
}

const activeDeactiveService = async (req, res) => {
    servicesservice.activeDeactiveServiceService(req).then((data) => {
        return successResponseWithData(res, translate[req.headers["x-language-key"]].DATA_UPDATED_SUCCESS, data);
    })
        .catch((err) => {
            return errorResponse(res, translate[req.headers["x-language-key"]].ERROR_DATA_UPDATE);
        });
}
const addServiceGroup = async (req, res) => {
    servicesservice.addServiceGroupService(req).then((data) => {
        return successResponseWithData(res, translate[req.headers["x-language-key"]].DATA_INSERTED_SUCCESS, data);
    })
        .catch((err) => {
            return errorResponse(res, translate[req.headers["x-language-key"]].ERROR_DATA_INSERTED);
        });
}

const updateServiceGroup = async (req, res) => {
    servicesservice.updateServiceGroupService(req).then((data) => {
        return successResponseWithData(res, translate[req.headers["x-language-key"]].DATA_UPDATED_SUCCESS, data);
    })
        .catch((err) => {
            return errorResponse(res, translate[req.headers["x-language-key"]][err.message]);
        });
}

const getServiceGroupinfo = async (req, res) => {
    servicesservice.getServiceGroupinfoService(req).then((data) => {
        return successResponseWithData(res, translate[req.headers["x-language-key"]].DATA_RETRIVED_SUCCESS, data);
    })
        .catch((err) => {
            return errorResponse(res, translate[req.headers["x-language-key"]][err.message]);
        });
}

const activeDeactiveServiceGroup = async (req, res) => {
    servicesservice.activeDeactiveServiceGroupService(req).then((data) => {
        return successResponseWithData(res, translate[req.headers["x-language-key"]].DATA_UPDATED_SUCCESS, data);
    })
        .catch((err) => {
            return errorResponse(res, translate[req.headers["x-language-key"]][err.message]);
        });
}

const getServiceGroupList = async (req, res) => {
    servicesservice.getServiceGroupListService(req).then((data) => {
        return successResponseAggregatePaginate(req, res, translate[req.headers["x-language-key"]].DATA_RETRIVED_SUCCESS, data);
    })
        .catch((err) => {
            return errorResponse(res, translate[req.headers["x-language-key"]][err.message]);
        });
}

const deleteService = async (req, res) => {
    servicesservice.deleteServiceService(req).then((data) => {
        return successResponse(res, translate[req.headers["x-language-key"]].DATA_DELETED_SUCCESS, data);
    })
        .catch((err) => {
            return errorResponse(res, translate[req.headers["x-language-key"]][err.message]);
        });
}

const getSalonServiceList = async (req, res) => {
    servicesservice.salonServiceListService(req).then((data) => {
        return successResponseWithData(res, translate[req.headers["x-language-key"]].DATA_INSERTED_SUCCESS, data);
    })
        .catch((err) => {
            return errorResponse(res, translate[req.headers["x-language-key"]].DATA_RETRIVED_SUCCESS);
        });
}

const getSalonServiceInfo = async (req, res) => {
    servicesservice.salonServiceInfoService(req).then((data) => {
        return successResponseWithData(res, translate[req.headers["x-language-key"]].DATA_INSERTED_SUCCESS, data);
    })
        .catch((err) => {
            return errorResponse(res, translate[req.headers["x-language-key"]].DATA_RETRIVED_SUCCESS);
        });
}

const getServiceInfo = async (req, res) => {
    servicesservice.getServiceInfoService(req).then((data) => {
        return successResponseWithData(res, translate[req.headers["x-language-key"]].DATA_RETRIVED_SUCCESS, data);
    })
        .catch((err) => {
            return errorResponse(res, translate[req.headers["x-language-key"]][err.message]);
        });
}

const deleteServiceGroup = async (req, res) => {
    servicesservice.deleteServiceGroupService(req).then((data) => {
        return successResponse(res, translate[req.headers["x-language-key"]].DATA_DELETED_SUCCESS, data);
    })
        .catch((err) => {
            return errorResponse(res, translate[req.headers["x-language-key"]][err.message]);
        });
}

module.exports = {
    addService,
    updateService,
    getServiceList,
    activeDeactiveService,
    addServiceGroup,
    updateServiceGroup,
    getServiceGroupList,
    deleteService,
    getSalonServiceList,
    getSalonServiceInfo,
    activeDeactiveServiceGroup,
    getServiceInfo,
    getServiceGroupinfo,
    deleteServiceGroup,
};