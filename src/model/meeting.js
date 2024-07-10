const { default: mongoose } = require("mongoose");

const meetingSchema = {
  user_id: { type: String, required: true },
  hospital_id: { type: String, required: true },
  session_id: {
    type: String, // Assuming session is represented as a number
    required: true,
  },
  scheduled_time: {
    type: Date, // Date and time of the meeting
    required: true,
  },
  expiry_time: {
    type: Date, // Expiry time for the meeting, if applicable
    required: false, // Adjust as per your requirements
  },
  meeting_completed: {
    type: Boolean, // Flag to indicate if the meeting has completed
    default: false, // Default to false when meeting is created
  },
  paymentId: {
    type: mongoose.Schema.Types.ObjectId,
    required: false,
  },
  paymentLinkId: {
    type: mongoose.Schema.Types.ObjectId,
    required: false,
  },
};

const IMeeting = mongoose.model("meeting", meetingSchema);
module.exports = IMeeting;
