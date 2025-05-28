const express = require('express');
const router = express.Router();


const eventController = require('../controllers/event.controller');
const { verifyToken, isAdmin } = require('../middleware/auth.middleware');
const { validateEvent } = require('../middleware/validate.middleware');


router.get('/', eventController.listEvents);
router.get('/:id', eventController.getEvent);


router.post('/', verifyToken, isAdmin, validateEvent, eventController.createEvent);
router.put('/:id', verifyToken, isAdmin, validateEvent, eventController.updateEvent);
router.delete('/:id', verifyToken, isAdmin, eventController.deleteEvent);


module.exports = router;