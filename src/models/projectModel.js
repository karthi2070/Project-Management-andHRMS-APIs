const pool = require("../config/db");

const createProject = async (data) => {
const { name, description, start_date, end_date, budget, status } = data;
console.log("Creating project with data:", name, description, start_date, end_date, budget, status );
        const query = `INSERT INTO project_tbl (name, description, start_date, end_date, budget, status) VALUES (?, ?, ?, ?, ?,? )`;
        const values = [name, description, start_date, end_date,budget,  status];
        const [result] = await pool.query(query, values);
        return result.insertId;

};

const updateProject = async (id, data) => {
    const { name, description, start_date, end_date, budget, status } = data;
    console.log("Updating project with ID:", id, "and data:", name, description, start_date, end_date, budget, status);

        // const fields = Object.keys(data).map(key => `${key} = ?`).join(", ");
        // const values = [...Object.values(data), project_id];
        const query = `UPDATE project_tbl SET name=?, description =?, start_date =?, end_date =?, budget =?, status =? WHERE id = ?`;
        const values = [name, description, start_date, end_date,budget,  status,id];

       const [result]= await pool.query(query, values);
        return result.affectedRows 

};

const getProjects = async () => {

        const query = `SELECT * FROM project_tbl ORDER BY created_at DESC`;
        const [rows] = await pool.execute(query);
        return rows;

};

const getProjectById = async (project_id) => {

        const query = `SELECT * FROM project_tbl WHERE project_id = ?`;
        const [rows] = await pool.execute(query, [project_id]);
        return rows[0];

};

module.exports = { createProject, updateProject, getProjects, getProjectById };
