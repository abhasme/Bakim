const mongoose = require("mongoose");
const { Setting } = require("./SettingModel");

const   RewiewSchema = mongoose.Schema({
  overall: { type: Number, default: 0 },
  ambience: { type: Number, default: 0 },
  cleanliness: { type: Number, default: 0 },
  review: { type: String, default: "" },
  userid: { type: mongoose.Types.ObjectId, ref: "Users" },
  bookingid: { type: mongoose.Types.ObjectId, ref: "Booking" },
  userName: { type: String, default: '' },
  userNameShow: { type: Boolean, default: false },
  service: [
    {
      serviceid: { type: mongoose.Types.ObjectId, ref: "Service" },
      serviceRating: { type: Number, default: 0 },
    }
  ],
  employee: [
    {
      employeeid: { type: mongoose.Types.ObjectId, ref: "Users" },
      employeeRating: { type: Number, default: 0 },
      skillLevel: { type: String, enum: ['Beginer', 'Average', 'Exprienced', "Exceptional"], default: 'Average' },
    }
  ],
  replied: [
    {
      createdAt: { type: Date, default: Date.now },
      response: { type: String, default: '' },
    }
  ],
  createdAt: { type: Date, default: Date.now() },
  active: { type: Boolean, default: true },
  isDeleted: { type: Boolean, default: false },
  deletedAt: { type: Date },
})

const ShopImagesSchema = mongoose.Schema({
  image: { type: String, default: "" },
})

const PortfolioSchema = mongoose.Schema({
  image: { type: String, default: '' },
  description: { type: String, default: '' },
  serviceid: { type: mongoose.Types.ObjectId, ref: "Service" },
  employeeid: { type: mongoose.Types.ObjectId, ref: "Users" },
  createdBy: { type: mongoose.Types.ObjectId, ref: "Users" },
  isDeleted: { type: Boolean, default: false },
  deletedAt: { type: Date },
})

