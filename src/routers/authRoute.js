const router = require('express').Router();
const { googleAuth, googleCallback, issueSSOToken,login, createUser,updatePassword,updateUser,getUserByEmail } = require('../controllers/authController');
//const authMiddleware = require('../middleware/authMiddleware');
router.post('/login',login);
router.get('/google', googleAuth);
router.get('/google/callback', googleCallback, issueSSOToken);
router.post('/create', createUser);
router.get('/user/:email', getUserByEmail);
router.put('/update-user',  updateUser);
//router.put('/update-pass',  updatePassword);
// router.get('/user/:email', authMiddleware, getUserByEmail);
// router.put('/user', authMiddleware, updateUser);
// router.put('/user', authMiddleware, updatePassword);

module.exports = router;