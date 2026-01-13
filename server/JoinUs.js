const mongoose = require("mongoose");

const joinUsSchema = new mongoose.Schema({
  name: String,
  phone: String,
  status: { type: String, default: "New" }, // New, Assigned, Hired
}, { timestamps: true });

module.exports = mongoose.model("JoinUs", joinUsSchema);

