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
    const sql =`SELECT * FROM employee_attendance_tbl WHERE employee_id = ?`
    const [rows] = await db.execute(sql, [id]);
    return rows;
};
exports.getAttendanceByDate = async (date) => {
    
       const sql = `SELECT * FROM employee_attendance_tbl WHERE DATE(date) = ?`
        const [rows] = await db.execute(sql,[date]
    );
    return rows;
};


