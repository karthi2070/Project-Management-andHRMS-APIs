

/**
 * @swagger
 * tags:
 *     name: Sprints
 *     description: APIs for managing sprints
 */

/**
 * @swagger
 * /api/v1/sprint/create-sprint:
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
 *               user_id:
 *                 type: integer
 *                 example: 2
 *               creater_name:
 *                 type: string
 *                 example: admin
 *               project_id:
 *                 type: integer
 *               name:
 *                 type: string
 *               description:
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
 * /api/v1/sprint/update-sprint/{id}:
 *   put:
 *     summary: Update a sprint by ID
 *     tags:
 *       - Sprints
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Sprint ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user_id:
 *                 type: integer
 *                 example: 2
 *               creater_name:
 *                 type: string
 *                 example: admin
 *               project_id:
 *                 type: integer
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               start_date:
 *                 type: string
 *                 format: date
 *               end_date:
 *                 type: string
 *                 format: date
 *               status:
 *                 type: string
 *             example:
 *               project_id: 9
 *               name: "UI UX"
 *               start_date: "2025-06-09"
 *               end_date: "2025-06-09"
 *               status: "COMPLETE"
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
 * /api/v1/sprint/get-by-id/{project_id}/{id}:
 *   get:
 *     summary: Get a sprint by project ID and sprint ID
 *     tags: [Sprints]
 *     parameters:
 *       - in: path
 *         name: project_id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the project (e.g. PROJ001)
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the sprint (e.g. 1)
 *     responses:
 *       200:
 *         description: Sprint found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               example:
 *                 id: 1
 *                 project_id: "PROJ001"
 *                 sprint_name: "Sprint 1"
 *       404:
 *         description: Sprint not found
 *       500:
 *         description: Server error
 */


/**
 * @swagger
 * /api/v1/sprint/get-by-project/{project_id}:
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
 * /api/v1/sprint/delete-sprint/{id}:
 *   patch:
 *     summary: Delete a sprint
 *     tags: [Sprints]
 *     parameters:
 *       - name: id
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

