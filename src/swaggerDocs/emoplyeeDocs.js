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
 *         - employee_id
 *         - phone
 *         - mail
 *         - dob
 *         - doj
 *         - department
 *         - designation
 *         - salary
 *         - status
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
 *           example: 7
 *         name:
 *           type: string
 *           example: "Karthi Keyan"
 *         emp_role_id:
 *           type: number
 *           example: 2
 *         phone:
 *           type: string
 *           example: "9876543210"
 *         mail:
 *           type: string
 *           format: email
 *           example: "karthi@namuvi.com"
 *         dob:
 *           type: string
 *           format: date
 *           example: "1995-05-12"
 *         doj:
 *           type: string
 *           format: date
 *           example: "2021-01-01"
 *         department:
 *           type: string
 *           example: "Engineering"
 *         designation:
 *           type: string
 *           example: "Software Developer"
 *         salary:
 *           type: number
 *           example: 85000
 *         status:
 *           type: string
 *           example: "Active"
 *         status_reason:
 *           type: string
 *           nullable: true
 *           example: ""
 *         status_desc:
 *           type: string
 *           nullable: true
 *           example: ""
 *         relieving_date:
 *           type: string
 *           format: date
 *           nullable: true
 *           example: null
 *         pan:
 *           type: string
 *           example: "ABCDE1234F"
 *         aadhar:
 *           type: string
 *           example: "123456789012"
 *         education:
 *           type: string
 *           example: "B.Tech Computer Science"
 *         address:
 *           type: string
 *           example: "123 Tech Park Road"
 *         city:
 *           type: string
 *           example: "Chennai"
 *         state:
 *           type: string
 *           example: "Tamil Nadu"
 *         pincode:
 *           type: string
 *           example: "600001"
 *         p_address:
 *           type: string
 *           example: "456 Family Street"
 *         p_city:
 *           type: string
 *           example: "Salem"
 *         p_state:
 *           type: string
 *           example: "Tamil Nadu"
 *         p_pincode:
 *           type: string
 *           example: "636007"
 *         emergency_name:
 *           type: string
 *           example: "Ravi Kumar"
 *         emergency_phone:
 *           type: string
 *           example: "9876512345"
 *         emergency_relation:
 *           type: string
 *           example: "Brother"
 */


/**
 * @swagger
 * /api/v1/employee/create-empolyee :
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
 * /api/v1/employee/update-empolyee/{id}:
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
 * /api/v1/employee/relieving-empolyee/{id}:
 *   put:
 *     summary: Relieve an employee by user id
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
 *               status_reason:   
 *                 type: string
 *               status_desc:
 *                 type: string
 *               relieving_date:
 *                 type: string
 *                 format: date  
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
 * /api/v1/employee/get-empolyee-list :
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
 * /api/v1/employee/get-empolyee-pkid/{id}:
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
 * /api/v1/employee/get-empolyee-user-id/{user_id}:
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
 * /api/v1/employee/delete-empolyee/{id}:
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
 * /api/v1/employee/get-filtered-department:
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
 * /api/v1/employee/search-empolyee:
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
 * /api/v1/employee/get-empolyee-sort:
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
 * /api/v1/employee/update-empolyee-status/{id} :
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
