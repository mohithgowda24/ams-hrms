const express = require("express");
const Attendance = require("../models/Attendance");
const Employee = require("../models/Employee");

const router = express.Router();

router.get("/:year/:month", async (req, res) => {
  const { year, month } = req.params;
  const start = `${year}-${month}-01`;
  const end = `${year}-${month}-31`;

  const employees = await Employee.find({ status: "Active" });
  const attendance = await Attendance.find({
    date: { $gte: start, $lte: end }
  });

  const report = employees.map(e => {
    const empRecords = attendance.filter(a => a.employeeId.toString() === e._id.toString());
    const present = empRecords.filter(r => r.status === "Present").length;
    const absent = empRecords.filter(r => r.status === "Absent").length;

    return {
      name: e.name,
      phone: e.phone,
      present,
      absent,
      total: empRecords.length
    };
  });

  res.json(report);
});

module.exports = router;

