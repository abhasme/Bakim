const mongoose = require("mongoose");
const StateSchema = mongoose.Schema({
  name: { type: String, minLength: 2, maxLength: 126, required: true, },
  location: { type: [Number], default: [0, 0] },
  countryid: { type: mongoose.Types.ObjectId, ref: "Country" },
  isDeleted: { type: Boolean, default: false },
  deletedAt: { type: Date },
  active: { type: Boolean, default: true },
})
class StateClass {
  static async getStateIdByName(state) {
    const data = await this.findOne({ name: state }).select('id').exec();
    return data;
  }
}
StateSchema.loadClass(StateClass);
const State = mongoose.model("State", StateSchema);
module.exports = { State };