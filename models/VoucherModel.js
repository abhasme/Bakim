const mongoose = require("mongoose");
const VoucherSchema = mongoose.Schema({
    salonid: { type: mongoose.Types.ObjectId, ref: "Users", required: true },
    code: { type: String, default: "" },
    stock: { type: Number, default: 0 },
    price: { type: Number, default: 0 },
    discount: { type: Number, default: 0 },
    startDate: { type: Date },
    endDate: { type: Date },
    active: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now() },
    createdBy: { type: mongoose.Types.ObjectId, ref: "Users" },
    deletedBy: { type: mongoose.Types.ObjectId, ref: "Users" },
    isDeleted: { type: Boolean, default: false },
    deletedAt: { type: Date },
    name: { type: String, minLength: 2, maxLength: 150, default: "" },
    thumbnail: { type: String, default: "" },
    image: { type: String, default: "" },
});
const Voucher = mongoose.model("Voucher", VoucherSchema);
module.exports = { Voucher };