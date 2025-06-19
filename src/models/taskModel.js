const db = require('../config/db'); 
const EmployeeModel =require('../models/empolyeeModel')
// import { logIfChanged } from '../helpers/taskActivityLog.js';
const {logTaskFieldChanges} = require('../helper/taskActivityLog');


const taskModel = {
    async createTask(taskData) {
        const { sprint_id,project_id,user_id,creater_name, project_code, title, description, priority, label, start_date, end_date, due_date,status, team, assignee, rca,
            acceptance, issue_type,story_points, attachments} = taskData;

    const sql = `
        INSERT INTO task_tbl (
            sprint_id,project_id,user_id,creater_name,  project_code, title, description, priority, label, 
            start_date, end_date, due_date,status, team, assignee, rca,acceptance, issue_type,
            story_points, attachments ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?,?,?) `;

     const values =[sprint_id,project_id,user_id, creater_name, project_code, title, description, priority, label, start_date, end_date, due_date,status, team, assignee, rca,
         acceptance,issue_type,story_points, JSON.stringify(attachments) ]

           const [taskResult] = await db.query(sql, values);
           const taskId = taskResult.insertId;
        const employee =await EmployeeModel.getEmployeeByUserId(user_id);
    // Log task creation in activity_logs_tbl
    const logQuery = `
        INSERT INTO activity_logs_tbl (task_id,sub_task_id, user_id,user_name, action_type, old_value, new_value, updated_by, created_at)
        VALUES (?,NULL, ?,?, 'Task_created', NULL, 'Task initialized', 'Task created by ${employee.name}', NOW()) `;
    await db.execute(logQuery, [taskId, user_id,employee.name]);
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
async  updateTask(id, taskData) {
    const {
        sprint_id, project_id, user_id, creater_name, project_code, title, description, priority, label,
        start_date, end_date, due_date, status, team, assignee, rca,
        acceptance, issue_type, story_points, attachments
    } = taskData;

    const [task_data] = await db.execute(`
        SELECT status, assignee, due_date, priority
        FROM task_tbl WHERE id = ?
    `, [id]);

    if (!task_data.length) return json({ message: 'Task not found' });

    const sql = `
        UPDATE task_tbl SET
            sprint_id = ?, project_id = ?, user_id = ?, creater_name = ?, project_code = ?, title = ?, description = ?, priority = ?, label = ?,
            start_date = ?, end_date = ?, due_date = ?, status = ?, team = ?, assignee = ?, rca = ?,
            acceptance = ?, issue_type = ?, story_points = ?, attachments = ?
        WHERE id = ?
    `;

    const values = [
        sprint_id, project_id, user_id, creater_name, project_code, title, description, priority, label,
        start_date, end_date, due_date, status, team, assignee, rca,
        acceptance, issue_type, story_points, JSON.stringify(attachments), id
    ];
    const [result] = await db.execute(sql, values);

    const employee = await EmployeeModel.getEmployeeByUserId(user_id);
    const employeeName = employee.name;

    await logTaskFieldChanges({
        taskId: id,
        userId: user_id,
        userName: employeeName,
        oldData: task_data[0],
        newData: { status, assignee, due_date, priority }
    });

    return result;
},

    async deleteTask(id) {
        await db.execute(`UPDATE  task_tbl set is_deleted = 1 WHERE id = ?`, [id]);
        return { status: true, id };
    }
};

module.exports = taskModel;