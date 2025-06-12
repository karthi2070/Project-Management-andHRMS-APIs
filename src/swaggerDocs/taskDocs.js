
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
 *     Tasks:
 *       type: object
 *       properties:
 *         sprint_id:
 *           type: integer
 *           example: 2
 *         project_code:
 *           type: string
 *           example: "PRJ001"
 *         title:
 *           type: string
 *           example: "Implement login"
 *         description:
 *           type: string
 *           example: "Create login page and backend"
 *         priority:
 *           type: string
 *           example: "High"
 *         label:
 *           type: string
 *           example: "Frontend"
 *         start_date:
 *           type: string
 *           format: date
 *           example: "2024-06-01"
 *         end_date:
 *           type: string
 *           format: date
 *           example: "2024-06-10"
 *         due_date:
 *           type: string
 *           format: date
 *           example: "2024-06-09"
 *         status:
 *           type: string
 *           example: "In Progress"
 *         team:
 *           type: string
 *           example: "Alpha"
 *         assignee:
 *           type: string
 *           example: "john.doe"
 *         rca:
 *           type: string
 *           example: "N/A"
 *         acceptance:
 *           type: string
 *           example: "Acceptance criteria here"
 *         issue_type:
 *           type: string
 *           example: "Story"
 *         story_points:
 *           type: integer
 *           example: 5
 *         attachments:
 *           type: array
 *           items:
 *             type: string
 *           example: ["file1.png", "file2.pdf"]
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
 *             $ref: '#/components/schemas/Tasks'
 *     responses:
 *       201:
 *         description: Task created
 */


/**
 * @swagger
 * /api/v1/task/update-task/{id}:
 *   put:
 *     summary: Update a task by its ID
 *     description: Updates all fields of a task in the task_tbl using the provided task data.
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Task ID to update
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               sprint_id:
 *                 type: number
 *               project_code:
 *                 type: string
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               priority:
 *                 type: string
 *               label:
 *                 type: string
 *               start_date:
 *                 type: string
 *                 format: date
 *               end_date:
 *                 type: string
 *                 format: date
 *               due_date:
 *                 type: string
 *                 format: date
 *               status:
 *                 type: string
 *               team:
 *                 type: string
 *               assignee:
 *                 type: string
 *               rca:
 *                 type: string
 *               acceptance:
 *                 type: string
 *               issue_type:
 *                 type: string
 *               story_points:
 *                 type: number
 *               attachments:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["file1.png", "file2.pdf"]
 *     responses:
 *       200:
 *         description: Task updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 taskId:
 *                   type: string
 *       404:
 *         description: Task not found
 *       500:
 *         description: Internal server error
 */


/**
 * @swagger
 * /api/v1/tasks/sprint-tasks/{sprint_id}:
 *   get:
 *     summary: Get all tasks by sprint ID
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: sprint_id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 2
 *     responses:
 *       200:
 *         description: List of tasks
 */

/**
 * @swagger
 * /api/v1/tasks/sprint-tasks/{project_id}:
 *   get:
 *     summary: Get all tasks by project_id 
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: project_id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 2
 *     responses:
 *       200:
 *         description: List of tasks
 */

/**
 * @swagger
 * /api/v1/tasks/get-by-id/{sprint_id}/{task_id}:
 *   get:
 *     summary: Get a task by sprint ID and task ID
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: task_id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 2
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     responses:
 *       200:
 *         description: Task found
 *       404:
 *         description: Task not found
 */


/**
 * @swagger
 * /api/v1/task/delete-task/{id}:
 *   patch:
 *     summary: Delete a task (soft delete)
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     responses:
 *       200:
 *         description: Task deleted
 */