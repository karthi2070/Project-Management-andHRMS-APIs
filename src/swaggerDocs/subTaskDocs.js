
/**
 * @swagger
 * tags:
 *   name: Sub Tasks
 *   description: Task management
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Task:
 *       type: object
 *       properties:
 *         sprint_id:
 *           type: integer
 *         project_code:
 *           type: string
 *         title:
 *           type: string
 *         description:
 *           type: string
 *         priority:
 *           type: string
 *         label:
 *           type: string
 *         start_date:
 *           type: string
 *           format: date
 *         end_date:
 *           type: string
 *           format: date
 *         due_date:
 *           type: string
 *           format: date
 *         status:
 *           type: string
 *         team:
 *           type: string
 *         assignee:
 *           type: string
 *         rca:
 *           type: string
 *         issue_type:
 *           type: string
 *         story_points:
 *           type: string
 *         attachments:
 *           type: string
 *           example: ["https://example.com/attachment.png", "https://example.com/attachment2.png"]
 *         parent_task_id:
 *           type: integer

 */



/**
 * @swagger
 * /api/v1/sub-tasks/create-task:
 *   post:
 *     summary: Create a new task
 *     tags: [Sub Tasks]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Task'
 *     responses:
 *       201:
 *         description: Task created successfully
 *       400:
 *         description: Invalid input
 */

/**
 * @swagger
 * /api/v1/sub-tasks/get-subtasks-id/{id}:
 *   get:
 *     summary: Get sub-tasks for a parent task
 *     tags: [Sub Tasks]
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


/**
 * @swagger
 * /api/v1/sub-tasks/get-subtasks-id/{parentId}/{id}:
 *   get:
 *     summary: Get a task by ID
 *     tags: [Sub Tasks]
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
 * /api/v1/sub-tasks/sprint-tasks/{id}:
 *   get:
 *     summary: Get a task by sprintId
 *     tags: [Sub Tasks]
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
 * /api/v1/sub-tasks/update-task/{id}:
 *   put:
 *     summary: Update a task by ID
 *     tags: [Sub Tasks]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Task ID
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Task'
 *     responses:
 *       200:
 *         description: Task updated successfully
 *       404:
 *         description: Task not found
 */


/**
 * @swagger
 * /api/v1/sub-tasks/delete-task/{id}:
 *   patch:
 *     summary: Soft delete a task by ID
 *     tags: [Sub Tasks]
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

