    /**
 * @swagger
 * tags:
 *   name: Salary Data
 *   description: Employee salary history management
 */

/**
 * @swagger
 * /payslip/get-all:
 *   get:
 *     summary: Get total working days per employee
 *     tags: [Salary Data]
 *     responses:
 *       200:
 *         description: A list of employees payslips
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /payslip/get-by-userid-month:
 *   get:
 *     summary: Get total working days per employee
 *     tags: [Salary Data]
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
 * /get-salary-history-user-id/{id}:
 *   get:
 *     summary: Get salary history by user id
 *     tags: [Salary Data]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: List of salary history
 *       500:
 *         description: Internal server error
 */  


/**
 * @swagger
 * /salary-history:
 *   post:
 *     summary: Create employee salary history
 *     tags: [Salary Data]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - user_id
 *               - employee_id
 *               - bank_details_id
 *               - salary_template_id
 *               - components
 *               - total_salary
 *               - gross_amount
 *               - deductions_amount
 *               - net_payment
 *             properties:
 *               user_id:
 *                 type: integer
 *               employee_id:
 *                 type: integer
 *               bank_details_id:
 *                 type: integer
 *               salary_template_id:
 *                 type: integer
 *               components:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     comp_name:
 *                       type: string
 *                     type:
 *                       type: integer
 *                     percentage:
 *                       type: number
 *                     salary_percentage:
 *                       type: number
 *                     applicable:
 *                       type: integer
 *               total_salary:
 *                 type: number
 *               gross_amount:
 *                 type: number
 *               deductions_amount:
 *                 type: number
 *               net_payment:
 *                 type: number
 *     responses:
 *       201:
 *         description: Salary history created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 id:
 *                   type: integer
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /salary-history-update/{id}:
 *   put:
 *     summary: Update employee salary history
 *     tags: [Salary Data]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Salary history record ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user_id:
 *                 type: integer
 *               employee_id:
 *                 type: integer
 *               bank_details_id:
 *                 type: integer
 *               salary_template_id:
 *                 type: integer
 *               components:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     comp_name:
 *                       type: string
 *                     type:
 *                       type: integer
 *                     percentage:
 *                       type: number
 *                     salary_percentage:
 *                       type: number
 *                     applicable:
 *                       type: integer
 *               total_salary:
 *                 type: number
 *               gross_amount:
 *                 type: number
 *               deductions_amount:
 *                 type: number
 *               net_payment:
 *                 type: number
 *     responses:
 *       200:
 *         description: Salary history updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 result:
 *                   type: object
 *       500:
 *         description: Server error
 */
