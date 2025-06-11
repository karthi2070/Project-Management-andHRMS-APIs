/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - email
 *         - role_id
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *           description: The user's email address
 *           example: user@example.com
 *         role_id:
 *           type: integer
 *           description: The ID of the role assigned to the user
 *           example: 2
 *     Permission:
 *       type: object
 *       required:
 *         - role_id
 *         - module_id
 *         - has_access
 *       properties:
 *         role_id:
 *           type: integer
 *           description: The ID of the role
 *           example: 2
 *         module_id:
 *           type: integer
 *           description: The ID of the module
 *           example: 1
 *         has_access:
 *           type: boolean
 *           description: Whether the role has access to the module
 *           example: true
 *     Error:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: false
 *         message:
 *           type: string
 *           example: Error message
 *         error:
 *           type: string
 *           example: Detailed error
 */

// /**
//  * @swagger
//  * /admin/users:
//  *   post:
//  *     summary: Create a new user
//  *     description: Creates a new user in the system. Requires admin privileges and JWT authentication.
//  *     tags: [User Management]
//  *     security:
//  *       - bearerAuth: []
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             $ref: '#/components/schemas/User'
//  *     responses:
//  *       200:
//  *         description: User created successfully
//  *       400:
//  *         description: Invalid input
//  *       401:
//  *         description: Unauthorized (invalid or missing token)
//  *       403:
//  *         description: Forbidden (non-admin user)
//  *       500:
//  *         description: Internal server error
//  */

/**
 * @swagger
 * /admin/permissions:
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
 * /admin/permissions:
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

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: User login with email and password
 *     description: Authenticates a user with email and password, returning a JWT token. Role-based access restrictions apply to subsequent endpoints.
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginCredentials'
 *     responses:
 *       200:
 *         description: Successful login
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 token:
 *                   type: string
 *                   example: eyJhbGciOiJIUzI1Ni...
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Invalid credentials or SSO user
 *       500:
 *         description: Internal server error
 * components:
 *   schemas:
 *     LoginCredentials:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *           example: user@example.com
 *         password:
 *           type: string
 *           example: pass123
 */