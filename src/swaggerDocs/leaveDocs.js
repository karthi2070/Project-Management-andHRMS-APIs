/**
 * @swagger
 * tags:
 *   name: Employee Leave
 *   description: CRUD operations for employee leave
 */

/**
 * @swagger
 * /api/v1/employee-leave/create-leave:
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
 *                 type: number
 *               leave_type:
 *                 type: string
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
 * /api/v1/employee-leave/get-all-leave:
 *   get:
 *     summary: Get all leave records
 *     tags: [Employee Leave]
 *     responses:
 *       200:
 *         description: List of leave records
 */

/**
 * @swagger
 * /api/v1/employee-leave/get-leave-id/{id}:
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
 * /api/v1/employee-leave/update-leave/{id}:
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
 *               leave_type:
 *                 type: string
 *               start_date:
 *                 type: string
 *                 format: date
 *               end_date:
 *                 type: string
 *                 format: date
 *               reson:
 *                 type: string
 *     responses:
 *       200:
 *         description: Leave record updated
 */

/**
 * @swagger
 * /api/v1/employee-leave/delete-leave/{id}:
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
 * /api/v1/employee-leave/{id}/is_applicable:
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
 * /api/v1/employee-leave/get-employee-leave/{id}/{is_applicable}:
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