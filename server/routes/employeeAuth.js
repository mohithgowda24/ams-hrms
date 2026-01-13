const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Employee = require("../models/Employee");

const router = express.Router();

// EMPLOYEE LOGIN
router.post("/login", async (req, res) => {
  try {
    const { email, password, phone } = req.body;

    // Allow login via email or phone
    const employee = await Employee.findOne({
      $or: [{ email }, { phone }]
    });

    if (!employee) {
      return res.status(400).json({ message: "Employee not found" });
    }

    if (employee.status !== "Active") {
      return res.status(403).json({ message: "Admin approval required" });
    }

    const isMatch = await bcrypt.compare(password, employee.password || "");
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: employee._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      token,
      employee: {
        _id: employee._id,
        name: employee.name,
        email: employee.email,
        phone: employee.phone,
        accountNo: employee.accountNo
      }
    });
  } catch (err) {
    console.error("Employee login error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;

