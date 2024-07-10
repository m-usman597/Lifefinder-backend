const Booking = require('../../model/bookings');

const addBooking = async(req,res) => {

    const {patient_email, patient_name, clinic_name, service, clinic_id, description, booking_date, patient_image} = req.body;
try{

    const newBooking = new Booking({
        patient_email,
        patient_name,
        clinic_name,
        service,
        description,
        clinic_id,
        booking_date,
        patient_image,
        createdAt: new Date()
    });

    await newBooking.save();
    res.status(200).json({message:"Booking Saved Successfully"});
}catch(error){

    console.log(error);
    res.status(500).json({message:"Failed to Save Booking"});
}
    
}

const getAllBookings = async(req, res) => {
    try {
        const bookings = await Booking.find();
        res.status(200).json(bookings);
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Failed to Retrieve Bookings"});
    }
}

module.exports = {addBooking, getAllBookings};