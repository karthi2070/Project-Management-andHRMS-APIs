const db = require('../config/db'); 


const taskModel = {
    async createTask(taskData) {
        const { sprint_id,project_id,user_id, project_code, title, description, priority, label, start_date, end_date, due_date,status, team, assignee, rca,
            acceptance, issue_type,story_points, attachments} = taskData;

    const sql = `
        INSERT INTO task_tbl (
            sprint_id,project_id,user_id, project_code, title, description, priority, label, 
            start_date, end_date, due_date,status, team, assignee, rca,acceptance, issue_type,
            story_points, attachments ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?,?,?) `;

     const values =[sprint_id,project_id,user_id, project_code, title, description, priority, label, start_date, end_date, due_date,status, team, assignee, rca,
         acceptance,issue_type,story_points, JSON.stringify(attachments) ]

           const [taskResult] = await db.query(sql, values);
           const taskId = taskResult.insertId;

    // Log task creation in activity_logs_tbl
    const logQuery = `
        INSERT INTO activity_logs_tbl (task_id, user_id, action_type, old_value, new_value, comments, created_at)
        VALUES (?, ?, 'Task_created', NULL, 'Task initialized', 'Task created by user${id}', NOW()) `;
    await db.execute(logQuery, [taskId, user_id]);
        return { id: taskResult.insertId, ...taskResult };
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
        const { sprint_id,project_id,user_id, project_code, title, description, priority, label,
            start_date, end_date, due_date, status, team, assignee, rca,
            acceptance, issue_type, story_points, attachments  } = taskData;

    // Fetch current task details
    const [task_data] = await db.execute(`SELECT status, assignee FROM task_tbl WHERE id = ?`, [id]);
    if (task_data.length === 0) return res.status(404).json({ message: 'Task not found' });

    const oldStatus = task_data[0].status;
    const oldAssignee = task_data[0].assignee;

        const sql = `UPDATE task_tbl SET
                sprint_id = ?,project_id=? ,user_id=?, project_code = ?, title = ?, description = ?, priority = ?, label = ?,
                start_date = ?, end_date = ?, due_date = ?, status = ?, team = ?, assignee = ?, rca = ?,
                acceptance = ?, issue_type = ?, story_points = ?, attachments = ?
            WHERE id = ? `;

        const values = [ sprint_id,project_id,user_id, project_code, title, description, priority, label,
            start_date, end_date, due_date, status, team, assignee, rca,
            acceptance, issue_type, story_points, JSON.stringify(attachments),id];

        const [result] = await db.query(sql, values);

         if (oldStatus !== status) {
        const logQuery = `
            INSERT INTO activity_logs_tbl (task_id, user_id, action_type, old_value, new_value, comments, created_at)
            VALUES (?, ?, 'Status_changed', ?, ?, ?, NOW())
        `;
        await db.query(logQuery, [id, user_id, oldStatus, status, `user ${id} change Status changed from ${oldStatus} to ${status}`]);
    }

    // Log assignee change
    if (oldAssignee !== assignee) {
        const logQuery = `
            INSERT INTO activity_logs_tbl (task_id, user_id, action_type, old_value, new_value, comments, created_at)
            VALUES (?, ?, 'assignee_changed', ?, ?, ?, NOW()) `;
        await db.query(logQuery, [id, user_id, oldAssignee, assignee, `Assignee changed from ${oldAssignee}  to ${assignee}`]);
    }
        return result;
    },

    async deleteTask(id) {
        await db.execute(`UPDATE  task_tbl set is_deleted = 1 WHERE id = ?`, [id]);
        return { status: true, id };
    }
};

module.exports = taskModel;