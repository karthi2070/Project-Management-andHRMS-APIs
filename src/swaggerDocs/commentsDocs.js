/**
 * @swagger
 * tags:
 *   name: Comments
 *   description: APIs for creating, retrieving, updating, and deleting task comments
 */

/**
 * @swagger
 * /api/v1/comments/add-comment:
 *   post:
 *     summary: Create a new comment or reply
 *     tags: [Comments]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - task_id
 *               - user_id
 *               - comment
 *             properties:
 *               task_id:
 *                 type: integer
 *               sub_task_id:
 *                 type: integer
 *               user_id:
 *                 type: integer
 *               parent_comment_id:
 *                 type: integer
 *               comment:
 *                 type: string
 *               attachments:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["file1.png", "file2.pdf"]
 *     responses:
 *       201:
 *         description: Comment created successfully
 */

/**
 * @swagger
 * /api/v1/comments/edit-comment/{id}:
 *   put:
 *     summary: Edit a comment
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Comment ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - comment
 *             properties:
 *               user_id:
 *                 type: integer
 *               comment:
 *                 type: string
 *               attachments:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["file1.png", "file2.pdf"]
 *     responses:
 *       200:
 *         description: Comment updated
 *       404:
 *         description: Comment not found
 */

/**
 * @swagger
 * /api/v1/comments/get-all-comments:
 *   get:
 *     summary: Get all comments
 *     tags: [Comments]
 *     responses:
 *       200:
 *         description: List of all comments
 */

/**
 * @swagger
 * /api/v1/comments/get-comment-by-id/{id}:
 *   get:
 *     summary: Get a specific comment by ID
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Comment ID
 *     responses:
 *       200:
 *         description: Comment found
 *       404:
 *         description: Comment not found
 */

/**
 * @swagger
 * /api/v1/comments/get-comment-task-by/{task_id}:
 *   get:
 *     summary: Get all comments for a specific task
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: task_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Task ID
 *     responses:
 *       200:
 *         description: List of comments for the task
 */

/**
 * @swagger
 * /api/v1/comments/get-comment-sub-task-by/{sub_task_id}:
 *   get:
 *     summary: Get all comments for a specific task
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: sub_task_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Task ID
 *     responses:
 *       200:
 *         description: List of comments for the task
 */

/**
 * @swagger
 * /api/v1/comments/delete-comment/{id}:
 *   patch:
 *     summary: Soft delete a comment
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Comment ID
 *     responses:
 *       200:
 *         description: Comment soft deleted
 *       404:
 *         description: Comment not found
 */
