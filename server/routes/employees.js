const express = require("express");
const router = express.Router();
const Employee = require("../models/Employee");
const bcrypt = require("bcryptjs");

// CREATE EMPLOYEE
router.post("/create", async (req, res) => {
  const { name, email, password } = req.body;

  const existing = await Employee.findOne({ email });
  if (existing) {
    return res.status(400).json({ message: "Employee already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const employee = new Employee({
    name,
    email,
    password: hashedPassword,
  });

  await employee.save();
  res.json({ message: "Employee created successfully" });
});

// GET ALL EMPLOYEES
router.get("/", async (req, res) => {
  const employees = await Employee.find({}, { password: 0 });
  res.json(employees);
});
router.delete("/delete/:id", async (req, res) => {
  try {
    await Employee.findByIdAndDelete(req.params.id);
    res.json({ message: "Employee deleted" });
  } catch (err) {
    res.status(500).json({ message: "Delete failed" });
  }
});

module.exports = router;

