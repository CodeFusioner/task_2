const jwt = require('jsonwebtoken');
const config = require('../config/auth.config');

const generateToken = (user) => {
  return jwt.sign({ id: user.id, role: user.role }, config.secret, {
    expiresIn: config.expiresIn,
  });
};


module.exports = { generateToken };