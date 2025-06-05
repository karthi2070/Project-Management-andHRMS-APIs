const pool = require("../config/db");

const EmployeeLeaveModel = {
  async createLeave(data) {
    const sql = `INSERT INTO employee_leave_tbl (employee_id, leave_type, start_date, end_date,reson ) VALUES (?, ?, ?, ?, ?)`;
    const values = [
      data.employee_id,
      data.leave_type,
      data.start_date,
      data.end_date,data.reson
    ];
    const [result] = await pool.query(sql, values);
    return { id: result.insertId, ...data };
  },

  async getAllLeaves() {
    const sql = `SELECT * FROM employee_leave_tbl WHERE is_deleted = 0`;
    const [result] = await pool.query(sql);
    return result;
  },

  async getLeaveById(id) {
    const sql = `SELECT * FROM employee_leave_tbl WHERE id = ? AND is_deleted = 0`;
    const [result] = await pool.query(sql, [id]);
    return result[0];
  },

  async updateLeave(id, data) {
    const sql = `UPDATE employee_leave_tbl SET employee_id=?, leave_type=?, start_date=?, end_date=?, reson=? WHERE id=?`;
    const values = [
      data.employee_id,
      data.leave_type,
      data.start_date,
      data.end_date,
      data.reson,
      id
    ];
    const [result] = await pool.query(sql, values);
    return result;
  },

  async softDeleteLeave(id) {
    const sql = `UPDATE employee_leave_tbl SET is_deleted = 1 WHERE id = ?`;
    const [result] = await pool.query(sql, [id]);
    return result;
  },

  async updateIsApplicable(id) {
    const sql = `UPDATE employee_leave_tbl SET is_applicable = 1 WHERE id = ?`;
    const [result] = await pool.query(sql, [id]);
    return result;
  }
};

module.exports = EmployeeLeaveModel;