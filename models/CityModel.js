const mongoose = require("mongoose");

const CitySchema = mongoose.Schema({
  name: { type: String, minLength: 2, maxLength: 126, required: true, },
  countryid: { type: mongoose.Types.ObjectId, ref: "Country" },
  stateid: { type: mongoose.Types.ObjectId, ref: "State" },
  location: { type: [Number], default: [0, 0] },
  createdAt: { type: Date, default: Date.now() },
  createdBy: { type: mongoose.Types.ObjectId, ref: "Users" },
  deletedBy: { type: mongoose.Types.ObjectId, ref: "Users" },
  isDeleted: { type: Boolean, default: false },
  deletedAt: { type: Date },
});
class CityClass {

}
CitySchema.loadClass(CityClass);
const City = mongoose.model("City", CitySchema);
module.exports = { City };