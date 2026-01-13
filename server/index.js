const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

// Routes
const employeeRoutes = require("./routes/employees");
const joineeRoutes = require("./routes/joinees");
const employeeAuthRoutes = require("./routes/employeeAuth");
const joinUsRoutes = require("./routes/joinUs");
const employeeRegisterRoutes = require("./routes/employeeRegister");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.use("/api/employees", employeeRoutes);
app.use("/api/employee-auth", employeeAuthRoutes);
app.use("/api/joinees", joineeRoutes);
app.use("/api/join-us", joinUsRoutes);
app.use("/api/employee-register", employeeRegisterRoutes);
app.use("/api/admin/employees", require("./routes/adminEmployees"));
app.use("/api/admin", require("./routes/adminAuth"));
app.use("/api/attendance", require("./routes/attendance"));
app.use("/api/employee-otp", require("./routes/employeeOtpAuth"));
app.use("/api/reports", require("./routes/attendanceReport"));

// Static uploads (if any)
app.use("/uploads", express.static("uploads"));

// MongoDB connection & server start
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(4000, () => {
      console.log("AMS Backend running on port 4000");
    });
  })
  .catch((err) => {
    console.error("MongoDB connection failed:", err);
  });

