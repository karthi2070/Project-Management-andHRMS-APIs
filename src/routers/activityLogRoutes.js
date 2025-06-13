const express = require('express');
const router = express.Router();
const ActivityLogsRoute= require('../controllers/activityController');

router.get('/activity-log/:taskId', ActivityLogsRoute.getActivityLogs);

router.put('/activity-log/:logId/comments',ActivityLogsRoute.updateComments);

module.exports = router;
