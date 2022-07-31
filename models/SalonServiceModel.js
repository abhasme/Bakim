const mongoose = require("mongoose");

const TeamSchema = mongoose.Schema({
  teamid: { type: mongoose.Types.ObjectId, ref: "Users" },
  createdAt: { type: Date, default: Date.now() },
  active: { type: Boolean, default: true },
})

const PricingOptionSchema = mongoose.Schema({
  name: { type: String, default: "" },
  duration: { type: Number, default: 0 },
  courancy: { type: String, default: "USD", enum: ["USD",] },
  saleprice: { type: Number, default: 0 },
  price: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now() },
  active: { type: Boolean, default: true },
})
const SalonServiceSchema = mongoose.Schema({
  categoryid: { type: mongoose.Types.ObjectId, ref: "Category" },
  serviceid: { type: mongoose.Types.ObjectId, ref: "Service" },
  name: { type: String, lowercase: true, required: true },
  thumbnail: { type: String, default: "" },
  image: { type: String, default: "" },
  description: { type: String, default: "" },
  restriction: { type: String, default: "" },
  goodToKnow: { type: String, default: "" },
  minprice: { type: Number, default: 0 },
  minduration: { type: Number, default: 0 },
  maxprice: { type: Number, default: 0 },
  salonid: { type: mongoose.Types.ObjectId, ref: "Users", required: true },
  discountid: { type: mongoose.Types.ObjectId, ref: "Discount" },
  cleanUpTime: { type: Number, default: 0 },
  isFeatured: { type: Boolean, default: false },
  sellServiceOnline: { type: Boolean, default: false },
  active: { type: Boolean, default: true },
  multipleService: { type: Boolean, default: false },
  appointmentleadTime: { type: Number, default: 0 },
  serviceAvailbility: {
    monday: { type: Boolean, default: true },
    tuesday: { type: Boolean, default: true },
    wednesday: { type: Boolean, default: true },
    thursday: { type: Boolean, default: true },
    friday: { type: Boolean, default: true },
    saturday: { type: Boolean, default: true },
    sunday: { type: Boolean, default: true },
  },
  teams: [TeamSchema],
  pricingOption: [PricingOptionSchema],
  createdAt: { type: Date, default: Date.now() },
  createdBy: { type: mongoose.Types.ObjectId, ref: "Users" },
  deletedBy: { type: mongoose.Types.ObjectId, ref: "Users" },
  isDeleted: { type: Boolean, default: false },
  deletedAt: { type: Date },
});
class SalonServiceClass {
  static async isServiceExists(serviceid, salonid) {
    var result = false;
    const data = await this.findOne({ serviceid: serviceid, salonid: salonid }).select('name').exec();
    if (data) result = true;
    return result;
  }

  static async SalonServiceIDSArray(salonid) {
    const data = await this.find({ salonid: salonid,active:true }).distinct('serviceid').exec();
    return data;
  }
  static async SalonServicePricingOption(salonid) {
    const data = await this.find({ salonid: salonid }).select('pricingOption serviceid active name minprice minduration').exec();
    return data;
  }
  static async SalonServicePricingOptionByServiceId(salonid, serviceid) {
    const data = await this.find({ salonid: salonid, serviceid: serviceid }).select('pricingOption serviceid active name').exec();
    return data;
  }
}
SalonServiceSchema.loadClass(SalonServiceClass);
const SalonServices = mongoose.model("SalonServices", SalonServiceSchema);
module.exports = { SalonServices };