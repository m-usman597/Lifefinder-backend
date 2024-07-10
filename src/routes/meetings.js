const express = require("express");
const meetingRoutes = express.Router();
const meetingController = require("../controller/meeting/index");

meetingRoutes.post("/create/meeting", meetingController.createMeeting);
meetingRoutes.get("/meeting/:id", meetingController.getMeetingById);
meetingRoutes.get("/meetings", meetingController.getAllMeetings);
meetingRoutes.post("/join/meeting", meetingController.joinMeeting);

module.exports = meetingRoutes;
