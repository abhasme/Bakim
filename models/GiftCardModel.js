const mongoose = require("mongoose");
const GiftCardSchema = mongoose.Schema({
  name: { type: String, minLength: 2, maxLength: 150, required: true },
  code: { type: String, default: "" },
  quantity: { type: Number, default: 0 },
  price: { type: Number, default: 0 },
  benifit: { type: Number, default: 0 },
  expirtDate: { type: Date },
  createdAt: { type: Date, default: Date.now() },
  active: { type: Boolean, default: true },
  createdBy: { type: mongoose.Types.ObjectId, ref: "Users" },
  deletedBy: { type: mongoose.Types.ObjectId, ref: "Users" },
  isDeleted: { type: Boolean, default: false },
  deletedAt: { type: Date },
});
const GiftCard = mongoose.model("GiftCard", GiftCardSchema);
module.exports = { GiftCard };