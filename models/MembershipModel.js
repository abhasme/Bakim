const mongoose = require("mongoose");
const MembershipSchema = mongoose.Schema({
    planName: { type: String, minLength: 2, maxLength: 150, required: true },
    staffLimit: { type: Number, default: 0 },
    commisionPercent: { type: Number, default: 0 },
    planType: { type: String, default: "Monthly", enum: ["Monthly", "Yearly", "Both"] },
    monthlyPrice: { type: Number, default: 0 },
    yearlyPrice: { type: Number, default: 0 },
    bookingWidget: { type: Boolean, default: false },
    subDomain: { type: Boolean, default: false },
    uniqueDomain: { type: Boolean, default: false },
    discount: { type: Number, default: 0 },
    active: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now() },
    createdBy: { type: mongoose.Types.ObjectId, ref: "Users" },
    deletedBy: { type: mongoose.Types.ObjectId, ref: "Users" },
    isDeleted: { type: Boolean, default: false },
    deletedAt: { type: Date },
});
const Membership = mongoose.model("Membership", MembershipSchema);
module.exports = { Membership };