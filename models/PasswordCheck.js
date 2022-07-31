const mongoose = require("mongoose")
const passwordCheckSchema = mongoose.Schema({
  password: { type: String },
  createdAt: { type: Date, default: Date.now() },
})

const PasswordCheck = mongoose.model("PasswordCheck", passwordCheckSchema)
module.exports = { PasswordCheck }
