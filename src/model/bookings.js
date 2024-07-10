const {Schema, default:mongoose} = require('mongoose');

const BookingSchema = new Schema({
    patient_email: {type:String, required:true},
    patient_name: {type:String, required:true},
    clinic_name: {type:String, required:true},
    clinic_id: {type:String, required:true},
    service: {type:String, required:true},
    booking_date: {type: Date, required:true},
    description: {type: String, required:true},
    patient_image: {type:String, required:true},
    createdAt: { type: Date, default: Date.now}
});

const Booking = mongoose.model("booking",BookingSchema);
module.exports = Booking;