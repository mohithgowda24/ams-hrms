const express = require("express");
const Employee = require("../models/Employee");
const jwt = require("jsonwebtoken");
const axios = require("axios");

const router = express.Router();

// Store OTP temporarily
const otpStore = {}; 
// format: { phone: { otp, expires } }

// ================================
// SEND OTP
// ================================
router.post("/send-otp", async (req, res) => {
  try {
    const { phone } = req.body;

    if (!phone) {
      return res.status(400).json({ message: "Phone required" });
    }

    const employee = await Employee.findOne({ phone, status: "Approved" });
    if (!employee) {
      return res.status(400).json({ message: "Employee not approved" });
    }

    // Generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    otpStore[phone] = {
      otp,
      expires: Date.now() + 5 * 60 * 1000 // 5 minutes
    };

    // Send SMS using Fast2SMS (Transactional Route - No DLT)
    await axios.post(
      "https://www.fast2sms.com/dev/bulkV2",
      {
        route: "q",
        message: `Your Adithya Manpower Services OTP is ${otp}`,
        numbers: phone
      },
      {
        headers: {
          authorization: process.env.FAST2SMS_API_KEY,
          "Content-Type": "application/json"
        }
      }
    );

    res.json({ message: "OTP sent" });
  } catch (err) {
    console.error("OTP send error:", err.response?.data || err.message);
    res.status(500).json({ message: "Failed to send OTP" });
  }
});

// ================================
// VERIFY OTP
// ================================
router.post("/verify-otp", async (req, res) => {
  try {
    const { phone, otp } = req.body;

    const record = otpStore[phone];

    if (!record) {
      return res.status(400).json({ message: "OTP not found" });
    }

    if (record.expires < Date.now()) {
      delete otpStore[phone];
      return res.status(400).json({ message: "OTP expired" });
    }

    if (record.otp !== otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    const employee = await Employee.findOne({ phone });

    const token = jwt.sign(
      { id: employee._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    delete otpStore[phone];

    res.json({ token, employee });
  } catch (err) {
    console.error("OTP verify error", err);
    res.status(500).json({ message: "OTP verification failed" });
  }
});

module.exports = router;