const UserSchema = mongoose.Schema({
  firstName: { type: String, default: "", maxLength: 126, required: true, },
  lastName: { type: String, default: "", maxLength: 126, required: true, },
  mobile: { type: String, required: true, unique: true, },
  mobileVerified: { type: Boolean, default: false },
  email: { type: String, required: true, unique: true },
  emailVerified: { type: Boolean, default: false },
  gender: { type: String, enum: ['Male', 'Female', 'Prefer Not to say'], default: 'Prefer Not to say' },
  countryCode: { type: String, default: "" },
  profileImage: { type: String, default: "" },
  password: { type: String, default: "" },
  dateOfBirth: { type: Date },
  otp: { type: String, default: "" },
  acceptTermsPolicy: { type: Boolean, default: false },
  acceptMarketingEmail: { type: Boolean, default: false },
  acceptNotification: { type: Boolean, default: false },
  active: { type: Boolean, default: false },
  userType: { type: String, default: "User", enum: ["User", "Salon", "Employee", "Admin"] },
  averageRating: {
    overall: { type: Number, default: 0 },
    ambience: { type: Number, default: 0 },
    staff: { type: Number, default: 0 },
    service: { type: Number, default: 0 },
    cleanliness: { type: Number, default: 0 },
  },
  reviewCount: { type: Number, default: 0 },
  location: {
    postalCode: { type: String, default: "" },
    address: { type: String, default: "" },
    city: { type: String, default: "" },
    state: { type: String, default: "" },
    country: { type: String, default: "" },
    type: { type: String, default: 'Point' },
    coordinates: { type: [Number], default: [0, 0] }
  },
  
 // location: { type: { type: String, default: 'Point',}, coordinates: { type: [Number], default: [0, 0] } },
  salonDetail: {
    salonName: { type: String, default: "" },
    employees: { type: Number, default: 0 },
    shopPhone: { type: String, default: "" },
    shopEmail: { type: String, default: "" },
    website: { type: String, default: "" },
    logo: { type: String, default: "" },
    verifiedShopImages: [ShopImagesSchema],
    businessType: { type: String, enum: ['Shop', 'Mobile', 'Home'], default: 'Shop' },
    approvedAt: { type: Date },
    awards: [{
      awardid: { type: mongoose.Types.ObjectId, ref: "Awards" },
      active: { type: Boolean, default: true },
    }],
    amenities: [
      {
        amenityid: { type: mongoose.Types.ObjectId, ref: "Amenity", required: true },
        isDeleted: { type: Boolean, default: false },
        deletedAt: { type: Date },
      }],
    prefferedLanguage: [
      {
        languageid: { type: mongoose.Types.ObjectId, ref: "Language" },
      }],
    shopImages: [ShopImagesSchema],
    interestedmembershipid: { type: mongoose.Types.ObjectId, ref: "Membership" },
  },
  rewiews: [RewiewSchema],
  portfolio: [PortfolioSchema],
  employeeDetail: {
    assignedService: [{
      serviceid: { type: mongoose.Types.ObjectId, ref: "Service" },
      isDeleted: { type: Boolean, default: false },
      deletedAt: { type: Date },
    }],
    provideService: { type: Boolean, default: false },
    jobTitle: { type: String, default: "" },
    access: { type: String, enum: ['BasicAccess', 'OwnerAccess', 'CustomAccess'], default: 'BasicAccess' },
    permission: [
      {
        ownCalendar: { type: Boolean, default: false },
        allCalendar: { type: Boolean, default: false },
        menu: { type: Boolean, default: false },
        team: { type: Boolean, default: false },
        client: { type: Boolean, default: false },
        marketingTool: { type: Boolean, default: false },
        settings: { type: Boolean, default: false },
        reports: { type: Boolean, default: false },
      }
    ],
  },
  workingHour: {
    monday: {
      isOpen: { type: Boolean, default: true },
      startTime: { type: String, default: '09:00' },
      endtime: { type: String, default: '20:00' },
    },
    tuesday: {
      isOpen: { type: Boolean, default: true },
      startTime: { type: String, default: '09:00' },
      endtime: { type: String, default: '20:00' },
    },
    wednesday: {
      isOpen: { type: Boolean, default: true },
      startTime: { type: String, default: '09:00' },
      endtime: { type: String, default: '20:00' },
    },
    thursday: {
      isOpen: { type: Boolean, default: true },
      startTime: { type: String, default: '09:00' },
      endtime: { type: String, default: '20:00' },
    },
    friday: {
      isOpen: { type: Boolean, default: true },
      startTime: { type: String, default: '09:00' },
      endtime: { type: String, default: '20:00' },
    },
    saturday: {
      isOpen: { type: Boolean, default: true },
      startTime: { type: String, default: '09:00' },
      endtime: { type: String, default: '20:00' },
    },
    sunday: {
      isOpen: { type: Boolean, default: true },
      startTime: { type: String, default: '09:00' },
      endtime: { type: String, default: '20:00' },
    },
    schedule:[{time:{type: String}}]

  },
  balance: { type: Number, default: 0 },
  deviceInfo: {
    appVersion: { type: String, default: "" },
    deviceToken: { type: String, default: "" },
    deviceType: { type: String, default: "" },
    deviceName: { type: String, default: "" },
  },
  socialID: { type: String },
  socialtype: { type: String, enum: ["Apple", "Facebook", "Google"] },
  description: { type: String, default: "" },
  aboutUs: { type: String, default: "" },
  salonid: { type: mongoose.Types.ObjectId, ref: "Users" },
  createdAt: { type: Date, default: Date.now() },
  updatedAt: { type: Date, default: Date.now() },
  createdBy: { type: mongoose.Types.ObjectId, ref: "Users" },
  deletedBy: { type: mongoose.Types.ObjectId, ref: "Users" },
  isDeleted: { type: Boolean, default: false },
  deletedAt: { type: Date },
  source: { type: String, default: "Bakim Randevu", enum: ["Bakim Randevu", "Facebook", "Google Map", "Provider Link", "Instagram", "Widget", "Team Member", "Manual"] },
  notes: { type: String, default: "" },
  status: { type: String, default: "Registered", enum: ["Registered", "Had first call", "Scheduled photoshoot", "Verified", "Rejected", "Final review Approved", "Onborded"] },
  prepaymentRequired: { type: Boolean, default: false },
  userUniqueId: { type: String, default: "" },
  onboarding_progress: { type: String, default: "onboarding", enum: ["onboarding", "plans_purchased", "about_company_filled", "opening_hours_added", "services_added", "portfolio_added", "resources_added", "completed"] },
});

