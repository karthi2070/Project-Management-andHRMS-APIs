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
 *     SubTask:
 *       type: object
 *       properties:
 *         user_id:
 *           type: integer
 *         creater_name:
 *           type: string
 *           example: admin
 *         project_id:
 *           type: integer
 *           example: 2
 *         sprint_id:
 *           type: integer
 *           example: 2
 *         parent_task_id:
 *           type: integer
 *           example: 2
 *         project_code:
 *           type: string
 *           example: TVK-26
 *         title:
 *           type: string
 *           example: Update Swagger Docs
 *         description:
 *           type: string
 *           example: Fix the swagger doc for sub task update API
 *         priority:
 *           type: string
 *           example: High
 *         label:
 *           type: string
 *           example: Backend
 *         start_date:
 *           type: string
 *           format: date
 *           example: 2025-06-10
 *         end_date:
 *           type: string
 *           format: date
 *           example: 2025-06-15
 *         due_date:
 *           type: string
 *           format: date
 *           example: 2025-06-20
 *         status:
 *           type: string
 *           example: In Progress
 *         team:
 *           type: string
 *           example: Team A
 *         assignee:
 *           type: string
 *           example: emp001
 *         rca:
 *           type: string
 *           example: "Bug in API"
 *         acceptance:
 *           type: string
 *           example: "Works on staging"
 *         issue_type:
 *           type: string
 *           example: Bug
 *         story_points:
 *           type: string
 *           example: "3"
 *         attachments:
 *           type: array
 *           items:
 *             type: string
 *           example: ["https://example.com/attachment.png", "https://example.com/attachment2.png"]
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
  *             $ref: '#/components/schemas/SubTask'
  *     responses:
  *       201:
  *         description: Task created successfully
  *       400:
  *         description: Invalid input
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
  * /api/v1/sub-tasks/get-subtasks-id/{id}:
  *   get:
  *     summary: Get a sub task by ID
  *     tags: [Sub Tasks]
  *     parameters:
  *       - in: path
  *         name: id
  *         required: true
  *         schema:
  *           type: integer
  *         description: sub task  ID
  *     responses:
  *       200:
  *         description: sub Task details
  *       404:
  *         description: sub Task not found
  */

  /**
  * @swagger
  * /api/v1/sub-tasks/get-subtasks-id/{parent_id}/{id}:
  *   get:
  *     summary: Get sub-tasks for a parent task
  *     tags: [Sub Tasks]
  *     parameters:
  *       - in: path
  *         name: parent_id
  *         required: true
  *         schema:
  *           type: integer
  *         description: Parent Task ID
  *       - in: path
  *         name: id
  *         required: true
  *         schema:
  *           type: integer
  *         description:  Task ID
  *     responses:
  *       200:
  *         description: List of sub-tasks
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
  *             $ref: '#/components/schemas/SubTask'
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
 
