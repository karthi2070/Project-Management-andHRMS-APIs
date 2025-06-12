const db = require('../config/db'); // assume db is your MySQL pool or connection


const  subTaskModel  = {
    async createTask(taskData) {
        const { sprint_id, project_code, title, description, priority, label, start_date, end_date, due_date,status, team, assignee, rca,
            acceptance, issue_type,story_points, attachments, parent_task_id} = taskData;

    const sql = `
        INSERT INTO sub_task_tbl (
            sprint_id, project_code, title, description, priority, label, 
            start_date, end_date, due_date,status, team, assignee, rca,acceptance, issue_type,
            story_points, attachments, parent_task_id
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?, ?)
    `;

     const values =[sprint_id, project_code, title, description, priority, label, start_date, end_date, due_date,status, team, assignee, rca,
        acceptance, issue_type,story_points, JSON.stringify(attachments), parent_task_id  ]

           const [result] = await db.query(sql, values);
        return { id: result.insertId, ...taskData };
    },
    async getAllSubTasks(parentId) {
            const sql = `SELECT * FROM sub_task_tbl WHERE is_deleted = 0 AND parent_task_id = ?`
           const [rows] =await db.execute(sql, [parentId]);
        return rows;
    },
    async getTaskById(parent_id,id) {
       
            const sql =`SELECT * FROM sub_task_tbl WHERE is_deleted = 0 AND parent_task_id = ? AND id = ? `
             const [rows] = await db.execute(sql, [parent_id,id]);
        return rows;
    },

    async getTasksBySprintId(id) {
            const sql =`SELECT * FROM sub_task_tbl WHERE sprint_id = ?`
            const [rows] = await db.query(sql, [id]);
        return rows;
    },

    async updateTask(id, taskData) {
        const { sprint_id, project_code, title, description, priority, label, start_date, end_date, due_date,status, team, assignee, rca,acceptance, issue_type,
            story_points, attachments, parent_task_id} = taskData;

          const sql=  `UPDATE sub_task_tbl SET sprint_id = ?, project_code = ?, title = ?, description = ?, priority = ?, label = ?, 
            start_date = ?, end_date = ?,due_date = ?, status=?, team = ?, assignee = ?, rca = ?,acceptance=?, issue_type = ?,
            story_points = ?, attachments = ?, parent_task_id = ? WHERE is_deleted = 0 AND id = ?`
    
        const values =[sprint_id, project_code, title, description, priority, label, start_date, end_date, due_date,status, team, assignee, rca,acceptance, issue_type,
              story_points, JSON.stringify(attachments), parent_task_id, id]
              const [result]=await db.query( sql, values);
        return { id: result.affectedRows  };
    },

    async deleteTask(id) {
        
             const sql =`UPDATE  sub_task_tbl set is_deleted = 1 WHERE id = ?`
             await db.execute(sql, [id]);
        return { id };
    }
};

module.exports = subTaskModel;