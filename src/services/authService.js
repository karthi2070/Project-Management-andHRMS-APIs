const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/authModel');
const Employee = require('../models/empolyeeModel');
const transporter = require('../config/nodemailer');
const otpStore = require('../helper/otpStore');
require('dotenv').config();

const genrateOtp = () => Math.floor(100000 + Math.random() * 900000).toString();

function generatePassword(length = 12) {
  const upper = "ABCDEFGHIJKLMNOPQRTUVWXYZ";
  const lower = "abcdefghijklmnopqrstuvwxyz";
  const number = "1234567890";
  const symbol = "!@#$%&*?.+";
  const allChar = upper + lower + number + symbol;
  let password = "";
  password += upper[Math.floor(Math.random() * upper.length)];
  password += lower[Math.floor(Math.random() * lower.length)];
  password += number[Math.floor(Math.random() * number.length)];
  password += symbol[Math.floor(Math.random() * symbol.length)];
  for (let i = password.length; i < length; i++) {
    password += allChar[Math.floor(Math.random() * allChar.length)];
  }
  return password;
}

const authService = {
  login: async (email, password) => {
    const user = await User.getUserByEmail(email);
    if (!user) {
      return { success: false, status: 401, message: 'Invalid credentials' };
    }
    if (!user.password) {
      return { success: false, status: 401, message: 'Invalid credentials or use SSO' };
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return { success: false, status: 401, message: 'Invalid credentials' };
    }
    const employee = await Employee.getEmployeeByUserId(user.id);
    const payload = { id: user.id, email: user.email, role_id: user.role_id };
    const accessToken = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
    const refreshToken = jwt.sign(payload, process.env.REFRESH_SECRET, { expiresIn: '7d' });

    return {
      success: true,
      accessToken,
      refreshToken,
      userId: user.id,
      user_name: employee.name,
      employee_id: employee.employee_id,
      roleId: user.role_id,
      loginMethod: 'Normal'
    };
  },

   generateAccessFromRefresh : async (refreshToken) => {
  const decoded = jwt.verify(refreshToken, process.env.REFRESH_SECRET);
  return jwt.sign({ id: decoded.id }, process.env.JWT_SECRET, { expiresIn: '15m' });
},
  issueToken: async (email) => {
    const user = await User.getUserByEmail(email);
    if (!user) {
      return { success: false, message: 'User not found. Contact admin.' };
    }
    const employee = await Employee.getEmployeeByUserId(user.id);
    const payload = { id: user.id, role_id: user.role_id, email: user.email };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
    return {
      success: true,
      token,
      userId: user.id,
      user_name: employee.name,
      employee_id: employee.employee_id,
      roleId: user.role_id,
      loginMethod: 'google'
    };
  },
  updatePassword: async (email, currentPassword, newPassword) => {
    const user = await User.getUserByEmail(email);
    // if (!user.password) {
    //   return { success: false, status: 400, message: 'SSO users cannot update passwords' };
    // }
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return { success: false, status: 401, message: 'Current password is incorrect' };
    }
    await User.updatePassword(user.id, newPassword);
    return { success: true };
  },
  createUser: async (email, password, employee_id, role_id) => {
    const existingUser = await User.getUserByEmail(email);
    if (existingUser) {
      return { success: false, status: 409, message: 'Email already exists' };
    }
    const userId = await User.createUser(email, password, role_id);
    await Employee.insertUserId(employee_id, userId);
    return { success: true, userId };
  },
  getUserByEmail: async (email) => {
    const user = await User.getUserByEmail(email);
    if (!user) {
      return { success: false, message: 'User not found' };
    }
    return { success: true, user };
  },
  updateUser: async (userEmail, email, role_id) => {
    const user = await User.getUserByEmail(userEmail);
    if (!user) {
      return { success: false, message: 'User not found' };
    }
    await User.updateUser(user.id, email || user.email, role_id || user.role_id);
    return { success: true, user };
  },
  genLoginCrednitialsEmp: async (employee_id) => {
    const EmployeeData = await Employee.getEmpDataLoginGenerate(employee_id);
    if (!EmployeeData || EmployeeData == null) {
      return { success: false, status: 404, message: 'data not found given employee id' };
    }
    const password = generatePassword();
    const data = { email: EmployeeData.mail, password, employee_id: EmployeeData.id, role_id: EmployeeData.emp_role_id };
    const genLogin = await authService.createUser(data.email, data.password, data.employee_id, data.role_id);
    return { success: true, genLogin };
  },
  sendOtp: async (email) => {
    const user = await User.getUserByEmail(email);
    if (!user) {
      return { success: false, status: 404, message: 'User not found' };
    }
    const otp = genrateOtp();
    otpStore[email] = { otp, createAt: Date.now() };
    await transporter.sendMail({
      from: process.env.SMTP_MAIL,
      to: email,
      subject: 'password reset',
      text: `Your OTP is: ${otp}. It is valid for 5 minute.`
    });
    return { success: true };
  },
  resetPassword: async (otp, email, NewPassword) => {
    const otpData = otpStore[email];
    if (!otpData) {
      return { success: false, status: 400, message: 'otp data not found' };
    }
    const { otp: storedOtp, createdAt } = otpData;
    if (Date.now() - createdAt > 6000000) {
      delete otpStore[email];
      return { success: false, status: 400, message: 'otp expired' };
    }
    if (otp !== storedOtp) {
      return { success: false, status: 400, message: 'invalid otp' };
    }
    const hashedPassword = await bcrypt.hash(NewPassword, 10);
    await User.resetPassword(hashedPassword, email);
    delete otpStore[email];
    return { success: true };
  }
};

module.exports = authService;