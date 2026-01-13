const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

router.post("/login", (req, res) => {
  console.log("LOGIN API HIT");
  console.log("BODY:", req.body);

  const token = jwt.sign(
    { role: "admin" },
    process.env.JWT_SECRET || "ams12345",
    { expiresIn: "1d" }
  );

  return res.json({ token });
});

module.exports = router;



