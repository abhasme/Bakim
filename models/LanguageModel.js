const mongoose = require("mongoose");
const LanguageSchema = mongoose.Schema({
    name: { type: String, minLength: 2, maxLength: 150, required: true },
    active: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now() },
    createdBy: { type: mongoose.Types.ObjectId, ref: "Users" },
    deletedBy: { type: mongoose.Types.ObjectId, ref: "Users" },
    isDeleted: { type: Boolean, default: false },
    deletedAt: { type: Date },
});
const Language = mongoose.model("Language", LanguageSchema);
module.exports = { Language };