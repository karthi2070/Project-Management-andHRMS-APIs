const db = require('../config/db');

exports.createAttendance = async (data) => {
    const { user_id,employee_id,employee_name, department,date, login, logout } = data;
   
       const sql= `INSERT INTO employee_attendance_tbl (user_id,employee_id, employee_name, department,date, login, logout) VALUES (?, ?,?,?,?, ?, ?)`
       const [result] = await db.execute(sql,[user_id,employee_id,employee_name, department,date, login, logout]
    );
    return result;
};

exports.updateAttendance = async (id, data) => {
    const {user_id, employee_id,employee_name, department,date, login, logout } = data;
    
        const sql=`UPDATE employee_attendance_tbl SET user_id=?, employee_id = ? , employee_name = ?, department = ?,date =?, login = ?, logout = ? WHERE id = ?`
       const [result] = await db.execute(sql, [user_id,employee_id,employee_name, department,date, login, logout, id]
    );
    return result;
};

exports.getAllAttendance = async () => {
    const sql =`SELECT * FROM employee_attendance_tbl`
    const [rows] = await db.execute(sql);
    return rows;
};
exports.getAttendanceById = async (id) => {
    const sql = `SELECT * FROM employee_attendance_tbl WHERE id = ?`;
    const [rows] = await db.execute(sql, [id]);
    return rows;
};

exports.getAttendanceByEmployeeId = async (id) => {
    const sql =`SELECT * FROM employee_attendance_tbl WHERE user_id = ?`
    const [rows] = await db.execute(sql, [id]);
    return rows;
};
exports.getAttendanceByDate = async (strat_date,end_date) => {
    
       const sql = `SELECT * FROM employee_attendance_tbl WHERE date between  ? AND ?`
        const [rows] = await db.execute(sql,[strat_date,end_date]
    );
    return rows;
};

exports.getTotalWorkingDays = async () => {
  const query = `
    SELECT 
      employee_id,
      employee_name,
      COUNT(DISTINCT date) AS total_working_days
    FROM 
      employee_attendance_tbl
    WHERE 
      login IS NOT NULL WHERE user_id =?
    GROUP BY 
      employee_id, employee_name;
  `;
  //WHERE login IS NOT NULL AND date BETWEEN '2025-06-01' AND '2025-06-30'

    const [rows] = await db.query(query);
    return rows

};
