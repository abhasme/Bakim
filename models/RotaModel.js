const mongoose = require("mongoose");
const { Schema } = mongoose;

const RotaSchema = mongoose.Schema({
    teamid: { type: mongoose.Types.ObjectId, },
    salonid: { type: mongoose.Types.ObjectId, },
    setTimeType:{type: String, enum: ['StandardTimes','CustomHours'], default: 'StandardTimes' },
    startTime: { type: String,},
    endtime: { type: String },
    date: { type: Date},
    endDate: { type: Date},
    repeat:{type: String, enum: ['None','EveryDay','EveryWeek','EveryOtherWeek'] },
    everyWeek:{type: [String]},
    scheduletype:{type: String, enum: ['Weekly','Monthly','Daily'], default: 'Daily' },
    description: { type: String ,default:""},
    active: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now() },
    createdBy: { type: mongoose.Types.ObjectId, ref: "Users" },
    deletedBy: { type: mongoose.Types.ObjectId, ref: "Users" },
    isDeleted: { type: Boolean, default: false },
    deletedAt: { type: Date },
});
class RotaClass {
    static async employeeRota(rotaid) {
      const data = await this.findOne({ _id: rotaid }).select('salonid').exec();
      return data;
    }
  }
  RotaSchema.loadClass(RotaClass);
const Rota = mongoose.model("Rota", RotaSchema);
module.exports = { Rota };
