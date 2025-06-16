const ActivityLog = require('../models/activityLogModel');

// Fetch activity logs by task ID
const ActivityLogs ={
   getActivityLogsTask : async (req, res,  next) => {
    try {
        const { taskId } = req.params;
        const logs = await ActivityLog.getActivityLogsTask(taskId);
        res.status(200).json(logs);
    } catch (error) {
next(error)
    }
},
   getActivityLogsSubTask : async (req, res,  next) => {
    try {
        const { id } = req.params;

        const logs = await ActivityLog.getActivityLogsSubTask(id);
        res.status(200).json(logs);
    } catch (error) {
next(error)
    }
},

// Update comments for an activity log entry
 updateComments: async (req, res) => {
    try {
        const { logId } = req.params;
        const { comments } = req.body;

        if (!comments) {
            return res.status(400).json({ message: 'Comments cannot be empty' });
        }

        const result = await ActivityLog.updateComments(logId, comments);
        res.status(200).json(result);
    } catch (error) {
next(error)
    }
},
};

module.exports = ActivityLogs;
