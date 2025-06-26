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
 *         client_id:
 *           type: integer
 *         service_name:
 *           type: string
 *         from_date:
 *           type: string
 *           format: date
 *         to_date:
 *           type: string
 *           format: date
 *         last_renewal_date:
 *           type: string
 *           format: date
 *         amount:
 *           type: number
 *           format: float
 *         payment_status:
 *           type: integer
 *           default: 0
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
