const mongoose = require("mongoose");
const PackageSchema = mongoose.Schema({
    salonid: { type: mongoose.Types.ObjectId, ref: "Users", required: true },
    categoryid: { type: mongoose.Types.ObjectId, ref: "Category", required: true },
    servicesgroup: [{
        serviceid: { type: mongoose.Types.ObjectId, ref: "Service", required: true },
        pricingOptionid: { type: mongoose.Types.ObjectId, ref: "SalonServices.pricingOption" }
    }],
    serviceTitle: { type: String, minLength: 2, maxLength: 150, required: true },
    discountid: { type: mongoose.Types.ObjectId, ref: "Discount" },
    thumbnail: { type: String, default: "" },
    image: { type: String, default: "" },
    price: { type: Number, default: 0 },
    cleanupTime: { type: Number, default: 0 },
    priceType: { type: String, default: "CustomePrice", enum: ["CustomePrice", "ServicePrice"] },
    description: { type: String, default: "" },
    restriction: { type: String, default: "" },
    goodToKnow: { type: String, default: "" },
    isFeatured: { type: Boolean, default: false },
    appointmentleadTime: { type: Number, default: 0 },
    sellServiceOnline: { type: Boolean, default: false },
    active: { type: Boolean, default: true },
    serviceAvailbility: {
        monday: { type: Boolean, default: true },
        tuesday: { type: Boolean, default: true },
        wednesday: { type: Boolean, default: true },
        thursday: { type: Boolean, default: true },
        friday: { type: Boolean, default: true },
        saturday: { type: Boolean, default: true },
        sunday: { type: Boolean, default: true },
    },
    createdAt: { type: Date, default: Date.now() },
    createdBy: { type: mongoose.Types.ObjectId, ref: "Users" },
    deletedBy: { type: mongoose.Types.ObjectId, ref: "Users" },
    isDeleted: { type: Boolean, default: false },
    deletedAt: { type: Date },
});

class PackageClass {
    static async SalonPackageInfo(packageid, salonid) {
        const data = await this.findOne({ _id: packageid, salonid: salonid }).select('servicesgroup').exec();
        return data;
    }
}
PackageSchema.loadClass(PackageClass);
const Package = mongoose.model("Package", PackageSchema);
module.exports = { Package };