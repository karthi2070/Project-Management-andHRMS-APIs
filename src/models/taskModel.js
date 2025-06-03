const db = require('../config/db'); // assume db is your MySQL pool or connection


const taskModel = {
    async createTask(taskData) {
        const {
            title, description, priority, label, due_date, assignee, rca, story_points, attachments, parent_id} = taskData;

           const sql= `INSERT INTO tasks_tbl (title, description, priority, label, due_date, assignee, rca, story_points, attachments, parent_task_id)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
           const [result] = await db.execute(sql, [title, description, priority, label, due_date, assignee, rca, story_points, attachments,  parent_id ? parent_id : null] );
        return { id: result.insertId, ...taskData };
    },
    //id, title, description, priority, label, due_date, assignee, rca, story_points, attachments, parent_task_id, is_deleted

    async getTaskById(id) {
        const [rows] = await db.execute(`SELECT * FROM tasks_tbl WHERE is_deleted = 0 AND id = ? `, [id]);
        return rows[0];
    },

    async getAllTasks() {
        const [rows] = await db.execute(`SELECT * FROM tasks_tbl WHERE is_deleted = 0 `);
        return rows;
    },

    async getSubTasks(parentId) {
        const [rows] = await db.execute(`SELECT * FROM tasks_tbl WHERE is_deleted = 0 AND parent_task_id = ?`, [parentId]);
        return rows;
    },

    async updateTask(id, taskData) {
        const {
            title, description, priority, label, due_date, assignee, rca, story_points, attachments, parent_id,
        } = taskData;

        await db.execute(
            `UPDATE tasks_tbl SET title=?, description=?, priority=?, label=?, due_date=?, assignee=?,
             rca =? , story_points =? , attachments=?, parent_task_id=? WHERE is_deleted = 0 AND id = ?`,
            [title, description, priority, label, due_date, assignee, rca, story_points, attachments, parent_id ? parent_id : null, id]
        );
        return { id, ...taskData };
    },

    async deleteTask(id) {
        await db.execute(`UPDATE  tasks_tbl set is_deleted = 1 WHERE id = ?`, [id]);
        return { id };
    }
};

module.exports = taskModel;