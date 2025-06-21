/**
 * @swagger
 * /n1suite/auth/login:
 *   post:
 *     summary: User login with email and password
 *     description: Authenticates a user and returns a JWT token with user details.
 *     tags: [User Management]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 example: userPassword123
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6...
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: USER123
 *                     email:
 *                       type: string
 *                       example: user@example.com
 *                     role_id:
 *                       type: integer
 *                       example: 2
 *       400:
 *         description: Email or password missing
 *       401:
 *         description: Invalid credentials or SSO-only user
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /n1suite/auth/create:
 *   post:
 *     summary: Register a new user
 *     description: Creates a user with email, password, and role ID.
 *     tags: [User Management]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *               - role_id
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: newuser@example.com
 *               password:
 *                 type: string
 *                 example: NewUser@123
 *               role_id:
 *                 type: integer
 *                 example: 3
 *     responses:
 *       201:
 *         description: User created successfully
 *       400:
 *         description: Missing or invalid input
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /n1suite/auth/user/{email}:
 *   get:
 *     summary: Get user by email
 *     description: Retrieves user details for the specified email.
 *     tags: [User Management]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: email
 *         required: true
 *         schema:
 *           type: string
 *           format: email
 *         example: user@example.com
 *     responses:
 *       200:
 *         description: User retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: USER123
 *                 email:
 *                   type: string
 *                   example: user@example.com
 *                 role_id:
 *                   type: integer
 *                   example: 2
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /n1suite/admin/users:
 *   post:
 *     summary: Create a new user
 *     description: Creates a new user in the system. Requires admin privileges and JWT authentication.
 *     tags: [User Management]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - role_id
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: user@example.com
 *               role_id:
 *                 type: integer
 *                 example: 2
 *     responses:
 *       200:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User created successfully
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                     email:
 *                       type: string
 *                     role_id:
 *                       type: integer
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
 * /n1suite/auth/update-user:
 *   put:
 *     summary: Update user information
 *     description: Updates the authenticated user's email and/or role ID.
 *     tags: [User Management]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: updated@example.com
 *               role_id:
 *                 type: integer
 *                 example: 2
 *     responses:
 *       200:
 *         description: User updated successfully
 *       400:
 *         description: Invalid or missing input
 *       500:
 *         description: Internal server error
 */
