

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
 *     summary: Update an existing project by ID
 *     tags: [Projects]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Numeric ID of the project to update
 *         schema:
 *           type: integer
 *           example: 101
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - project_code
 *               - description
 *               - due_date
 *               - start_date
 *               - end_date
 *               - status
 *             properties:
 *               name:
 *                 type: string
 *                 example: TVK-PARTY-WEB
 *               project_code:
 *                 type: string
 *                 example: TVK-26
 *               description:
 *                 type: string
 *                 example: Project description
 *               due_date:
 *                 type: string
 *                 format: date
 *                 example: 2025-07-11
 *               start_date:
 *                 type: string
 *                 format: date
 *                 example: 2025-06-11
 *               end_date:
 *                 type: string
 *                 format: date
 *                 example: 2025-06-11
 *               status:
 *                 type: string
 *                 example: planned
 *     responses:
 *       200:
 *         description: Project updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Project updated successfully
 *                 result:
 *                   type: object
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

