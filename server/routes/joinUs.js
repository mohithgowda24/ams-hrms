const express = require("express");
const router = express.Router();
const JoinUs = require("../models/JoinUs");

// POST: save join-us form
router.post("/", async (req, res) => {
  try {
    const joinUs = new JoinUs(req.body);
    await joinUs.save();
    res.status(201).json({ message: "Join request saved" });
  } catch (err) {
    res.status(500).json({ error: "Failed to save join request" });
  }
});

// GET: fetch all join-us data
router.get("/", async (req, res) => {
  try {
    const data = await JoinUs.find().sort({ createdAt: -1 });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch data" });
  }
});

module.exports = router;

