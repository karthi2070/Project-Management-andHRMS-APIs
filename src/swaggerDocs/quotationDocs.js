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
 *     Quotation:
 *       type: object
 *       properties:
 *         user_id:
 *           type: integer
 *           description: Employee ID linked to the quotation
 *         client_name:
 *           type: string
 *           description: Client's name
 *         client_mail:
 *           type: string
 *           format: email
 *           description: Client's email address
 *         project:
 *           type: string
 *           description: Project name related to the quotation
 *         amount:
 *           type: number
 *           format: float
 *           description: Quoted amount
 *         date:
 *           type: string
 *           format: date
 *           description: Date of the quotation
 */

/**
 * @swagger
 * /n1suite/api/v1/quotation/create-quotation :
 *   post:
 *     summary: Create a new quotation
 *     tags: [Quotation]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Quotation'
 *     responses:
 *       201:
 *         description: Quotation created successfully
 */

/**
 * @swagger
 * /n1suite/api/v1/quotation/get-list-quotation :
 *   get:
 *     summary: Get all quotations
 *     tags: [Quotation]
 *     responses:
 *       200:
 *         description: List of all quotations
 */

/**
 * @swagger
 * /n1suite/api/v1/quotation/get-by-id/{id}:
 *   get:
 *     summary: Get a quotation by ID
 *     tags: [Quotation]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Quotation found
 *       404:
 *         description: Quotation not found
 */

/**
 * @swagger
 * /n1suite/api/v1/quotation/update-quotation/{id}:
 *   put:
 *     summary: Update a quotation
 *     tags: [Quotation]
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
 *             $ref: '#/components/schemas/Quotation'
 *     responses:
 *       200:
 *         description: Quotation updated successfully
 */

/**
 * @swagger
 * /n1suite/api/v1/quotation/delete-quotation/{id}:
 *   patch:
 *     summary: Soft delete a quotation
 *     tags: [Quotation]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Quotation soft-deleted successfully
 */


