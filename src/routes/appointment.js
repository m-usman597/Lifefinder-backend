const express = require("express");

const {
  addAppointment,
  getAppointments,
} = require("../controller/appointment");

const appointmentRoute = express.Router();

appointmentRoute.post("/addAppointment", addAppointment);
appointmentRoute.get("/getAppointments", getAppointments);

module.exports = appointmentRoute;
