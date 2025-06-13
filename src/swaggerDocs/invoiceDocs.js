/**
 * @swagger
 * tags:
 *   name: Invoice
 *   description: Invoice management
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Invoice:
 *       type: object
 *       properties:
 *         client_id:
 *           type: number
 *           description: Unique identifier for the client
 *         invoice_number:
 *           type: string
 *           description: Unique invoice number
 *         invoice_amount:
 *           type: number
 *           description: Total amount of the invoice
 *         paid_amount:
 *           type: number
 *           description: Amount that has been paid
 *         balance_amount:
 *           type: number
 *           description: Remaining balance amount
 *         invoice_date:
 *           type: string
 *           format: date
 *           description: Date when the invoice was issued
 *         due_date:
 *           type: string
 *           format: date
 *           description: Due date for the invoice payment
 *         payment_method:
 *           type: string
 *           description: Method of payment (e.g., cash, credit card, bank transfer)
 *         notes:
 *           type: string
 *           description: Additional notes or comments about the invoice
 *       required:
 *         - client_id
 *         - invoice_number
 *         - invoice_amount
 *         - invoice_date
 *         - due_date
 */

/**
 * @swagger
 * /api/v1/invoice/create-invoice:
 *   post:
 *     summary: Create a new invoice
 *     tags: [Invoice]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Invoice'
 *     responses:
 *       201:
 *         description: Invoice created successfully
 *       400:
 *         description: Invalid input
 */

/**
 * @swagger
 * /api/v1/invoice/get-invoices:
 *   get:
 *     summary: Get all invoices
 *     tags: [Invoice]
 *     responses:
 *       200:
 *         description: List of invoices
 */

/**
 * @swagger
 * /api/v1/invoice/get-invoice/{client_id}/{invoice_id}:
 *   get:
 *     summary: Get invoice by ID
 *     tags: [Invoice]
 *     parameters:
 *       - in: path
 *         name: client_id
 *         required: true
 *         schema:
 *           type: string
 *         description: Client Id
 *       - in: path
 *         name: invoice_id
 *         required: true
 *         schema:
 *           type: string
 *         description: Invoice ID
 *     responses:
 *       200:
 *         description: Invoice data
 *       404:
 *         description: Invoice not found
 */

/**
 * @swagger
 * /api/v1/invoice/get-invoice-by-client/{clientId}:
 *   get:
 *     summary: Get invoices by client ID
 *     tags: [Invoice]
 *     parameters:
 *       - in: path
 *         name: clientId
 *         required: true
 *         schema:
 *           type: string
 *         description: Client ID
 *     responses:
 *       200:
 *         description: List of invoices for the client
 *       404:
 *         description: Client or invoices not found
 */

/**
 * @swagger
 * /api/v1/invoice/get-invoice-by-number/{invoiceNumber}:
 *   get:
 *     summary: Get invoice by invoice number
 *     tags: [Invoice]
 *     parameters:
 *       - in: path
 *         name: invoiceNumber
 *         required: true
 *         schema:
 *           type: string
 *         description: Invoice number
 *     responses:
 *       200:
 *         description: Invoice data
 *       404:
 *         description: Invoice not found
 */

/**
 * @swagger
 * /api/v1/invoice/update-invoice/{id}:
 *   put:
 *     summary: Update an invoice
 *     tags: [Invoice]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Invoice ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Invoice'
 *     responses:
 *       200:
 *         description: Invoice updated successfully
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Invoice not found
 */

/**
 * @swagger
 * /api/v1/invoice/delete-invoice/{id}:
 *   patch:
 *     summary: Soft delete an invoice
 *     tags: [Invoice]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Invoice ID
 *     responses:
 *       200:
 *         description: Invoice deleted successfully
 *       404:
 *         description: Invoice not found
 */




