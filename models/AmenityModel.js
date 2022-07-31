const mongoose = require("mongoose")
const AmenitySchema = mongoose.Schema({
    name: { type: String, minLength: 2, maxLength: 150, required: true },
    active: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now() },
    createdBy: { type: mongoose.Types.ObjectId, ref: "Users" },
    deletedBy: { type: mongoose.Types.ObjectId, ref: "Users" },
    isDeleted: { type: Boolean, default: false },
    deletedAt: { type: Date },
})
const Amenity = mongoose.model("Amenity", AmenitySchema)
module.exports = { Amenity }
