const mongoose = require("mongoose");
const CmsSchema = mongoose.Schema({
    pageName: { type: String, enum: ['aboutUs', 'partnerHelpCenter', 'contactUs', 'customerHelpCenter', 'weAreHiering', 'legal', 'privacyPolicy', 'bookingTerm', 'contentPolicy', 'taxStrategy'] },
    content: { type: String, default: "" },
    pageUrl: { type: String, default: "" },
    active: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now() },
    isDeleted: { type: Boolean, default: false },
    deletedAt: { type: Date },
})

const Cms = mongoose.model("Cms", CmsSchema);
module.exports = { Cms };