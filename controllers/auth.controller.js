const User = require('../models/user.model');
const { hashPassword, comparePassword } = require('../utils/bcrypt.utils');
const { generateToken } = require('../utils/jwt.utils');

exports.signup = async (req, res) => {
  try {
    const { email, password, role } = req.body;


    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) return res.status(400).json({ message: 'Email already in use' });


    const hashed = await hashPassword(password);
    const userRole = role === 'admin' ? 'admin' : 'user'; // Prevent unauthorized admin signup

    const user = await User.create({ email, password: hashed, role: userRole });
    return res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(400).json({ message: 'Invalid email or password' });


    const passwordIsValid = await comparePassword(password, user.password);
    if (!passwordIsValid) return res.status(400).json({ message: 'Invalid email or password' });


    const token = generateToken(user);


    return res.status(200).json({
      token,
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};