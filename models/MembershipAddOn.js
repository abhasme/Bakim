const mongoose = require("mongoose");
const MembershipAddOnSchema = mongoose.Schema({
    planAddonName: { type: String, minLength: 2, maxLength: 150, required: true },
    staffLimit: { type: Number, default: 0 },
    price: { type: Number, default: 0 },
    subDomain: { type: Boolean, default: false },
    uniqueDomain: { type: Boolean, default: false },
    discount: { type: Number, default: 0 },
    planType: { type: String, default: "Monthly", enum: ["Monthly", "Yearly", "Both"] },
    monthlyPrice: { type: Number, default: 0 },
    yearlyPrice: { type: Number, default: 0 },
    active: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now() },
    createdBy: { type: mongoose.Types.ObjectId, ref: "Users" },
    deletedBy: { type: mongoose.Types.ObjectId, ref: "Users" },
    isDeleted: { type: Boolean, default: false },
    deletedAt: { type: Date },
});
const MembershipAddOn = mongoose.model("MembershipAddOn", MembershipAddOnSchema);
module.exports = { MembershipAddOn };