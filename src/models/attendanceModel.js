const db = require('../config/db');

const AttendanceModel={
async createAttendance (data) {
    const { user_id,employee_id,employee_name, department,date, login, logout } = data;
   
       const sql= `INSERT INTO employee_attendance_tbl (user_id,employee_id, employee_name, department,date, login, logout) VALUES (?, ?,?,?,?, ?, ?)`
       const [result] = await db.execute(sql,[user_id,employee_id,employee_name, department,date, login, logout]
    );
    return result;
},

 async updateAttendance(id, data)  {
    const {user_id, employee_id,employee_name, department,date, login, logout } = data;
    
        const sql=`UPDATE employee_attendance_tbl SET user_id=?, employee_id = ? , employee_name = ?, department = ?,date =?, login = ?, logout = ? WHERE id = ?`
       const [result] = await db.execute(sql, [user_id,employee_id,employee_name, department,date, login, logout, id]
    );
    return result;
},

 async getAllAttendance ()  {
    const sql =`SELECT * FROM employee_attendance_tbl`
    const [rows] = await db.execute(sql);
    return rows;
},
 async getAttendanceById(id)  {
    const sql = `SELECT * FROM employee_attendance_tbl WHERE id = ?`;
    const [rows] = await db.execute(sql, [id]);
    return rows;
},

async getAttendanceByUserId (id) {
    const sql =`SELECT * FROM employee_attendance_tbl WHERE user_id = ?`
    const [rows] = await db.execute(sql, [id]);
    return rows;
},
async getAttendanceByDate (strat_date,end_date) {
    
       const sql = `SELECT * FROM employee_attendance_tbl WHERE date between  ? AND ?`
        const [rows] = await db.execute(sql,[strat_date,end_date]
    );
    return rows;
},
async getTotalWorkingDays  (user_id)  {
  const query = `
    SELECT 
      user_id,
      employee_name,
      COUNT(DISTINCT date) AS total_working_days
    FROM 
      employee_attendance_tbl
    WHERE 
      login IS NOT NULL AND user_id =?
    GROUP BY 
      user_id, employee_name;
  `;
  //WHERE login IS NOT NULL AND date BETWEEN '2025-06-01' AND '2025-06-30'

    const [rows] = await db.query(query,[user_id]);
    return rows

},
async getPresentEmployeeIds(date){
        const query =`SELECT DISTINCT user_id FROM employee_attendance_tbl WHERE date= ? `

        const [rows]= await db.query(query,[date])
        return rows.map (r => r.user_id);
        
}
};
module.exports=AttendanceModel
