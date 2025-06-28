

/**
 * @swagger
 * tags:
 *   - name: Expense Category
 *     description: APIs for managing expense statuses
 */

  /**
   * @swagger
   * /api/v1/expense/create-status:
   *   post:
   *     summary: Create a new expense status
   *     tags: [Expense Category]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               name:
   *                 type: string
   *                 example: Pending Approval
   *     responses:
   *       201:
   *         description: Created successfully
   */
  /**
   * @swagger
   * /api/v1/expense/update-status/{id}:
   *   put:
   *     summary: Update an expense status by ID
   *     tags: [Expense Category]
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
   *               name:
   *                 type: string
   *                 example: Approved
   *     responses:
   *       200:
   *         description: Status updated
   */

  /**
   * @swagger
   * /api/v1/expense/get-all-status:
   *   get:
   *     summary: Retrieve all expense statuses
   *     tags: [Expense Category]
   *     responses:
   *       200:
   *         description: Array of status records
   */

  /**
   * @swagger
   * /api/v1/expense/get-by-id-status/{id}:
   *   get:
   *     summary: Retrieve a status by ID
   *     tags: [Expense Category]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *     responses:
   *       200:
   *         description: Status record
   */
 
  /**
   * @swagger
   * /api/v1/expense/delete-status/{id}:
   *   patch:
   *     summary: Soft-delete a status
   *     tags: [Expense Category]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *     responses:
   *       200:
   *         description: Status soft-deleted
   */

