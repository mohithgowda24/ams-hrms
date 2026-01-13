const express = require("express");
const Employee = require("../models/Employee");
const jwt = require("jsonwebtoken");

const router = express.Router();

const OTP_STORE = {}; // phone -> otp

router.post("/send-otp", async (req, res) => {
  const { phone } = req.body;
  const employee = await Employee.findOne({ phone, status: "Active" });

  if (!employee) return res.status(404).json({ message: "Not approved" });

  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  OTP_STORE[phone] = otp;

  // reuse SMS API
  const axios = require("axios");
  await axios.post(
    "https://www.fast2sms.com/dev/bulkV2",
    {
      route: "otp",
      numbers: phone,
      variables_values: otp
    },
    {
      headers: {
        authorization: process.env.FAST2SMS_KEY,
        "Content-Type": "application/json"
      }
    }
  );

  res.json({ message: "OTP sent" });
});

router.post("/verify-otp", async (req, res) => {
  const { phone, otp } = req.body;

  if (OTP_STORE[phone] !== otp) {
    return res.status(400).json({ message: "Invalid OTP" });
  }

  const employee = await Employee.findOne({ phone });

  delete OTP_STORE[phone];

  const token = jwt.sign(
    { id: employee._id },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

  res.json({ token, employee });
});

module.exports = router;


