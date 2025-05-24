/**
 * @swagger
 * tags:
 *   name: Expense
 *   description: API for managing emplolyee details
 */


/**
 * @swagger
 * components:
 *   schemas:
 *     Expense:
 *       type: object
 *       properties:
 *         date:
 *           type: string
 *           format: date
 *           description: Expense date
 *         category:
 *           type: string
 *           description: Expense category (e.g., food, travel)
 *         amount:
 *           type: number
 *           format: float
 *           description: Expense amount
 *         bill_img:
 *           type: string
 *           description: URL or path to the bill image
 *         description:
 *           type: string
 *           description: Additional details about the expense
 */

/**
 * @swagger
 * /api/v1/expense/create-expense :
 *   post:
 *     summary: Create a new expense
 *     tags: [Expense]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Expense'
 *     responses:
 *       201:
 *         description: Expense created successfully
 */

/**
 * @swagger
 * /api/v1/expense/get-expense-list :
 *   get:
 *     summary: Get all expenses
 *     tags: [Expense]
 *     responses:
 *       200:
 *         description: List of all expenses
 */

/**
 * @swagger
 * /api/v1/expense/get-expense-id/{id}:
 *   get:
 *     summary: Get an expense by ID
 *     tags: [Expense]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Expense found
 *       404:
 *         description: Expense not found
 */

/**
 * @swagger
 * /api/v1/expense/update-expense/{id}:
 *   put:
 *     summary: Update an expense
 *     tags: [Expense]
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
 *             $ref: '#/components/schemas/Expense'
 *     responses:
 *       200:
 *         description: Expense updated successfully
 */

/**
 * @swagger
 * /api/v1/expense/delete-expense/{id}:
 *   patch:
 *     summary: Soft delete an expense
 *     tags: [Expense]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Expense soft-deleted successfully
 */

/**
 * @swagger
 * /api/v1/expense/get-filtered-expenses :
 *   get:
 *     summary: Get expenses filtered dynamically
 *     tags: [Expense]
 *     parameters:
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *       - in: query
 *         name: startDate
 *         schema:
 *           type: string
 *           format: date
 *       - in: query
 *         name: endDate
 *         schema:
 *           type: string
 *           format: date
 *       - in: query
 *         name: minAmount
 *         schema:
 *           type: number
 *           format: float
 *       - in: query
 *         name: maxAmount
 *         schema:
 *           type: number
 *           format: float
 *       - in: query
 *         name: keyword
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Filtered expenses retrieved successfully
 */


