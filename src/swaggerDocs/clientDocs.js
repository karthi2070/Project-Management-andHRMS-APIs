
/**
 * @swagger
 * tags:
 *   name: Client
 *   description: API for managing Client Details 
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Client:
 *       type: object
 *       properties:
 *         user_id:
 *           type: integer
 *         name:
 *           type: string
 *           description: Client's name
 *         company_name:
 *           type: string
 *           description: Client's company name
 *         mail: 
 *           type: string
 *           format: email
 *           unique: true
 *           description: Client's email address
 *         phone1:
 *           type: string
 *           description: Primary phone number
 *         phone2:
 *           type: string
 *           description: Secondary phone number
 *         phone3:
 *           type: string
 *           description: Additional phone number
 *         gst_num:
 *           type: string
 *           description: GST number of the client
 *         address:
 *           type: string
 *           description: Client's address
 *         city:
 *           type: string
 *           description: Client's city 
 *         state:
 *           type: string
 *           description: Client's state 
 *         pincode:
 *           type: string
 *           description: Client's pincode
 */

/**
 * @swagger
 * /api/v1/client/get-all-clients-details/{client_id}:
 *   get:
 *     summary: Get a client's dashboard details by ID
 *     tags: [Client]
 *     parameters:
 *       - in: path
 *         name: client_id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Client found
 *       404:
 *         description: Client not found
 */

/**
 * @swagger
 * /api/v1/client/create-client:
 *   post:
 *     summary: Create a new client
 *     tags: [Client]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Client'
 *     responses:
 *       201:
 *         description: Client created successfully
 */

/**
 * @swagger
 * /api/v1/client/get-clients-list:
 *   get:
 *     summary: Get all clients
 *     tags: [Client]
 *     responses:
 *       200:
 *         description: List of all clients
 */

/**
 * @swagger
 * /api/v1/client/client-dashboard-clientId/{id}:
 *   get:
 *     summary: Get a client's dashboard details by ID
 *     tags: [Client]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Client found
 *       404:
 *         description: Client not found
 */

/**
 * @swagger
 * /api/v1/client/client-dashboard:
 *   get:
 *     summary: Get  clients dash board
 *     tags: [Client]
 *     parameters:
 *       - in: query
 *         name: start_date
 *         schema:
 *           type: string
 *           format: date
 *       - in: query
 *         name: end_date
 *         schema:
 *           type: string
 *           format: date
 *     responses:
 *       200:
 *         description: Client dashboard data
 */

/**
 * @swagger
 * /api/v1/client/get-client-id/{id}:
 *   get:
 *     summary: Get a client by ID
 *     tags: [Client]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Client found
 *       404:
 *         description: Client not found
 */

/**
 * @swagger
 * /api/v1/client/update-client/{id}:
 *   put:
 *     summary: Update a client
 *     tags: [Client]
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
 *             $ref: '#/components/schemas/Client'
 *     responses:
 *       200:
 *         description: Client updated successfully
 */

/**
 * @swagger
 * /api/v1/client/delete-client/{id}:
 *   patch:
 *     summary: Soft delete a client
 *     tags: [Client]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Client soft-deleted successfully
 */


