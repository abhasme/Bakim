const { Category } = require("./CategoryModel");
const mongoose = require("mongoose");
const ServiceSchema = mongoose.Schema({
  name: { type: String, minLength: 2, maxLength: 150, required: true, unique: true },
  categoryid: { type: mongoose.Types.ObjectId, ref: "Category" },
  thumbnail: { type: String, default: "" },
  image: { type: String, default: "" },
  description: { type: String, default: "" },
  restriction: { type: String, default: "" },
  goodToKnow: { type: String, default: "" },
  active: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now() },
  createdBy: { type: mongoose.Types.ObjectId, ref: "Users" },
  deletedBy: { type: mongoose.Types.ObjectId, ref: "Users" },
  isDeleted: { type: Boolean, default: false },
  deletedAt: { type: Date },
});
ServiceSchema.post('save', function (doc) {
  Category.increaseServiceCount(doc.categoryid)
});
const Service = mongoose.model("Service", ServiceSchema);
module.exports = { Service };