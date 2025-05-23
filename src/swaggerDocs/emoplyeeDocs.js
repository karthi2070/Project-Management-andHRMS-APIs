/**
 * @swagger
 * tags:
 *   name: Employee
 *   description: API for managing emplolyee details
 */
/**
 * @swagger
 * components:
 *   schemas:
 *     Employee:
 *       type: object
 *       required:
 *         - name
 *         - phone
 *         - mail
 *         - dob
 *         - doj
 *         - department
 *         - desdination
 *         - salary
 *         - pan
 *         - aadgar
 *         - equcation
 *         - addres
 *       properties:
 *         name:
 *           type: string
 *         phone:
 *           type: string
 *         dob:
 *           type: string
 *           format: date
 *         doj:
 *           type: string
 *           format: date
 *         department:
 *           type: string
 *         desdination:
 *           type: string
 *         salary:
 *           type: number
 *         pan:
 *           type: string
 *         aadgar:
 *           type: string
 *         equcation:
 *           type: string
 *         addres:
 *           type: string
 */

/**
 * @swagger
 * /api/v1/employees/create-empolyee :
 *   post:
 *     summary: Create a new employee
 *     tags: [Employee]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Employee'
 *     responses:
 *       201:
 *         description: Employee created
 */


/**
 * @swagger
 * /api/v1/employees/update-empolyee/{id}:
 *   put:
 *     summary: Update an employee
 *     tags: [Employee]
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
 *             $ref: '#/components/schemas/Employee'
 *     responses:
 *       200:
 *         description: Employee updated
 */


/**
 * @swagger
 * /api/v1/employees/get-empolyee-list :
 *   get:
 *     summary: Get all employees
 *     tags: [Employee]
 *     responses:
 *       200:
 *         description: List of employees
 */


/**
 * @swagger
 * /api/v1/employees/get-empolyee-id/{id}:
 *   get:
 *     summary: Get employee by ID
 *     tags: [Employee]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Employee data
 */


/**
 * @swagger
 * /api/v1/employees/delete-empolyee/{id}:
 *   patch:
 *     summary: Soft delete an employee
 *     tags: [Employee]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Employee soft-deleted
 */



