const pool = require("../config/db");

const SprintModel = {
    async createSprint( data) {
        const { project_id, name, start_date, end_date, status } = data;
        const query = `INSERT INTO sprint_tbl (project_id, name, start_date, end_date, status) VALUES (?, ?, ?, ?, ?)`;
        const values = [project_id, name, start_date, end_date, status];
        const [result] = await pool.query(query, values);
        return result.insertId;
    },

    async updateSprint(sprint_id, data) {
        // const fields = Object.keys(data).map(key => `${key} = ?`).join(", ");
        // const values = [...Object.values(data), sprint_id];
        const query = `UPDATE sprint_tbl SET project_id =? , name =? , start_date=?, end_date=?, status=? WHERE id = ?`;
        const values = [data.project_id, data.name, data.start_date, data.end_date, data.status, sprint_id];
        const [result] =await pool.query(query, values);
        return { id: sprint_id, ...data };
    },

    async getSprints() {
        const query = `SELECT * FROM sprint_tbl WHERE is_deleted = 0 `;
        const [rows] = await pool.query(query);
        return rows;
    },

async getSprintById(id) {
    console.log("Fetching sprint with ID:", id);
    const query = `SELECT * FROM sprint_tbl WHERE is_deleted = 0 AND id = ?`;
    const [rows] = await pool.query(query, [id]);
    return rows[0] || null;
},

    async getSprintsByProjectId(project_id) {
        const query = `SELECT * FROM sprint_tbl WHERE project_id = ? ORDER BY created_at DESC`;
        const [rows] = await pool.query(query, [project_id]);
        return rows;
    },

    async deleteSprint(id) {
        const query = `ALTER TABLE  SET  sprint_tbl WHERE is_deleted = 1 AND id = ?`;
        await pool.query(query, [id]);
        return true;
    }
};

module.exports = SprintModel;
