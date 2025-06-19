const db = require('../config/db'); // assume db is your MySQL pool or connection
const EmployeeModel =require('../models/empolyeeModel')
const {logTaskFieldChanges}= require('../helper/taskActivityLog')

const  subTaskModel  = {
    async createTask(taskData) {
        const { user_id,creater_name,sprint_id, project_code, title, description, priority, label, start_date, end_date, due_date,status, team, assignee, rca,
            acceptance, issue_type,story_points, attachments, parent_task_id} = taskData;

    const sql = `
        INSERT INTO sub_task_tbl (
            user_id,creater_name,sprint_id, project_code, title, description, priority, label, 
            start_date, end_date, due_date,status, team, assignee, rca,acceptance, issue_type,
            story_points, attachments, parent_task_id
        ) VALUES (?,?,?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?, ?)
    `;

     const values =[user_id,creater_name,sprint_id, project_code, title, description, priority, label, start_date, end_date, due_date,status, team, assignee, rca,
        acceptance, issue_type,story_points, JSON.stringify(attachments), parent_task_id  ]

           const [result] = await db.query(sql, values);
           const taskId =result.insertId
const employee =await EmployeeModel.getEmployeeByUserId(user_id);

    // Log task creation in activity_logs_tbl
    const logQuery = `
        INSERT INTO activity_logs_tbl (task_id,sub_task_id, user_id, user_name, action_type, old_value, new_value, updated_by, created_at)
        VALUES (NULL,?, ?, ?, ' Sub Task_created', NULL, 'Task initialized', ' Sub Task created by ${employee.name}', NOW()) `;
    await db.execute(logQuery, [taskId, user_id,employee.name]);

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
        const { user_id,creater_name,sprint_id, project_code, title, description, priority, label, start_date, end_date, due_date,status, team, assignee, rca,acceptance, issue_type,
            story_points, attachments, parent_task_id} = taskData;

               // Fetch current task details
    const [task_data] = await db.execute(`SELECT status, assignee,due_date,priority FROM sub_task_tbl WHERE id = ?`, [id]);
    if (task_data.length === 0) 
        return json({ message: 'Task not found' });

    if (!task_data.length) return json({ message: 'Task not found' });
          const sql=  `UPDATE sub_task_tbl SET user_id=?,creater_name=?,sprint_id = ?, project_code = ?, title = ?, description = ?, priority = ?, label = ?, 
            start_date = ?, end_date = ?,due_date = ?, status=?, team = ?, assignee = ?, rca = ?,acceptance=?, issue_type = ?,
            story_points = ?, attachments = ?, parent_task_id = ? WHERE is_deleted = 0 AND id = ?`
    
        const values =[user_id,creater_name,sprint_id, project_code, title, description, priority, label, start_date, end_date, due_date,status, team, assignee, rca,acceptance, issue_type,
              story_points, JSON.stringify(attachments), parent_task_id, id]
              const [result]=await db.query( sql, values);

                  const employee = await EmployeeModel.getEmployeeByUserId(user_id);
    const employeeName = employee.name;
    await logTaskFieldChanges({
        subTaskId: id,
        userId: user_id,
        userName: employeeName,
        oldData: task_data[0],
        newData: { status, assignee, due_date, priority }
    });

    return result;
},

    async deleteTask(id) {
        
             const sql =`UPDATE  sub_task_tbl set is_deleted = 1 WHERE id = ?`
             await db.execute(sql, [id]);
        return { id };
    }
};

module.exports = subTaskModel;