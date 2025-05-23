const pool = require('../config/db');

const EmployeeModel = {
    async createEmployee(data) {
        try {
            const sql = `INSERT INTO employee_tbl (name, phone,mail, dob, doj, department, designation, salary, pan, aadhar, education, address)
                         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ? , ?)`;
            const [result] = await pool.query(sql, Object.values(data));
            return { id: result.insertId, ...data };
        } catch (error) {
            throw error;
        }
    },

    async getAllEmployees() {
        try {
            const sql = `SELECT * FROM employee_tbl WHERE is_deleted = 0`;
            const [employees] = await pool.query(sql);
            return employees;
        } catch (error) {
            throw error;
        }
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
            const sql = `UPDATE employee_tbl SET name=?, phone=?,mail=?, dob=?, doj=?, department=?, designation=?, salary=?, pan=?, aadhar=?, education=?, address=? 
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
