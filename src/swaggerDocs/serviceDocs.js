/**
 * @swagger
 * tags:
 *   name: Service
 *   description: Service management APIs
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Service:
 *       type: object
 *       properties:
 *         user_id:
 *           type: integer
 *           example: 3
 *         client_id:
 *           type: integer
 *           example: 24
 *         service_name:
 *           type: string
 *           example: "Web Development"
 *         from_date:
 *           type: string
 *           format: date
 *         to_date:
 *           type: string
 *           format: date
 *         service_amount:
 *           type: integer
 *         paid_amount:
 *           type: number
 *           format: float
 *         balance_amount:
 *           type: number
 *           format: float
 *         payment_status:
 *           type: integer
 *           default: 1
 *         followup_date:
 *           type: string
 *           format: date
 *         notes:
 *           type: string
 *           example: "Service notes"
 */

/**
 * @swagger
 * /api/v1/service/create-service:
 *   post:
 *     summary: Create a new service
 *     tags: [Service]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Service'
 *     responses:
 *       201:
 *         description: Service created successfully
 */

/**
 * @swagger
 * /api/v1/service/update-service/{id}:
 *   put:
 *     summary: Update an existing service
 *     tags: [Service]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Service ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Service'
 *     responses:
 *       200:
 *         description: Service updated successfully
 */

/**
 * @swagger
 * /api/v1/service/status-update/{id}:
 *   patch:
 *     summary: Update the payment status of an existing service
 *     tags: [Service]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Service ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *            type: object
 *            properties:
 *              status:
 *                type: integer
 *                description: Payment status (0 for unpaid, 1 for paid)
 *     responses:
 *       200:
 *         description: Service updated successfully
 */

/**
 * @swagger
 * /api/v1/service/get-all-service:
 *   get:
 *     summary: Get all services
 *     tags: [Service]
 *     responses:
 *       200:
 *         description: List of services
 */

/**
 * @swagger
 * /api/v1/service/get-by-id/{id}:
 *   get:
 *     summary: Get a service by ID
 *     tags: [Service]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Service ID
 *     responses:
 *       200:
 *         description: Service found
 *       404:
 *         description: Service not found
 */

/**
 * @swagger
 * /api/v1/service/get-by-client-id/{clientId}:
 *   get:
 *     summary: Get a service by client ID
 *     tags: [Service]
 *     parameters:
 *       - in: path
 *         name: clientId
 *         required: true
 *         schema:
 *           type: integer
 *         description: Client ID
 *     responses:
 *       200:
 *         description: Service found
 *       404:
 *         description: Service not found
 */

/**
 * @swagger
 * /api/v1/service/payment-filter/{status}:
 *   get:
 *     summary: Filter services by payment status
 *     tags: [Service]
 *     parameters:
 *       - in: path
 *         name: status
 *         required: true
 *         schema:
 *           type: integer
 *           enum: [0, 1, 2, 3]
 *         description: Payment status (0 = unpaid, 1 = paid, 2 = partially paid, 3 = renewal)
 *     responses:
 *       200:
 *         description: List of filtered services
 *       400:
 *         description: Invalid payment status value
 */


/**
 * @swagger
 * /api/v1/service/delete-service/{id}:
 *   patch:
 *     summary: Soft delete a service by ID
 *     tags: [Service]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Service ID
 *     responses:
 *       200:
 *         description: Service deleted
 */



/**
 * @swagger
 * /api/v1/service/due-payment/{service_id}:
 *   post:
 *     summary: Record a due payment for a service
 *     description: Adds a new due payment entry for a specific service. Updates service totals only if payment is marked as successful.
 *     tags: [Service]
 *     parameters:
 *       - in: path
 *         name: service_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the service for which due payment is being made
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - user_id
 *               - invoice_id
 *               - client_id
 *               - paid_amount
 *               - payment_date
 *               - payment_method
 *               - payment_status
 *               - followup_date
 *             properties:
 *               user_id:
 *                 type: integer
 *                 example: 102
 *               invoice_id:
 *                 type: integer
 *                 example: 5
 *               client_id:
 *                 type: integer
 *                 example: 24
 *               paid_amount:
 *                 type: number
 *                 format: float
 *                 example: 1000.00
 *               payment_date:
 *                 type: string
 *                 format: date
 *                 example: "2025-06-11"
 *               payment_method:
 *                 type: string
 *                 example: "UPI"
 *               payment_status:
 *                 type: integer
 *                 example: 2
 *               followup_date:
 *                 type: string
 *                 format: date
 *                 example: "2025-06-11"
 *               notes:
 *                 type: string
 *                 example: "EMI payment for June"
 *     responses:
 *       200:
 *         description: EMI payment recorded successfully
 *       404:
 *         description: Invoice not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/v1/service/upcoming-payment-summary:
 *   get:
 *     summary: Get all upcoming payment due service
 *     tags: [Service]
 *     parameters:
 *       - in: query
 *         name: days
 *         schema:
 *           type: number
 *           description: number for next forward days 
 *     responses:
 *       200:
 *         description: List of upcoming payment due services
 *       404:
 *         description: No upcoming payments found
 */

/**
 * @swagger
 * /api/v1/service/get-service-payment-history-clientId-serviceId/{client_id}/{service_id}:
 *   get:
 *     summary: Get service_history payment through client_id and service_id
 *     tags: [Service]
 *     parameters:
 *       - in: path
 *         name: client_id
 *         required: true
 *         schema:
 *           type: string
 *         description: Client Id
 *       - in: path
 *         name: service_id
 *         required: true
 *         schema:
 *           type: string
 *         description: Service ID
 *     responses:
 *       200:
 *         description: Invoice data
 *       404:
 *         description: Invoice not found
 */

/**
 * @swagger
 * /api/v1/service/get-service-payment-history-serviceId-id/{service_id}/{id}:
 *   get:
 *     summary: Get service payment history by ID
 *     tags: [Service]
 *     parameters:
 *       - in: path
 *         name: service_id
 *         required: true
 *         schema:
 *           type: string
 *         description: Service Id
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Service ID
 *     responses:
 *       200:
 *         description: Service data
 *       404:
 *         description: Service not found
 */