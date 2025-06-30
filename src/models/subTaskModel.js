const db = require('../config/db'); 

const EmployeeModel =require('../models/empolyeeModel')
const {logTaskFieldChanges}= require('../helper/taskActivityLog')

const  subTaskModel  = {
    async createTask(taskData) {
        const { user_id,creater_name,project_id,sprint_id, parent_task_id, project_code, title, description, priority, label, start_date, end_date, due_date,status, team, assignee, rca,
            acceptance, issue_type,story_points, attachments} = taskData;

    const sql = `
        INSERT INTO sub_task_tbl (
            user_id,creater_name,project_id,sprint_id, parent_task_id, project_code, title, description, priority, label, 
            start_date, end_date, due_date,status, team, assignee, rca,acceptance, issue_type,
            story_points, attachments
        ) VALUES (?,?,?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?, ?,?) `;

     const values =[user_id,creater_name,project_id,sprint_id, parent_task_id, project_code, title, description, priority, label, start_date, end_date, due_date,status, team, assignee, rca,
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
            //const sql = `SELECT * FROM sub_task_tbl WHERE is_deleted = 0 AND parent_task_id = ?`
    const sql = `SELECT  s.project_id, p.name AS project_name,s.project_code, s.sprint_id, sp.name AS sprint_name, s.parent_task_id, t.title AS task_name,
      s.id as sub_task_id ,s.title as sub_task_name , s.description, s.priority, s.label, s.start_date, s.end_date, s.due_date, s.status, s.team, s.assignee, s.rca,
      s.acceptance, s.issue_type, s.story_points, s.attachments, s.is_deleted, s.created_at, s.updated_at 
      FROM sub_task_tbl s
       LEFT JOIN project_tbl p ON s.project_id = p.id 
       LEFT JOIN sprint_tbl sp ON s.sprint_id = sp.id 
       LEFT JOIN task_tbl t ON s.parent_task_id = t.id 
       WHERE s.is_deleted = 0 AND s.parent_task_id = ?; `
           const [rows] =await db.execute(sql, [parentId]);
        return rows;
    },
    async getTaskById(parent_id,id) {
       
            const sql =`SELECT  s.project_id, p.name AS project_name,s.project_code, s.sprint_id, sp.name AS sprint_name, s.parent_task_id, t.title AS task_name,
     s.id as sub_task_id, s.title as sub_task_name , s.description, s.priority, s.label, s.start_date, s.end_date, s.due_date, s.status, s.team, s.assignee, s.rca,
      s.acceptance, s.issue_type, s.story_points, s.attachments, s.is_deleted, s.created_at, s.updated_at 
      FROM sub_task_tbl s
       LEFT JOIN project_tbl p ON s.project_id = p.id 
       LEFT JOIN sprint_tbl sp ON s.sprint_id = sp.id 
       LEFT JOIN task_tbl t ON s.parent_task_id = t.id 
       WHERE s.is_deleted = 0 AND s.parent_task_id = ? AND s.id = ?;  `
             const [rows] = await db.execute(sql, [parent_id,id]);
        return rows;
    },

    async getTasksBySprintId(id) {
            const sql =`SELECT  s.project_id, p.name AS project_name,s.project_code, s.sprint_id, sp.name AS sprint_name, s.parent_task_id, t.title AS task_name,
      s.id as sub_task_id ,s.title as sub_task_name , s.description, s.priority, s.label, s.start_date, s.end_date, s.due_date, s.status, s.team, s.assignee, s.rca,
      s.acceptance, s.issue_type, s.story_points, s.attachments, s.is_deleted, s.created_at, s.updated_at 
      FROM sub_task_tbl s
       LEFT JOIN project_tbl p ON s.project_id = p.id 
       LEFT JOIN sprint_tbl sp ON s.sprint_id = sp.id 
       LEFT JOIN task_tbl t ON s.parent_task_id = t.id 
       WHERE s.is_deleted = 0 AND s.sprint_id = ?;`
            const [rows] = await db.query(sql, [id]);
        return rows;
    },

    async updateTask(id, taskData) {
        const { user_id,creater_name,project_id,sprint_id, parent_task_id,project_code, title, description, priority, label, start_date, end_date, due_date,status, team, assignee, rca,acceptance, issue_type,
            story_points, attachments} = taskData;

               // Fetch current task details
    const [task_data] = await db.execute(`SELECT status, assignee,due_date,priority FROM sub_task_tbl WHERE id = ?`, [id]);
    if (task_data.length === 0) 
        return json({ message: 'Task not found' });

    if (!task_data.length) return json({ message: 'Task not found' });
          const sql=  `UPDATE sub_task_tbl SET user_id=?,creater_name=?, project_id=?,sprint_id=?, parent_task_id=?, project_code = ?, title = ?, description = ?, priority = ?, label = ?, 
            start_date = ?, end_date = ?,due_date = ?, status=?, team = ?, assignee = ?, rca = ?,acceptance=?, issue_type = ?,
            story_points = ?, attachments = ? WHERE is_deleted = 0 AND id = ?`
    
        const values =[user_id,creater_name,project_id,sprint_id, parent_task_id, project_code, title, description, priority, label, start_date, end_date, due_date,status, team, assignee, rca,acceptance, issue_type,
              story_points, JSON.stringify(attachments), id]
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