class UserClass {
  static async isEmailExists(email) {
    var result = false;
    const data = await this.findOne({ email: email }).select('email').exec();
    if (data) result = true;
    return result;
  }
  static async isMobileExists(mobile) {
    var result = false;
    const data = await this.findOne({ mobile: mobile }).select('mobile').exec();
    if (data) result = true;
    return result;
  }
  static async findUserForLogin(username) {
    var result = null;
    const data = await this.findOne({ $or: [{ email: username }, { mobile: username }] }).select('firstName lastName mobile email password mobileVerified emailVerified userType active onboarding_progress status').exec();
    if (data) result = data;
    return result;
  }
  static async findUserBySocialID(socialid) {
    const data = await this.findOne({ socialID: socialid }).select('firstName lastName mobile email mobileVerified emailVerified userType active').exec();
    return data;
  }
  static async findUserByEmail(email) {
    const data = await this.findOne({ email: email }).select('firstName lastName mobile email mobileVerified emailVerified userType active').exec();
    return data;
  }
  static async findUserByMobile(mobile) {
    const data = await this.findOne({ mobile: mobile }).select('firstName lastName mobile email mobileVerified emailVerified userType active').exec();
    return data;
  }
  static async findUserById(userid) {
    var result = null;
    const data = await this.findOne({ _id: userid }).select('firstName lastName mobile email password mobileVerified emailVerified userType active').exec();
    if (data) result = data;
    return result;
  }
  static async SalonAmenitiesIds(salonid) {
    const data = await this.findOne({ _id: salonid }).select('salonDetail.amenities').exec();
    return data;
  }
  static async GetUserUniqueId() {
    const data = await this.findOne({ userType: 'Salon' }).sort({ createdAt: -1 }).select('userUniqueId').exec();
    if (data === null) {
      return parseInt(1);
    } else {
      return parseInt(data.userUniqueId) + 1;
    }
  }
  static async EmployeeServiceInfo(employeeid, salonid) {
    const data = await this.findOne({ _id: employeeid, salonid: salonid }).select('employeeDetail').exec();
    var serviceids = data.employeeDetail.assignedService.map(data => data.serviceid)
    return serviceids;
  }
  static async SalonLanguageServiceIDSArray(salonid) {
    const data = await this.find({ _id: salonid }).distinct('salonDetail.prefferedLanguage.languageid').exec();
    return data;
  }
  static async SalonImagesAndLocation(salonid) {
    const data = await this.findOne({ _id: salonid }).select('salonDetail location').exec();
    return data;
  }

  static async SalonServiceInfo(salonid) {
    const data = await this.findOne({ salonid: salonid, userType: 'Employee' }).select('employeeDetail').exec();
    var serviceids = data.employeeDetail.assignedService.map(data => data.serviceid)
    return serviceids;
  }
  static async SalonPortfolio(employeeid) {
    const data = await this.findOne({ _id: employeeid }).select('salonid').exec();
    return data;
  }
}
UserSchema.loadClass(UserClass);
UserSchema.post('save', function (doc) {
  if (doc.userType === "Salon") {
    const query = new Setting({ userid: doc._id });
    query.save()
  }
});

UserSchema.index({'location': "2dsphere"});
const Users = mongoose.model("Users", UserSchema);
module.exports = { Users };