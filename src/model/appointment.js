const { Schema, default: mongoose } = require("mongoose");

const AppointmentSchema = new Schema({
    patient_email: {type:String, required:true},
    patient_name: {type:String, required:true},
    clinic_name: {type:String, required:true},
    clinic_id: {type:String, required:true},
    service: {type:String, required:true},
    booking_date: {type: Date, required:true},
    meeting_date: {type: Date, default: Date.now},
    description: {type: String, required:true}
});

const Appointment = mongoose.model("appointment", AppointmentSchema);
module.exports = Appointment;
