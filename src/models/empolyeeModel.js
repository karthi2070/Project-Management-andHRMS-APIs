const pool = require('../config/db');

const EmployeeModel = {

    async getEmployeeCount() {
        const sql = `SELECT COUNT(*) AS count FROM employee_tbl`;
        const [rows] = await pool.query(sql);
        return rows[0].count;
    },

    async createEmployee(data) {
        const {
            user_id, name, employee_id, phone, mail, dob, doj, department, designation, salary, status,
            status_reason = null, status_desc = null, relieving_date = null, pan, aadhar, education,
            address, city, state, pincode, p_address, p_city, p_state, p_pincode,
            emergency_name, emergency_phone, emergency_relation
        } = data;

        const sql = `
    INSERT INTO employee_tbl (
      user_id, name, employee_id, phone, mail, dob, doj, department, designation, salary, status,
      status_reason, status_desc, relieving_date, pan, aadhar, education, address, city, state,
      pincode, p_address, p_city, p_state, p_pincode, emergency_name, emergency_phone, emergency_relation
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

        const values = [
            user_id, name, employee_id, phone, mail, dob, doj, department, designation, salary, status,
            status_reason, status_desc, relieving_date, pan, aadhar, education, address, city, state,
            pincode, p_address, p_city, p_state, p_pincode, emergency_name, emergency_phone, emergency_relation
        ];

        const [result] = await pool.query(sql, values);
        return { id: result.insertId };

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
    async getAllEmployeesdash() {
        try {
            const sql = `SELECT name, employee_id, mail,department,status FROM employee_tbl WHERE is_deleted = 0`;
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
        console.log(data)

        const sql = `UPDATE employee_tbl SET user_id=?, name=?, phone=?,mail=?, dob=?, doj=?, department=?, designation=?, salary=?,
             pan=?, aadhar=?, education=?, address=?, city=?, state=?, pincode=?,
             p_address=?, p_city=?, p_state=?, p_pincode=?,emergency_name=?,emergency_phone=?,emergency_relation=?
                          WHERE id = ? AND is_deleted = 0`;
        const values = [
            data.user_id, data.name, data.phone, data.mail, data.dob, data.doj, data.department, data.designation, data.salary,
            data.pan, data.aadhar, data.education, data.address, data.city, data.state, data.pincode,
            data.p_address, data.p_city, data.p_state, data.p_pincode, data.emergency_name, data.emergency_phone, data.emergency_relation, id]
        const [result] = await pool.query(sql, values);
        console.log(result)
        return result.affectedRows > 0 ? { id, ...data } : null;
    },
    async relievingEmployee(id, status, status_reason, status_desc, relieving_date) {

        const sql = `
        UPDATE employee_tbl 
        SET status = ?, status_reason = ?, status_desc = ?, relieving_date = ?
        WHERE id = ? AND is_deleted = 0`;

        const [result] = await pool.query(sql, [status, status_reason, status_desc, relieving_date, id]);
        return result.affectedRows > 0 ? { id, status, status_reason, status_desc, relieving_date } : null;
    },

    async softDeleteEmployee(id) {
        try {
            const sql = `UPDATE employee_tbl SET is_deleted = 1 WHERE id = ?`;
            await pool.query(sql, [id]);
            return { id, deleted: true };
        } catch (error) {
            throw error;
        }
    },

    async getFiltereddepart(depart) {
        const sql = `SELECT * FROM employee_tbl WHERE is_deleted = 0 and department = ?`;
        const [result] = await pool.query(sql, [depart]);
        return result;

    },

    async employeeStatus(id, status) {
        const sql = `UPDATE employee_tbl SET status = ? WHERE id = ? AND is_deleted = 0`;
        const [result] = await pool.query(sql, [status, id]);
        return result.affectedRows > 0 ? { id, status } : null;
    },

    async seachemployee(name) {
        const sql = `SELECT * FROM employee_tbl WHERE is_deleted = 0 and name LIKE ?`;
        const [result] = await pool.query(sql, [`%${name}%`]);
        return result;
    },

    async getSortByEmployee(field) {
        const allowedFields = ['name', 'salary', 'department', 'dob', 'doj']; // Define allowed column names
        if (!allowedFields.includes(field)) {
            throw new Error('Invalid field for sorting');
        }

        const sql = `SELECT * FROM employee_tbl WHERE is_deleted = 0 ORDER BY ${field} ASC`;
        const [result] = await pool.query(sql);
        return result;
    },


    // Bank Details Methods
    async createBankDetails(data) {

        const sql = `INSERT INTO bank_details_tbl (employee_id, acc_holder_name,  account_number, ifsc_code, bank_name)
                         VALUES (?, ?, ?, ? , ?)`;
        const [result] = await pool.query(sql, Object.values(data));
        return { id: result.insertId, ...data };

    },

    async getAllBankDetails() {

        const sql = `SELECT * FROM bank_details_tbl WHERE is_deleted = 0`;
        const [banks] = await pool.query(sql);
        return banks;

    },

    async getBankDetailsById(id) {

        const sql = `SELECT * FROM bank_details_tbl WHERE employee_id = ? AND is_deleted = 0`;
        const [banks] = await pool.query(sql, [id]);
        return banks[0] || null;

    },

    async updateBankDetails(id, data) {

        const sql = `UPDATE bank_details_tbl SET acc_holder_name=?, account_number= ?,  ifsc_code= ?, bank_name=? 
                         WHERE employee_id = ? AND is_deleted = 0`;
        await pool.query(sql, [...Object.values(data), id]);
        return { id, ...data };

    },

    async softDeleteBankDetails(id) {

        const sql = `UPDATE bank_details_tbl SET is_deleted = 1 WHERE employee_id = ?`;
        await pool.query(sql, [id]);
        return { id, deleted: true };

    },





};

module.exports = EmployeeModel;