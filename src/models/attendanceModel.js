const db = require('../connfig/db');

exports.createAttendance = async (data) => {
    const { employee_name, department, login, logout } = data;
   
       const sql= `INSERT INTO employee_attendance (employee_id, employee_name, department, login, logout) VALUES (?, ?, ?, ?)`
       const [result] = await db.execute(sql,[employee_name, department, login, logout]
    );
    return result;
};

exports.updateAttendance = async (id, data) => {
    const { employee_name, department, login, logout } = data;
    
        const sql=`UPDATE employee_attendance SET employee_id = ? , employee_name = ?, department = ?, login = ?, logout = ? WHERE id = ?`
       const [result] = await db.execute(sql, [employee_name, department, login, logout, id]
    );
    return result;
};

exports.getAllAttendance = async () => {
    const sql =`SELECT * FROM employee_attendance`
    const [rows] = await db.execute(sql);
    return rows;
};
exports.getAttendanceById = async (id) => {
    const sql = `SELECT * FROM employee_attendance WHERE id = ?`;
    const [rows] = await db.execute(sql, [id]);
    return rows;
};

exports.getAttendanceByEmployeeId = async (id) => {
    const sql =`SELECT * FROM employee_attendance WHERE employee_id = ?`
    const [rows] = await db.execute(sql, [id]);
    return rows;
};

