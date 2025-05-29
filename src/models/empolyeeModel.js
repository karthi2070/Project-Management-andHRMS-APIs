const pool = require('../config/db');

const EmployeeModel = {
    async createEmployee(data) {
     
            const sql = `INSERT INTO employee_tbl (name, phone,mail, dob, doj, department, designation, salary, status, status_reson, status_desc,  pan, aadhar, education, address, city , state ,pincode)
                         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ? , ?, ?, ?, ?, ?, ?, ?)`;
         values =[data.name, data.phone, data.mail, data.dob, data.doj, data.department, data.designation, data.salary,data.status,data.status_reson, data.status_desc,
                 data.pan,data.aadhar, data.education, data.address, data.city, data.state, data.pincode];
                 console.log(values);
            const [result] = await pool.query(sql, values);
            return { id: result.insertId, ...data };
      
    },

    async getAllEmployees() {
       
            const sql = `SELECT * FROM employee_tbl WHERE is_deleted = 0`;
            const [employees] = await pool.query(sql);
            return employees;

    },

    async getEmployeeById(id) {
   
            const sql = `SELECT * FROM employee_tbl WHERE id = ? AND is_deleted = 0`;
            const [employees] = await pool.query(sql, [id]);
            return employees[0] || null;

    },

    async updateEmployee(id, data) {
    
            const sql = `UPDATE employee_tbl SET name=?, phone=?,mail=?, dob=?, doj=?, department=?, designation=?, salary=?, pan=?, aadhar=?, education=?, address=? ,
                         city =? , state =? ,pincode =? WHERE id = ? AND is_deleted = 0`;
           const [result] = await pool.query(sql, [...Object.values(data), id]);
            return result.affectedRows > 0 ? { id, ...data } : null;

    },

    async softDeleteEmployee(id) {
   
            const sql = `UPDATE employee_tbl SET is_deleted = 1 WHERE id = ?`;
            await pool.query(sql, [id]);
            return { id, deleted: true };
     
    },
        async getFiltereddepart(depart) {
        const sql = `SELECT * FROM employee_tbl WHERE is_deleted = 0 and department = ?`;
        const [result] = await pool.query(sql, [depart]);
        return result;

    },

    async employeeStatus (id, status) {
        const sql = `UPDATE employee_tbl SET status = ? WHERE id = ? AND is_deleted = 0`;
       const [result] = await pool.query(sql, [status, id]);
        return result.affectedRows > 0 ? { id, status } : null;
    },

    async seachemployee (name) {
        const sql = `SELECT * FROM employee_tbl WHERE is_deleted = 0 and name LIKE ?`;
        const [result] = await pool.query(sql, [`%${name}%`]);
        return result;
    },

    async getSortByEmployee(field) {
    const allowedFields = ['name', 'salary', 'department','dob']; // Define allowed column names
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

            const sql = `SELECT * FROM bank_details_tbl WHERE id = ? AND is_deleted = 0`;
            const [banks] = await pool.query(sql, [id]);
            return banks[0] || null;
    
    },

    async updateBankDetails(id, data) {

            const sql = `UPDATE bank_details_tbl SET acc_holder_name=?, account_number= ?,  ifsc_code= ?, bank_name=? 
                         WHERE id = ? AND is_deleted = 0`;
            await pool.query(sql, [...Object.values(data), id]);
            return { id, ...data };

    },

    async softDeleteBankDetails(id) {

            const sql = `UPDATE bank_details_tbl SET is_deleted = 1 WHERE id = ?`;
            await pool.query(sql, [id]);
            return { id, deleted: true };

    },


};



module.exports = EmployeeModel;
