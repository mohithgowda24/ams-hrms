const express = require("express");
const Employee = require("../models/Employee");

const router = express.Router();

// Create employee (Admin)
router.post("/create", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const exists = await Employee.findOne({ email });
    if (exists) {
      return res.status(400).json({ message: "Employee already exists" });
    }

    const employee = new Employee({
      name,
      email,
      password,
    });

    await employee.save();

    res.json({ message: "Employee created successfully", employee });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get all employees (Admin)
router.get("/", async (req, res) => {
  const employees = await Employee.find().sort({ createdAt: -1 });
  res.json(employees);
});

module.exports = router;

