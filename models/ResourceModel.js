const mongoose = require("mongoose");
const ResourceSchema = mongoose.Schema({
    name: { type: String, minLength: 2, maxLength: 150, required: true },
    salonid: { type: mongoose.Types.ObjectId, ref: "Users", required: true },
    quantity: { type: Number, default: 0 },
    services: [
        {
            serviceid: { type: mongoose.Types.ObjectId, ref: "Service", required: true },
        }],
    active: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now() },
    createdBy: { type: mongoose.Types.ObjectId, ref: "Users" },
    deletedBy: { type: mongoose.Types.ObjectId, ref: "Users" },
    isDeleted: { type: Boolean, default: false },
    deletedAt: { type: Date },
});
class ResourceClass {
    static async SalonResourceInfo(resourceid, salonid) {
        const data = await this.findOne({ _id: resourceid, salonid: salonid }).select('name quantity services').exec();
        return data;
    }
}
ResourceSchema.loadClass(ResourceClass);
const Resource = mongoose.model("Resource", ResourceSchema);
module.exports = { Resource };