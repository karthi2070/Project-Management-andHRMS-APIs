const db = require('../config/db');
const EmployeeModel = require('../models/empolyeeModel'); // adjust path as needed

const ActivityLogger = {
  addCommentLog: async ({ task_id, sub_task_id, user_id, comment, action_type }) => {
    const employee = await EmployeeModel.getEmployeeByUserId(user_id);

    const sql = `
      INSERT INTO activity_logs_tbl
      (task_id, sub_task_id, user_id, user_name, action_type, old_value, new_value, updated_by, created_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW())`;

    const values = [
      task_id || null,
      sub_task_id || null,
      user_id,
      employee.name,
      action_type,
      null,
      comment,
      employee.name
    ];

    await db.execute(sql, values);
  },

  addCommentEditLog: async ({ task_id, sub_task_id, user_id, old_comment, new_comment }) => {
    const employee = await EmployeeModel.getEmployeeByUserId(user_id);

    const sql = `
      INSERT INTO activity_logs_tbl
      (task_id, sub_task_id, user_id, user_name, action_type, old_value, new_value, updated_by, created_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW())`;

    const values = [
      task_id || null,sub_task_id || null,user_id,employee.name,'comment_edited', old_comment,new_comment,employee.name];

    await db.execute(sql, values);
  },
  deleteCommentLog: async ({ task_id, sub_task_id, user_id, old_value, new_value }) => {
    const employee = await EmployeeModel.getEmployeeByUserId(user_id);
    const sql = `
      INSERT INTO activity_logs_tbl
      (task_id, sub_task_id, user_id, user_name, action_type, old_value, new_value, updated_by, created_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW())`;

    const values = [
      task_id || null,
      sub_task_id || null,
      user_id,
      employee.name,
      'comment_deleted',
      old_value,
      new_value || null,
      employee.name
    ];

    await db.execute(sql, values);
  }
};

module.exports = ActivityLogger;
