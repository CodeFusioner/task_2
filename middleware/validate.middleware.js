const { body, validationResult } = require('express-validator');

const validateSignup = [
  body('email').isEmail().withMessage('Email must be valid'),
  body('password').isLength({ min: 6 }).withMessage('Password at least 6 chars'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

const validateLogin = [
  body('email').isEmail().withMessage('Email must be valid'),
  body('password').notEmpty().withMessage('Password is required'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

const validateEvent = [
  body('title').notEmpty().withMessage('Title is required'),
  body('description').notEmpty().withMessage('Description is required'),
  body('dateTime').isISO8601().toDate().withMessage('DateTime must be valid ISO date'),
  body('location').notEmpty().withMessage('Location is required'),
  body('totalSeats').isInt({ min: 1 }).withMessage('TotalSeats must be an integer > 0'),
  (req, res, next) => {
    if (req.body.availableSeats !== undefined) {
      return res.status(400).json({ message: 'availableSeats cannot be set manually' });
    }
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

module.exports = { validateSignup, validateLogin, validateEvent };