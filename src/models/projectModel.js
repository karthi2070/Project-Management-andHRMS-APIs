const pool = require("../config/db");

const createProject = async (data) => {
const { name,project_code ,description,due_date, start_date, end_date,sprints_count, budget, status } = data;
        const query = `INSERT INTO project_tbl (name,project_code, description,due_date, start_date, end_date, sprints_count, budget, status) VALUES (?, ?, ?, ?, ?,?,?,?,?)`;
        const values = [name,project_code, description,due_date, start_date, end_date,sprints_count,budget,  status];
        const [result] = await pool.query(query, values);
        return result.insertId;

};

const updateProject = async (id, data) => {
    const { name,project_code, description,due_date, start_date, end_date,sprints_count, budget, status} = data;

        const query = `UPDATE project_tbl SET name=?,project_code=?, description =?, due_date=?,start_date =?, end_date =?,sprints_count=?, budget =?, status =? WHERE id = ?`;
        const values = [name, project_code,description,due_date, start_date, end_date,sprints_count, budget, status,id];

       const [result]= await pool.query(query, values);
        return result

};

const getProjects = async () => {

        const query = `SELECT * FROM project_tbl ORDER BY created_at DESC`;
        const [rows] = await pool.execute(query);
        return rows;

};

const getProjectById = async (project_id) => {

        const query = `SELECT * FROM project_tbl WHERE id = ?`;
        const [rows] = await pool.execute(query, [project_id]);
        return rows[0];

};

module.exports = { createProject, updateProject, getProjects, getProjectById };
