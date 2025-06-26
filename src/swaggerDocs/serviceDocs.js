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
