const express = require("express");
const {
  register,
  login,
  sendOTP,
  verifyOTP,
  updatePassword,
  getUserById,
  getOnlyAdmins,
  getUsers,
  updateUserById,
} = require("../controller/auth");
const authRoutes = express.Router();

authRoutes.post("/register", register);
authRoutes.post("/login", login);
authRoutes.post("/sendOtp", sendOTP);
authRoutes.post("/verifyOtp", verifyOTP);
authRoutes.post("/updatePassword", updatePassword);
authRoutes.get("/user/:id", getUserById);
authRoutes.get("/admins", getOnlyAdmins);
authRoutes.put("/user/:id", updateUserById);
authRoutes.get("/users", getUsers);

module.exports = authRoutes;
