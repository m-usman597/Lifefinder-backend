const express = require("express");
const router = express.Router();
const hospitalController = require("../../controller/hospitals/auth");

// Register a new hospital
router.post("/register/hospital", hospitalController.registerHospital);

// Login as a hospital
router.post("/login/hospital", hospitalController.loginHospital);

// Get all hospitals
router.get("/hospital", hospitalController.getAllHospitals);

// Get hospital by ID
router.get("/hospital/:id", hospitalController.getHospitalById);

// Update hospital by ID
router.put("/hospital/:id", hospitalController.updateHospitalById);

// Delete hospital by ID
router.delete("/hospital/:id", hospitalController.deleteHospitalById);

// Update Password
router.put("/updatePassword/hospital", hospitalController.updatePassword);

module.exports = router;
