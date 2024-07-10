const IMeeting = require("../../model/meeting");
const IUser = require("../../model/auth");
const { v4: uuidv4 } = require("uuid");
const moment = require("moment");
const Payment = require("../../model/payment");
const PaymentLink = require("../../model/paymentLink");
const IHospital = require("../../model/hospital/auth");
const { DateTime } = require("luxon");
const sendEmail = require("../../utils/sendInvitationMetting");

exports.createMeeting = async (req, res) => {
  const { user_id, hospital_id, scheduled_time, payment_id, payment_link } =
    req.body;
  try {
    // Check if hospital exists
    const hospital = await IHospital.findById(hospital_id);
    if (!hospital) {
      return res.status(400).json({ error: "Hospital not found" });
    }

    // Check if user exists
    const user = await IUser.findOne({ email: user_id });
    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }
    const session_id = uuidv4();

    // Verify payment for meeting
    // const payment = await Payment.findById(payment_id);
    // if (!payment) {
    //   // If Payment is not available, then check PaymentLink which is alternate DB for payment
    //   const paymentLink = await PaymentLink.findById(payment_link);
    //   if (!paymentLink || !paymentLink?.completed) {
    //     return res.json({ message: "Payment is not verified!" });
    //   }
    // }

    // Create meeting
    const meeting = new IMeeting({
      user_id,
      hospital_id,
      session_id,
      scheduled_time,
      paymentId: payment_id,
      paymentLinkId: payment_link,
    });

    await meeting.save();

    // Log scheduled_time for debugging
    console.log("Scheduled Time (raw):", meeting.scheduled_time);

    // Parse and format the scheduled_time using Luxon
    const scheduledTime = DateTime.fromISO(
      meeting.scheduled_time.toISOString()
    );

    // Log scheduledTime for debugging
    console.log("Scheduled Time (parsed):", scheduledTime.toString());

    const meetingDetails = {
      date: scheduledTime.toLocaleString(DateTime.DATE_FULL), // e.g., July 15, 2024
      time: scheduledTime.toLocaleString(DateTime.TIME_SIMPLE), // e.g., 10:36 PM
      day: scheduledTime.toFormat("cccc"), // e.g., Monday
      year: scheduledTime.year, // e.g., 2024
      hospitalName: hospital.title,
      patientName: `${user.firstName} ${user.lastName}`,
      session_id: meeting.session_id,
    };

    // Send email to patient
    await sendEmail(user.email, "Meeting Scheduled", "patient", meetingDetails);

    // Send email to hospital
    await sendEmail(
      hospital.email,
      "New Patient Meeting",
      "hospital",
      meetingDetails
    );

    res.status(201).json(meeting);
  } catch (error) {
    console.error("Error creating meeting:", error);
    res.status(500).json({ error: "Server error" });
  }
};

exports.getAllMeetings = async (req, res) => {
  try {
    const meetings = await IMeeting.find();
    res.status(200).json(meetings);
  } catch (error) {
    console.error("Error fetching meetings:", error);
    res.status(500).json({ error: "Server error" });
  }
};

exports.getMeetingById = async (req, res) => {
  const { id } = req.params;
  try {
    const meeting = await IMeeting.findById(id);
    if (!meeting) {
      return res.status(404).json({ error: "Meeting not found" });
    }
    res.status(200).json(meeting);
  } catch (error) {
    console.error("Error fetching meeting by ID:", error);
    res.status(500).json({ error: "Server error" });
  }
};

exports.joinMeeting = async (req, res) => {
  const { email, session_id } = req.body;

  try {
    // Find the meeting by session_id
    const meeting = await IMeeting.findOne({ session_id });
    if (!meeting) {
      return res.status(400).json({ error: "Meeting not found" });
    }

    // Check if the current time is within 15 minutes before the scheduled time
    const currentTime = moment();
    const scheduledTime = moment(meeting.scheduled_time);
    const timeDifference = scheduledTime.diff(currentTime, "minutes");

    if (timeDifference > 15) {
      return res.status(400).json({
        error:
          "You can only join the meeting 15 minutes before the scheduled time",
      });
    }

    // comment
    // if (timeDifference < 30) {
    //   return res.status(400).json({
    //     error: "The 30 minutes meeting time has been passed!",
    //   });
    // }

    // Check if email belongs to either the user or the hospital
    const hospital = await IHospital.findById(meeting.hospital_id);
    const user = await IUser.findOne({ email: meeting.user_id });

    if (!hospital || !user) {
      return res.status(400).json({ error: "Invalid meeting details" });
    }

    if (email !== hospital.email && email !== user.email) {
      return res
        .status(400)
        .json({ error: "Unauthorized access to the meeting" });
    }

    // If all checks pass, allow the user to join the meeting
    res.status(200).json({
      success: true,
      message: "You have successfully joined the meeting",
    });
  } catch (error) {
    console.error("Error joining meeting:", error);
    res.status(500).json({ error: "Server error" });
  }
};
