/**
 * @swagger
 * tags:
 *   name: login
 *   description: API for user login and registration
 */

/**
 * @swagger
 * /api/v1/employee/login:
 *   post:
 *     summary: User login
 *     tags: [login]
 *     description: Authenticates a user with email and password.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               mail:
 *                 type: string
 *                 example: karthi@gmail.com
 *               password:
 *                 type: string
 *                 example: 098765
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
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *       401:
 *         description: Invalid email or password
 */

/**
 * @swagger
 * /api/v1/employee/get-user-by-mail/{mail}:
 *   get:
 *     summary: Get user by email
 *     tags: [login]
 *     description: Returns a user object by email.
 *     parameters:
 *       - in: path
 *         name: mail
 *         required: true
 *         schema:
 *           type: string
 *         description: User's email address
 *     responses:
 *       200:
 *         description: User found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: User not found
 */


/**
 * @swagger
 * /api/v1/employee/register:
 *   post:
 *     summary: Register a new user
 *     tags: [login]
 *     description: Creates a new user in the database.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               mail:
 *                 type: string
 *               ph_num:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 */


/**
 * @swagger
 * /api/v1/employee/get-user-by-id/{id}:
 *   get:
 *     summary: Get user by ID
 *     tags: [login]
 *     description: Returns a user object by user ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: User's ID
 *     responses:
 *       200:
 *         description: User found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: User not found
 */


/**
 * @swagger
 * /api/v1/employee/get-all-users:
 *   get:
 *     summary: Get all users
 *     tags: [login]
 *     description: Returns a list of all users.
 *     responses:
 *       200:
 *         description: A list of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */
