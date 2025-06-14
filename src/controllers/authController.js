const passport = require('passport');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const Employee =require('../models/empolyeeModel')
require('dotenv').config();
const bcrypt = require('bcrypt');
require('../config/passport'); // Load Passport config

module.exports = {
    login: async (req, res, next) => {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res.status(400).json({ success: false, message: 'Email and password required' });
      }
      const user = await User.getUserByEmail(email);
      if (!user) {
        return res.status(401).json({ success: false, message: 'Invalid credentials' });
      }
      if (!user.password) {

        return res.status(401).json({ success: false, message: 'Invalid credentials or use SSO' });
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ success: false, message: 'Invalid credentials' });
      }
      const employee = await Employee.getEmployeeByUserId(user.id);
      const payload = { id: user.id, email: user.email, role_id: user.role_id };
      const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

      res.json({
        success: true,
        token,
        userId: user.id,
        user_name: employee.name,
        employee_id:employee.employee_id,
        roleId: user.role_id,
        loginMethod: 'local'
      });
    } catch (error) {
      console.error('Login error:', error.message);
      next({ status: 500, message: 'Internal Server Error', error: error.message });
    }
  },
  googleAuth: passport.authenticate('google', { scope: ['profile', 'email'] }),
  googleCallback: passport.authenticate('google', { session: false }),
   issueToken: async (req, res, next) => {
     try {
       const user = await User.getUserByEmail(req.user.email); // Use req.user.email from Passport
       if (user) {
        const employee = await Employee.getEmployeeByUserId(user.id);
    const payload ={ id: user.id, role_id: user.role_id, email: user.email }
      const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.json({
        success: true,
        token,
        userId: user.id,
        user_name: employee.name,
        employee_id:employee.employee_id,
        roleId: user.role_id,
        loginMethod: 'google'
     });
       } else {
         res.status(401).json({ success: false, message: 'User not found. Contact admin.' });
       }
     } catch (error) {
       next({ status: 500, message: 'Internal Server Error', error: error.message });
     }
	   },
   updatePassword: async (req, res, next) => {
    try {
      const { currentPassword, newPassword } = req.body;
      if (!currentPassword || !newPassword) {
        return res.status(400).json({ success: false, message: 'Current and new password required' });
      }
      const user = await User.getUserByEmail(req.user.email);
      if (!user.password) {
        return res.status(400).json({ success: false, message: 'SSO users cannot update passwords' });
      }
      const isMatch = await bcrypt.compare(currentPassword, user.password);
      if (!isMatch) {
        return res.status(401).json({ success: false, message: 'Current password is incorrect' });
      }
      await User.updatePassword(user.id, newPassword);
      res.json({ success: true, message: 'Password updated successfully' });
    } catch (error) {
      next({ status: 500, message: 'Internal Server Error', error: error.message });
    }
  },
  createUser: async (req, res, next) => {
    try {
      const { email, password, role_id } = req.body;
      console.log(email, password, role_id)
      if (!email || !password || !role_id) {
        return res.status(400).json({ success: false, message: 'Email, password, and role_id required' });
      }
      const existingUser = await User.getUserByEmail(email);
      if (existingUser) {
        return res.status(409).json({ success: false, message: 'Email already exists' });
      }
      const userId = await User.createUser(email, password, role_id);
      console.log(userId)
      res.status(201).json({
        success: true,
        userId,
        email,
        roleId: role_id,
        message: 'User created successfully'
      });
    } catch (error) {
      next({ status: 500, message: 'Internal Server Error', error: error.message });
    }
  },
  getUserByEmail: async (req, res, next) => {
    try {
      const { email } = req.params;
      const user = await User.getUserByEmail(email);
      if (!user) {
        return res.status(404).json({ success: false, message: 'User not found' });
      }
      res.json({
        success: true,
        userId: user.id,
        email: user.email,
        roleId: user.role_id
      });
    } catch (error) {
      next({ status: 500, message: 'Internal Server Error', error: error.message });
    }
  },
  updateUser: async (req, res, next) => {
    try {
      const { email, role_id } = req.body;
      const userEmail = req.user.email; // From JWT
      if (!email && !role_id) {
        return res.status(400).json({ success: false, message: 'Email or role_id required' });
      }
      const user = await User.getUserByEmail(userEmail);
      if (!user) {
        return res.status(404).json({ success: false, message: 'User not found' });
      }
      await User.updateUser(user.id, email || user.email, role_id || user.role_id);
      res.json({
        success: true,
        message: 'User updated successfully',
        userId: user.id,
        email: email || user.email,
        roleId: role_id || user.role_id
      });
    } catch (error) {
      next({ status: 500, message: 'Internal Server Error', error: error.message });
    }
  }
};