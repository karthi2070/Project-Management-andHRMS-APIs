/**
 * @swagger
 * tags:
 *     name: Templates
 *     description: APIs for managing projects
 */

/**
 * @swagger
 * /payslip/genpayslip:
 *   post:
 *     summary: Generate payslip and update employee salary/template
 *     description: Receives salary, template_id, and user_id. Updates employee details and returns generated payslip.
 *     tags: [Templates]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - salary
 *               - template_id
 *               - user_id
 *             properties:
 *               user_id:
 *                 type: integer
 *                 example: 1
 *               salary:
 *                 type: number
 *                 example: 50000
 *               salary_template_id:
 *                 type: integer
 *                 example: 2
 *               start_date:
 *                  type: string
 *                  format: date
 *                  example: 2025-06-01
 *               end_date:
 *                  type: string
 *                  format: date
 *                  example: 2025-06-30
 *     responses:
 *       200:
 *         description: Payslip generated successfully
 *       500:
 *         description: Server error TypeError Cannot read properties of undefined (reading 'salary')  
 *                      if throw this error check you have uesr id and user id map in to employee_tbl and employee_tbl id shoud be map in to bank_details _tbl
 *                       if you follow the flow you wont get this error TypeError Cannot read properties of undefined (reading 'salary')  
 */

/**
 * @swagger
 * /templates/payslip/get-by-userid:
 *   get:
 *     summary: Get total working days per employee
 *     tags: [Templates]
 *     parameters:
 *       - in: query
 *         name: user_id
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: A list of employees payslips
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /templates/payslip/get-by-userid-month:
 *   get:
 *     summary: Get total working days per employee
 *     tags: [Templates]
 *     parameters:
 *       - in: query
 *         name: user_id
 *         schema:
 *           type: number
 *       - in: query
 *         name: month
 *         schema:
 *           type: number
 *       - in: query
 *         name: year
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: A list of employees payslip
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
 *                     - Component_name
 *                     - Component_type
 *                     - Component_value
 *                     - amount_type
 *                   properties:
 *                     Component_name:
 *                       type: string
 *                       example: basic
 *                     Component_type:
 *                       type: integer
 *                       example: 1
 *                     Component_value:
 *                       type: integer
 *                       example: 40
 *                     amount_type:
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
 * /templates/get-all:
 *   get:
 *     summary: Get template by ID
 *     tags: [Templates]
 *     responses:
 *       200:
 *         description: Template found
 *       404:
 *         description: Template not found
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
 * /components/get-by-id/{template_id}:
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
 * /components/create-components:
 *   post:
 *     summary: Insert one or more salary components
 *     description: Insert a list of salary components (or a single component) associated with a salary template.
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
 *                   required:
 *                     - template_id 
 *                     - Component_name
 *                     - Component_type
 *                     - Component_value
 *                     - amount_type
 *                   properties:
 *                     template_id:
 *                       type: integer
 *                       example: 1
 *                     Component_name:
 *                       type: string
 *                       example: basic
 *                     Component_type:
 *                       type: integer
 *                       example: 1
 *                       description: 1 = Earning, 2 = Deduction
 *                     Component_value:
 *                       type: number
 *                       example: 80
 *                     amount_type:
 *                       type: integer
 *                       example: 1
 *                       description: 1 = Yes, 0 = No
 *     responses:
 *       201:
 *         description: Components inserted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Components inserted successfully
 *                 affectedRows:
 *                   type: integer
 *                   example: 2
 *       400:
 *         description: Bad request due to invalid or missing fields
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /components/update-components/{id}:
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
 * /components/delete-components/{id}:
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
