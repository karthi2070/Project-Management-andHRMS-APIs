/**
 * @swagger
 * tags:
 *     name: Templates
 *     description: APIs for managing projects
 */

/**
 * @swagger
 * /templates/payslip/get-by-userid:
 *   get:
 *     summary: Get total working days per employee
 *     tags: [Templates]
 *     parameters:
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
 *         name: id
 *         schema:
 *           type: integer
 *           description: Category ID to filter expenses user id
 *     responses:
 *       200:
 *         description: A list of employees with total working days
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   employee_id:
 *                     type: string
 *                   employee_name:
 *                     type: string
 *                   total_working_days:
 *                     type: integer
 *       500:
 *         description: Server error
 */


/**
 * @swagger
 * /templates/salary-template:
 *   post:
 *     summary: Create a salary template with components
 *     tags: [Templates]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - template
 *               - components
 *             properties:
 *               template:
 *                 type: object
 *                 required:
 *                   - template_name
 *                   - total_percentage
 *                 properties:
 *                   template_name:
 *                     type: string
 *                     example: software_engineer
 *                   total_percentage:
 *                     type: integer
 *                     example: 100
 *               components:
 *                 type: array
 *                 items:
 *                   type: object
 *                   required:
 *                     - Comp_name
 *                     - Type
 *                     - Percentage
 *                     - Applicable
 *                   properties:
 *                     Comp_name:
 *                       type: string
 *                       example: basic
 *                     Type:
 *                       type: integer
 *                       example: 1
 *                     Percentage:
 *                       type: integer
 *                       example: 80
 *                     Applicable:
 *                       type: integer
 *                       example: 1
 *     responses:
 *       201:
 *         description: Template and components created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Template and components created successfully
 *                 template_id:
 *                   type: integer
 *                   example: 12
 *                 total_components:
 *                   type: integer
 *                   example: 2
 *       400:
 *         description: Invalid request structure
 *       500:
 *         description: Internal server error
 */


/**
 * @swagger
 * /templates/get-by-id/{id}:
 *   get:
 *     summary: Get template by ID
 *     tags: [Templates]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: Template found
 *       404:
 *         description: Template not found
 */
/**
 * @swagger
 * /templates/get-by-id-temp-comp/{id}:
 *   get:
 *     summary: Get template by ID
 *     tags: [Templates]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: Template found
 *       404:
 *         description: Template not found
 */
/**
 * @swagger
 * /templates/create-template:
 *   post:
 *     summary: Create a new template
 *     tags: [Templates]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               template_name: { type: string }
 *               total_percentage: { type: integer }
 *     responses:
 *       201:
 *         description: Template created
 */

/**
 * @swagger
 * /templates/update-template/{id}:
 *   put:
 *     summary: Update template
 *     tags: [Templates]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               template_name: { type: string }
 *               total_percentage: { type: integer }
 *     responses:
 *       200:
 *         description: Template updated
 */

/**
 * @swagger
 * /templates/delete-template/{id}:
 *   patch:
 *     summary: Soft delete a template
 *     tags: [Templates]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: Template soft-deleted
 */

/**
 * @swagger
 * tags:
 *     name: Components
 *     description: APIs for managing projects
 */

/**
 * @swagger
 * /componets/get-by-id/{template_id}:
 *   get:
 *     summary: Get components by template ID
 *     tags: [Components]
 *     parameters:
 *       - in: path
 *         name: template_id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: Components list
 */

/**
 * @swagger
 * /compoents/create-compoents:
 *   post:
 *     summary: Insert components
 *     tags: [Components]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               components:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     template_id: { type: integer }
 *                     comp_name: { type: string }
 *                     type: { type: integer }
 *                     percentage: { type: integer }
 *                     applicable: { type: integer }
 *     responses:
 *       201:
 *         description: Components inserted
 */

/**
 * @swagger
 * /componts/update-compoents/{id}:
 *   put:
 *     summary: Update a component
 *     tags: [Components]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               comp_name: { type: string }
 *               type: { type: integer }
 *               percentage: { type: integer }
 *               applicable: { type: integer }
 *     responses:
 *       200:
 *         description: Component updated
 */

/**
 * @swagger
 * /componts/delete-compoents/{id}:
 *   patch:
 *     summary: Soft delete a component
 *     tags: [Components]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: Component soft-deleted
 */
