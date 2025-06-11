const passport = require('passport');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
require('dotenv').config();
require('../config/passport'); // Load Passport config

module.exports = {
  googleAuth: passport.authenticate('google', { scope: ['profile', 'email'] }),
  googleCallback: passport.authenticate('google', { session: false }),
  issueToken: async (req, res, next) => {
    try {
      const user = await User.getUserByEmail(req.user.email); // Use req.user.email from Passport
      if (user) {
        const token = jwt.sign({ id: user.id, role_id: user.role_id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ success: true, token });
      } else {
        res.status(401).json({ success: false, message: 'User not found. Contact admin.' });
      }
    } catch (error) {
      next({ status: 500, message: 'Internal Server Error', error: error.message });
    }
  }
};