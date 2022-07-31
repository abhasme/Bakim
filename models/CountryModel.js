const mongoose = require("mongoose");
const CountrySchema = mongoose.Schema({
  name: { type: String, minLength: 2, maxLength: 126, required: true, },
  code: { type: String, minLength: 1, maxLength: 126, required: true, },
  flag: { type: String, minLength: 2, maxLength: 15, required: true },
  numericCode: { type: Number, required: true },
  domain: { type: String, required: true },
  location: { type: [Number], default: [0, 0] },
  active: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now() },
  createdBy: { type: mongoose.Types.ObjectId, ref: "Users" },
  deletedBy: { type: mongoose.Types.ObjectId, ref: "Users" },
  isDeleted: { type: Boolean, default: false },
  deletedAt: { type: Date },
});
class CountryClass {
  static async getCountryIdByName(country) {
    const data = await this.findOne({ name: country }).select('id').exec();
    return data;
  }
}
CountrySchema.loadClass(CountryClass);
const Country = mongoose.model("Country", CountrySchema);
module.exports = { Country };