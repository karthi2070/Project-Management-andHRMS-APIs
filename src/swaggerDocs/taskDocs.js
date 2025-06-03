
/**
 * @swagger
 * tags:
 *   name: Tasks
 *   description: Task management
 */
/**
 * @swagger
 * components:
 *   schemas:
 *     Task:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *         description:
 *           type: string
 *         priority:
 *           type: string
 *         label:
 *           type: string
 *         due_date:
 *           type: string
 *           format: date
 *         assignee:
 *           type: string
 *         parent_task_id:
 *           type: integer
 *         rca:
 *           type: string 
 *         story_points:
 *           type: string
 *         attachments:
 *           type: string
 * 
 */


/**
 * @swagger
 * /api/v1/tasks/create-task:
 *   post:
 *     summary: Create a new task
 *     tags: [Tasks]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Task'
 *     responses:
 *       201:
 *         description: Task created successfully
 *       500:
 *         description: Server error
 */


/**
 * @swagger
 * /api/v1/tasks/get-all-tasks:
 *   get:
 *     summary: Get all root tasks (no parent)
 *     tags: [Tasks]
 *     responses:
 *       200:
 *         description: List of tasks
 */


/**
 * @swagger
 * /api/v1/tasks/get-by-id/{id}:
 *   get:
 *     summary: Get a task by ID
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Task ID
 *     responses:
 *       200:
 *         description: Task details
 *       404:
 *         description: Task not found
 */
/**
 * @swagger
 * /api/v1/task/update-task/{id}:
 *   put:
 *     summary: Update a task by ID
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Task ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Task'
 *     responses:
 *       200:
 *         description: Task updated
 *       404:
 *         description: Task not found
 */

/**
 * @swagger
 * /api/v1/task/delete-task/{id}:
 *   patch:
 *     summary: Soft delete a task by ID
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Task ID
 *     responses:
 *       200:
 *         description: Task deleted
 *       404:
 *         description: Task not found
 */


/**
 * @swagger
 * /api/v1/tasks/{id}/sub-tasks:
 *   get:
 *     summary: Get sub-tasks for a parent task
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Parent Task ID
 *     responses:
 *       200:
 *         description: List of sub-tasks
 */
