const mongoose = require("mongoose");
const ServiceGroupSchema = mongoose.Schema({
  name: { type: String, minLength: 2, maxLength: 150, required: true, unique: true },
  services: [{ type: mongoose.Types.ObjectId, ref: 'Service' }],
  // services: [{ serviceid : {type : mongoose.Types.ObjectId, ref: "Service", required: true} }], 
  thumbnail: { type: String, default: "" },
  image: { type: String, default: "" },
  active: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now() },
  createdBy: { type: mongoose.Types.ObjectId, ref: "Users" },
  deletedBy: { type: mongoose.Types.ObjectId, ref: "Users" },
  isDeleted: { type: Boolean, default: false },
  deletedAt: { type: Date },
});
const ServiceGroup = mongoose.model("ServiceGroup", ServiceGroupSchema);
module.exports = { ServiceGroup };