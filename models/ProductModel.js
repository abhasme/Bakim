const mongoose = require("mongoose");
const ProductSchema = mongoose.Schema({
    name: { type: String, minLength: 2, maxLength: 150, required: true },
    salonid: { type: mongoose.Types.ObjectId, ref: "Users", required: true },
    thumbnail: { type: String, default: "" },
    image: { type: String, default: "" },
    price: { type: Number, default: 0 },
    discount: { type: Number, default: 0 },
    stock: { type: Number, default: 0 },
    active: { type: Boolean, default: true },
    manageInventory: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now() },
    createdBy: { type: mongoose.Types.ObjectId, ref: "Users" },
    deletedBy: { type: mongoose.Types.ObjectId, ref: "Users" },
    isDeleted: { type: Boolean, default: false },
    deletedAt: { type: Date },
});
const Product = mongoose.model("Product", ProductSchema);
module.exports = { Product };