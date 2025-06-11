const router = require('express').Router();
const { googleAuth, googleCallback, issueToken } = require('../controllers/authController');

router.get('/google', googleAuth);
router.get('/google/callback', googleCallback, issueToken);

module.exports = router;