
/**
 * @swagger
 * tags:
 *   name: BankDetails
 *   description: API for managing Bank Details 
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     BankDetails:
 *       type: object
 *       properties:
 *         employee_id:
 *           type: integer
 *           description: Employee ID linked to the bank details
 *         acc_holder_name:
 *           type: string
 *           description: Name of the account holder
 *         account_number:
 *           type: string
 *           description: Bank account number
 *         ifsc_code:
 *           type: string
 *           description: IFSC code of the bank
 *         bank_name:
 *           type: string
 *           description: Name of the bank
 */

/**
 * @swagger
 * /api/v1/bank/create-acc:
 *   post:
 *     summary: Create bank details
 *     tags: [BankDetails]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/BankDetails'
 *     responses:
 *       201:
 *         description: Bank details created successfully
 */

/**
 * @swagger
 * /api/v1/bank/get-acc-list:
 *   get:
 *     summary: Get all bank details
 *     tags: [BankDetails]
 *     responses:
 *       200:
 *         description: List of all bank details
 */

/**
 * @swagger
 * /api/v1/bank/get-acc-em-id/{id}:
 *   get:
 *     summary: Get bank details by ID
 *     tags: [BankDetails]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Bank details found
 *       404:
 *         description: Bank details not found
 */

/**
 * @swagger
 * /api/v1/bank/update-acc-em-id/{id}:
 *   put:
 *     summary: Update bank details
 *     tags: [BankDetails]
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
 *             $ref: '#/components/schemas/BankDetails'
 *     responses:
 *       200:
 *         description: Bank details updated successfully
 */

/**
 * @swagger
 * /api/v1/bank/delete-acc-em-id/{id}:
 *   patch:
 *     summary: Soft delete bank details
 *     tags: [BankDetails]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Bank details deleted successfully
 */


