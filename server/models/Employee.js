const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, default: "" },
    password: { type: String },
    phone: { type: String, required: true, unique: true },
    accountNo: { type: String, default: "" },
    role: { type: String, default: "Employee" },
    status: { type: String, default: "Pending", enum: ["Pending","Active","Blocked"] }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Employee", employeeSchema);

