const User = require('../models/userModel');
const Permission = require('../models/permissionModel');

const adminController = {
  createUserAdmin: async (req, res, next) => {
    try {
      const { email, role_id } = req.body;
      if (!email || !role_id) {
        return res.status(400).json({ success: false, message: 'Email and role_id required' });
      }
      const userId = await User.createUser(email, role_id);
      res.json({ success: true, data: { id: userId, email, role_id } });
    } catch (error) {
      next({ status: 500, message: 'Internal Server Error', error: error.message });
    }
  },
  setPermissionAdmin: async (req, res, next) => {
    try {
      const { role_id, module_id, has_access } = req.body;
      if (!role_id || !module_id || typeof has_access !== 'boolean') {
        return res.status(400).json({ success: false, message: 'Invalid input' });
      }
      const result = await Permission.setPermission(role_id, module_id, has_access);
      res.json({ success: true, message: 'Permission created', data: result });
    } catch (error) {
      next({ status: 500, message: 'Internal Server Error', error: error.message });
    }
  },
  updatePermissionAdmin: async (req, res, next) => {
    try {
      const { role_id, module_id, has_access } = req.body;
      if (!role_id || !module_id || typeof has_access !== 'boolean') {
        return res.status(400).json({ success: false, message: 'Invalid input' });
      }
      const result = await Permission.updatePermission(role_id, module_id, has_access);
      res.json({ success: true, message: 'Permission updated', data: result });
    } catch (error) {
      next({ status: 500, message: 'Internal Server Error', error: error.message });
    }
  }
};

module.exports = adminController;