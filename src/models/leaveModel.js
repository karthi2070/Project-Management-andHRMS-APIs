const pool = require("../config/db");

const EmployeeLeaveModel = {
  async createLeave(data) {
    const sql = `INSERT INTO user_id,employee_leave_tbl (employee_id, leave_type, start_date, end_date,reason ) VALUES (?, ?, ?, ?, ?,?)`;
    const values = [
      data.user_id,
      data.employee_id,
      data.leave_type,
      data.start_date,
      data.end_date,data.reason
    ];
    const [result] = await pool.query(sql, values);
    return { id: result.insertId, ...data };
  },

  async getAllLeaves() {
    const sql = `SELECT * FROM employee_leave_tbl WHERE is_deleted = 0`;
    const [result] = await pool.query(sql);
    return result;
  },
  async getemployeeLeaves(id,is_applicable=0) {
    let sql = `SELECT * FROM employee_leave_tbl WHERE user_id=? AND is_deleted = 0`;
    const value =[id];
    if(is_applicable !== null && is_applicable !== undefined){
      sql +=` AND is_applicable =?`
      value.push(is_applicable)
    }
    const [result] = await pool.query(sql,value);
    return result;
  },
  async getLeaveById(id) {
    const sql = `SELECT * FROM employee_leave_tbl WHERE id = ? AND is_deleted = 0`;
    const [result] = await pool.query(sql, [id]);
    return result[0];
  },

  async updateLeave(id, data) {
    const sql = `UPDATE employee_leave_tbl SET user_id =?,employee_id=?, leave_type=?, start_date=?, end_date=?, reason=? WHERE id=?`;
    const values = [
      data.user_id,data.employee_id,
      data.leave_type,
      data.start_date,
      data.end_date,
      data.reason,
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

  async updateIsApplicable(id,is_applicable,reason) {
    const sql = `UPDATE employee_leave_tbl SET is_applicable = ?, reason = ? WHERE id = ? AND is_deleted = 0 `; // 1 leave Applicable 2-reject
    const [result] = await pool.query(sql, [is_applicable,reason,id]);
    return result;
  }
};

module.exports = EmployeeLeaveModel;