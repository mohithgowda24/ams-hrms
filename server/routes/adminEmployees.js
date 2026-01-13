const express = require("express");
const Employee = require("../models/Employee");
const router = express.Router();

// All employees
router.get("/", async (req, res) => {
  const employees = await Employee.find().sort({ createdAt: -1 });
  res.json(employees);
});

// Approve employee
router.put("/approve/:id", async (req, res) => {
  await Employee.findByIdAndUpdate(req.params.id, { status: "Active" });
  res.json({ message: "Employee approved" });
});

// Block employee
router.put("/block/:id", async (req, res) => {
  await Employee.findByIdAndUpdate(req.params.id, { status: "Blocked" });
  res.json({ message: "Employee blocked" });
});

module.exports = router;

