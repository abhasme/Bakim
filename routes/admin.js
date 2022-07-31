const express = require("express");
const router = express.Router();
const adminvalidator = require('../validations/AdminValidator');
const category = require('../controller/Admin/CategoryController')
const country = require('../controller/Admin/CountryController')
const MembershipController = require('../controller/Admin/MembershipController')
const CustomerController = require('../controller/Admin/CustomerController')
const SalonController = require('../controller/Admin/SalonController')
const ServiceController = require('../controller/Admin/ServiceController')
const AminityController = require('../controller/Admin/AminityController')
const NotificationController = require('../controller/Admin/NotificationController')
const AwardController = require('../controller/Admin/AwardController')
const EmployeeController = require('../controller/Admin/EmployeeController')
const ResourceController = require('../controller/Admin/ResourceController')
const PortfolioController = require('../controller/Admin/PortfolioController')
const RevierController = require('../controller/Admin/ReviewController')
const GiftCardController = require('../controller/Admin/GiftCardController')
const CmsController = require('../controller/Admin/CmsController')
const LanguageController = require('../controller/Admin/LanguageController')
const BookingController = require('../controller/Admin/BookingController')

const upload = require('../middlewares/upload');
const { salonStatus } = require('../config/data')
const salonvalidator = require('../validations/SalonValidator');

/*========== Category Route ===================*/
// upload.fields([{ name: 'photos', maxCount: 10 }, { name: 'profile', maxCount: 1 }])
router.post("/categorycreate", [upload.fields([{ name: 'image', maxCount: 1 }, { name: 'thumbnail', maxCount: 1 }]), adminvalidator.createCategoryValidation], category.categoryCreate);
router.post("/categoryUpdate", [upload.fields([{ name: 'image', maxCount: 1 }, { name: 'thumbnail', maxCount: 1 }]), adminvalidator.updateCategoryValidation], category.categoryUpdate);
router.post("/getCategoryList", category.getCategoryList);
router.post("/activeDeactiveCategory", [adminvalidator.activeCategoryValidation], category.activeDeactiveCategory);
router.post("/categoryDelete", [adminvalidator.updateCategoryValidation], category.categoryDelete);
router.post("/getCategoryInfo", [adminvalidator.updateCategoryValidation], category.getCategoryInfo);
/*========== Country Route ===================*/
router.post("/countrycreate", [adminvalidator.CountryCreateValidation], country.countryCreate);
router.post("/updateCountry", [adminvalidator.UpdateCountryValidation], country.updateCountry);
// router.post("/countryDelete", [adminvalidator.UpdateCountryValidation], country.countryDelete);
/*========== State Route ===================*/
router.post("/statecreate", [adminvalidator.StateCreateValidation], country.stateCreate);
router.post("/updateState", [adminvalidator.UpdateStateValidation], country.updateState);
// router.post("/stateDelete", [adminvalidator.UpdateStateValidation], country.stateDelete);
/*========== City Route ===================*/
router.post("/citycreate", [adminvalidator.CityCreateValidation], country.cityCreate);
router.post("/updateCity", [adminvalidator.UpdateCityValidation], country.updateCity);
/*========== Membership Routes ===================*/
router.post("/membershipList", MembershipController.membershipList);
router.post("/membershipcreate", [adminvalidator.MembershipValidation], MembershipController.membershipCreate);
router.post("/membershipUpdate", [adminvalidator.updateMembershipValidation], MembershipController.membershipUpdate);
router.post("/getmembershipInfo", [adminvalidator.updateMembershipValidation], MembershipController.getmembershipInfo);
router.post("/membershipDelete", [adminvalidator.updateMembershipValidation], MembershipController.membershipDelete);
router.post("/membershipAddonList", MembershipController.membershipAddonList);
router.post("/membershipAddoncreate", [adminvalidator.MembershipAddonValidation], MembershipController.membershipAddonCreate);
router.post("/membershipAddonUpdate", [adminvalidator.updateMembershipAddonValidation], MembershipController.membershipAddonUpdate);
router.post("/getmembershipAddonInfo", [adminvalidator.updateMembershipAddonValidation], MembershipController.getmembershipAddonInfo);
router.post("/membershipAddonDelete", [adminvalidator.updateMembershipAddonValidation], MembershipController.membershipAddonDelete);

