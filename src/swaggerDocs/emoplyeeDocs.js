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
 *         - designation
 *         - salary
 *         - pan
 *         - aadhar
 *         - equcation
 *         - address
 *         - city
 *         - state
 *         - pincode
 *       properties:
 *         name:
 *           type: string
 *         phone:
 *           type: string
 *         mail:
 *           type: string
 *         dob:
 *           type: string
 *           format: date
 *         doj:
 *           type: string
 *           format: date
 *         department:
 *           type: string
 *         designation:
 *           type: string
 *         salary:
 *           type: number
 *         pan:
 *           type: string
 *         aadhar:
 *           type: string
 *         equcation:
 *           type: string
 *         address:
 *           type: string
 *         city:
 *           type: string
 *         state:
 *           type: string
 *         pincode:
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


/**
 * @swagger
 * /api/v1/employees/get-filtered-department:
 *   get:
 *     summary: Get employees by department
 *     tags: [Employee]
 *     parameters:
 *       - in: query
 *         name: department
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of employees in the specified department
 */

/**
 * @swagger
 * /api/v1/employees/search-empolyee:
 *   get:
 *     summary: Search employees by name
 *     tags: [Employee]
 *     parameters:
 *       - in: query
 *         name: name
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of employees matching the search criteria
 */
