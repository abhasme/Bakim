const mongoose = require("mongoose");
const mongoosePaginate = require('mongoose-paginate-v2');
const Categorychema = mongoose.Schema({
  name: { type: String, minLength: 2, maxLength: 150, required: true, unique: true },
  thumbnail: { type: String, default: "" },
  servicecount: { type: Number, default: 0 },
  image: { type: String, default: "" },
  active: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now() },
  createdBy: { type: mongoose.Types.ObjectId, ref: "Users" },
  deletedBy: { type: mongoose.Types.ObjectId, ref: "Users" },
  isDeleted: { type: Boolean, default: false },
  deletedAt: { type: Date },
});
class CategoryClass {
  static async increaseServiceCount(categoryid) {
    var result = false;
    const data = await this.findByIdAndUpdate({ _id: categoryid }, { $inc: { servicecount: 1 } }).exec();
    if (data) result = true;
    return result;
  }
}
Categorychema.loadClass(CategoryClass);
Categorychema.plugin(mongoosePaginate);
const Category = mongoose.model("Category", Categorychema);
module.exports = { Category };