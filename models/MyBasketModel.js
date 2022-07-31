const mongoose = require("mongoose");
const MyBasketSchema = mongoose.Schema({
    salonid: { type: mongoose.Types.ObjectId, ref: "Users", required: true },
    userid: { type: mongoose.Types.ObjectId, ref: "Users", required: true },
    teamid: { type: mongoose.Types.ObjectId, ref: "Users" },
    bookingdate: { type: Date, required: true },
    bookingtime: { type: String, required: true },
    salonServiceid: { type: mongoose.Types.ObjectId, ref: "SalonServices" },
    pricingOptionid: { type: mongoose.Types.ObjectId, ref: "SalonServices" },
    packageid: { type: mongoose.Types.ObjectId, ref: "Package" },
    price: { type: Number, default: 0 },
    duration: { type: Number, default: 0 },
    discount: { type: Number, default: 0 },
    active: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now() },
    createdBy: { type: mongoose.Types.ObjectId, ref: "Users" },
    deletedBy: { type: mongoose.Types.ObjectId, ref: "Users" },
    isDeleted: { type: Boolean, default: false },
    deletedAt: { type: Date },
});
class MyBasketClass {

}
MyBasketSchema.loadClass(MyBasketClass);
const MyBasket = mongoose.model("MyBasket", MyBasketSchema);
module.exports = { MyBasket };