const passport = require('passport');
const authService = require('../services/authService');

const authController = {
  login: async (req, res, next) => {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res.status(400).json({ success: false, message: 'Email and password required' });
      }
      const result = await authService.login(email, password);
      if (!result.success) {
        return res.status(result.status).json({ success: false, message: result.message });
      }
      res.json(result);
    } catch (error) {
      console.error('Login error:', error.message);
      next({ status: 500, message: 'Internal Server Error', error: error.message });
    }
  },
  googleAuth: passport.authenticate('google', { scope: ['profile', 'email'] }),
  googleCallback: passport.authenticate('google', { session: false }),
  issueToken: async (req, res, next) => {
    try {
      const result = await authService.issueToken(req.user.email);
      if (!result.success) {
        return res.status(401).json({ success: false, message: result.message });
      }
      res.json(result);
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
      const result = await authService.updatePassword(req.user.email, currentPassword, newPassword);
      if (!result.success) {
        return res.status(result.status).json({ success: false, message: result.message });
      }
      res.json({ success: true, message: 'Password updated successfully' });
    } catch (error) {
      next({ status: 500, message: 'Internal Server Error', error: error.message });
    }
  },
  createUser: async (req, res, next) => {
    try {
      const { email, password, employee_id, role_id } = req.body;
      if (!email || !password || !role_id) {
        return res.status(400).json({ success: false, message: 'Email, password, and role_id required' });
      }
      const result = await authService.createUser(email, password, employee_id, role_id);
      if (!result.success) {
        return res.status(result.status).json({ success: false, message: result.message });
      }
      res.status(201).json({
        success: true,
        userId: result.userId,
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
      const result = await authService.getUserByEmail(email);
      if (!result.success) {
        return res.status(404).json({ success: false, message: result.message });
      }
      res.json({
        success: true,
        userId: result.user.id,
        email: result.user.email,
        roleId: result.user.role_id
      });
    } catch (error) {
      next({ status: 500, message: 'Internal Server Error', error: error.message });
    }
  },
  updateUser: async (req, res, next) => {
    try {
      const { email, role_id } = req.body;
      const userEmail = req.user.email;
      if (!email && !role_id) {
        return res.status(400).json({ success: false, message: 'Email or role_id required' });
      }
      const result = await authService.updateUser(userEmail, email, role_id);
      if (!result.success) {
        return res.status(404).json({ success: false, message: result.message });
      }
      res.json({
        success: true,
        message: 'User updated successfully',
        userId: result.user.id,
        email: email || result.user.email,
        roleId: role_id || result.user.role_id
      });
    } catch (error) {
      next({ status: 500, message: 'Internal Server Error', error: error.message });
    }
  },
  genLoginCrednitialsEmp: async (req, res, next) => {
    try {
      const { employee_id } = req.body;
      if (!employee_id) {
        return res.status(400).json({ message: 'employee id required' });
      }
      const result = await authService.genLoginCrednitialsEmp(employee_id);
      if (!result.success) {
        return res.status(result.status).json({ message: result.message });
      }
      res.status(200).json({ message: 'login credentials generated successfully', genLogin: result.genLogin });
    } catch (error) {
      next(error);
    }
  },
  sendOtp: async (req, res, next) => {
    try {
      const { email } = req.body;
      if (!email) {
        return res.status(400).json({ success: false, message: 'mail Id required' });
      }
      const result = await authService.sendOtp(email);
      if (!result.success) {
        return res.status(result.status).json({ success: false, message: result.message });
      }
      res.status(200).json({ success: true, message: 'otp sent successfully' });
    } catch (error) {
      next(error);
    }
  },
  resetPassword: async (req, res, next) => {
    try {
      const { otp, email, NewPassword } = req.body;
      const result = await authService.resetPassword(otp, email, NewPassword);
      if (!result.success) {
        return res.status(result.status).json({ message: result.message });
      }
      res.status(200).json({ success: true, message: 'password updated successfully' });
    } catch (error) {
      next(error);
    }
  }
};

module.exports = authController;

// const passport = require('passport');
// const jwt = require('jsonwebtoken');
// const User = require('../models/authModel');
// const Employee = require('../models/empolyeeModel')
// const transporter = require('../config/nodemailer')
// const otpStore = require('../helper/otpStore')
// require('dotenv').config();
// const bcrypt = require('bcrypt');
// require('../config/passport'); // Load Passport config
// const genrateOtp = () => Math.floor(100000 + Math.random() * 900000).toString();
// // password generation
// function generatePassword(length = 12) {
//   const upper = "ABCDEFGHIJKLMNOPQRTUVWXYZ"
//   const lower = "abcdefghijklmnopqrstuvwxyz"
//   const number = "1234567890"
//   const symbol = "!@#$%&*?.+"

//   const allChar = upper + lower + number + symbol
//   let password = ""

//   password += upper[Math.floor(Math.random() * upper.length)];
//   password += lower[Math.floor(Math.random() * lower.length)];
//   password += number[Math.floor(Math.random() * number.length)];
//   password += symbol[Math.floor(Math.random() * symbol.length)];

//   for (let i = password.length; i < length; i++) {
//     password += allChar[Math.floor(Math.random() * allChar.length)]
//   }

//   return password
// }
// const authController = {
//   login: async (req, res, next) => {
//     try {
//       const { email, password } = req.body;
//       if (!email || !password) {
//         return res.status(400).json({ success: false, message: 'Email and password required' });
//       }
//       const user = await User.getUserByEmail(email);
//       if (!user) {
//         return res.status(401).json({ success: false, message: 'Invalid credentials' });
//       }
//       if (!user.password) {

//         return res.status(401).json({ success: false, message: 'Invalid credentials or use SSO' });
//       }
//       const isMatch = await bcrypt.compare(password, user.password);
//       if (!isMatch) {
//         return res.status(401).json({ success: false, message: 'Invalid credentials' });
//       }
//       const employee = await Employee.getEmployeeByUserId(user.id);
//       const payload = { id: user.id, email: user.email, role_id: user.role_id };
//       const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

//       res.json({
//         success: true,
//         token,
//         userId: user.id,
//         user_name: employee.name,
//         employee_id: employee.employee_id,
//         roleId: user.role_id,
//         loginMethod: 'local'
//       });
//     } catch (error) {
//       console.error('Login error:', error.message);
//       next({ status: 500, message: 'Internal Server Error', error: error.message });
//     }
//   },
//   googleAuth: passport.authenticate('google', { scope: ['profile', 'email'] }),
//   googleCallback: passport.authenticate('google', { session: false }),
//   issueToken: async (req, res, next) => {
//     try {
//       const user = await User.getUserByEmail(req.user.email); // Use req.user.email from Passport
//       if (user) {
//         const employee = await Employee.getEmployeeByUserId(user.id);
//         const payload = { id: user.id, role_id: user.role_id, email: user.email }
//         const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
//         res.json({
//           success: true,
//           token,
//           userId: user.id,
//           user_name: employee.name,
//           employee_id: employee.employee_id,
//           roleId: user.role_id,
//           loginMethod: 'google'
//         });
//       } else {
//         res.status(401).json({ success: false, message: 'User not found. Contact admin.' });
//       }
//     } catch (error) {
//       next({ status: 500, message: 'Internal Server Error', error: error.message });
//     }
//   },
//   updatePassword: async (req, res, next) => {
//     try {
//       const { currentPassword, newPassword } = req.body;
//       if (!currentPassword || !newPassword) {
//         return res.status(400).json({ success: false, message: 'Current and new password required' });
//       }
//       const user = await User.getUserByEmail(req.user.email);
//       if (!user.password) {
//         return res.status(400).json({ success: false, message: 'SSO users cannot update passwords' });
//       }
//       const isMatch = await bcrypt.compare(currentPassword, user.password);
//       if (!isMatch) {
//         return res.status(401).json({ success: false, message: 'Current password is incorrect' });
//       }
//       await User.updatePassword(user.id, newPassword);
//       res.json({ success: true, message: 'Password updated successfully' });
//     } catch (error) {
//       next({ status: 500, message: 'Internal Server Error', error: error.message });
//     }
//   },
//   createUser: async (req, res, next) => {
//     try {
//       const { email, password, employee_id, role_id } = req.body;
//       console.log(req.body)
//       if (!email || !password || !role_id) {
//         return res.status(400).json({ success: false, message: 'Email, password, and role_id required' });
//       }
//       const existingUser = await User.getUserByEmail(email);
//       if (existingUser) {
//         return res.status(409).json({ success: false, message: 'Email already exists' });
//       }

//       const userId = await User.createUser(email, password, role_id);
//       console.log("userId", userId)
//       const result = await Employee.insertUserId(employee_id, userId)
//       console.log("result", result)
//       res.status(201).json({
//         success: true, userId, email,
//         roleId: role_id,
//         //employee_id:result\
//         message: 'User created successfully'
//       });
//     } catch (error) {
//       next(error);
//     }
//   },

//   getUserByEmail: async (req, res, next) => {
//     try {
//       const { email } = req.params;
//       const user = await User.getUserByEmail(email);
//       if (!user) {
//         return res.status(404).json({ success: false, message: 'User not found' });
//       }
//       res.json({
//         success: true,
//         userId: user.id,
//         email: user.email,
//         roleId: user.role_id
//       });
//     } catch (error) {
//       next({ status: 500, message: 'Internal Server Error', error: error.message });
//     }
//   },
//   updateUser: async (req, res, next) => {
//     try {
//       const { email, role_id } = req.body;
//       const userEmail = req.user.email; // From JWT
//       if (!email && !role_id) {
//         return res.status(400).json({ success: false, message: 'Email or role_id required' });
//       }
//       const user = await User.getUserByEmail(userEmail);
//       if (!user) {
//         return res.status(404).json({ success: false, message: 'User not found' });
//       }
//       await User.updateUser(user.id, email || user.email, role_id || user.role_id);
//       res.json({
//         success: true,
//         message: 'User updated successfully',
//         userId: user.id,
//         email: email || user.email,
//         roleId: role_id || user.role_id
//       });
//     } catch (error) {
//       next({ status: 500, message: 'Internal Server Error', error: error.message });
//     }
//   },

//   // genrate user login creationl

//   genLoginCrednitialsEmp: async (req, res, next) => {
//     try {
//       const { employee_id } = req.body

//       if (!employee_id) {
//         return res.status(400).json({ message: "employee id requried" })
//       }
//       // const { email, password,employee_id, role_id } = req.body
//       const EmployeeData = await Employee.getEmpDataLoginGenerate(employee_id)
//       console.log(EmployeeData)
//       if (!EmployeeData || EmployeeData == null) {
//         return res.status(404).json({ message: " data not foud given employee id" })
//       }
//       const password = generatePassword()
//       console.log(password)
//       const data = ({ email: EmployeeData.mail, password: password, employee_id: EmployeeData.id, role_id: EmployeeData.emp_role_id })
//       console.log(data)
//       const genLogin = await authController.createUser(data)

//       res.status(200).json({ message: "login crednitials generated sucessfully", genLogin })
//     } catch (error) {
//       next(error)
//     }

//   },

//   sendOtp: async (req, res, next) => {
//     try {
//       const { email } = req.body
//       // console.log('mail',email)
//       if (!email) {
//         return res.status(400).json({ success: false, message: 'mail Id required' })
//       }
//       const user = await User.getUserByEmail(email);
//       // console.log(user)
//       if (!user) {
//         return res.status(404).json({ success: false, message: 'User not found' });
//       }
//       const otp = genrateOtp();
//       // console.log("otp",otp)
//       otpStore[email] = { otp, createAt: Date.now() }

//       await transporter.sendMail({
//         from: process.env.SMTP_MAIL,
//         to: email,
//         subject: 'password reset',
//         text: `Your OTP is: ${otp}. It is valid for 5 minute.`

//       })
//       return res.status(200).json({ sucess: true, message: 'otp send sucessfully' })

//     } catch (error) {
//       next(error)
//     }
//   },
//   resetPassword: async (req, res, next) => {
//     try {
//       const { otp, email, NewPassword } = req.body
//       // console.log(otp,email,NewPassword)
//       // console.log("otpstore",otpStore)
//       const otpData = otpStore[email];
//       // console.log("otpData", otpData)
//       if (!otpData) {
//         return { staus: 400, msg: 'otp data not found' }
//       }
//       const { otp: storedOtp, createdAt } = otpData
//       console.log("otp data", otpData)
//       if (Date.now - createdAt > 6000000) {
//         // delete otpStore[email]
//         return res.status(400).json({ message: 'otp expried' })

//       }
//       if (otp !== storedOtp) {
//         return res.status(400).json({ message: 'invalid otp ' })
//       }
//       const hashedPassword = await bcrypt.hash(NewPassword, 10);
//       await User.resetPassword(hashedPassword, email)
//       delete otpStore[email]
//       return res.status(200).json({ success: true, message: 'password update successfully' })


//     } catch (error) {
//       next(error)
//     }
//   }

// }

// module.exports = authController;