router.post("/purchaseMembership", adminvalidator.membershipPurchaseValidation, MembershipController.purchaseMembership);
router.post("/purchaseMembershipAddOn", adminvalidator.AddOnMembershipValidation, MembershipController.purchaseMembershipAddOn);
router.get("/activeMembership", adminvalidator.updateSaloonValidation, MembershipController.activeMembership);
router.get("/activeMembershipAddOn", adminvalidator.updateSaloonValidation, MembershipController.activeMembershipAddOn);
router.get("/getSalonInvocing", adminvalidator.updateSaloonValidation, MembershipController.getSalonInvocing);
router.post("/membershipAutoRenew", adminvalidator.updateSaloonValidation, adminvalidator.membershipAutoRenewValidation, MembershipController.membershipAutoRenew);
/*========== Customer Routes ===================*/
router.post("/customerRegistration", [upload.single('profileImage'), adminvalidator.CustomerSignupValidation], CustomerController.customerRegistration);
router.post("/getCustomerList", CustomerController.getCustomerList);
router.post("/customerProfileInfo", adminvalidator.updateCustomerValidation, CustomerController.customerProfileInfo);
router.post("/updateCustomer", [upload.single('profileImage'), adminvalidator.updateCustomerValidation], CustomerController.updateCustomer);
router.post("/customerBookingHistory", adminvalidator.bookingUserId, CustomerController.customerBookingHistory);
router.post("/customerDelete", adminvalidator.updateCustomerValidation, CustomerController.customerDelete);
/*========== Salon Routes ===================*/
router.post("/salonRegistration", [upload.single('profileImage'), adminvalidator.SalonSignupValidation], SalonController.salonRegistration);
router.post("/salonUserInfoUpdate", [upload.single('profileImage'), adminvalidator.salonInfoUpdateValidation], SalonController.salonUserInfoUpdate);
router.post("/getSalonUserInfo", adminvalidator.salonIdValidation, SalonController.getSalonUserInfo);
router.post("/salonRequestedList", SalonController.salonRequestedList);
router.post("/salonPhotoUpload", [upload.fields([{ name: 'photos', maxCount: 10 }, { name: 'profile', maxCount: 1 }]), adminvalidator.salonIdValidation], SalonController.salonPhotoUpload);
router.post("/salonPhotoUploadGet", adminvalidator.salonIdValidation, SalonController.salonPhotoUploadGet);
router.post("/salonDeleteImage", adminvalidator.salonIdValidation, adminvalidator.salonDeleteImageValidation, SalonController.salonDeleteImage);
router.post("/salonApprovedList", SalonController.salonApprovedList);
router.post("/salonUpdateStatus", adminvalidator.salonStatusValidation, SalonController.salonUpdateStatus);
router.post("/salonProfileInfo", adminvalidator.salonIdValidation, SalonController.salonProfileInfo);
router.post("/updateAboutCompany", [upload.single('logo'), adminvalidator.salonIdValidation, salonvalidator.AboutCompanyValidation], SalonController.updateAboutCompany);
router.post("/getAboutCompany", adminvalidator.salonIdValidation, SalonController.getAboutCompany);
router.post("/updateWorkingHours", [adminvalidator.salonIdValidation, salonvalidator.workingHourValidation], SalonController.updateWorkingHours);
router.post("/getWorkingHours", adminvalidator.salonIdValidation, SalonController.getWorkingHours);
router.post("/updateNotesAndStatus", adminvalidator.updateSaloonValidation, SalonController.updateNotesAndStatus);
router.post("/salonActiveInactive", adminvalidator.salonActiveInactiveValidation, SalonController.salonActiveInactive);
router.get("/getSalonAwardList", AwardController.getSalonAwardList);
router.post("/updateSalonAward", adminvalidator.updateSalonAwardValidation, AwardController.updateSalonAward);
router.post("/salonAwardInfo", adminvalidator.updateSalonAwardValidation, AwardController.salonAwardInfo);
router.post("/deleteSalon", adminvalidator.salonIdValidation, SalonController.deleteSalon);
/*========== Salon Staus Routes ===================*/
router.get('/statusNameList', (req, res) => {
    var idata = {
        status: 200,
        message: "Data retrieved successfully.",
        data: salonStatus,
    };
    return res.status(200).json(idata);
});
/*========== Service Group Routes ===================*/
router.post("/addServiceGroup", [adminvalidator.addServiceGroupValidation, adminvalidator.addServiceGroupValidation], ServiceController.addServiceGroup);
router.post("/updateServiceGroup", [adminvalidator.updateServiceGroupValidation], ServiceController.updateServiceGroup);
router.post("/getServiceGroupinfo", [adminvalidator.updateServiceGroupValidation], ServiceController.getServiceGroupinfo);
router.post("/activeDeactiveServiceGroup", [adminvalidator.updateServiceGroupValidation], ServiceController.activeDeactiveServiceGroup);
router.post("/deleteServiceGroup", [adminvalidator.updateServiceGroupValidation], ServiceController.deleteServiceGroup);
router.get("/getServiceGroupList", ServiceController.getServiceGroupList);
/*========== Service Routes ===================*/
router.post("/addService", [upload.single('image'), adminvalidator.addServiceValidation], ServiceController.addService);
router.post("/updateService", [upload.single('image'), adminvalidator.updateServiceValidation], ServiceController.updateService);
router.get("/getServiceList", ServiceController.getServiceList);
router.post("/activeDeactiveService", [adminvalidator.activeServiceValidation], ServiceController.activeDeactiveService);
router.post("/deleteService", [adminvalidator.updateServiceValidation], ServiceController.deleteService);
router.post("/getServiceInfo", [adminvalidator.updateServiceValidation], ServiceController.getServiceInfo);
/*========== Aminity Routes ===================*/
router.post("/getAminity", AminityController.getAminity);
router.post("/createAminity", [adminvalidator.CreateAmenityValidation], AminityController.createAminity);
router.post("/updateAminity", [adminvalidator.UpdateAmenityValidation], AminityController.updateAminity);
router.post("/getAminityInfo", [adminvalidator.UpdateAmenityValidation], AminityController.getAminityInfo);
router.post("/deleteAmenity", adminvalidator.UpdateAmenityValidation, AminityController.deleteAmenity);
/*========== Notification Routes ===================*///
router.post("/createNotification", [adminvalidator.CreateNotificationValidation], NotificationController.createNotification);
router.get("/getNotification", NotificationController.getNotification);
/*========== Award Routes===================*///
router.post("/createAward", [upload.single('image'), adminvalidator.createAwardValidation], AwardController.createAward);
router.post("/getAward", AwardController.getAward);
router.post("/getAwardInfo", adminvalidator.updateAwardValidation, AwardController.getAwardInfo);
router.post("/updateAward", [upload.single('image'), adminvalidator.updateAwardValidation], AwardController.updateAward);
router.post("/deleteAward", adminvalidator.deleteAwardValidation, AwardController.deleteAward);
router.post("/deleteSalonAward", adminvalidator.updateSaloonValidation, AwardController.deleteSalonAward);
/*========== Employee Routes===================*/
router.post("/employeeRegistration", [upload.single('profileImage'), adminvalidator.EmployeeSignupValidation], EmployeeController.employeeRegistration);
router.post("/getEmployeeList", adminvalidator.EmployeeGetValidation, EmployeeController.getEmployeeList);
router.post("/getEmployeeInfo", adminvalidator.EmployeeUpdateValidation, EmployeeController.getEmployeeInfo);
router.post("/updateEmployee", [upload.single('profileImage'), adminvalidator.EmployeeUpdateValidation], EmployeeController.updateEmployee);
router.post("/updateEmployeeStortBio", adminvalidator.UpdateTeamMemberDetailsValidation, EmployeeController.updateEmployeeStortBio);
router.post("/addTeamMemberService", adminvalidator.EmployeeUpdateValidation, EmployeeController.addTeamMemberService);
router.post("/getTeamMemberService", adminvalidator.EmployeeUpdateValidation, EmployeeController.getTeamMemberService)
router.post("/deleteEmployee", adminvalidator.EmployeeUpdateValidation, EmployeeController.deleteEmployee);
/*========== Resources Routes===================*/
router.post("/addResources", adminvalidator.ResourceAddValidation, ResourceController.addResources);
router.post("/updateResource", adminvalidator.ResourceUpdateValidation, ResourceController.updateResource);
router.post("/getResources", adminvalidator.ResourceGetValidation, ResourceController.getResources);
router.post("/deleteResources", adminvalidator.ResourceDeleteValidation, ResourceController.deleteResources);
router.post("/getResourcesInfo", adminvalidator.ResourceUpdateValidation, ResourceController.getResourcesInfo);
/*========== Portfolio Routes ===================*/
router.post("/addPortfolio", [upload.single('image'), adminvalidator.addPortfolioValidation], PortfolioController.addPortfolio);
router.post("/updatePortfolio", [upload.single('image'), adminvalidator.UpdatePortfolioValidation], PortfolioController.updatePortfolio);
router.post("/deletePortfolio", adminvalidator.DeletePortfolioValidation, PortfolioController.deletePortfolio);
router.post("/getPortfolio", adminvalidator.GetPortfolioValidation, PortfolioController.getPortfolio);
router.post("/getPortfolioInfo", adminvalidator.DeletePortfolioValidation, PortfolioController.getPortfolioInfo);
router.post("/updateDeletePortfolioImage", [upload.single('image'), salonvalidator.DeletePortfolioValidation], SalonController.updateDeletePortfolioImage);
/*========== Create Salon Amenity ===================*/
router.post("/updateSalonAminity", adminvalidator.CreateSalonIdValidation, SalonController.updateSalonAminity);
router.post("/getSalonAminity", adminvalidator.CreateSalonIdValidation, SalonController.getSalonAminity);
/*==========Language ===================*/
router.post("/updateSalonLanguage", adminvalidator.CreateSalonIdValidation, SalonController.updateSalonLanguage)
router.post("/getSalonLanguage", adminvalidator.CreateSalonIdValidation, SalonController.getSalonLanguage)
/*========== Review Routes ===================*/
router.post("/addReview", adminvalidator.addReviewValidation, RevierController.addReview);
router.get("/getReview", RevierController.getReview);
router.post("/deleteReview", adminvalidator.deleteReviewValidation, RevierController.deleteReview);
/*========== Gift Card Routes ===================*/
router.post("/addGiftCard", adminvalidator.CreateGiftCardValidation, GiftCardController.addGiftCard);
router.post("/updateGiftCard", [adminvalidator.CreateGiftCardValidation, adminvalidator.IdGiftCardValidation], GiftCardController.updateGiftCard);
router.get("/getGiftCardInfo", [adminvalidator.IdGiftCardValidation], GiftCardController.getGiftCardInfo);
router.post("/getGiftCard", GiftCardController.getGiftCard);
router.post("/deleteGiftCard", adminvalidator.IdGiftCardValidation, GiftCardController.deleteGiftCard);
/*========= Salon Service Routes ===================*/
router.post("/salonServiceList", adminvalidator.salonIdValidation, ServiceController.getSalonServiceList);
router.post("/getSalonServiceInfo", adminvalidator.salonServiceIdValidation, ServiceController.getSalonServiceInfo);
/*========= CMS Routes===================*/
router.post("/addCms", adminvalidator.cmsValidation, CmsController.addCms);
router.post("/getCms", CmsController.getCms);
router.post("/updateCms", adminvalidator.cmsIdValidation, CmsController.updateCms);
router.post("/activeDactiveCms", adminvalidator.cmsIdValidation, CmsController.activeDactiveCms);
/*========= Language Routes ===================*/
router.post("/addLanguage", adminvalidator.languageValidation, LanguageController.addLanguage);
router.get("/getLanguage", LanguageController.getLanguage);
router.post("/updateLanguage", adminvalidator.languageIdValidation, LanguageController.updateLanguage);
router.post("/getLanguageInfo", adminvalidator.languageIdValidation, LanguageController.getLanguageInfo);
router.post("/deleteLanguage", adminvalidator.languageIdValidation, LanguageController.deleteLanguage);
/*========= Language Routes ===================*/
router.post("/getBookingList", BookingController.getBookingList);

module.exports = router; 