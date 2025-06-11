const router = require('express').Router();
const { createUserAdmin, setPermissionAdmin, updatePermissionAdmin } = require('../controllers/adminController');

router.post('/users', createUserAdmin);
router.post('/permissions', setPermissionAdmin);
router.put('/permissions', updatePermissionAdmin);

module.exports = router;