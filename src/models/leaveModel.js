const pool = require("../config/db");


function calculateDays(startDate, endDate) {
  const start = new Date(startDate);
  const end = new Date(endDate);
  return Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1;
}

const EmployeeLeaveModel = {
  async createLeave(data) {
    const sql = `INSERT INTO employee_leave_req_tbl (user_id, leave_type_id, start_date, end_date,reason ) VALUES ( ?, ?, ?, ?,?)`;
    const values = [
      data.user_id,
      data.leave_type_id,
      data.start_date,
      data.end_date,data.reason
    ];
    const [result] = await pool.query(sql, values);
    return { id: result.insertId, ...data };
  },

  async getAllLeaves() {
    const sql = `SELECT * FROM employee_leave_req_tbl WHERE is_deleted = 0`;
    const [result] = await pool.query(sql);
    return result;
  },
async getemployeeLeaves(userId, is_applicable) {
  const values = [userId];
  let sql = `
    SELECT * FROM employee_leave_req_tbl 
    WHERE user_id = ? AND is_deleted = 0
  `;

  // Only filter if is_applicable is 0, 1, or 2
  if ([0, 1, 2].includes(is_applicable)) {
    sql += ` AND is_applicable = ?`;
    values.push(is_applicable);
  }
  const [result] = await pool.query(sql, values);
  return result;
},
  async getLeaveById(id) {
    const sql = `SELECT * FROM employee_leave_req_tbl WHERE id = ? AND is_deleted = 0`;
    const [result] = await pool.query(sql, [id]);
    return result[0];
  },

  async updateLeave(id, data) {
    const sql = `UPDATE employee_leave_req_tbl SET user_id =?,leave_type_id=?, start_date=?, end_date=?, reason=? WHERE id=?`;
    const values = [
      data.user_id,
      data.leave_type_id,
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
  // async updateIsApplicable(id,is_applicable,reason) {
  //   const sql = `UPDATE employee_leave_tbl SET is_applicable = ?, reason = ? WHERE id = ? AND is_deleted = 0 `; // 1 leave Applicable 2-reject
  //   const [result] = await pool.query(sql, [is_applicable,reason,id]);
  //   return result;
  // },

// Utility function to calculate date difference in day
async  updateLeaveRequestStatus(id, is_applicable, reason) {
  // Fetch leave request details first
  const req = await this.getLeaveById(id)
  if (req.length === 0) throw new Error("Leave request not found");
  await pool.query(
    `UPDATE employee_leave_req_tbl 
     SET is_applicable = ?, reason = ?, updated_at = CURRENT_TIMESTAMP 
     WHERE id = ? AND is_deleted = 0`,
    [is_applicable, reason, id]
  );

  // Step 2: If approved, update leave balance
  if (is_applicable === 1) {
    const days = calculateDays(req.start_date, req.end_date);

    await pool.query(
      `UPDATE employee_leave_tbl 
       SET used_days = used_days + ? 
       WHERE user_id = ? AND leave_type_id = ? AND year = YEAR(CURDATE())`,
      [days, req.user_id, req.leave_type_id]
    );
  }

  return { message: "Leave request updated successfully" };
},


  //leave count

  async createLeaveBalance({ user_id, leave_type_id, year, allocated_days }) {
    const sqlQuery = ` INSERT INTO employee_leave_tbl 
      (user_id, leave_type_id, year, allocated_days)  VALUES (?, ?, ?, ? ) `;
    const values = [user_id, leave_type_id, year, allocated_days];
    const [result] = await pool.query(sqlQuery, values);
    return result;
  },

  async getAllLeaveBalances() {
    const sqlQuery = `SELECT * FROM employee_leave_tbl `;
    const [rows] = await pool.query(sqlQuery);
    return rows;
  },

  async getLeaveByUserId(userId) {
    const sqlQuery = `
      SELECT * FROM employee_leave_tbl  
      WHERE user_id = ?
    `;
    const [rows] = await pool.query(sqlQuery, [userId]);
    return rows;
  },

  async updateLeaveBalanceById(id, updates) {
    const sqlQuery = `
      UPDATE employee_leave_tbl  
      SET allocated_days = ?, used_days = ?, update_at = CURRENT_TIMESTAMP 
      WHERE id = ?
    `;
    const values = [updates.allocated_days, updates.used_days, id];
    const [result] = await pool.query(sqlQuery, values);
    return result;
  },

  async getLeaveSummaryByUser(userId) {
    const sqlQuery = `
      SELECT leave_type_id, 
             SUM(allocated_days) AS total_allocated,
             SUM(used_days) AS total_used,
             SUM(allocated_days - used_days) AS balance
      FROM employee_leave_tbl 
      WHERE user_id = ?
      GROUP BY leave_type_id
    `;
    const [rows] = await pool.query(sqlQuery, [userId]);
    return rows;
  }
};


module.exports = EmployeeLeaveModel;