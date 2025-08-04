const express = require('express');
const router = express.Router();
const ActivityLogsRoute= require('../controllers/activityController');

router.get('/task/:taskId', ActivityLogsRoute.getActivityLogsTask);
router.get('/subtask/:id', ActivityLogsRoute.getActivityLogsSubTask);
router.put('/:logId/comments',ActivityLogsRoute.updateComments);

module.exports = router;
