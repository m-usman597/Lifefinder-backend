const Appointment = require("../../model/appointment");

const addAppointment = async (req, res) => {
  const { patient_email, patient_name, clinic_name, clinic_id, service, booking_date, description } = req.body;
  try {
    const newAppointment = new Appointment({
      patient_email,
      patient_name,
      clinic_name,
      clinic_id,
      service,
      booking_date,
      description
    });
    await newAppointment.save();
    res.status(200).json({ message: "Appointment Saved Successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to save appointment" });
    console.log("Error in saving Appointment:", error);
  }
};

const getAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find();
    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json({ message: "Failed to get appointments" });
    console.log("Error in Fetching Appointments: ", error);
  }
};

module.exports = { addAppointment, getAppointments };
