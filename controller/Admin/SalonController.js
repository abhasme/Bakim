const { successResponse, errorResponse, successResponseWithData, unauthorizedResponse, emailUnVerfiedResponse, mobileUnVerfiedResponse, successResponseAggregatePaginate } = require('../../helpers/Response');
var ObjectID = require('mongoose').Types.ObjectId
const authservices = require('../../services/auth-service')
const salonservice = require('../../services/salon-service')
const translate = require('../../locales/translate')
const { Users } = require('../../models/UserModel')
const languageservice = require("../../services/language-service")

const salonRegistration = async (req, res) => {
    req.body.userType = 'Salon';
    req.body.source = "Manual"
    notes = req.body.notes;
    if (req.file && req.file.path) {
        req.body.profileImage = req.file.path ? req.file.path : "";
    }
    req.body.userUniqueId = await Users.GetUserUniqueId()
    req.body.userUniqueId = req.body.userUniqueId ? req.body.userUniqueId : 123456;
    authservices.userSignupService(req).then((data) => {
        return successResponseWithData(res, translate[req.headers["x-language-key"]].DATA_INSERTED_SUCCESS, data);
    })
        .catch((err) => {
            return errorResponse(res, err);
            // return errorResponse(res, translate[req.headers["x-language-key"]].ERROR_DATA_INSERTED);
        });
}

//Salon Request List
const salonRequestedList = async (req, res) => {
    salonservice.salonRequestedService(req).then((data) => {
        return successResponseAggregatePaginate(req, res, translate[req.headers["x-language-key"]].DATA_RETRIVED_SUCCESS, data);
    })
        .catch((err) => {
            return errorResponse(res, translate[req.headers["x-language-key"]][err.message]);
        });
}
// Salon Approved List
const salonApprovedList = async (req, res) => {
    salonservice.salonApprovedService(req).then((data) => {
        return successResponseAggregatePaginate(req, res, translate[req.headers["x-language-key"]].DATA_RETRIVED_SUCCESS, data);
    })
        .catch((err) => {
            return errorResponse(res, translate[req.headers["x-language-key"]][err.message]);
        });
}
const salonPhotoUpload = async (req, res) => {
    salonservice.salonPhotoUploadService(req).then((data) => {
        return successResponseWithData(res, translate[req.headers["x-language-key"]].DATA_UPDATED_SUCCESS, data);
    })
        .catch((err) => {
            return errorResponse(res, translate[req.headers["x-language-key"]][err.message]);
        });
}

const salonPhotoUploadGet = async (req, res) => {
    salonservice.salonPhotoUploadGetServiceAdmin(req).then((data) => {
        return successResponseWithData(res, translate[req.headers["x-language-key"]].DATA_UPDATED_SUCCESS, data);
    })
        .catch((err) => {
            return errorResponse(res, translate[req.headers["x-language-key"]][err.message]);
        });
}
const salonDeleteImage = async (req, res) => {
    salonservice.salonDeleteImageServiceAdmin(req).then((data) => {
        return successResponseWithData(res, translate[req.headers["x-language-key"]].DATA_UPDATED_SUCCESS, data);
    })
        .catch((err) => {
            return errorResponse(res, translate[req.headers["x-language-key"]][err.message]);
        });
}

const salonUpdateStatus = async (req, res) => {
    salonservice.salonUpdateStatusService(req).then((data) => {
        return successResponseWithData(res, translate[req.headers["x-language-key"]].DATA_UPDATED_SUCCESS, data);
    })
        .catch((err) => {
            return errorResponse(res, translate[req.headers["x-language-key"]][err.message]);
        });
}
const salonProfileInfo = async (req, res) => {
    salonservice.salonProfileInfoService(req).then((data) => {
        return successResponseWithData(res, translate[req.headers["x-language-key"]].DATA_UPDATED_SUCCESS, data);
    })
        .catch((err) => {
            return errorResponse(res, translate[req.headers["x-language-key"]][err.message]);
        });
}
/*====Salon Update About Company ====*/
const updateAboutCompany = async (req, res) => {
    salonservice.updateaboutCompanyService(req).then((data) => {
        return successResponseWithData(res, translate[req.headers["x-language-key"]].DATA_UPDATED_SUCCESS, data);
    })
        .catch((err) => {
            return errorResponse(res, translate[req.headers["x-language-key"]].ERROR_DATA_UPDATE);
        });
}
/*====Get About Company ====*/
const getAboutCompany = async (req, res) => {
    salonservice.getAboutCompanyService(req).then((data) => {
        return successResponseWithData(res, translate[req.headers["x-language-key"]].DATA_RETRIVED_SUCCESS, data);
    })
        .catch((err) => {
            return errorResponse(res, translate[req.headers["x-language-key"]].DATA_RETRIVED_SUCCESS);
        });
}

