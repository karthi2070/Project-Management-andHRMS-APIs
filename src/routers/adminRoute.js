const router = require('express').Router();
const { createUserAdmin, setPermissionAdmin, updatePermissionAdmin,dashboardCount } = require('../controllers/adminController');

router.post('/users', createUserAdmin);
router.post('/permissions', setPermissionAdmin);
router.put('/permissions', updatePermissionAdmin);
router.get('/dashboard',dashboardCount);

module.exports = router;