const db = require('../config/db'); // Import database connection

const ActivityLog = {
    // Fetch activity logs by task ID
    async getActivityLogs(taskId) {
        const query = `
            SELECT * FROM activity_logs_tbl
            WHERE task_id = ?
            ORDER BY created_at ASC
        `;
        const [logs] = await db.execute(query, [taskId]);
        return logs;
    },

    // Update comments for an activity log entry
    async updateComments(logId, comments) {
        const query = `
            UPDATE activity_logs_tbl SET comments = ?, updated_at = NOW()
            WHERE id = ?
        `;
        await db.execute(query, [comments, logId]);
        return { message: 'Comments updated successfully' };
    }
};

module.exports = ActivityLog;

