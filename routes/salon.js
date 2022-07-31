var express = require('express');
require('express-group-routes');
const router = express.Router();
const { salonAuthCheck } = require('../middlewares/AuthTypeCheck')
const AuthController = require('../controller/AuthController')
const SalonController = require('../controller/Salon/SalonController')
const ServiceController = require('../controller/Salon/ServiceController')
const EmployeeController = require("../controller/Salon/EmployeeController")
const salonvalidator = require('../validations/SalonValidator');
const upload = require('../middlewares/upload');

router.post("/signup", [upload.single('image'), salonvalidator.SalonSignupValidation], SalonController.salonSignup);
router.post("/membershipList", SalonController.membershipList);
router.post("/membershipAddonList", SalonController.membershipAddonList);
router.get("/membershipNameList", SalonController.membershipNameList);

/*==== Salon Auth Route ===*/
router.group([salonAuthCheck], (router) => {
  router.post("/purchaseMembership", salonvalidator.MembershipPurchaseValidation, SalonController.purchaseMembership);
  /*========= Salon About Routes===================*/
  router.get("/getAboutCompany", SalonController.getAboutCompany);
  router.post("/updateAboutCompany", salonvalidator.AboutCompanyValidation, SalonController.updateAboutCompany);
  /*========= Salon Working Hour Routes===================*/
  router.get("/getWorkingHours", SalonController.getWorkingHours);
  router.post("/updateWorkingHours", salonvalidator.workingHourValidation, SalonController.updateWorkingHours);
  /*========= Salon Portfolio Routes ===================*/
  router.get("/getWorkPortfolio", SalonController.getWorkPortfolio);
  router.post("/addWorkPortfolio", [upload.single('image'), salonvalidator.addPortfolioValidation], SalonController.addWorkPortfolio);
  router.post("/updateWorkPortfolio", [upload.single('image'), salonvalidator.addPortfolioValidation], SalonController.updateWorkPortfolio);
  router.post("/deletePortfolio", salonvalidator.DeletePortfolioValidation, SalonController.deletePortfolio);
  router.post("/updatedeletePortfolioImage", [upload.single('image'), salonvalidator.DeletePortfolioValidation], SalonController.updatedeletePortfolioImage);
  /*========= Salon Aminity Routes ===================*/
  router.post("/updateSalonAminity", SalonController.updateSalonAminity);
  router.get("/getSalonAminity", SalonController.getSalonAminity);
  /*========= Salon Resource Routes ===================*/
  router.post("/addSalonResources", salonvalidator.ResourceAddValidation, SalonController.addSalonResources)
  router.get("/getSalonResources", SalonController.getSalonResources)
  router.post("/getSalonResourcesInfo", salonvalidator.ResourceIDValidation, SalonController.getSalonResourcesInfo)
  router.put("/updateSalonResources", salonvalidator.ResourceUpdateValidation, SalonController.updateSalonResources)
  router.delete("/deleteSalonResources", salonvalidator.ResourceIDValidation, SalonController.deleteSalonResources)
  /*========= Salon Invoice Routes===================*/
  router.get("/getInvoiceSetting", SalonController.getInvoiceSetting);
  router.post("/updateInvoiceSetting", salonvalidator.InvoiceSettingValidation, SalonController.updateInvoiceSetting);
  router.post("/getNotification", SalonController.getNotification);
  /*========= Salon Booking Routes ===================*/
  router.get("/getBookingSetting", SalonController.getBookingSetting);
  router.post("/updateBookingSetting", SalonController.updateBookingSetting);
  /*========= Salon Product Routes ===================*/
  router.get("/getProduct", SalonController.getProduct);
  router.post("/addProduct", salonvalidator.ProductAddValidation, SalonController.addProduct);
  router.post("/updateProduct", [salonvalidator.ProductAddValidation, salonvalidator.ProductIDValidation], SalonController.updateProduct);
  router.post("/deleteProduct", salonvalidator.ProductIDValidation, SalonController.deleteProduct);
  /*========= Salon Service Routes===================*/
  router.post("/salonServiceList", ServiceController.getSalonServiceList);
  router.get("/salonGropuAndServiceList", ServiceController.salonGropuAndServiceList);
  router.post("/addSalonServicePrice", ServiceController.addSalonServicePrice);
  router.post("/updateSalonService", ServiceController.updateSalonService);
  router.post("/getSalonServiceInfo", ServiceController.getSalonServiceInfo);
  router.post("/salonServiceDropDown", ServiceController.salonServiceDropDown);
  router.post("/addMultipleSalonServicePrice", ServiceController.addMultipleSalonServicePrice);
  router.get("/salonServiceGroupList", ServiceController.salonServiceGroupList);
  router.post("/addsalonServiceGroup", [salonvalidator.addServiceGroupValidation], ServiceController.addsalonServiceGroup);
  router.post("/updateServiceGroup", [salonvalidator.updateServiceGroupValidation], ServiceController.updateServiceGroup);
  router.post("/updateServiceGroupName", [salonvalidator.updateServiceGroupValidation], ServiceController.updateServiceGroupName);
  router.get("/serviceGroupList", ServiceController.serviceGroupList);
  router.post("/salonServiceListById", ServiceController.salonServiceListById);
  /*========= Employee Routes===================*/
  router.post("/employeeRegistration", [upload.single('profileImage'), salonvalidator.EmployeeSalonSignupValidation], EmployeeController.employeeRegistration);
  router.get("/getEmployeeList", EmployeeController.getEmployeeList);
  router.post("/getEmployeeInfo", salonvalidator.EmployeeIdGetValidation, EmployeeController.getEmployeeInfo);
  router.get("/getEmployeeDropDown", EmployeeController.getEmployeeDropDown);

  router.put("/updateEmployee", [upload.single('profileImage'), salonvalidator.EmployeeUpdateValidation], EmployeeController.updateEmployee);
  router.post("/getTeamMemberService", salonvalidator.EmployeeIdGetValidation, SalonController.getTeamMemberService)
  router.post("/addTeamMemberService", salonvalidator.EmployeeUpdateValidation, SalonController.addTeamMemberServices);
  router.post("/setNewPasswordInstructrction", salonvalidator.EmployeeEmailValidation, SalonController.setNewPasswordInstructrction)
  /*========== Public Portfolio Employee ===================*/
  router.post('/updateTeamMemberDetail', salonvalidator.AddTeamMemberDetailsValidation, SalonController.updateTeamMemberDetail)
  router.post('/addTeamMemberPortfolio', [upload.single('image'), salonvalidator.EmployeeAddPortfolioValidation,], SalonController.addTeamMemberPortfolio)
  router.post('/getTeamMemberPortfolio', salonvalidator.EmployeeUpdateValidation, SalonController.getTeamMemberPortfolio)
  /*========== Setting Notification===================*/
  router.get("/getNotificationForClientSetting", salonvalidator.SettingNotificationValidation, SalonController.getNotificationForClientSetting)
  router.get("/getNotificationForTeamSetting", salonvalidator.SettingNotificationValidation, SalonController.getNotificationForTeamSetting)
  router.post("/updateNotificationForTeamSetting", salonvalidator.SettingNotificationTeamValidation, SalonController.updateNotificationForTeamSetting)
  router.post("/updateNotificationForClientSetting", salonvalidator.SettingNotificationClientValidation, SalonController.updateNotificationForClientSetting)
  /*==========Service Package===================*/
  router.post("/updateServiceDescription", salonvalidator.ServicePackageDescriptionValidation, ServiceController.updateServiceDescription)
  router.post("/updateServiceFinePrint", salonvalidator.ServicePackageFinePrintValidation, ServiceController.updateServiceFinePrint)
  router.post("/updateServiceDistribution", salonvalidator.ServicePackageDistributionValidation, ServiceController.updateServiceDistribution)
  /*==========Review ===================*/
  router.post("/updateResponseReview", SalonController.updateResponseReview)
  router.get("/getSalonReview", SalonController.getSalonReview)
  router.get("/getSalonAvergeReview", SalonController.getSalonAvergeReview)
  /*==========Language ===================*/
  router.post("/updateSalonLanguage", salonvalidator.LanguageObjectValidation, SalonController.updateSalonLanguage)
  router.get("/getSalonLanguage", SalonController.getSalonLanguage)
  /*==========Discont  ===================*/
  router.post("/addSalonDiscount", salonvalidator.AddDiscountValidation, ServiceController.addSalonDiscount)
  router.get("/getSalonDiscount", ServiceController.getSalonDiscount)
  router.post("/addSalonDiscountService", salonvalidator.AddDiscountIdValidation, ServiceController.addSalonDiscountService)
  router.get("/getSalonDiscountInfo", salonvalidator.AddDiscountIdValidation, ServiceController.getSalonDiscountInfo)
  router.get("/getSalonDiscountServiceInfo", ServiceController.getSalonDiscountServiceInfo)
  router.delete("/deleteSalonDiscount", salonvalidator.AddDiscountIdValidation, SalonController.deleteSalonDiscount);
  /*==========Membership===================*/
  router.post("/membershipAutoRenew", salonvalidator.UpdateAutoRenewStatusValidation, SalonController.membershipAutoRenew);
  /*========= Salon Voucher Routes ===================*/
  router.post("/addVoucher", salonvalidator.VoucherAddValidation, SalonController.addVoucher);
  router.post("/updateVoucher", salonvalidator.VoucherIDValidation, SalonController.updateVoucher)
  router.get("/getVoucher", SalonController.getVoucher);
  router.post("/deleteVoucher", salonvalidator.VoucherIDValidation, SalonController.deleteVoucher);
  /*========= Salon Clinet Routes ===================*/
  router.post("/addSalonClient", [upload.single('profileImage'), salonvalidator.ClientAddValidation], SalonController.addSalonClient);
  router.get("/getSalonClient", SalonController.getSalonClient)
  router.get("/getSalonClientInfo", salonvalidator.ClientGetValidation, SalonController.getSalonClientInfo);
  router.get("/getSalonClientBooking", salonvalidator.ClientGetValidation, SalonController.getSalonClientBooking);
  router.post("/updateSalonClient", [upload.single('profileImage'), salonvalidator.ClientUpdateValidation], SalonController.updateSalonClient);
  router.delete("/deleteSalonClient", salonvalidator.ClientGetValidation, SalonController.deleteSalonClient);
  router.post("/sendEmailToClient", SalonController.sendEmailToClient)
  //============================== Salon Booking=========================//
  router.get("/getBooking", SalonController.getBooking);
  router.get("/getBookingStatus", SalonController.getBookingStatus);
  router.get("/getBookingTeamName", SalonController.getBookingTeamName);
  router.post("/addServiceInBooking", SalonController.addServiceInBooking);
  //============================== Salon Package=========================//
  router.post("/addpackage", salonvalidator.PackageAddValidation, SalonController.addpackage);
  router.post("/getpackage", SalonController.getpackage);
  router.post("/updatePackage", salonvalidator.PackagUpdateValidation, SalonController.updatePackage);
  router.get("/serviceGroupList", ServiceController.serviceGroupList);
  router.put("/updatepackageDescription", salonvalidator.PackageDescriptionValidation, SalonController.updatePackageDescription);
  router.post("/updatePackageFinePrint", salonvalidator.PackageFinePrintValidation, SalonController.updatePackageFinePrint);
  router.post("/updatePackageDistribution", salonvalidator.PackageDistributionValidation, SalonController.updatePackageDistribution);
  //============================== Salon Rota=========================//
  router.get("/getRota",SalonController.getRota);
  router.get("/getDayDetail",SalonController.getDayDetail);
  router.post("/addTeamMemberRota",SalonController.addTeamMemberRota);
  router.post("/getTeamDutyTimeRota",SalonController.getTeamDutyTimeRota);
  router.post("/updateWorkingHoursTeam", SalonController.updateWorkingHoursTeam);
  router.get("/getWorkingHour",SalonController.getWorkingHour);
  router.post("/getWeekWorkingHour",SalonController.getWeekWorkingHour);


  router.get("/activeMembership", SalonController.activeMembership);
  router.get("/activeMembershipAddOn", SalonController.activeMembershipAddOn);
  router.get("/getSalonInvocing", SalonController.getSalonInvocing);
  router.post("/purchaseMembershipAddOn", salonvalidator.AddOnMembershipValidation, SalonController.purchaseMembershipAddOn); 
  router.get("/employeeCalender", EmployeeController.employeeCalender);

   //=====================Schedule=========================//
   router.post("/createEmployeeSchedule", SalonController.createEmployeeSchedule);

    //=====================Calender=========================//
    router.post("/createAppointment", SalonController.createAppointment);
    router.post("/getEmployeeCalender", SalonController.getEmployeeCalender);
    router.post("/createEmployeeBlock",SalonController.createBlock)
    router.post("/getEmployeeBlock",SalonController.getEmployeeBlock)

});
module.exports = router;