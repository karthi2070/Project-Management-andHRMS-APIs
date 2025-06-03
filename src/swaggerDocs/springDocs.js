

/**
 * @swagger
 * tags:
 *     name: Sprints
 *     description: APIs for managing sprints
 */

/**
 * @swagger
 * /api/v1/sprints/create-sprints:
 *   post:
 *     summary: Create a new sprint
 *     tags: [Sprints]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               project_id:
 *                 type: integer
 *               name:
 *                 type: string
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
 *         description: Sprint created successfully
 *       500:
 *         description: Internal server error
 */


/**
 * @swagger
 * /api/v1/sprints/update-sprints/{id}:
 *   put:
 *     summary: Update an existing sprint
 *     tags: [Sprints]
 *     parameters:
 *       - name: sprint_id
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
 *               status:
 *                 type: string
 *     responses:
 *       200:
 *         description: Sprint updated successfully
 *       404:
 *         description: Sprint not found
 *       500:
 *         description: Internal server error
 */


/**
 * @swagger
 * /api/v1/sprints/get-all-sprints:
 *   get:
 *     summary: Get all sprints
 *     tags: [Sprints]
 *     responses:
 *       200:
 *         description: List of sprints
 *       500:
 *         description: Internal server error
 */


/**
 * @swagger
 * /api/v1/sprints/get-by-id/{id}:
 *   get:
 *     summary: Get a sprint by ID
 *     tags: [Sprints]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Sprint details
 *       404:
 *         description: Sprint not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/v1/sprints/get-by-project/{project_id}:
 *   get:
 *     summary: Get all sprints by project ID
 *     tags: [Sprints]
 *     parameters:
 *       - name: project_id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: List of sprints for the given project
 *       404:
 *         description: No sprints found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/v1/delete-sprints/{id}:
 *   patch:
 *     summary: Delete a sprint
 *     tags: [Sprints]
 *     parameters:
 *       - name: sprint_id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Sprint deleted successfully
 *       404:
 *         description: Sprint not found
 *       500:
 *         description: Internal server error
 */

