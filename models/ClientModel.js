const mongoose = require("mongoose");

const ClientSchema = mongoose.Schema({
    firstName: { type: String, default: "", maxLength: 126, required: true, },
    lastName: { type: String, default: "", maxLength: 126, required: true, },
    mobile: { type: String, required: true, unique: true, },
    email: { type: String, required: true, unique: true },
    gender: { type: String, enum: ['Male', 'Female', 'Prefer Not to say'], default: 'Prefer Not to say' },
    profileImage: { type: String, default: "" },
    postalCode: { type: String, default: "" },
    dateOfBirth: { type: Date },
    acceptMarketingEmail: { type: Boolean, default: false },
    prepaymentRequired: { type: Boolean, default: false },
    notes: { type: String, default: "" },
    salonid: { type: mongoose.Types.ObjectId, ref: "Users" },
    createdAt: { type: Date, default: Date.now() },
    updatedAt: { type: Date, default: Date.now() },
    createdBy: { type: mongoose.Types.ObjectId, ref: "Users" },
    deletedBy: { type: mongoose.Types.ObjectId, ref: "Users" },
    isDeleted: { type: Boolean, default: false },
    deletedAt: { type: Date },
});
class ClientClass {

}
ClientSchema.loadClass(ClientClass);
const Client = mongoose.model("Client", ClientSchema);
module.exports = { Client };