const { successResponse, errorResponse, successResponseWithData, unauthorizedResponse, successResponseAggregatePaginate } = require('../../helpers/Response');
const translate = require('../../locales/translate')
const membershipservices = require('../../services/membership-service')
const salonservice = require('../../services/salon-service')
const authservices = require('../../services/auth-service')
const notificationservice = require('../../services/notification-service')
const settingservice = require('../../services/setting-service')
const productservice = require('../../services/product-service')
const resourceservice = require('../../services/resource-service')
const reviewservice = require("../../services/review-service")
const languageservice = require("../../services/language-service")
const clientservice = require("../../services/client-service")
const bookingservice = require("../../services/booking-service")
const packageservice = require("../../services/package-service")
const rotaservice = require("../../services/rota-service")
const scheduleservice = require("../../services/schedule-service")
const calenderservice = require("../../services/calender-service")
const { Users } = require('../../models/UserModel')

const membershipNameList = async (req, res) => {
    membershipservices.membershipNameListService(req).then((data) => {
        return successResponseWithData(res, translate[req.headers["x-language-key"]].DATA_RETRIVED_SUCCESS, data);
    })
        .catch((err) => {
            return errorResponse(res, translate[req.headers["x-language-key"]].DATA_RETRIVED_SUCCESS);
        });
}

const salonSignup = async (req, res) => {
    req.body.userType = 'Salon'
    req.body.salonDetail = {
        salonName: req.body.salonName ? req.body.salonName : '',
        employees: req.body.employees ? req.body.employees : 0,
        businessType: req.body.businessType ? req.body.businessType : 'Shop',
        interestedmembershipid: req.body.interestedmembershipid
    };
    req.body.profileImage = req.file.path ? req.file.path : "";
    req.body.userUniqueId = await Users.GetUserUniqueId()
    authservices.userSignupService(req).then((data) => {
        return successResponseWithData(res, translate[req.headers["x-language-key"]].DATA_INSERTED_SUCCESS, data);
    })
        .catch((err) => {
            return errorResponse(res, translate[req.headers["x-language-key"]].ERROR_DATA_INSERTED);
        });
}

/*====Salon MemberShip List ====*/
const membershipList = async (req, res) => {
    membershipservices.membershipListService(req).then((data) => {
        return successResponseAggregatePaginate(req, res, translate[req.headers["x-language-key"]].DATA_RETRIVED_SUCCESS, data);
    })
        .catch((err) => {
            return errorResponse(res, translate[req.headers["x-language-key"]].DATA_RETRIVED_SUCCESS);
        });
}

/*====Salon MemberShip Addon List ====*/
const membershipAddonList = async (req, res) => {
    membershipservices.membershipAddonListService(req).then((data) => {
        return successResponseAggregatePaginate(req, res, translate[req.headers["x-language-key"]].DATA_INSERTED_SUCCESS, data);
    })
        .catch((err) => {
            return errorResponse(res, translate[req.headers["x-language-key"]].DATA_RETRIVED_SUCCESS);
        });
}

