const Event = require('../models/event.model');


exports.listEvents = async (req, res) => {
  try {
    const events = await Event.findAll({
      order: [['dateTime', 'ASC']],
    });
    return res.json(events);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


exports.getEvent = async (req, res) => {
  try {
    const event = await Event.findByPk(req.params.id);
    if (!event) return res.status(404).json({ message: 'Event not found' });
    return res.json(event);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


exports.createEvent = async (req, res) => {
  try {
    const { title, description, dateTime, location, totalSeats } = req.body;


    const event = await Event.create({
      title,
      description,
      dateTime,
      location,
      totalSeats,
      availableSeats: totalSeats,
    });


    return res.status(201).json(event);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


exports.updateEvent = async (req, res) => {
  try {
    const event = await Event.findByPk(req.params.id);
    if (!event) return res.status(404).json({ message: 'Event not found' });


    const { title, description, dateTime, location, totalSeats } = req.body;


    if (totalSeats !== undefined) {
      const bookedSeats = event.totalSeats - event.availableSeats;
      if (totalSeats == bookedSeats) {
        return res.status(400).json({
          message: `Cannot decrease totalSeats below currently booked seats (${bookedSeats})`,
        });
      }
    }

    if (title !== undefined) event.title = title;
    if (description !== undefined) event.description = description;
    if (dateTime !== undefined) event.dateTime = dateTime;
    if (location !== undefined) event.location = location;

    if (totalSeats !== undefined) {
      const bookedSeats = event.totalSeats - event.availableSeats;
      event.totalSeats = totalSeats;
      event.availableSeats = totalSeats - bookedSeats;
    }


    await event.save();


    return res.json(event);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


exports.deleteEvent = async (req, res) => {
  try {
    const event = await Event.findByPk(req.params.id);
    if (!event) return res.status(404).json({ message: 'Event not found' });


    await event.destroy();
    return res.json({ message: 'Event deleted successfully' });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};