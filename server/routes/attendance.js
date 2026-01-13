const express = require("express");
const Attendance = require("../models/Attendance");
const Employee = require("../models/Employee");

const router = express.Router();

/* =========================================
   EMPLOYEE — View full attendance history
========================================= */
router.get("/employee/:employeeId", async (req, res) => {
  try {
    const data = await Attendance.find({ employeeId: req.params.employeeId })
      .sort({ date: -1 });
    res.json(data);
  } catch (err) {
    console.error("Employee attendance error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

/* =========================================
   EMPLOYEE — Monthly attendance
   Example: /api/attendance/employee/ID/month/2026-01
========================================= */
router.get("/employee/:employeeId/month/:month", async (req, res) => {
  try {
    const { employeeId, month } = req.params;

    const start = new Date(`${month}-01`);
    const end = new Date(`${month}-31`);

    const data = await Attendance.find({
      employeeId,
      date: { $gte: start, $lte: end }
    }).sort({ date: 1 });

    res.json(data);
  } catch (err) {
    console.error("Monthly attendance error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

/* =========================================
   ADMIN — View today attendance
========================================= */
router.get("/today", async (req, res) => {
  try {
    const today = new Date().toISOString().split("T")[0];

    const data = await Attendance.find({ date: today });
    res.json(data);
  } catch (err) {
    console.error("Today attendance error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

/* =========================================
   ADMIN — Mark attendance
========================================= */
router.post("/mark", async (req, res) => {
  try {
    const { employeeId, status } = req.body;
    const today = new Date().toISOString().split("T")[0];

    let record = await Attendance.findOne({ employeeId, date: today });

    if (record) {
      record.status = status;
      await record.save();
    } else {
      await Attendance.create({ employeeId, date: today, status });
    }

    res.json({ message: "Attendance saved" });
  } catch (err) {
    console.error("Mark attendance error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;

