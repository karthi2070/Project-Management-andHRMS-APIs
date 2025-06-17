const pool = require("../config/db");

const createProject = async (data) => {
const { user_id,creater_name,name,project_code ,description,due_date, start_date, end_date,sprints_count, status } = data;
        const query = `INSERT INTO project_tbl (user_id,creater_name,name,project_code, description,due_date, start_date, end_date, sprints_count, status) 
        VALUES ( ?, ?, ?, ?,?,?,?,?, ?, ?)`;
        const values = [user_id,creater_name,name,project_code, description,due_date, start_date, end_date,sprints_count,  status];
        const [result] = await pool.query(query, values);
        return result.insertId;

};

const updateProject = async (id, data) => {
    const { user_id,creater_name,name,project_code, description,due_date, start_date, end_date,sprints_count, status} = data;
    console.log(name,project_code, description,due_date, start_date, end_date,sprints_count, status)

        const query = `UPDATE project_tbl SET user_id =? ,creater_name=?, name=?,project_code=?, description =?, due_date=?,start_date =?, end_date =?,sprints_count=?,  status =? WHERE id = ?`;
        const values = [user_id,creater_name,name, project_code,description,due_date, start_date, end_date,sprints_count || null, status, id];

       const [result]= await pool.query(query, values);
        return {id: result.insertId, ...result }

};

const getProjects = async () => {

        const query = `SELECT * FROM project_tbl ORDER BY created_at DESC`;
        const [rows] = await pool.execute(query);
        return rows;

};

const getProjectById = async (project_id) => {

        const query = `SELECT * FROM project_tbl WHERE id = ?`;
        const [rows] = await pool.execute(query, [project_id]);
        return rows[0] ;

};

const deleteProject =async(id)=>{
        const query = `UPDATE FROM project_tbl SET is_deleted = 1 WHERE id = ?`;
        const [rows] = await pool.execute(query, [project_id]);
        return rows[0];      
}

module.exports = { createProject, updateProject, getProjects, getProjectById };
