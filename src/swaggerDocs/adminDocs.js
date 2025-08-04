

/**
 * @swagger
 * /api/v1/admin/dashboard:
 *   get:
 *     summary: Get all counts
 *     tags: [Permission Management]
 *     responses:
 *       200:
 *         description: List of all counts
 */

/**
 * @swagger
 * /api/v1/admin/permissions:
 *   post:
 *     summary: Set a new permission
 *     description: Creates a new permission for a role to access a module. Requires admin privileges and JWT authentication.
 *     tags: [Permission Management]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Permission'
 *     responses:
 *       200:
 *         description: User created successfully
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized (invalid or missing token)
 *       403:
 *         description: Forbidden (non-admin user)
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/v1/admin/permissions:
 *   put:
 *     summary: Update an existing permission
 *     description: Updates the access status of an existing permission for a role and module. Requires admin privileges and JWT authentication.
 *     tags: [Permission Management]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Permission'
 *     responses:
 *       200:
 *         description: User created successfully
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized (invalid or missing token)
 *       403:
 *         description: Forbidden (non-admin user)
 *       500:
 *         description: Internal server error
 */
