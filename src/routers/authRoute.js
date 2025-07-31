const router = require('express').Router();
const { googleAuth, googleCallback, issueToken,login,logout,refreshToken,
     createUser,updatePassword,updateUser,genLoginCrednitialsEmp,
     getUserByEmail ,resetPassword,sendOtp} = require('../controllers/authController');
//const authMiddleware = require('../middleware/authMiddleware');
router.post('/login',login);
router.post('/logout',logout);
router.post('/refresh-token', refreshToken);
router.get('/google', googleAuth);
router.get('/google/callback', googleCallback, issueToken);
router.post('/create', createUser);
router.get('/user/:email', getUserByEmail);
router.put('/update-user',  updateUser);
router.put('/reset-pass',resetPassword);
router.post('/send-otp',sendOtp)
router.put('/reset-password', updatePassword);
router.post('/generate-login',genLoginCrednitialsEmp);

// router.get('/user/:email', authrouter.put('/update-pass',  updatePassword);Middleware, getUserByEmail);
// router.put('/user', authMiddleware, updateUser);

module.exports = router;