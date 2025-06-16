const express = require('express');
const router = express.Router();
const ActivityLogsRoute= require('../controllers/activityController');

router.get('/activity-log/task/:taskId', ActivityLogsRoute.getActivityLogsTask);
router.get('/activity-log/subtask/:id', ActivityLogsRoute.getActivityLogsSubTask);
router.put('/activity-log/:logId/comments',ActivityLogsRoute.updateComments);

module.exports = router;