/*====Salon Update Working Hours ====*/
const updateWorkingHours = async (req, res) => {
    salonservice.updateOpeningHourService(req).then((data) => {
        return successResponseWithData(res, translate[req.headers["x-language-key"]].DATA_UPDATED_SUCCESS, data);
    })
        .catch((err) => {
            return errorResponse(res, translate[req.headers["x-language-key"]].ERROR_DATA_UPDATE);
        });
}
/*====Salon Get Working Houes ====*/
const getWorkingHours = async (req, res) => {
    salonservice.getWorkingHoursService(req).then((data) => {
        return successResponseWithData(res, translate[req.headers["x-language-key"]].DATA_RETRIVED_SUCCESS, data); //ERROR_DATA_DELETE
    })
        .catch((err) => {
            return errorResponse(res, translate[req.headers["x-language-key"]][err.message]); //[err.message]
        });
}
/*====Salon Update ====*/
const updateNotesAndStatus = async (req, res) => {
    salonservice.updateNotesAndStatusService(req).then((data) => {
        return successResponseWithData(res, translate[req.headers["x-language-key"]].DATA_UPDATED_SUCCESS, data);
    })
        .catch((err) => {
            return errorResponse(res, translate[req.headers["x-language-key"]].ERROR_DATA_UPDATE);
        });
}

/*========== Salon Active Inactive ===================*///
const salonActiveInactive = async (req, res) => {
    salonservice.salonActiveInactiveService(req).then((data) => {
        return successResponseWithData(res, translate[req.headers["x-language-key"]].DATA_UPDATED_SUCCESS, data);
    })
        .catch((err) => {
            return errorResponse(res, translate[req.headers["x-language-key"]].ERROR_DATA_UPDATE);
        });
}

/*====Create Amenity ====*/
const updateSalonAminity = async (req, res) => {
    salonservice.updateSalonAminityService(req).then((data) => {
        return successResponseWithData(res, translate[req.headers["x-language-key"]].DATA_INSERTED_SUCCESS, data);
    })
        .catch((err) => {
            return errorResponse(res, translate[req.headers["x-language-key"]][err.message]);
        });
}
const getSalonAminity = async (req, res) => {
    salonservice.getSalonAminityService(req).then((data) => {
        return successResponseWithData(res, translate[req.headers["x-language-key"]].DATA_RETRIVED_SUCCESS, data);
    })
        .catch((err) => {
            return errorResponse(res, translate[req.headers["x-language-key"]].DATA_RETRIVED_SUCCESS);
        });
}

const updateDeletePortfolioImage = async (req, res) => {
    salonservice.deletePortfolioImageService(req).then((data) => {
        return successResponse(res, translate[req.headers["x-language-key"]].DATA_DELETED_SUCCESS, data); //ERROR_DATA_DELETE
    })
        .catch((err) => {
            return errorResponse(res, translate[req.headers["x-language-key"]].ERROR_DATA_DELETE); //[err.message]
        });
}
/*==== Salon Edit ====*/
const salonUserInfoUpdate = async (req, res) => {
    salonservice.salonUserInfoUpdateServiceAdmin(req).then((data) => {
        return successResponseWithData(res, translate[req.headers["x-language-key"]].DATA_UPDATED_SUCCESS, data);
    })
        .catch((err) => {
            // return errorResponse(res, translate[req.headers["x-language-key"]].ERROR_DATA_UPDATE);
            return errorResponse(res, err);
        });
}

/*==== Get Salon Edit ====*/
const getSalonUserInfo = async (req, res) => {
    salonservice.getSalonUserInfoServiceAdmin(req).then((data) => {
        return successResponseWithData(res, translate[req.headers["x-language-key"]].DATA_RETRIVED_SUCCESS, data);
    })
        .catch((err) => {
            return errorResponse(res, translate[req.headers["x-language-key"]].DATA_RETRIVED_SUCCESS);
        });
}
const getSalonLanguage = async (req, res) => {
    languageservice.getSalonLanguageService(req).then((data) => {
        return successResponseWithData(res, translate[req.headers["x-language-key"]].DATA_RETRIVED_SUCCESS, data);
    })
        .catch((err) => {
            return errorResponse(res, translate[req.headers["x-language-key"]].DATA_RETRIVED_SUCCESS);
        });
} 
const updateSalonLanguage = async (req, res) => {
    languageservice.updateSalonLanguageServices(req).then((data) => {
        return successResponseWithData(res, translate[req.headers["x-language-key"]].DATA_UPDATED_SUCCESS, data);
    })
        .catch((err) => {
            return errorResponse(res, translate[req.headers["x-language-key"]].ERROR_DATA_INSERTED);
        });
}
const deleteSalon = async (req, res) => {
    salonservice.deleteSalonService(req).then((data) => {
        return successResponse(res, translate[req.headers["x-language-key"]].DATA_DELETED_SUCCESS, data);
    })
        .catch((err) => {
            return errorResponse(res, translate[req.headers["x-language-key"]][err.message]);
        });
}

module.exports = {
    salonRegistration,
    salonRequestedList,
    salonApprovedList,
    salonPhotoUpload,
    salonUpdateStatus,
    salonProfileInfo,
    updateAboutCompany,
    getAboutCompany,
    updateWorkingHours,
    getWorkingHours,
    updateNotesAndStatus,
    salonActiveInactive,
    updateSalonAminity,
    getSalonAminity,
    updateDeletePortfolioImage,
    salonUserInfoUpdate,
    getSalonUserInfo,
    salonPhotoUploadGet,
    salonDeleteImage,
    getSalonLanguage,
    updateSalonLanguage,
    deleteSalon,
};