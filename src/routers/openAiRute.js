const express = require('express');
const router = express.Router();
const { handleRewrite } = require('../controllers/openAiControllers');

router.post('/rewrite', handleRewrite);

module.exports = router;
