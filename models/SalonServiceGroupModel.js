const mongoose = require("mongoose");

const SalonServiceGroupSchema = mongoose.Schema({
  name: { type: String, minLength: 2, maxLength: 150, required: true },
  services: [{ type: mongoose.Types.ObjectId, ref: 'SalonServices' }],
  salonid: { type: mongoose.Types.ObjectId, ref: 'SalonServices' },
  groupid: { type: mongoose.Types.ObjectId, ref: 'servicegroups' },
  thumbnail: { type: String, default: "" },
  image: { type: String, default: "" },
  active: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now() },
  createdBy: { type: mongoose.Types.ObjectId, ref: "Users" },
  deletedBy: { type: mongoose.Types.ObjectId, ref: "Users" },
  isDeleted: { type: Boolean, default: false },
  deletedAt: { type: Date },

});
const SalonServiceGroup = mongoose.model("SalonServiceGroup", SalonServiceGroupSchema);
module.exports = { SalonServiceGroup };