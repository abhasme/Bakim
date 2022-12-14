const mongoose = require("mongoose");
const SettingSchema = mongoose.Schema({
  userid: { type: mongoose.Types.ObjectId, ref: "Users", required: true },
  sendMessageFrom: { type: String, default: "" },
  sendEmailFrom: { type: String, default: "" },
  thankYouEmail: { type: Boolean, default: false },
  bookAgainEmail: { type: Boolean, default: false },
  birthdayEmail: { type: Boolean, default: false },
  changesInBookingEmail: { type: Boolean, default: false },
  appointmentReminders: { type: Boolean, default: false },
  reminder: {
    emailTimeBeforeAppointment: { type: Number, default: 0 },
    smsTimeBeforeAppointment: { type: Number, default: 0 },
    emailReminder: { type: Boolean, default: false },
    smsReminder: { type: Boolean, default: false },
  },
  verifiedReviewEmail: { type: Boolean, default: false },
  weblink: { type: String, default: "" },
  partnerWebsite: { type: Boolean, default: false },
  theme: { type: String, default: "", enum: [""] },
  subdomain: { type: String, default: "" },
  socialInfo: {
    facebookAccount: { type: String, default: "" },
    instagramAccount: { type: String, default: "" },
    twitterAccount: { type: String, default: "" },
  },
  imprint: { type: String, default: "" },
  clientPrimaryEmail: { type: String, default: "" },
  clientSecondryEmail: { type: String, default: "" },
  notification: {
    receviceTextMessage: { type: Boolean, default: false },
    receviceEmailMessage: { type: Boolean, default: false },
    booking: { type: Boolean, default: false },
    changeCalendar: { type: Boolean, default: false },
    bookingSendCopyToSalon: { type: Boolean, default: false },
    reviewOnPost: { type: Boolean, default: false },
    beforeAppointment: { type: Boolean, default: false },
    timeBeforeAppointment: { type: Number, default: 0 },
  },
  financeInfo: {
    postalCode: { type: String, default: "" },
    address: { type: String, default: "" },
    city: { type: String, default: "" },
    country: { type: String, default: "" },
    state: { type: String, default: "" },
    bussinessEmail: { type: String, default: "" },
    bussinessPhone: { type: String, default: "" },
    vatNO: { type: String, default: "" },
    registrationNo: { type: String, default: "" },
    contactPersion: { type: String, default: "" },
  },
  booking: {
    calendarTimeScale: { type: Number, default: 0 },
    onlineBookingInterval: { type: Number, default: 0 },
    cancellationPolicy: { type: Number, default: 0 },
    allowMultiEmployee: { type: Boolean, default: false },
    advanceBookingDayLimit: { type: Number, default: 0 },
    afternoonStartedAt: { type: String, default: "" },
    eveningStartedAt: { type: String, default: "" },
    bookingConfirmationPhone: { type: String, default: "" },
    bookingConfirmationSms: { type: Boolean, default: false },
  },
  membership: {
    enableAutoRenew: { type: Boolean, default: true },
  },
  active: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now() },
  createdBy: { type: mongoose.Types.ObjectId, ref: "Users" },
  deletedBy: { type: mongoose.Types.ObjectId, ref: "Users" },
  isDeleted: { type: Boolean, default: false },
  deletedAt: { type: Date },

});
const Setting = mongoose.model("Setting", SettingSchema);
module.exports = { Setting };
