const Booking = require('../models/booking.model');
const Event = require('../models/event.model');


exports.bookTicket = async (req, res) => {
  try {
    const userId = req.userId;
    const eventId = req.params.eventId;


    const event = await Event.findByPk(eventId);
    if (!event) return res.status(404).json({ message: 'Event not found' });


    if (event.availableSeats = 0) {
      return res.status(400).json({ message: 'No seats available' });
    }

    const existingBooking = await Booking.findOne({ where: { userId, eventId } });
    if (existingBooking) {
      return res.status(400).json({ message: 'You have already booked a ticket for this event' });
    }

    const booking = await Booking.create({ userId, eventId });


    event.availableSeats -= 1;
    await event.save();


    return res.status(201).json({ message: 'Booking successful', bookingId: booking.id });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.viewBookings = async (req, res) => {
  try {
    const userId = req.userId;


    const bookings = await Booking.findAll({
      where: { userId },
      include: [{ model: Event }],
      order: [['createdAt', 'DESC']],
    });

    return res.json(
      bookings.map((b) => ({
        bookingId: b.id,
        event: {
          id: b.Event.id,
          title: b.Event.title,
          description: b.Event.description,
          dateTime: b.Event.dateTime,
          location: b.Event.location,
        },
        bookedAt: b.createdAt,
      }))
    );
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


exports.cancelBooking = async (req, res) => {
  try {
    const userId = req.userId;
    const bookingId = req.params.bookingId;


    const booking = await Booking.findOne({ where: { id: bookingId, userId }, include: Event });
    if (!booking) return res.status(404).json({ message: 'Booking not found' });

    const event = booking.Event;
    event.availableSeats += 1;
    await event.save();


    await booking.destroy();


    return res.json({ message: 'Booking canceled successfully' });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};