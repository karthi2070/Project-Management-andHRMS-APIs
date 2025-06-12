const db = require('../config/db'); 


const taskModel = {
    async createTask(taskData) {
        const { sprint_id, project_code, title, description, priority, label, start_date, end_date, due_date,status, team, assignee, rca,
            acceptance, issue_type,story_points, attachments} = taskData;

    const sql = `
        INSERT INTO task_tbl (
            sprint_id, project_code, title, description, priority, label, 
            start_date, end_date, due_date,status, team, assignee, rca,acceptance, issue_type,
            story_points, attachments
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?) `;

     const values =[sprint_id, project_code, title, description, priority, label, start_date, end_date, due_date,status, team, assignee, rca,
         acceptance,issue_type,story_points, JSON.stringify(attachments) ]

           const [result] = await db.query(sql, values);
        return { id: result.insertId, ...taskData };
    },
     async getAllTasksBySprintId(sprint_id) {
        
           const sql =`SELECT * FROM task_tbl WHERE sprint_id =? AND is_deleted = 0 `
        const [rows] = await db.execute(sql,[sprint_id]);
        return rows;
    },
     async getAllTasksByProjectId(Project_id) {
        
           const sql =`SELECT * FROM task_tbl WHERE Project_id =? AND is_deleted = 0 `
        const [rows] = await db.execute(sql,[Project_id]);
        return rows;
    },

    async getTaskById(sprint_id,task_id) {
        
            const sql =`SELECT * FROM task_tbl WHERE is_deleted = 0 AND sprint_id= ? AND id = ? `
            const [rows] = await db.execute(sql,[sprint_id,task_id]);
        return rows[0];
    },
    async getSubTasks(id) {
        
            const sql =`SELECT * FROM task_tbl WHERE is_deleted = 0 AND parent_task_id = ?`
            const [rows] = await db.execute(sql, [id]);
        return rows;
    },

    async updateTask(id, taskData) {
        const {
            sprint_id, project_code, title, description, priority, label,
            start_date, end_date, due_date, status, team, assignee, rca,
            acceptance, issue_type, story_points, attachments
        } = taskData;

        const sql = `
            UPDATE task_tbl SET
                sprint_id = ?, project_code = ?, title = ?, description = ?, priority = ?, label = ?,
                start_date = ?, end_date = ?, due_date = ?, status = ?, team = ?, assignee = ?, rca = ?,
                acceptance = ?, issue_type = ?, story_points = ?, attachments = ?
            WHERE id = ?
        `;

        const values = [
            sprint_id, project_code, title, description, priority, label,
            start_date, end_date, due_date, status, team, assignee, rca,
            acceptance, issue_type, story_points, JSON.stringify(attachments),
            id
        ];

        const [result] = await db.query(sql, values);
        return result;
    },

    async deleteTask(id) {
        await db.execute(`UPDATE  task_tbl set is_deleted = 1 WHERE id = ?`, [id]);
        return { status: true, id };
    }
};

module.exports = taskModel;