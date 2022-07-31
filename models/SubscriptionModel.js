const mongoose = require("mongoose");
const SubscriptionSchema = mongoose.Schema({
    salonid: { type: mongoose.Types.ObjectId, ref: "Users", required: true },
    membershipid: { type: mongoose.Types.ObjectId, ref: "Membership" },
    membershipAddonid: { type: mongoose.Types.ObjectId, ref: "MembershipAddOn" },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    amount: { type: Number, default: 0 },
    description: { type: String, default: "" },
    transactionid: { type: String, default: "" },
    active: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now() },
    deletedBy: { type: mongoose.Types.ObjectId, ref: "Users" },
    isDeleted: { type: Boolean, default: false },
    deletedAt: { type: Date },
});
const Subscription = mongoose.model("Subscription", SubscriptionSchema);
module.exports = { Subscription };