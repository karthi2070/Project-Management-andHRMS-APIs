/**
 * @swagger
 * tags:
 *   name: Employee Leave
 *   description: CRUD operations for employee leave
 */

/**
 * @swagger
 * /api/v1/leave/create-leave:
 *   post:
 *     summary: Create a new leave record
 *     tags: [Employee Leave]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user_id:
 *                 type: integer
 *               leave_type_id:
 *                 type: integer
 *               start_date:
 *                 type: string
 *                 format: date
 *               end_date:
 *                 type: string
 *                 format: date
 *               reson:
 *                 type: string
 *     responses:
 *       201:
 *         description: Leave record created
 */

/**
 * @swagger
 * /api/v1/leave/get-all-leave:
 *   get:
 *     summary: Get all leave records
 *     tags: [Employee Leave]
 *     responses:
 *       200:
 *         description: List of leave records
 */

/**
 * @swagger
 * /api/v1/leave/get-leave-id/{id}:
 *   get:
 *     summary: Get leave record by ID
 *     tags: [Employee Leave]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: A single leave record
 */

/**
 * @swagger
 * /api/v1/leave/update-leave/{id}:
 *   put:
 *     summary: Update a leave record by ID
 *     tags: [Employee Leave]
 *     parameters:
 *       - in: path
 *         name: id
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
 *               user_id:
 *                 type: number
 *               leave_type_id:
 *                 type: integer
 *               start_date:
 *                 type: string
 *                 format: date
 *               end_date:
 *                 type: string
 *                 format: date
 *               reason:
 *                 type: string
 *     responses:
 *       200:
 *         description: Leave record updated
 */

/**
 * @swagger
 * /api/v1/leave/delete-leave/{id}:
 *   patch:
 *     summary: Soft delete a leave record by ID
 *     tags: [Employee Leave]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Leave record soft-deleted
 */

/**
 * @swagger
 * /api/v1/leave/{id}/is_applicable:
 *   patch:
 *     summary: Update is_applicable field
 *     tags: [Employee Leave]
 *     parameters:
 *       - in: path
 *         name: id
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
 *               is_applicable:
 *                 type: number
 *               reason:
 *                 type: string
 *     responses:
 *       200:
 *         description: is_applicable updated
 */

/**
 * @swagger
 * /api/v1/leave/get-employee-leave/{id}/{is_applicable}:
 *   get:
 *     summary: Get leave record by ID
 *     tags: [Employee Leave]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *       - in: path
 *         name: is_applicable
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: A single leave record
 */

// leave balance

/**
 * @swagger
 * /api/v1/leave/create-leave-balance:
 *   post:
 *     summary: Create a new leave balance entry
 *     tags:
 *       - Employee Leave
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user_id:
 *                 type: integer
 *               leave_type_id:
 *                 type: integer
 *               year:
 *                  type: integer
 *                  format: int32
 *                  example: 2025
 *               allocated_days:
 *                 type: number
 *     responses:
 *       201:
 *         description: Leave balance created successfully year, allocated_days
 */

/**
 * @swagger
 * /api/v1/leave/get-all-leave-balance:
 *   get:
 *     summary: Get all leave balances
 *     tags:
 *       - Employee Leave
 *     responses:
 *       200:
 *         description: A list of all leave balances
 */

/**
 * @swagger
 * /api/v1/leave/get-by-userId-leave-balance/{userId}:
 *   get:
 *     summary: Get leave balance by user ID
 *     tags:
 *       - Employee Leave
 *     parameters:
 *       - name: userId
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Leave balance for the specified user
 */

/**
 * @swagger
 * /api/v1/leave/update-leave-balance/{id}:
 *   put:
 *     summary: Update leave balance by ID
 *     tags:
 *       - Employee Leave
 *     parameters:
 *       - name: id
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
 *               total_days:
 *                 type: number
 *               used_days:
 *                 type: number
 *     responses:
 *       200:
 *         description: Leave balance updated successfully
 */

/**
 * @swagger
 * /api/v1/leave/summary/{userId}:
 *   get:
 *     summary: Get leave summary by user ID
 *     tags:
 *       - Employee Leave
 *     parameters:
 *       - name: userId
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Summary of leave details for the user
 */
