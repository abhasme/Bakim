const mongoose = require("mongoose");
const DiscountSchema = mongoose.Schema({
  name: { type: String, minLength: 2, maxLength: 150, required: true },
  status: { type: String, default: "" },
  salonid: { type: mongoose.Types.ObjectId, ref: "Users" },
  active: { type: Boolean, default: false },
  thumbnail: { type: String, default: "" },
  image: { type: String, default: "" },
  fromDate: { type: Date },
  toDate: { type: Date },
  general: {
    enableDiscount: { type: Boolean, default: false },
    discount: { type: Number, min: 0, max: 100, default: 0 },
  },

  lastMinute: {
    enableDiscount: { type: Boolean, default: false },
    discount: { type: Number, min: 0, max: 100, default: 0 },
    beforeActive: { type: Number, default: 0 },
  },

  offPic: {
    enableDiscount: { type: Boolean, default: false },
  },
  services: [
    {
      // salonServiceid: {
      //   type: mongoose.Types.ObjectId,
      //   ref: "SalonServices",
      //   required: true,
      // },
      serviceid: {
        type: mongoose.Types.ObjectId,
        ref: "Service",
        required: true,
      },
    },
  ],

  monday: {
    morning: { type: Number, min: 0, max: 100, default: 0 },
    afternoon: { type: Number, min: 0, max: 100, default: 0 },
    evening: { type: Number, min: 0, max: 100, default: 0 },
    venueStatus: { type: Boolean, default: true },
  },
  tuesday: {
    morning: { type: Number, min: 0, max: 100, default: 0 },
    afternoon: { type: Number, min: 0, max: 100, default: 0 },
    evening: { type: Number, min: 0, max: 100, default: 0 },
    venueStatus: { type: Boolean, default: true },
  },
  wednesday: {
    morning: { type: Number, min: 0, max: 100, default: 0 },
    afternoon: { type: Number, min: 0, max: 100, default: 0 },
    evening: { type: Number, min: 0, max: 100, default: 0 },
    venueStatus: { type: Boolean, default: true },
  },
  thursday: {
    morning: { type: Number, min: 0, max: 100, default: 0 },
    afternoon: { type: Number, min: 0, max: 100, default: 0 },
    evening: { type: Number, min: 0, max: 100, default: 0 },
    venueStatus: { type: Boolean, default: true },
  },
  friday: {
    morning: { type: Number, min: 0, max: 100, default: 0 },
    afternoon: { type: Number, min: 0, max: 100, default: 0 },
    evening: { type: Number, min: 0, max: 100, default: 0 },
    venueStatus: { type: Boolean, default: true },
  },
  saturday: {
    morning: { type: Number, min: 0, max: 100, default: 0 },
    afternoon: { type: Number, min: 0, max: 100, default: 0 },
    evening: { type: Number, min: 0, max: 100, default: 0 },
    venueStatus: { type: Boolean, default: true },
  },
  sunday: {
    morning: { type: Number, min: 0, max: 100, default: 0 },
    afternoon: { type: Number, min: 0, max: 100, default: 0 },
    evening: { type: Number, min: 0, max: 100, default: 0 },
    venueStatus: { type: Boolean, default: true },
  },

  createdAt: { type: Date, default: Date.now() },
  createdBy: { type: mongoose.Types.ObjectId, ref: "Users" },
  deletedBy: { type: mongoose.Types.ObjectId, ref: "Users" },
  isDeleted: { type: Boolean, default: false },
  deletedAt: { type: Date },
});
class DiscountClass {
  static async SalonDiscountInfo(resourceid, salonid) {
    const data = await this.findOne({ _id: resourceid }).select('services').exec();
    return data;
  }
}
DiscountSchema.loadClass(DiscountClass);
const Discount = mongoose.model("Discount", DiscountSchema);
module.exports = { Discount };
