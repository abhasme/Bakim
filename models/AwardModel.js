const mongoose = require("mongoose");
const AwardSchema = mongoose.Schema({
  name: { type: String, minLength: 2, maxLength: 150, required: true },
  thumbnail: { type: String, default: "" },
  image: { type: String, default: "" },
  active: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now() },
  createdBy: { type: mongoose.Types.ObjectId, ref: "Users" },
  deletedBy: { type: mongoose.Types.ObjectId, ref: "Users" },
  isDeleted: { type: Boolean, default: false },
  deletedAt: { type: Date },
});
const Award = mongoose.model("Award", AwardSchema);
module.exports = { Award };