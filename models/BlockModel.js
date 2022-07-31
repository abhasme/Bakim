const mongoose = require("mongoose");
const BlockSchema = mongoose.Schema({
    teamid: { type: mongoose.Types.ObjectId, ref: "Users", required: true },
    description: { type: String, default: "" },
    repeat: { type: String, default: "User", enum: ["User", "Salon", "Employee", "Admin"] },
    starttime: { type: String, default: "" },
    endtime: { type: String, default: "" },
    days: {
        monday: { type: Boolean, default: false },
        tuesday: { type: Boolean, default: false },
        wednesday: { type: Boolean, default: false },
        thursday: { type: Boolean, default: false },
        friday: { type: Boolean, default: false },
        saturday: { type: Boolean, default: false },
        sunday: { type: Boolean, default: false },
    },
    startDate: { type: Date },
    endDate: { type: Date },
    active: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now() },
    createdBy: { type: mongoose.Types.ObjectId, ref: "Users" },
    deletedBy: { type: mongoose.Types.ObjectId, ref: "Users" },
    isDeleted: { type: Boolean, default: false },
    deletedAt: { type: Date },
});
const Block = mongoose.model("Block", BlockSchema);
module.exports = { Block };