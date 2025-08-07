const passport = require('passport');
const authService = require('../services/authService');
const transporter = require('../config/nodemailer');
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
      // console.log('Login successful:', result);
      res.cookie('refreshToken', result.refreshToken, {
        httpOnly: true,
        secure: false, // only send over HTTPS 
        sameSite: 'Strict', // or 'Lax' for cross-site logins
        maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
      });
      const { refreshToken, ...responseWithoutRefresh } = result;
      res.json(responseWithoutRefresh);
    } catch (error) {
      console.error('Login error:', error.message);
      next();
    }
  },
  refreshToken: async (req, res, next) => {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) return res.status(401).json({ message: 'Refresh token required' });

    try {
      const newAccessToken = await authService.generateAccessFromRefresh(refreshToken);
      res.json({ accessToken: newAccessToken });
    } catch (err) {
      next(err); // Pass error to centralized error handler
    }
  },
  logout: async (req, res) => {
    res.clearCookie('refreshToken');
    res.json({ success: true, message: 'Logged out successfully' });
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
        userId: result.genUserId,
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
      console.log('genLoginCrednitialsEmp result:', result);

      if (!result.success) {
        return res.status(result.status).json({ message: result.message });
      }
    await transporter.sendMail({
      from: process.env.SMTP_MAIL,
      to: result.data.email,
      subject: 'Your Login Credentials for N1 Suite',
      text: `
Hii ${result.data.name},

Your login credentials for N1 Suite are as follows:

Email: ${result.data.email}
Password: ${result.data.password}

⚠️ Please do not share these credentials with anyone.

Thanks,  
Team NAMUVI Technology
`
    });
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
