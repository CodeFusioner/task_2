const express = require('express');
const router = express.Router();


const bookingController = require('../controllers/booking.controller');
const { verifyToken, isUserOrAdmin } = require('../middleware/auth.middleware');


router.post('/book/:eventId', verifyToken, isUserOrAdmin, bookingController.bookTicket);


router.get('/', verifyToken, isUserOrAdmin, bookingController.viewBookings);


router.delete('/:bookingId', verifyToken, isUserOrAdmin, bookingController.cancelBooking);

module.exports = router;