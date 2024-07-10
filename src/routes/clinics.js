const express = require("express");
const scrapRoutes = express.Router();
const { getAllClinics, getClinicById } = require("../controller/clinics/index");

scrapRoutes.get("/get/clinics", getAllClinics);
scrapRoutes.get("/clinic/:id", getClinicById);

module.exports = scrapRoutes;
