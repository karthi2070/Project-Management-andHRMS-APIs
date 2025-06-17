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
 *         user_id:
 *           type:number
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
 *         extra_amount:
 *           type: number
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
 *     description: Creates a new invoice with optional advance/initial payment. Calculates balance and extra amount.
 *     tags: [Invoice]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - client_id
 *               - invoice_number
 *               - invoice_amount
 *               - invoice_date
 *               - due_date
 *             properties:
 *               user_id:
 *                 type:number
 *               client_id:
 *                 type: integer
 *                 example: 1
 *               invoice_number:
 *                 type: string
 *                 example: "INV-1001"
 *               invoice_amount:
 *                 type: number
 *                 format: float
 *                 example: 12000.00
 *               paid_amount:
 *                 type: number
 *                 format: float
 *                 example: 2000.00
 *                 description: Optional. Advance or first payment. Default is 0.00
 *               balance_amount:
 *                 type: number
 *                 format: float
 *                 example: 10000.00
 *                 description: Optional. Calculated as invoice_amount - paid_amount
 *               extra_amount:
 *                 type: number
 *                 format: float
 *                 example: 0.00
 *               invoice_date:
 *                 type: string
 *                 format: date
 *                 example: "2025-06-11"
 *               due_date:
 *                 type: string
 *                 format: date
 *                 example: "2025-07-11"
 *               payment_method:
 *                 type: string
 *                 example: "UPI"
 *               notes:
 *                 type: string
 *                 example: "First installment paid"
 *     responses:
 *       201:
 *         description: Invoice created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Invoice created successfully
 *                 invoice_id:
 *                   type: integer
 *                   example: 101
 *       400:
 *         description: Missing or invalid input
 *       500:
 *         description: Internal server error
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


/**
 * @swagger
 * /api/v1/invoices/emi-payment/{invoice_id}:
 *   post:
 *     summary: Record an EMI payment for an invoice
 *     description: Adds a new EMI payment entry for a specific invoice. Updates invoice totals only if payment is marked as successful.
 *     tags: [Invoice]
 *     parameters:
 *       - in: path
 *         name: invoice_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the invoice for which EMI payment is being made
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - client_id
 *               - payment_amount
 *               - payment_method
 *               - payment_status
 *             properties:
 *               user_id:
 *                 type:number
 *               client_id:
 *                 type: integer
 *                 example: 45
 *               payment_amount:
 *                 type: number
 *                 format: float
 *                 example: 2000.00
 *               payment_date:
 *                 type: string
 *                 format: date
 *                 example: "2025-06-11"
 *               payment_method:
 *                 type: string
 *                 example: "UPI"
 *               payment_status:
 *                 type: integer
 *                 example: 1
 *                 description: |
 *                   0 = Pending  
 *                   1 = Success  
 *                   2 = Failed
 *               notes:
 *                 type: string
 *                 example: "EMI payment for June"
 *     responses:
 *       200:
 *         description: EMI payment recorded successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Payment recorded
 *                 paid_amount:
 *                   type: number
 *                   example: 6000.00
 *                 balance_amount:
 *                   type: number
 *                   example: 4000.00
 *                 extra_amount:
 *                   type: number
 *                   example: 0
 *                 payment_status:
 *                   type: integer
 *                   example: 1
 *       404:
 *         description: Invoice not found
 *       500:
 *         description: Internal server error
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
 * /api/v1/invoice/get-invoice-EMI-payment/{client_id}/{invoice_id}:
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
 * /api/v1/invoice/get-invoice-EMI-payment-id/{invoice_id}/{id}:
 *   get:
 *     summary: Get invoice by ID
 *     tags: [Invoice]
 *     parameters:
 *       - in: path
 *         name: invoice_id
 *         required: true
 *         schema:
 *           type: string
 *         description: Client Id
 *       - in: path
 *         name: id
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