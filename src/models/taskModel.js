const db = require('../config/db'); // assume db is your MySQL pool or connection


const taskModel = {
    async createTask(taskData) {
        const { sprint_id, project_code, title, description, priority, label, start_date, end_date, due_date,status, team, assignee, rca, issue_type,
            story_points, attachments, parent_task_id} = taskData;

    const sql = `
        INSERT INTO task_tbl (
            sprint_id, project_code, title, description, priority, label, 
            start_date, end_date, due_date,status, team, assignee, rca, issue_type,
            story_points, attachments, parent_task_id
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?)
    `;

     const values =[sprint_id, project_code, title, description, priority, label, start_date, end_date, due_date,status, team, assignee, rca, issue_type,
              story_points, JSON.stringify(attachments), parent_task_id ? parent_task_id : null ]

           const [result] = await db.query(sql, values);
        return { id: result.insertId, ...taskData };
    },
 

    async getTaskById(id) {
        const [rows] = await db.execute(`SELECT * FROM task_tbl WHERE is_deleted = 0 AND id = ? `, [id]);
        return rows[0];
    },

    async getAllTasks() {
        const [rows] = await db.execute(`SELECT * FROM task_tbl WHERE is_deleted = 0 `);
        return rows;
    },

    async getSubTasks(parentId) {
        const [rows] = await db.execute(`SELECT * FROM task_tbl WHERE is_deleted = 0 AND parent_task_id = ?`, [parentId]);
        return rows;
    },
    async getTasksBySprintId(id) {
        console.log("Fetching tasks for sprint ID:", id);
            const sql =`SELECT * FROM task_tbl WHERE sprint_id = ?`
            const [rows] = await db.query(sql, [id]);
        return rows;
    },

    async updateTask(id, taskData) {
        const { sprint_id, project_code, title, description, priority, label, start_date, end_date, due_date,status, team, assignee, rca, issue_type,
            story_points, attachments, parent_task_id} = taskData;

          const sql=  `UPDATE task_tbl SET sprint_id = ?, project_code = ?, title = ?, description = ?, priority = ?, label = ?, 
            start_date = ?, end_date = ?, status=?,due_date = ?, team = ?, assignee = ?, rca = ?, issue_type = ?,
            story_points = ?, attachments = ?, parent_task_id = ? WHERE is_deleted = 0 AND id = ?`
    
        const values =[sprint_id, project_code, title, description, priority, label, start_date, end_date, due_date,status, team, assignee, rca, issue_type,
              story_points, JSON.stringify(attachments), parent_task_id, id]
              const [result]=await db.query( sql, values);
        return { id: result.insertId, ...taskData };
    },

    async deleteTask(id) {
        await db.execute(`UPDATE  task_tbl set is_deleted = 1 WHERE id = ?`, [id]);
        return { id };
    }
};

module.exports = taskModel;