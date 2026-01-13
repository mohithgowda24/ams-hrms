const express = require("express");
const Employee = require("../models/Employee");
const EmployeeOTP = require("../models/EmployeeOTP");
const router = express.Router();

function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

router.post("/send-otp", async (req, res) => {
  const { phone } = req.body;

  const otp = generateOTP();
  await EmployeeOTP.deleteMany({ phone });

  await EmployeeOTP.create({
    phone,
    otp,
    expiresAt: new Date(Date.now() + 5 * 60000)
  });

  console.log("OTP for", phone, otp);

  res.json({ message: "OTP sent" });
});

router.post("/verify-otp", async (req, res) => {
  const { phone, otp, name, accountNo } = req.body;

  const record = await EmployeeOTP.findOne({ phone, otp });
  if (!record || record.expiresAt < new Date()) {
    return res.status(400).json({ message: "Invalid OTP" });
  }

  const employee = await Employee.create({
    name,
    phone,
    accountNo,
    status: "Pending"
  });

  await EmployeeOTP.deleteMany({ phone });

  res.json({ message: "Registered", employee });
});

module.exports = router;

