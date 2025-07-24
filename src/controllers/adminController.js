const User = require('../models/authModel');
const Permission = require('../models/permissionModel');
const clientModel =require('../models/clientModel')
const employeeModel =require('../models/empolyeeModel')
const projectModel =require ('../models/projectModel')
const { getAttendanceSummaryData } = require ('../helper/attedanceDashboard')

const adminController = {
dashboardCount: async (req, res, next) => {
  try {
    const date = req.body || new Date();
    const [employeeCount, clientCount, upcomingDueClientsCount, projectCount, attendance] = await Promise.all([
      employeeModel.getEmployeeCount(),
      clientModel.getTotalClients(),
      clientModel.upcomingDueClients(),
      // clientModel.getRenewalClients(),
      projectModel.projectCount(),
      getAttendanceSummaryData(date)
    ]);

    res.status(200).json({
      client: clientCount,
      employee: employeeCount,
      project: projectCount,
      upcomingDueClientsCount,
      // renewalClientsCount: getRenewalClients,
      attendance
    });
  } catch (error) {
    next(error);
  }
},

createUserAdmin : async (req, res, next) => {
    try {
      const { email, role_id } = req.body;
      console.log('Admin create user:', { email, role_id });
      if (!email || !role_id) {
        return res.status(400).json({ success: false, message: 'Email and role_id required' });
      }
      const existingUser = await User.getUserByEmail(email);
      if (existingUser) {
        return res.status(409).json({ success: false, message: 'Email already exists' });
      }
      const userId = await User.createUser(email, null, role_id); // Explicitly pass null for password
      console.log('Created user ID:', userId);
      res.status(201).json({
        success: true,
        data: { id: userId, email, role_id },
        message: 'User created successfully'
      });
    } catch (error) {
      console.error('Create user error:', error.message);
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