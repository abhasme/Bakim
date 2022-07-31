const { successResponse, errorResponse, successResponseWithData, responsePaginate, successResponseAggregatePaginate } = require('../../helpers/Response');
var ObjectID = require('mongoose').Types.ObjectId
const membershipservice = require('../../services/membership-service')
const translate = require('../../locales/translate')
const membershipservices = require('../../services/membership-service')

const membershipCreate = async (req, res) => {
    membershipservice.createMembershipServices(req).then((data) => {
        return successResponseWithData(res, translate[req.headers["x-language-key"]].DATA_INSERTED_SUCCESS, data);
    })
        .catch((err) => {
            return errorResponse(res, translate[req.headers["x-language-key"]].ERROR_DATA_INSERTED);
        });
}

const membershipAddonCreate = async (req, res) => {
    membershipservice.createMembershipAddonServices(req).then((data) => {
        return successResponseWithData(res, translate[req.headers["x-language-key"]].DATA_INSERTED_SUCCESS, data);
    })
        .catch((err) => {
            return errorResponse(res, translate[req.headers["x-language-key"]].ERROR_DATA_INSERTED);
        });
}

const membershipList = async (req, res) => {
    membershipservices.membershipListService(req).then((data) => {
        return successResponseAggregatePaginate(req, res, translate[req.headers["x-language-key"]].DATA_RETRIVED_SUCCESS, data);
    })
        .catch((err) => {
            return errorResponse(res, translate[req.headers["x-language-key"]].ERROR_DATA_RETRIVED);
        });
}
const membershipAddonList = async (req, res) => {
    membershipservices.membershipAddonListService(req).then((data) => {
        return successResponseAggregatePaginate(req, res, translate[req.headers["x-language-key"]].DATA_RETRIVED_SUCCESS, data);
        //return successResponseWithData(res, translate[req.headers["x-language-key"]].DATA_RETRIVED_SUCCESS, data);
    })
        .catch((err) => {
            return errorResponse(res, translate[req.headers["x-language-key"]].ERROR_DATA_RETRIVED);
        });
}

const membershipUpdate = async (req, res) => {
    membershipservice.updateMembershipServices(req).then((data) => {
        return successResponseWithData(res, translate[req.headers["x-language-key"]].DATA_UPDATED_SUCCESS, data);
    })
        .catch((err) => {
            return errorResponse(res, translate[req.headers["x-language-key"]][err.message]);
        });
}

const membershipAddonUpdate = async (req, res) => {
    membershipservice.updateMembershipAddonServices(req).then((data) => {
        return successResponseWithData(res, translate[req.headers["x-language-key"]].DATA_UPDATED_SUCCESS, data);
    })
        .catch((err) => {
            return errorResponse(res, translate[req.headers["x-language-key"]][err.message]);
        });
}

const membershipDelete = async (req, res) => {
    membershipservice.membershipDeleteServices(req).then((data) => {
        return successResponse(res, translate[req.headers["x-language-key"]].DATA_DELETED_SUCCESS, data);
    })
        .catch((err) => {
            return errorResponse(res, translate[req.headers["x-language-key"]][err.message]);
        });
}
const membershipAddonDelete = async (req, res) => {
    membershipservice.membershipAddonDeleteServices(req).then((data) => {
        return successResponse(res, translate[req.headers["x-language-key"]].DATA_DELETED_SUCCESS, data);
    })
        .catch((err) => {
            return errorResponse(res, translate[req.headers["x-language-key"]][err.message]);
        });
}

const getmembershipInfo = async (req, res) => {
    membershipservice.getmembershipInfoServices(req).then((data) => {
        return successResponseWithData(res, translate[req.headers["x-language-key"]].DATA_RETRIVED_SUCCESS, data);
    })
        .catch((err) => {
            return errorResponse(res, translate[req.headers["x-language-key"]][err.message]);
        });
}
const getmembershipAddonInfo = async (req, res) => {
    membershipservice.getmembershipAddonInfoServices(req).then((data) => {
        return successResponseWithData(res, translate[req.headers["x-language-key"]].DATA_RETRIVED_SUCCESS, data);
    })
        .catch((err) => {
            return errorResponse(res, translate[req.headers["x-language-key"]][err.message]);
        });
}
const purchaseMembership = async (req, res) => {
    membershipservices.purchaseMembershipService(req).then((data) => {
        return successResponseWithData(res, translate[req.headers["x-language-key"]].DATA_INSERTED_SUCCESS, data);
    })
        .catch((err) => {
            return errorResponse(res, translate[req.headers["x-language-key"]].ERROR_DATA_INSERTED);
        });
}
const purchaseMembershipAddOn = async (req, res) => {
    membershipservices.purchaseMembershipAddOnService(req).then((data) => {
        return successResponseWithData(res, translate[req.headers["x-language-key"]].DATA_INSERTED_SUCCESS, data);
    })
        .catch((err) => {
            return errorResponse(res, translate[req.headers["x-language-key"]].ERROR_DATA_INSERTED);
        });
}
const activeMembership = async (req,res) => {
    membershipservices.activeMembershipService(req).then((data) => {
        return successResponseWithData(res, translate[req.headers["x-language-key"]].DATA_RETRIVED_SUCCESS, data);
    })
        .catch((err) => {
            return errorResponse(res, translate[req.headers["x-language-key"]].ERROR_DATA_RETRIVED);
        });
}
const activeMembershipAddOn = async (req,res) => {
    membershipservices.activeMembershipAddOnService(req).then((data) => {
        return successResponseWithData(res, translate[req.headers["x-language-key"]].DATA_RETRIVED_SUCCESS, data);
    })
        .catch((err) => {
            return errorResponse(res, translate[req.headers["x-language-key"]].ERROR_DATA_RETRIVED);
        });
}
const getSalonInvocing = async (req,res) => {
    membershipservices.getSalonInvocingService(req).then((data) => {
        return successResponseWithData(res, translate[req.headers["x-language-key"]].DATA_RETRIVED_SUCCESS, data);
    })
        .catch((err) => {
            return errorResponse(res, translate[req.headers["x-language-key"]].DATA_RETRIVED_SUCCESS);
        });
}
const membershipAutoRenew = async (req, res) => {
    membershipservices.membershipAutoRenewServices(req).then((data) => {
        return successResponseWithData(res, translate[req.headers["x-language-key"]].DATA_UPDATED_SUCCESS, data);
    })
        .catch((err) => {
            return errorResponse(res, translate[req.headers["x-language-key"]].ERROR_DATA_INSERTED);
        });
}

module.exports = {
    membershipCreate,
    membershipAddonCreate,
    membershipList,
    membershipAddonList,
    membershipUpdate,
    membershipAddonUpdate,
    membershipDelete,
    membershipAddonDelete,
    getmembershipInfo,
    getmembershipAddonInfo,
    purchaseMembership,
    purchaseMembershipAddOn,
    activeMembership,
    activeMembershipAddOn,
    getSalonInvocing,
    membershipAutoRenew,
};
