const mongoose = require("mongoose");

const JoineeSchema = new mongoose.Schema({
  employeeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employee",
    required: true,
  },

  // Basic details
  name: String,
  phone: String,

  // Family details
  nomineeName: String,
  fatherName: String,
  motherName: String,

  // Address
  presentAddress: String,
  permanentAddress: String,

  // Govt / Bank details
  aadharNumber: String,
  panNumber: String,
  esicNumber: String,
  uanNumber: String,
  accountNumber: String,

  // Documents
  aadharFile: String,
  panFile: String,
  bankFile: String,

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Joinee", JoineeSchema);

