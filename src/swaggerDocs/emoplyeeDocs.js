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
 *         - user_id
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
 *         - education    
 *         - address
 *         - city
 *         - state
 *         - pincode
 *       properties:
 *         user_id:
 *           type: integer
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
 *         status:
 *           type: string
 *         status_reson:
 *           type: string
 *         status_desc:
 *           type: string
 *         relieving_date:
 *           type: string
 *         pan:
 *           type: string
 *         aadhar:
 *           type: string
 *         education:
 *           type: string    
 *         address:
 *           type: string
 *         city:
 *           type: string
 *         state:
 *           type: string
 *         pincode:
 *           type: string
 *         p_address:
 *           type: string
 *         p_city:
 *           type: string
 *         p_state:
 *           type: string
 *         p_pincode:
 *           type: string
 *         emergency_name:
 *           type: string
 *         emergency_phone:
 *           type: string
 *         emergency_relation:
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
 *         description: Employee relieved successfully
 *       404:
 *         description: Employee not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/v1/employees/relieving-empolyee/{id}:
 *   put:
 *     summary: Relieve an employee
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
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *               status_reson:
 *                 type: string
 *               status_desc:
 *                 type: string
 *               relieving_date:
 *                 type: string
 *     responses:
 *       200:
 *         description: Employee updated
 *       404:
 *         description: Employee not found
 *       500:
 *         description: Internal server error
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
 * /api/v1/employee/get-by-empid/{employee_id}:
 *   get:
 *     summary: Get an employee by employee_id
 *     tags:
 *       - Employee
 *     parameters:
 *       - in: path
 *         name: employee_id
 *         required: true
 *         description: The unique employee ID (e.g., EMP0001)
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully retrieved the employee data
 *       404:
 *         description: Employee not found
 *       500:
 *         description: Internal server error
 */


/**
 * @swagger
 * /api/v1/employees/get-empolyee-pkid/{id}:
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
 * /api/v1/employees/get-empolyee-user-id/{user_id}:
 *   get:
 *     summary: Get employee by user ID
 *     tags: [Employee]
 *     parameters:
 *       - in: path
 *         name: user_id
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

/**
 * @swagger
 * /api/v1/employees/get-empolyee-sort:
 *   get:
 *     summary: Retrieve a list of employees sorted by a specified field.
 *     description: Returns all non-deleted employees sorted in ascending order by the given field.
 *     tags: [Employee]
 *     parameters:
 *       - in: query
 *         name: field
 *         schema:
 *           type: string
 *         required: true
 *         description: The field name to sort employees by.
 *     responses:
 *       200:
 *         description: A list of sorted employees.
 *       400:
 *         description: Invalid field parameter.
 *       500:
 *         description: Server error.
 */

/**
 * @swagger
 * /api/v1/employees/update-empolyee-status/{id} :
 *   patch:
 *     summary: Update the status of an employee
 *     description: Updates the status of an employee by their ID, only if the employee is not deleted.
 *     tags: [Employee]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *                 description: The ID of the employee.
 *                 example: 123
 *               status:
 *                 type: string
 *                 description: The new status for the employee.
 *                 example: "active"
 *     responses:
 *       200:
 *         description: Employee status updated successfully.
 *       400:
 *         description: Invalid input data.
 *       404:
 *         description: Employee not found or already deleted.
 *       500:
 *         description: Internal server error.
 */
