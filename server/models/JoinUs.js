const mongoose = require("mongoose");

const joinUsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  email: {
    type: String,
    default: ""
  },
  role: {
    type: String,
    default: ""
  },
  status: {
    type: String,
    default: "New"   // New, Assigned, Hired
  }
}, { timestamps: true });

module.exports = mongoose.model("JoinUs", joinUsSchema);

