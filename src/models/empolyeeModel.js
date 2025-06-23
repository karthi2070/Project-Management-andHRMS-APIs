const pool = require('../config/db');
 
 const EmployeeModel = {
    async getEmployeeCount() {
        const sql = `SELECT COUNT(*) AS count FROM employee_tbl`;
        const [rows] = await pool.query(sql);
        return rows[0].count;
    },

    async createEmployee(data) {
        const {
            user_id,name, employee_id, phone, mail, dob, doj, department, designation, salary, status,
            status_reson, status_desc, pan, aadhar, education, address, city, state,
            pincode, p_address, p_city, p_state, p_pincode
        } = data;

        const sql = `
            INSERT INTO employee_tbl (
                user_id,name, employee_id, phone, mail, dob, doj, department, designation, salary, status,
                status_reson, status_desc, pan, aadhar, education, address, city, state,
                pincode, p_address, p_city, p_state, p_pincode
            ) VALUES (?,?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;

        const values = [
            user_id,name, employee_id, phone, mail, dob, doj, department, designation, salary, status,
            status_reson, status_desc, pan, aadhar, education, address, city, state,
            pincode, p_address, p_city, p_state, p_pincode
        ];

        const [result] = await pool.query(sql, values);
        return { id: result.insertId, ...data };
    },
//id, name, employee_id, phone, mail, dob, doj, department, designation, salary, status, status_reson, status_desc, pan, aadhar, education, address, city, state, pincode, p_address, p_city, p_state, p_pincode, is_deleted, created_at, updated_at
     async getAllEmployees() {
         try {
             const sql = `SELECT * FROM employee_tbl WHERE is_deleted = 0`;
             const [employees] = await pool.query(sql);
             return employees;
         } catch (error) {
             throw error;
         }
     },
    async getEmployeeByEmpId(employee_id) {
        const query = `SELECT * FROM employee_tbl WHERE is_deleted = 0 AND employee_id = ?`;
        const [rows] = await pool.query(query, [employee_id]);
        return rows[0] || null; // returns single object or null
    },
    async getEmployeeByUserId(user_id) {
        const query = `SELECT * FROM employee_tbl WHERE is_deleted = 0 AND user_id = ?`;
        const [rows] = await pool.query(query, [user_id]);
        return rows[0] || null; // returns single object or null
    },
     async getEmployeeById(id) {
         try {
             const sql = `SELECT * FROM employee_tbl WHERE id = ? AND is_deleted = 0`;
             const [employees] = await pool.query(sql, [id]);
             return employees[0] || null;
         } catch (error) {
             throw error;
         }
     },
 
     async updateEmployee(id, data) {
         try {
             const sql = `UPDATE employee_tbl SET user_id=?, name=?, phone=?,mail=?, dob=?, doj=?, department=?, designation=?, salary=?, pan=?, aadhar=?, education=?, address=? 
                          WHERE id = ? AND is_deleted = 0`;
             await pool.query(sql, [...Object.values(data), id]);
             return { id, ...data };
         } catch (error) {
             throw error;
         }
     },
 
     async softDeleteEmployee(id) {
         try {
             const sql = `UPDATE employee_tbl SET is_deleted = 1 WHERE id = ?`;
             await pool.query(sql, [id]);
             return { id, deleted: true };
         } catch (error) {
             throw error;
         }
     }
 };
 
 module.exports = EmployeeModel;