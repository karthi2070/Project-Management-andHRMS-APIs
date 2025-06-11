const Permission = require('../models/permissionModel');

module.exports = (moduleName) => {
  return async (req, res, next) => {
    try {
      const roleId = req.user.role_id;
      const hasAccess = await Permission.checkModuleAccess(roleId, moduleName);
      if (hasAccess) {
        next();
      } else {
        res.status(403).json({ success: false, message: 'Forbidden' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
  };
};