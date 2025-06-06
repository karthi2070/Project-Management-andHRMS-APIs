

/**
 * @swagger
 * tags:
 *     name: Projects
 *     description: APIs for managing projects
 */

/**
 * @swagger
 * /api/v1/projects/create-project:
 *   post:
 *     summary: Create a new project
 *     tags: [Projects]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               project_code:
 *                 type: string
 *               description:
 *                 type: string
 *               due_date:
 *                 type: string
 *                 format: date
 *               start_date:
 *                 type: string
 *                 format: date
 *               end_date:
 *                 type: string
 *                 format: date
 *               sprints_count:
 *                 type: numer
 *               budget:
 *                 type: number
 *               status:
 *                 type: string
 *     responses:
 *       201:
 *         description: Project created successfully
 *       500:
 *         description: Internal server error
 */


/**
 * @swagger
 * /api/v1/projects/update-project/{id}:
 *   put:
 *     summary: Update an existing project
 *     tags: [Projects]
 *     parameters:
 *       - name: project_id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               project_code:
 *                 type: string
 *               description:
 *                 type: string
 *               due_date:
 *                 type: string
 *               start_date:
 *                 type: string
 *                 format: date
 *               end_date:
 *                 type: string
 *                 format: date
 *               sprints_count:
 *                type: number
 *               budget:
 *                 type: number
 *               status:
 *                 type: string
 *     responses:
 *       200:
 *         description: Project updated successfully
 *       404:
 *         description: Project not found
 *       500:
 *         description: Internal server error
 */


/**
 * @swagger
 * /api/v1/projects/get-all-projects:
 *   get:
 *     summary: Get all projects
 *     tags: [Projects]
 *     responses:
 *       200:
 *         description: List of projects
 *       500:
 *         description: Internal server error
 */


/**
 * @swagger
 * /api/v1/projects/get-by-id/{project_id}:
 *   get:
 *     summary: Get a project by ID
 *     tags: [Projects]
 *     parameters:
 *       - name: project_id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Project details
 *       404:
 *         description: Project not found
 *       500:
 *         description: Internal server error
 */

