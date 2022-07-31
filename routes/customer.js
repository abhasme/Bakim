var express = require('express');
require('express-group-routes');
const router = express.Router();
const { customerAuthCheck } = require('../middlewares/AuthTypeCheck')
const CustomerController = require('../controller/Customer/CustomerController')
const SalonController = require('../controller/Customer/SalonController')
const BookingController = require('../controller/Customer/BookingController')
const customervalidator = require('../validations/CustomerValidator');
const upload = require('../middlewares/upload');

router.post("/salonServices", customervalidator.RequiredSalonIdValidation, SalonController.salonServices);
router.post("/salonReviews", customervalidator.RequiredSalonIdValidation, SalonController.salonReviews);
/*==== Salon Auth Route ===*/
router.group([customerAuthCheck], (router) => {
    router.post("/updateCustomer", [upload.single('profileImage')], CustomerController.updateCustomer);
    router.post("/customerProfileInfo", CustomerController.customerProfileInfo);
    router.get("/getNotification", customervalidator.GetNotificationValidation, CustomerController.getNotification);
    router.get("/getSalonListByCategory", CustomerController.getSalonListByCategory);
    router.get("/getSalonListByService", CustomerController.getSalonListByService);
    
    /*==== Customer Review Route ===*/
    router.post("/addReviewSalon", customervalidator.addReviewValidation, CustomerController.addReviewSalon);
    router.post("/getReviewSalon", CustomerController.getReview);
    router.post("/addToMyBasket", BookingController.addToMyBasket);
    router.get("/categoryList", CustomerController.categoryList);
    router.get("/getSalonShop", CustomerController.getSalonShop);

    /*==== Customer Search Route ===*/
    router.post("/getSalonList", CustomerController.getSalonList);
    router.post("/salonDetail", customervalidator.RequiredSalonIdValidation, SalonController.salonDetail);
    router.post("/getSalonAwards", customervalidator.RequiredSalonIdValidation, SalonController.getSalonAwards);
    router.post("/salonTeamMembers", customervalidator.RequiredSalonIdValidation, SalonController.salonTeamMembers);
    router.post("/salonTeamMembersInfo", customervalidator.RequiredEmployeeValidation, SalonController.salonTeamMembersInfo);
    router.get("/getTeamPortfolio", CustomerController.getTeamPortfolio);
    router.post("/getSalonAmenities", customervalidator.RequiredSalonIdValidation, SalonController.getSalonAmenities);
    router.post("/salonWorkinfo", customervalidator.RequiredSalonIdValidation, SalonController.salonWorkinfo);
    router.post("/getSalonProducts", customervalidator.RequiredSalonIdValidation, SalonController.getSalonProducts);
    router.post("/employeeWorkDetail", customervalidator.WorkIdValidation, CustomerController.employeeWorkDetail);
    
    //=====================Booking=========================//
    router.post("/submitBooking", BookingController.submitBooking);
    router.post("/getServiceEmployee", BookingController.getServiceEmployee);
    router.post("/getSelectedService", BookingController.getSelectedService);
    router.post("/getEmployeeSlots",BookingController.getEmployeeSlots);

    router.post("/getBookingDateAndTime",BookingController.getBookingDateAndTime);//no
    router.post("/getResourceAvailable",BookingController.getResourceAvailable);//no
});
module.exports = router;
