const express = require("express");
const Attendance = require("../models/Attendance");
const Employee = require("../models/Employee");

const router = express.Router();

/* =========================================
   EMPLOYEE VIEW (must be FIRST)
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
   ADMIN — GET ATTENDANCE BY DATE
========================================= */
router.get("/:date", async (req, res) => {
  try {
    const date = req.params.date;
    const employees = await Employee.find({ status: "Active" });
    const records = await Attendance.find({ date });

    const data = employees.map(e => {
      const rec = records.find(r => r.employeeId.toString() === e._id.toString());
      return {
        employeeId: e._id,
        name: e.name,
        status: rec ? rec.status : "Absent"
      };
    });

    res.json(data);
  } catch (err) {
    console.error("Admin attendance error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

/* =========================================
   ADMIN — MARK ATTENDANCE
========================================= */
router.post("/", async (req, res) => {
  try {
    const { employeeId, date, status } = req.body;

    await Attendance.findOneAndUpdate(
      { employeeId, date },
      { status },
      { upsert: true }
    );

    res.json({ message: "Attendance updated" });
  } catch (err) {
    console.error("Mark attendance error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;

