const mongoose = require("mongoose");

const ServiceSchema = mongoose.Schema({
  orderrefid: { type: mongoose.Types.ObjectId, ref: "MyBasket", },
  salonServiceid: { type: mongoose.Types.ObjectId, ref: "SalonServices" },
  serviceid: { type: mongoose.Types.ObjectId, ref: "Service" },
  pricingOptionid: { type: mongoose.Types.ObjectId, ref: "SalonServices" },
  teamid: { type: mongoose.Types.ObjectId, ref: "Users" },
  slotid: { type: mongoose.Types.ObjectId, ref: "Users" },
  price: { type: Number, default: 0 },
  time: { type: String, default: "" },
  duration: { type: Number, default: 0 },
  commissionFee: { type: Number, default: 0 },
  discount: { type: Number, default: 0 },
  notes: { type: String, default: "" },
  paymentstatus: { type: String, default: "Unpaid", enum: ["Unpaid", "Paid"] },
  status: { type: String, default: "Open", enum: ["Open"] },
  createdAt: { type: Date, default: Date.now() },
  active: { type: Boolean, default: true },
  isDeleted: { type: Boolean, default: false },
  deletedAt: { type: Date },
})
const LocationSchema = mongoose.Schema({
  postalCode: { type: String, default: "" },
  address: { type: String, default: "" },
  city: { type: String, default: "" },
  state: { type: String, default: "" },
  country: { type: String, default: "" },
  city: { type: String, default: "" },
  type: { type: String, default: 'Point' },
  coordinates: { type: [Number], default: [0, 0] }
})
const PaymentSchema = mongoose.Schema({
  paymentMethod: { type: String, default: "" },
  cardNumber: { type: String, default: "" },
  cardExpires: { type: String, default: "" },
  transectionid: { type: String, default: "" },
  transectioAt: { type: Date, default: Date.now() },
  amount: { type: Number, default: 0 },
  transectionstatus: { type: String, default: '' },
  response: { type: String, default: '' },
})

const BookingSchema = mongoose.Schema({
  fullname: { type: String, default: "", minLength: 3, maxLength: 126, required: true, },
  email: { type: String, default: "" },
  phone: { type: String, default: "" },
  salonid: { type: mongoose.Types.ObjectId, ref: "Users", required: true },
  userid: { type: mongoose.Types.ObjectId, ref: "Users", required: true },
  bookingdate: { type: Date, required: true },
  bookingtime: { type: String, required: true },
  endTime: { type: String, default: "" },
  orderRef: { type: String, },
  services: [ServiceSchema],
  packageid: { type: mongoose.Types.ObjectId, ref: "Package" },
  discount: { type: Number, default: 0 },
  vatAmount: { type: Number, default: 0 },
  totalAmount: { type: Number, default: 0 },
  paidAmount: { type: Number, default: 0 },
  prePaidAmount: { type: Number, default: 0 },
  paymentMode: { type: String, default: '' },
  refundAmount: { type: Number, default: 0 },
  paymentstatus: { type: String, default: "Unpaid", enum: ["Paid", "Unpaid"] },
  status: { type: String, default: "Open", enum: ["Open", "Complete", "Confirmed", "Cancelled"] },
  location: [LocationSchema],
  active: { type: Boolean, default: true },
  couponCode: { type: String, default: "" },
  payment: [PaymentSchema],
  source: { type: String, default: "Bakim Randevu", enum: ["Bakim Randevu", "Facebook", "Google Map", "Provider Link", "Instagram", "Widget", "Team Member"] },
  notes: { type: String, default: "" },
  cancelReason: { type: String, default: "" },
  createdAt: { type: Date, default: Date.now() },
  createdBy: { type: mongoose.Types.ObjectId, ref: "Users" },
  deletedBy: { type: mongoose.Types.ObjectId, ref: "Users" },
  isDeleted: { type: Boolean, default: false },
  deletedAt: { type: Date },
});
class BookingClass {

}
BookingSchema.loadClass(BookingClass);
const Booking = mongoose.model("Booking", BookingSchema);
module.exports = { Booking };