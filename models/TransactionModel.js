const mongoose = require("mongoose");
const ProductTransactionSchema = mongoose.Schema({
    productid: { type: mongoose.Types.ObjectId, ref: "Product", required: true },
    quantity: { type: Number, default: 0 },
    price: { type: Number, default: 0 },
    discount: { type: Number, default: 0 },
    linetotal: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now() },
    active: { type: Boolean, default: true },
})

const VoucherTransactionSchema = mongoose.Schema({
    voucherid: { type: mongoose.Types.ObjectId, ref: "Voucher", required: true },
    quantity: { type: Number, default: 0 },
    price: { type: Number, default: 0 },
    discount: { type: Number, default: 0 },
    linetotal: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now() },
    active: { type: Boolean, default: true },
})

const TransactionSchema = mongoose.Schema({
    debiteduserid: { type: mongoose.Types.ObjectId, ref: "Users", required: true },
    crediteduserid: { type: mongoose.Types.ObjectId, ref: "Users", required: true },
    dateTime: { type: Date, default: Date.now() },
    bookingid: { type: mongoose.Types.ObjectId, ref: "Booking" },
    packageid: { type: mongoose.Types.ObjectId, ref: "Package" },
    description: { type: String, default: "" },
    amount: { type: Number, default: 0 },
    transactionType: { type: String, default: "Payment", enum: ["Payment"] },
    status: { type: String, default: "Open", enum: ["Open"] },
    products: [ProductTransactionSchema],
    vouchers: [VoucherTransactionSchema],
    active: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now() },
    createdBy: { type: mongoose.Types.ObjectId, ref: "Users" },
    deletedBy: { type: mongoose.Types.ObjectId, ref: "Users" },
    isDeleted: { type: Boolean, default: false },
    deletedAt: { type: Date },
});
class TransactionClass {

}
TransactionSchema.loadClass(TransactionClass);
const Transaction = mongoose.model("Transaction", TransactionSchema);
module.exports = { Transaction };