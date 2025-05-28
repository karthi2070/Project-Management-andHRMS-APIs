const express = require('express');
const router = express.Router();
const upload = require('../middleware/multer');
const { sendEmail } = require('../controllers/mailcon');

router.post('/send-email', upload.single('pdfFile'), sendEmail);

module.exports = router;