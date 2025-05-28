const jwt = require('jsonwebtoken');
const config = require('../config/auth.config');
const User = require('../models/user.model');


const verifyToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1]; // Expect Bearer token

  if (!token) {
    return res.status(403).json({ message: 'No token provided!' });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) return res.status(401).json({ message: 'Unauthorized!' });
    req.userId = decoded.id;
    req.userRole = decoded.role;
    next();
  });
};


const isAdmin = (req, res, next) => {
  if (req.userRole !== 'admin') {
    return res.status(403).json({ message: 'Require Admin Role!' });
  }
  next();
};


const isUserOrAdmin = (req, res, next) => {
  if (req.userRole !== 'user' && req.userRole !== 'admin') {
    return res.status(403).json({ message: 'Require User or Admin Role!' });
  }
  next();
};


module.exports = { verifyToken, isAdmin, isUserOrAdmin };