const express = require('express');
const {addBooking, getAllBookings} = require('../controller/booking');

const BookingRouter = express.Router();

BookingRouter.post('/addBooking',addBooking);
BookingRouter.get('/getBookings',getAllBookings);

module.exports = BookingRouter;