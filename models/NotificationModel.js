const mongoose = require("mongoose");
const NotificationSchema = mongoose.Schema({
  users: [{
    userid: { type: mongoose.Types.ObjectId, ref: "Users" },
    seen: { type: Boolean, default: false },
    seenAt: { type: Date },
  }],
  title: { type: String, required: true },
  description: { type: String, default: "" },
  active: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now() },
  createdBy: { type: mongoose.Types.ObjectId, ref: "Users" },
  deletedBy: { type: mongoose.Types.ObjectId, ref: "Users" },
  isDeleted: { type: Boolean, default: false },
  deletedAt: { type: Date },
});
class NotificationClass {

}
NotificationSchema.loadClass(NotificationClass);
const Notification = mongoose.model("Notification", NotificationSchema);
module.exports = { Notification };