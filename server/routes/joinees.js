const express = require("express");
const mongoose = require("mongoose");
const Joinee = require("../models/Joinee");

const router = express.Router();

/* =========================================
   GET ALL JOINEES (ADMIN)
========================================= */
router.get("/", async (req, res) => {
  try {
    const joinees = await Joinee.find().sort({ createdAt: -1 });
    res.json(joinees);
  } catch (err) {
    console.error("Fetch all joinees error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

/* =========================================
   GET JOINEES BY EMPLOYEE
========================================= */
router.get("/:employeeId", async (req, res) => {
  try {
    const { employeeId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(employeeId)) {
      return res.status(400).json({ message: "Invalid employee ID" });
    }

    const joinees = await Joinee.find({ employeeId });
    res.json(joinees);
  } catch (err) {
    console.error("Fetch employee joinees error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

/* =========================================
   ADD NEW JOINEE (EMPLOYEE)
========================================= */
router.post("/", async (req, res) => {
  try {
    const joinee = new Joinee(req.body);
    await joinee.save();
    res.status(201).json({ message: "Joinee added successfully" });
  } catch (err) {
    console.error("Add joinee error:", err);
    res.status(500).json({ message: "Failed to add joinee" });
  }
});

module.exports = router;

