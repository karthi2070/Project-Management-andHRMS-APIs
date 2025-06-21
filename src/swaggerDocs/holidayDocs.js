
/**
 * @swagger
 * tags:
 *   name: Holidays
 *   description: Holiday management APIs
 */

/**
 * @swagger
 * /n1suite/api/v1/holidays/create-holiday:
 *   post:
 *     summary: Create a new holiday
 *     tags: [Holidays]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - date
 *               - day
 *               - holiday
 *             properties:
 *               date:
 *                 type: string
 *                 format: date
 *                 example: "2025-12-25"
 *               day:
 *                 type: string
 *                 example: "Thursday"
 *               holiday:
 *                 type: string
 *                 example: "Christmas"
 *     responses:
 *       201:
 *         description: Holiday created
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /n1suite/api/v1/holidays/get-all-holiday:
 *   get:
 *     summary: Get all holidays
 *     tags: [Holidays]
 *     responses:
 *       200:
 *         description: List of holidays
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /n1suite/api/v1/holidays/get-by-holiday/{id}:
 *   get:
 *     summary: Get holiday by ID
 *     tags: [Holidays]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Holiday ID
 *     responses:
 *       200:
 *         description: Holiday data
 *       404:
 *         description: Holiday not found
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /n1suite/api/v1/holidays/update-holiday/{id}:
 *   put:
 *     summary: Update a holiday
 *     tags: [Holidays]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Holiday ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               date:
 *                 type: string
 *                 format: date
 *                 example: "2025-12-31"
 *               day:
 *                 type: string
 *                 example: "Wednesday"
 *               holiday:
 *                 type: string
 *                 example: "New Year's Eve"
 *     responses:
 *       200:
 *         description: Holiday updated
 *       500:
 *         description: Server error
 */


/**
 * @swagger
 * /n1suite/api/v1/holidays/delete-holiday/{id}:
 *   patch:
 *     summary: Delete a holiday
 *     tags: [Holidays]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Holiday ID
 *     responses:
 *       200:
 *         description: Holiday deleted
 *       500:
 *         description: Server error
 */

