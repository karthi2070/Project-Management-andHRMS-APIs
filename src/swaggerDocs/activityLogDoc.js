/**
 * @swagger
 * tags:
 *   name: activity logs
 *   description: API for managing Attendance
 */
/**
 * @swagger
 * /api/v1/activity-log/task/{taskId}:
 *   get:
 *     summary: Get activity logs for a task
 *     tags: [activity logs]
 *     parameters:
 *       - name: taskId
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: List of activity logs
 */

/**
 * @swagger
 * /api/v1/activity-log/subtask/{id}:
 *   get:
 *     summary: Get activity logs for sub task
 *     tags: [activity logs]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: List of activity logs
 */
/**
 * @swagger
 * /api/v1/activity-log/{logId}/comments:
 *   put:
 *     summary: Update comments for an activity log entry
 *     tags: [activity logs]
 *     parameters:
 *       - name: logId
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *       - name: comments
 *         in: body
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Comments updated successfully
 */

