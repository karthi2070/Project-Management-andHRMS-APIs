/**
 * @swagger
 * tags:
 *   name: User Management
 *   description: User Management
 */


/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
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
 *           example: test@example.com
 *         password:
 *           type: string
 *           example: pass123
 *     LoginResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: true
 *         token:
 *           type: string
 *           example: eyJhbGciOiJIUzI1Ni...
 *         userId:
 *           type: integer
 *           example: 1
 *         roleId:
 *           type: integer
 *           example: 2
 *         loginMethod:
 *           type: string
 *           enum: [local, google]
 *           example: local
 *     UserCreate:
 *       type: object
 *       required:
 *         - email
 *         - password
 *         - role_id
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *           example: test@example.com
 *         password:
 *           type: string
 *           example: pass123
 *         role_id:
 *           type: integer
 *           example: 2
 *     UserResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: true
 *         userId:
 *           type: integer
 *           example: 1
 *         email:
 *           type: string
 *           format: email
 *           example: test@example.com
 *         roleId:
 *           type: integer
 *           example: 2
 *         message:
 *           type: string
 *           example: User created successfully
 *     UserUpdate:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *           example: newemail@example.com
 *         role_id:
 *           type: integer
 *           example: 2
 *     PasswordUpdate:
 *       type: object
 *       required:
 *         - currentPassword
 *         - newPassword
 *       properties:
 *         currentPassword:
 *           type: string
 *           example: pass123
 *         newPassword:
 *           type: string
 *           example: newpass456
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

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Local login with email and password
 *     description: Authenticates a user using email and password, returning a JWT token and user details. Used for Type 2 login.
 *     tags: [User Management]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginCredentials'
 *     responses:
 *       200:
 *         description: Successful login
 *       400:
 *         description: Missing email or password
 *       401:
 *         description: Invalid credentials or SSO-only user
 *       500:
 *         description: Internal server error
 */

// /**
//  * @swagger
//  * /auth/google:
//  *   get:
//  *     summary: Initiate Google OAuth SSO login
//  *     description: Redirects to Google OAuth for Type 1 login (email only). After authentication, a JWT token is issued.
//  *     tags: [Authentication]
//  *     responses:
//  *       200:
//  *         description: Successful login
//  *       400:
//  *         description: Missing email or password
//  *       500:
//  *         description: Internal server error
//  */

// /**
//  * @swagger
//  * /auth/google/callback:
//  *   get:
//  *     summary: Google OAuth callback
//  *     description: Handles Google OAuth callback, creates or retrieves user, and issues a JWT token for Type 1 login.
//  *     tags: [Authentication]
//  *     responses:
//  *       200:
//  *         description: Successful SSO login
//  *         content:
//  *           application/json:
//  *             schema:
//  *               $ref: '#/components/schemas/LoginResponse'
//  *       400:
//  *         description: Invalid SSO response
//  *         content:
//  *           application/json:
//  *             schema:
//  *               $ref: '#/components/schemas/Error'
//  *       500:
//  *         description: Internal server error
//  *         content:
//  *           application/json:
//  *             schema:
//  *               $ref: '#/components/schemas/Error'
//  */

/**
 * @swagger
 * /auth/create:
 *   post:
 *     summary: Create a new user
 *     description: Creates a new user with email, password, and role_id. Open endpoint for self-registration.
 *     tags: [User Management]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserCreate'
 *     responses:
 *       200:
 *         description: Successful login
 *       400:
 *         description: Missing email or password
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /auth/user/{email}:
 *   get:
 *     summary: Get user by email
 *     description: Retrieves user details by email. Requires JWT authentication.
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
 *         example: test@example.com
 *     responses:
 *       200:
 *         description: Successful login
 *       400:
 *         description: Missing email or password
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /auth/update-user:
 *   put:
 *     summary: Update user details
 *     description: Updates the authenticated user's email or role_id. Requires JWT authentication.
 *     tags: [User Management]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserUpdate'
 *     responses:
 *     responses:
 *       200:
 *         description: Successful login
 *       400:
 *         description: Missing email or password
 *       500:
 *         description: Internal server error
 */