/*====Salon Purchase MemberShip ====*/
const purchaseMembership = async (req, res) => {
    membershipservices.purchaseMembershipService(req).then((data) => {
        return successResponseWithData(res, translate[req.headers["x-language-key"]].DATA_INSERTED_SUCCESS, data);
    })
        .catch((err) => {
            return errorResponse(res, translate[req.headers["x-language-key"]].ERROR_DATA_INSERTED);
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

/*====Salon Update About Company ====*/
const updateAboutCompany = async (req, res) => {
    salonservice.aboutCompanyService(req).then((data) => {
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

const updateWorkingHours = async (req, res) => {
    salonservice.updateOpeningHourService(req).then((data) => {
        return successResponseWithData(res, translate[req.headers["x-language-key"]].DATA_UPDATED_SUCCESS, data);
    })
        .catch((err) => {
            return errorResponse(res, translate[req.headers["x-language-key"]].ERROR_DATA_UPDATE);
        });
}

/*====Salon Get Work Portfolio ====*/
const getWorkPortfolio = async (req, res) => {
    salonservice.getWorkPortfolioService(req).then((data) => {
        return successResponseAggregatePaginate(req, res, translate[req.headers["x-language-key"]].DATA_RETRIVED_SUCCESS, data); //ERROR_DATA_DELETE
    })
        .catch((err) => {
            return errorResponse(res, translate[req.headers["x-language-key"]][err.message]); //[err.message]
        });
}

/*====Salon Add Work ====*/
const addTeamMemberPortfolio = async (req, res) => {
    salonservice.addTeamMemberPortfolioService(req).then((data) => {
        return successResponseWithData(res, translate[req.headers["x-language-key"]].DATA_INSERTED_SUCCESS, data);
    })
        .catch((err) => {
            return errorResponse(res, translate[req.headers["x-language-key"]][err.message]);
        });
}

/*====Salon Update Work ====*/
const updateWorkPortfolio = async (req, res) => {
    salonservice.updatePortfolioService(req).then((data) => {
        return successResponseWithData(res, translate[req.headers["x-language-key"]].DATA_UPDATED_SUCCESS, data);
    })
        .catch((err) => {
            return errorResponse(res, translate[req.headers["x-language-key"]][err.message]);
        });
}

/*====Salon Delete Work ====*/
const deletePortfolio = async (req, res) => {
    salonservice.deletePortfolioService(req).then((data) => {
        return successResponse(res, translate[req.headers["x-language-key"]].DATA_DELETED_SUCCESS, data); //ERROR_DATA_DELETE
    })
        .catch((err) => {
            return errorResponse(res, translate[req.headers["x-language-key"]].ERROR_DATA_DELETE); //[err.message]
        });
}

const updatedeletePortfolioImage = async (req, res) => {
    salonservice.deletePortfolioImageService(req).then((data) => {
        return successResponse(res, translate[req.headers["x-language-key"]].DATA_UPDATED_SUCCESS, data); //ERROR_DATA_DELETE
    })
        .catch((err) => {
            return errorResponse(res, translate[req.headers["x-language-key"]].ERROR_DATA_DELETE); //[err.message]
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

/*====Salon Add Resources ====*/
const addSalonResources = async (req, res) => {
    resourceservice.addResourcesServices(req).then((data) => {
        return successResponseWithData(res, translate[req.headers["x-language-key"]].DATA_INSERTED_SUCCESS, data);
    })
        .catch((err) => {
            return errorResponse(res, translate[req.headers["x-language-key"]].ERROR_DATA_INSERTED);
        })
}

const getSalonResources = async (req, res) => {
    resourceservice.getResourcesService(req).then((data) => {
        return successResponseWithData(res, translate[req.headers["x-language-key"]].DATA_RETRIVED_SUCCESS, data);
    })
        .catch((err) => {
            return errorResponse(res, translate[req.headers["x-language-key"]].ERROR_DATA_RETRIVED);
        });
}

const getSalonResourcesInfo = async (req, res) => {
    resourceservice.getResourcesInfoService(req).then((data) => {
        return successResponseWithData(res, translate[req.headers["x-language-key"]].DATA_RETRIVED_SUCCESS, data);
    })
        .catch((err) => {
            return errorResponse(res, translate[req.headers["x-language-key"]].ERROR_DATA_RETRIVED);
        });
}

const updateSalonResources = async (req, res) => {
    resourceservice.updateResourcesService(req).then((data) => {
        return successResponseWithData(res, translate[req.headers["x-language-key"]].DATA_UPDATED_SUCCESS, data);
    })
        .catch((err) => {
            return errorResponse(res, translate[req.headers["x-language-key"]].ERROR_DATA_UPDATE);
        });

}

const deleteSalonResources = async (req, res) => {
    resourceservice.deleteResourcesService(req).then((data) => {
        return successResponse(res, translate[req.headers["x-language-key"]].DATA_DELETED_SUCCESS, data);
    })
        .catch((err) => {
            return errorResponse(res, translate[req.headers["x-language-key"]][err.message]);
        });
}

/*====Salon InvoiceSetting ====*/
const getInvoiceSetting = async (req, res) => {
    settingservice.getInvoiceSettingService(req).then((data) => {
        return successResponseWithData(res, translate[req.headers["x-language-key"]].DATA_RETRIVED_SUCCESS, data);
    })
        .catch((err) => {
            return errorResponse(res, translate[req.headers["x-language-key"]].ERROR_DATA_RETRIVED);
        });
}

/*====Salon Update Invoice Setting ====*/
const updateInvoiceSetting = async (req, res) => {
    settingservice.updateInvoiceSettingService(req).then((data) => {
        return successResponseWithData(res, translate[req.headers["x-language-key"]].DATA_UPDATED_SUCCESS, data);
    })
        .catch((err) => {
            return errorResponse(res, translate[req.headers["x-language-key"]].ERROR_DATA_UPDATE);
        });
}

const getNotification = async (req, res) => {
    notificationservice.getCustomerNotificationService(req).then((data) => {
        return successResponseAggregatePaginate(req, res, translate[req.headers["x-language-key"]].DATA_RETRIVED_SUCCESS, data);
    })
        .catch((err) => {
            return errorResponse(res, translate[req.headers["x-language-key"]].DATA_RETRIVED_SUCCESS);
        });
}

const getBookingSetting = async (req, res) => {
    settingservice.getBookingSettingService(req).then((data) => {
        return successResponseWithData(res, translate[req.headers["x-language-key"]].DATA_RETRIVED_SUCCESS, data);
    })
        .catch((err) => {
            return errorResponse(res, translate[req.headers["x-language-key"]].DATA_RETRIVED_SUCCESS);
        });
}

/*====Salon Add Work ====*/
const updateBookingSetting = async (req, res) => {
    settingservice.updateBookingSettingService(req).then((data) => {
        return successResponseWithData(res, translate[req.headers["x-language-key"]].DATA_INSERTED_SUCCESS, data);
    })
        .catch((err) => {
            return errorResponse(res, translate[req.headers["x-language-key"]][err.message]);
        });
}

/*====Salon Add Product ====*/
const addProduct = async (req, res) => {
    productservice.addProductServices(req).then((data) => {
        return successResponseWithData(res, translate[req.headers["x-language-key"]].DATA_INSERTED_SUCCESS, data);
    })
        .catch((err) => {
            return errorResponse(res, translate[req.headers["x-language-key"]].ERROR_DATA_INSERTED);
        });
}
/*====Salon Update Product ====*/
const updateProduct = async (req, res) => {
    productservice.updateProductServices(req).then((data) => {
        return successResponseWithData(res, translate[req.headers["x-language-key"]].DATA_UPDATED_SUCCESS, data);
    })
        .catch((err) => {
            return errorResponse(res, translate[req.headers["x-language-key"]].ERROR_DATA_UPDATE);
        });
}

/*====Salon Get Add Product ====*/
const getProduct = async (req, res) => {
    productservice.getProductService(req).then((data) => {
        return successResponseWithData(res, translate[req.headers["x-language-key"]].DATA_RETRIVED_SUCCESS, data);
    })
        .catch((err) => {
            return errorResponse(res, translate[req.headers["x-language-key"]].ERROR_DATA_RETRIVED);
        });
}

/*====Salon Delete Product ====*/
const deleteProduct = async (req, res) => {
    productservice.deleteProductServices(req).then((data) => {
        return successResponse(res, translate[req.headers["x-language-key"]].DATA_DELETED_SUCCESS, data); //ERROR_DATA_DELETE
    })
        .catch((err) => {
            return errorResponse(res, translate[req.headers["x-language-key"]].ERROR_DATA_DELETE); //[err.message]
        });
}

const getEmployeeList = async (req, res) => {
    salonservice.getEmployeeListService(req).then((data) => {
        return successResponseWithData(res, translate[req.headers["x-language-key"]].DATA_RETRIVED_SUCCESS, data);
    })
        .catch((err) => {
            return errorResponse(res, translate[req.headers["x-language-key"]].ERROR_DATA_RETRIVED);
        });
}

/*====Salon Update About Company ====*/
const updateEmployee = async (req, res) => {
    salonservice.updateEmployeeService(req).then((data) => {
        return successResponseWithData(res, translate[req.headers["x-language-key"]].DATA_UPDATED_SUCCESS, data);
    })
        .catch((err) => {
            return errorResponse(res, translate[req.headers["x-language-key"]].ERROR_DATA_UPDATE);
        });
}

const addTeamMemberServices = async (req, res) => {
    salonservice.addTeamMemberServiceService(req).then((data) => {
        return successResponseWithData(res, translate[req.headers["x-language-key"]].DATA_UPDATED_SUCCESS, data);
    })
        .catch((err) => {
            return errorResponse(res, translate[req.headers["x-language-key"]].ERROR_DATA_UPDATE);
        });
}

const setNewPasswordInstructrction = async (req, res) => {
    salonservice.setNewPasswordInstructrctionService(req).then((data) => {
        return successResponseWithData(res, translate[req.headers["x-language-key"]].DATA_UPDATED_SUCCESS, data);
    })
        .catch((err) => {
            return errorResponse(res, translate[req.headers["x-language-key"]].ERROR_DATA_UPDATE);
        });
}

const getTeamMemberService = async (req, res) => {
    salonservice.getTeamMemberServiceService(req).then((data) => {
        return successResponseWithData(res, translate[req.headers["x-language-key"]].DATA_RETRIVED_SUCCESS, data);
    })
        .catch((err) => {
            return errorResponse(res, translate[req.headers["x-language-key"]].ERROR_DATA_RETRIVED);
        });
}

/*========== Create Portfolio ===================*/
const updateTeamMemberDetail = async (req, res) => {
    salonservice.updateTeamMemberDetailServices(req).then((data) => {
        return successResponseWithData(res, translate[req.headers["x-language-key"]].DATA_INSERTED_SUCCESS, data);
    })
        .catch((err) => {
            return errorResponse(res, translate[req.headers["x-language-key"]].ERROR_DATA_INSERTED);
        });
}

const addWorkPortfolio = async (req, res) => {
    salonservice.addPortfolioService(req).then((data) => {
        return successResponseWithData(res, translate[req.headers["x-language-key"]].DATA_INSERTED_SUCCESS, data);
    })
        .catch((err) => {
            return errorResponse(res, translate[req.headers["x-language-key"]][err.message]);
        });
}

const getTeamMemberPortfolio = async (req, res) => {
    salonservice.getTeamMemberPortfolioService(req).then((data) => {
        return successResponseWithData(res, translate[req.headers["x-language-key"]].DATA_RETRIVED_SUCCESS, data); //ERROR_DATA_DELETE
    })
        .catch((err) => {
            return errorResponse(res, translate[req.headers["x-language-key"]][err.message]); //[err.message]
        });
}

/*============ Create Voucher ================*/
const addVoucher = async (req, res) => {
    productservice.addVoucherServices(req).then((data) => {
        return successResponseWithData(res, translate[req.headers["x-language-key"]].DATA_INSERTED_SUCCESS, data);
    })
        .catch((err) => {
            return errorResponse(res, translate[req.headers["x-language-key"]].ERROR_DATA_INSERTED);
        });
}

/*============ Edit Voucher ================*/
const updateVoucher = async (req, res) => {
    productservice.updateVoucherServices(req).then((data) => {
        return successResponseWithData(res, translate[req.headers["x-language-key"]].DATA_UPDATED_SUCCESS, data);
    })
        .catch((err) => {
            return errorResponse(res, translate[req.headers["x-language-key"]].ERROR_DATA_UPDATE);
        });
}

/*============ Get Voucher ================*/
const getVoucher = async (req, res) => {
    productservice.getVoucherService(req).then((data) => {
        return successResponseWithData(res, translate[req.headers["x-language-key"]].DATA_RETRIVED_SUCCESS, data);
    })
        .catch((err) => {
            return errorResponse(res, translate[req.headers["x-language-key"]].ERROR_DATA_RETRIVED);
        });
}

/*============ Delete Voucher ================*/
const deleteVoucher = async (req, res) => {
    productservice.deleteVoucherServices(req).then((data) => {
        return successResponse(res, translate[req.headers["x-language-key"]].DATA_DELETED_SUCCESS, data); //ERROR_DATA_DELETE
    })
        .catch((err) => {
            return errorResponse(res, translate[req.headers["x-language-key"]].ERROR_DATA_DELETE); //[err.message]
        });
}

const getNotificationForClientSetting = async (req, res) => {
    settingservice.getNotificationForClientSettingService(req).then((data) => {
        return successResponseWithData(res, translate[req.headers["x-language-key"]].DATA_RETRIVED_SUCCESS, data);
    })
        .catch((err) => {
            return errorResponse(res, translate[req.headers["x-language-key"]].ERROR_DATA_RETRIVED);
        });
}

const getNotificationForTeamSetting = async (req, res) => {
    settingservice.getNotificationForTeamSettingService(req).then((data) => {
        return successResponseWithData(res, translate[req.headers["x-language-key"]].DATA_RETRIVED_SUCCESS, data);
    })
        .catch((err) => {
            return errorResponse(res, translate[req.headers["x-language-key"]].ERROR_DATA_RETRIVED);
        });
}

const updateNotificationForTeamSetting = async (req, res) => {
    settingservice.updateNotificationForTeamSettingServices(req).then((data) => {
        return successResponseWithData(res, translate[req.headers["x-language-key"]].DATA_UPDATED_SUCCESS, data);
    })
        .catch((err) => {
            return errorResponse(res, translate[req.headers["x-language-key"]].ERROR_DATA_INSERTED);
        });
}

const updateNotificationForClientSetting = async (req, res) => {
    settingservice.updateNotificationForClientSettingServices(req).then((data) => {
        return successResponseWithData(res, translate[req.headers["x-language-key"]].DATA_UPDATED_SUCCESS, data);
    })
        .catch((err) => {
            return errorResponse(res, translate[req.headers["x-language-key"]].ERROR_DATA_INSERTED);
        });
}

const updateResponseReview = async (req, res) => {
    reviewservice.updateResponseReviewServices(req).then((data) => {
        return successResponseWithData(res, translate[req.headers["x-language-key"]].DATA_UPDATED_SUCCESS, data);
    })
        .catch((err) => {
            return errorResponse(res, translate[req.headers["x-language-key"]].ERROR_DATA_INSERTED);
        });
}

/*====Get About Company ====*/
const getSalonReview = async (req, res) => {
    reviewservice.getSalonReviewService(req).then((data) => {
        return successResponseAggregatePaginate(req, res, translate[req.headers["x-language-key"]].DATA_RETRIVED_SUCCESS, data);
    })
        .catch((err) => {
            return errorResponse(res, translate[req.headers["x-language-key"]].DATA_RETRIVED_SUCCESS);
        });
}

const getSalonAvergeReview = async (req, res) => {
    reviewservice.getSalonAvergeReviewService(req).then((data) => {
        return successResponseWithData(res, translate[req.headers["x-language-key"]].DATA_RETRIVED_SUCCESS, data);
    })
        .catch((err) => {
            return errorResponse(res, translate[req.headers["x-language-key"]].DATA_RETRIVED_SUCCESS);
        });
}

/*==== Language ====*/
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
            return errorResponse(res, translate[req.headers["x-language-key"]][err.message]);
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
//============== Salon Client ===============//
const addSalonClient = async (req, res) => {
    clientservice.addSalonClientServices(req).then((data) => {
        return successResponseWithData(res, translate[req.headers["x-language-key"]].DATA_UPDATED_SUCCESS, data);
    })
        .catch((err) => {
            return errorResponse(res, translate[req.headers["x-language-key"]].ERROR_DATA_INSERTED);
        });
}

const getSalonClient = async (req, res) => {
    clientservice.getSalonClientService(req).then((data) => {
        return successResponseAggregatePaginate(req, res, translate[req.headers["x-language-key"]].DATA_RETRIVED_SUCCESS, data);
    })
        .catch((err) => {
            return errorResponse(res, translate[req.headers["x-language-key"]].DATA_RETRIVED_SUCCESS);
        });
}
const getSalonClientInfo = async (req, res) => {
    clientservice.getSalonClientInfoService(req).then((data) => {
        return successResponseWithData(res, translate[req.headers["x-language-key"]].DATA_RETRIVED_SUCCESS, data);
    })
        .catch((err) => {
            return errorResponse(res, translate[req.headers["x-language-key"]].DATA_RETRIVED_SUCCESS);
        });
}

const getSalonClientBooking = async (req, res) => {
    clientservice.getSalonClientBookingService(req).then((data) => {
        return successResponseWithData(res, translate[req.headers["x-language-key"]].DATA_RETRIVED_SUCCESS, data);
    })
        .catch((err) => {
            return errorResponse(res, translate[req.headers["x-language-key"]].DATA_RETRIVED_SUCCESS);
        });
}

const updateSalonClient = async (req, res) => {
    clientservice.updateSalonClientServices(req).then((data) => {
        return successResponseWithData(res, translate[req.headers["x-language-key"]].DATA_UPDATED_SUCCESS, data);
    })
        .catch((err) => {
            return errorResponse(res, translate[req.headers["x-language-key"]].ERROR_DATA_INSERTED);
        });
}

const deleteSalonClient = async (req, res) => {
    clientservice.deleteSalonClientServices(req).then((data) => {
        return successResponse(res, translate[req.headers["x-language-key"]].DATA_DELETED_SUCCESS, data); //ERROR_DATA_DELETE
    })
        .catch((err) => {
            return errorResponse(res, translate[req.headers["x-language-key"]].ERROR_DATA_DELETE); //[err.message]
        });
}

// Salon Booking

const getBooking = async (req, res) => {
    bookingservice.getBookingService(req).then((data) => {
        return successResponseAggregatePaginate(req, res, translate[req.headers["x-language-key"]].DATA_RETRIVED_SUCCESS, data);
    })
        .catch((err) => {
            return errorResponse(res, translate[req.headers["x-language-key"]].DATA_RETRIVED_SUCCESS);
        });
}

const getBookingStatus = async (req, res) => {
    bookingservice.getBookingStatusService(req).then((data) => {
        return successResponseWithData(res, translate[req.headers["x-language-key"]].DATA_RETRIVED_SUCCESS, data);
    })
        .catch((err) => {
            return errorResponse(res, translate[req.headers["x-language-key"]].DATA_RETRIVED_SUCCESS);
        });
}

const getBookingTeamName = async (req, res) => {
    bookingservice.getBookingTeamNameService(req).then((data) => {
        return successResponseWithData(res, translate[req.headers["x-language-key"]].DATA_RETRIVED_SUCCESS, data);
    })
        .catch((err) => {
            return errorResponse(res, translate[req.headers["x-language-key"]].DATA_RETRIVED_SUCCESS);
        });
}

const addServiceInBooking = async (req, res) => {
    bookingservice.addServiceInBookingServices(req).then((data) => {
        return successResponseWithData(res, translate[req.headers["x-language-key"]].DATA_UPDATED_SUCCESS, data);
    })
        .catch((err) => {
            return errorResponse(res, translate[req.headers["x-language-key"]].ERROR_DATA_INSERTED);
        });
}

//==========================salon package====================================//
const addpackage = async (req, res) => {
    packageservice.addpackageServices(req).then((data) => {
        return successResponseWithData(res, translate[req.headers["x-language-key"]].DATA_UPDATED_SUCCESS, data);
    })
        .catch((err) => {
            return errorResponse(res, translate[req.headers["x-language-key"]].ERROR_DATA_INSERTED);
        });
}

const getpackage = async (req, res) => {
    packageservice.getpackageService(req).then((data) => {
        return successResponseWithData(res, translate[req.headers["x-language-key"]].DATA_RETRIVED_SUCCESS, data);
    })
        .catch((err) => {
            return errorResponse(res, translate[req.headers["x-language-key"]].DATA_RETRIVED_SUCCESS);
        });
}

const updatePackage = async (req, res) => {
    packageservice.updatePackageServices(req).then((data) => {
        return successResponseWithData(res, translate[req.headers["x-language-key"]].DATA_UPDATED_SUCCESS, data);
    })
        .catch((err) => {
            return errorResponse(res, translate[req.headers["x-language-key"]].ERROR_DATA_INSERTED);
        });
};

const updatePackageDescription = async (req, res) => {
    packageservice.updatePackageDescriptionServices(req).then((data) => {
        return successResponseWithData(res, translate[req.headers["x-language-key"]].DATA_UPDATED_SUCCESS, data);
    })
        .catch((err) => {
            return errorResponse(res, translate[req.headers["x-language-key"]].ERROR_DATA_INSERTED);
        });
};

const updatePackageFinePrint = async (req, res) => {
    packageservice.updatePackageFinePrintServices(req).then((data) => {
        return successResponseWithData(res, translate[req.headers["x-language-key"]].DATA_UPDATED_SUCCESS, data);
    })
        .catch((err) => {
            return errorResponse(res, translate[req.headers["x-language-key"]].ERROR_DATA_INSERTED);
        });
};
const updatePackageDistribution = async (req, res) => {
    packageservice.updatePackageDistributionServices(req).then((data) => {
        return successResponseWithData(res, translate[req.headers["x-language-key"]].DATA_UPDATED_SUCCESS, data);
    })
        .catch((err) => {
            return errorResponse(res, translate[req.headers["x-language-key"]].ERROR_DATA_INSERTED);
        });
};

const sendEmailToClient = async (req, res) => {
    clientservice.sendEmailToClientServices(req).then((data) => {
        return successResponseWithData(res, translate[req.headers["x-language-key"]].DATA_UPDATED_SUCCESS, data);
    })
        .catch((err) => {
            return errorResponse(res, translate[req.headers["x-language-key"]].ERROR_DATA_INSERTED);
        });
}
const getDayDetail = async (req, res) => {
    rotaservice.getDayDetailService(req).then((data) => {
        return successResponseWithData(res, translate[req.headers["x-language-key"]].DATA_RETRIVED_SUCCESS, data);
    })
        .catch((err) => {
            return errorResponse(res, translate[req.headers["x-language-key"]].DATA_RETRIVED_SUCCESS);
        });
}

const getRota = async (req, res) => {
    rotaservice.getRotaService(req).then((data) => {
        return successResponseWithData(res, translate[req.headers["x-language-key"]].DATA_RETRIVED_SUCCESS, data);
    })
        .catch((err) => {
            return errorResponse(res, translate[req.headers["x-language-key"]].DATA_RETRIVED_SUCCESS);
        });
}

const updateWorkingHoursTeam = async (req, res) => {
    salonservice.updateWorkingHoursTeamService(req).then((data) => {
        return successResponseWithData(res, translate[req.headers["x-language-key"]].DATA_UPDATED_SUCCESS, data);
    })
        .catch((err) => {
            return errorResponse(res, translate[req.headers["x-language-key"]].ERROR_DATA_UPDATE);
        });
}

const addTeamMemberRota = async (req, res) => {
    rotaservice.addTeamMemberRotaServices(req).then((data) => {
        return successResponseWithData(res, translate[req.headers["x-language-key"]].DATA_UPDATED_SUCCESS, data);
    })
        .catch((err) => {
            return errorResponse(res, translate[req.headers["x-language-key"]].ERROR_DATA_INSERTED);
        });
};

const getTeamMemberRota = async (req, res) => {
    rotaservice.getTeamMemberRotaService(req).then((data) => {
        return successResponseWithData(res, translate[req.headers["x-language-key"]].DATA_RETRIVED_SUCCESS, data);
    })
        .catch((err) => {
            return errorResponse(res, translate[req.headers["x-language-key"]].DATA_RETRIVED_SUCCESS);
        });
}

const getTeamDutyTimeRota = async (req, res) => {
    rotaservice.getTeamDutyTimeRotaService(req).then((data) => {
        return successResponseWithData(res, translate[req.headers["x-language-key"]].DATA_RETRIVED_SUCCESS, data);
    })
        .catch((err) => {
            return errorResponse(res, translate[req.headers["x-language-key"]].DATA_RETRIVED_SUCCESS);
        });
}

const getWorkingHour = async (req, res) => {
    rotaservice.getWorkingHourService(req).then((data) => {
        return successResponseWithData(res, translate[req.headers["x-language-key"]].DATA_RETRIVED_SUCCESS, data);
    })
        .catch((err) => {
            return errorResponse(res, translate[req.headers["x-language-key"]].DATA_RETRIVED_SUCCESS);
        });
}

const getWeekWorkingHour = async (req, res) => {
    rotaservice.getWeekWorkingHourService(req).then((data) => {
        return successResponseWithData(res, translate[req.headers["x-language-key"]].DATA_RETRIVED_SUCCESS, data);
    })
        .catch((err) => {
            return errorResponse(res, translate[req.headers["x-language-key"]].DATA_RETRIVED_SUCCESS);
        });
}

const activeMembership = async (req, res) => {
    membershipservices.activeMembershipService(req).then((data) => {
        return successResponseWithData(res, translate[req.headers["x-language-key"]].DATA_RETRIVED_SUCCESS, data);
    })
        .catch((err) => {
            return errorResponse(res, translate[req.headers["x-language-key"]].ERROR_DATA_RETRIVED);
        });
}

const activeMembershipAddOn = async (req, res) => {
    membershipservices.activeMembershipAddOnService(req).then((data) => {
        return successResponseWithData(res, translate[req.headers["x-language-key"]].DATA_RETRIVED_SUCCESS, data);
    })
        .catch((err) => {
            return errorResponse(res, translate[req.headers["x-language-key"]].ERROR_DATA_RETRIVED);
        });
}

const getSalonInvocing = async (req, res) => {
    membershipservices.getSalonInvocingService(req).then((data) => {
        return successResponseWithData(res, translate[req.headers["x-language-key"]].DATA_RETRIVED_SUCCESS, data);
    })
        .catch((err) => {
            return errorResponse(res, translate[req.headers["x-language-key"]].DATA_RETRIVED_SUCCESS);
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

const deleteSalonDiscount = async (req, res) => {
    clientservice.deleteSalonClientServices(req).then((data) => {
        return successResponse(res, translate[req.headers["x-language-key"]].DATA_DELETED_SUCCESS, data); //ERROR_DATA_DELETE
    })
        .catch((err) => {
            return errorResponse(res, translate[req.headers["x-language-key"]].ERROR_DATA_DELETE); //[err.message]
        });
}


const createEmployeeSchedule = async (req, res) => {
    scheduleservice.createEmployeeScheduleServices(req).then((data) => {
        return successResponse(res, translate[req.headers["x-language-key"]].DATA_UPDATED_SUCCESS, data); //ERROR_DATA_DELETE
    })
        .catch((err) => {
            return errorResponse(res, translate[req.headers["x-language-key"]].ERROR_DATA_UPDATED); //[err.message]
        });
}

const createAppointment = async (req, res) => {
    calenderservice.createAppointmentServices(req).then((data) => {
        return successResponse(res, translate[req.headers["x-language-key"]].DATA_INSERTED_SUCCESS, data); //ERROR_DATA_DELETE
    })
        .catch((err) => {
            return errorResponse(res, translate[req.headers["x-language-key"]].ERROR_DATA_INSERTED); //[err.message]
        });
}

const getEmployeeCalender = async (req, res) => {
    calenderservice.getEmployeeCalenderService(req).then((data) => {
        return successResponseWithData(res, translate[req.headers["x-language-key"]].DATA_RETRIVED_SUCCESS, data);
    })
        .catch((err) => {
            return errorResponse(res, translate[req.headers["x-language-key"]].DATA_RETRIVED_SUCCESS);
        });
}
const createBlock = async (req, res) => {
    calenderservice.createBlockService(req).then((data) => {
        return successResponseWithData(res, translate[req.headers["x-language-key"]].DATA_INSERTED_SUCCESS, data);
    })
        .catch((err) => {
            return errorResponse(res, translate[req.headers["x-language-key"]].ERROR_DATA_INSERTED);
        });
}

const getEmployeeBlock = async (req, res) => {
    calenderservice.getEmployeeBlockService(req).then((data) => {
        return successResponseWithData(res, translate[req.headers["x-language-key"]].DATA_RETRIVED_SUCCESS, data);
    })
        .catch((err) => {
            return errorResponse(res, translate[req.headers["x-language-key"]].DATA_RETRIVED_SUCCESS);
        });
}


module.exports = {
    membershipNameList,
    salonSignup,
    membershipList,
    membershipAddonList,
    purchaseMembership,
    getAboutCompany,
    updateAboutCompany,
    getWorkingHours,
    updateWorkingHours,
    getWorkPortfolio,
    addWorkPortfolio,
    updateWorkPortfolio,
    deletePortfolio,
    updatedeletePortfolioImage,
    updateSalonAminity,
    getSalonAminity,
    addSalonResources,
    getSalonResources,
    getSalonResourcesInfo,
    updateSalonResources,
    deleteSalonResources,
    getInvoiceSetting,
    updateInvoiceSetting,
    getBookingSetting,
    getNotification,
    updateBookingSetting,
    addProduct,
    updateProduct,
    getProduct,
    deleteProduct,
    getEmployeeList,
    updateEmployee,
    addTeamMemberServices,
    setNewPasswordInstructrction,
    updateTeamMemberDetail,
    addTeamMemberPortfolio,
    getTeamMemberPortfolio,
    getTeamMemberService,
    getNotificationForClientSetting,
    getNotificationForTeamSetting,
    updateNotificationForTeamSetting,
    updateNotificationForClientSetting,
    sendEmailToClient,
    addVoucher,
    updateVoucher,
    getVoucher,
    deleteVoucher,
    updateResponseReview,
    getSalonReview,
    getSalonAvergeReview,
    getSalonLanguage,
    updateSalonLanguage,
    membershipAutoRenew,
    addSalonClient,
    getSalonClient,
    getSalonClientInfo,
    getSalonClientBooking,
    updateSalonClient,
    deleteSalonClient,
    getBooking,
    getBookingStatus,
    getBookingTeamName,
    addServiceInBooking,
    addpackage,
    getpackage,
    updatePackage,
    updatePackageDescription,
    updatePackageFinePrint,
    updatePackageDistribution,
    getRota,
    getDayDetail,
    updateWorkingHoursTeam,
    addTeamMemberRota,
    getTeamMemberRota,
    getTeamDutyTimeRota,
    getWorkingHour,
    getWeekWorkingHour,
    activeMembership,
    activeMembershipAddOn,
    getSalonInvocing,
    purchaseMembershipAddOn,
    deleteSalonDiscount,
    createEmployeeSchedule,
    createAppointment,
    getEmployeeCalender,
    createBlock,
    getEmployeeBlock
};