/**
 * @swagger
 * tags:
 *   name: Attendance
 *   description: API for managing Attendance
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Attendance:
 *       type: object
 *       required:
 *         - employee_name
 * 
 *         - login
 *         - logout
 *       properties:
 *         employee_id:
 *          type: integer
 *         employee_name:
 *           type: string
 *         department:
 *           type: string
 *         date:
 *          type: string
 *          format: date
 *         login:
 *           type: string
 *           format: date-time
 *         logout:
 *           type: string
 *           format: date-time
 */

/**
 * @swagger
 * /api/v1/attendance/create-attendance:
 *   post:
 *     summary: Create a new attendance record
 *     tags: [Attendance]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Attendance'
 *     responses:
 *       201:
 *         description: Attendance created successfully
 */

/**
 * @swagger
 * /api/v1/attendance/get-attendance-list :
 *   get:
 *     summary: Get all attendance records
 *     tags: [Attendance]
 *     responses:
 *       200:
 *         description: List of attendance records
 */

/**
 * @swagger
 * /api/v1/attendance/get-attendance-id/{id}:
 *   get:
 *     summary: Get attendance by ID
 *     tags: [Attendance]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Attendance record ID
 *     responses:
 *       200:
 *         description: Attendance record
 *       404:
 *         description: Attendance not found
 */

/**
 * @swagger
 * /api/v1/attendance/get-attendance-emp-id/{id}:
 *   get:
 *     summary: Get attendance by employee id
 *     tags: [Attendance]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Name of the employee
 *     responses:
 *       200:
 *         description: Attendance records for the employee
 *       404:
 *         description: Employee not found
 */

/**
 * @swagger
 * /api/v1/attendance/update-attendance/{id}:
 *   put:
 *     summary: Update attendance by ID
 *     tags: [Attendance]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Attendance record ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Attendance'
 *     responses:
 *       200:
 *         description: Attendance updated successfully
 *       404:
 *         description: Record not found
 */

/**
 * @swagger
 * /api/v1/attendance/filter-by-date:
 *   get:
 *     summary: Get attendance records by login date
 *     tags: [Attendance]
 *     parameters:
 *       - in: query
 *         name: date
 *         schema:
 *           type: string
 *           format: date
 *         required: true
 *         description: Date to filter attendance records by (YYYY-MM-DD)
 *     responses:
 *       200:
 *         description: Attendance records on the given date
 *       404:
 *         description: No records found
 */

