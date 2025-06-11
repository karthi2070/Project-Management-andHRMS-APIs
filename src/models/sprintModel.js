const pool = require("../config/db");

const SprintModel = {
    async createSprint(data) {
        const { project_id, name,description, start_date, end_date, status } = data;
        const query = `INSERT INTO sprint_tbl (project_id, name,description, start_date, end_date, status) VALUES (?,?, ?, ?, ?, ?)`;
        const values = [project_id, name,description, start_date, end_date, status];
        const [result] = await pool.query(query, values);
        return result.insertId;
    },

async updateSprint(id, data) {
    const { project_id, name,description,start_date, end_date, status } = data;
    const query = `
      UPDATE sprint_tbl 
      SET project_id = ?, name = ?,description=? , start_date = ?, end_date = ?, status = ?
      WHERE id = ? AND is_deleted = 0
    `;
    const values = [project_id, name,description, start_date, end_date, status, id];
    const [result] = await pool.query(query, values);
    return result.affectedRows;
  },

    async getSprints() {
        const query = `SELECT * FROM sprint_tbl WHERE is_deleted = 0 `;
        const [rows] = await pool.query(query);
        return rows;
    },

    async getSprintsByProjectId(project_id) {
        const query = `SELECT * FROM sprint_tbl WHERE project_id = ? ORDER BY created_at DESC`;
        const [rows] = await pool.query(query, [project_id]);
        return rows;
    },

    async getSprintById(project_id, id) {
        console.log("Fetching sprint with ID:",project_id, id);
        const query = `SELECT * FROM sprint_tbl WHERE is_deleted = 0 AND project_id = ? and id = ?`;
        const [rows] = await pool.query(query, [project_id, id]);
        return rows[0] || null;
    },

    async deleteSprint(id) {
        const query = `UPDATE sprint_tbl SET is_deleted = 1 WHERE id = ? `;
        const [result] =await pool.query(query, [id]);
        return result.affectedRows
    }
};

module.exports = SprintModel;
