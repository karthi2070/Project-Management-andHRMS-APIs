const Permission = require('../models/permissionModel');

module.exports = (moduleName) => {
  return async (req, res, next) => {
    try {
      const roleId = req.user.role_id;
      console.log(`Checking access for role ID: ${roleId} to module: ${moduleName}`);
      if (!roleId) {
        return res.status(403).json({ success: false, message: 'role ID not found' });
      }
      const hasAccess = await Permission.checkModuleAccess(roleId, moduleName);
      if (hasAccess) {
        next();
      } else {
        res.status(403).json({ success: false, message: 'Forbidden : Employee not allowed to access this resource' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
  };
};