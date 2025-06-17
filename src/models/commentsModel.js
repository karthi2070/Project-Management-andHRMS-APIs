const db = require('../config/db');
const EmployeeModel =require('./empolyeeModel')

const Comments = {
   createComment: async ({ task_id, sub_task_id, user_id,user_name, parent_comment_id, comment, attachments }) => {
    const employee =await EmployeeModel.getEmployeeByUserId(user_id)
    const sql = `
      INSERT INTO comments_tbl (task_id, sub_task_id, user_id,user_name, parent_comment_id, comment, attachments)
      VALUES (?, ?, ?, ?, ?, ?,?)`;
    const values = [task_id, sub_task_id, user_id,employee.name, parent_comment_id, comment, JSON.stringify(attachments)];
    const [result] = await db.query(sql, values);
    return result.insertId;
  },

  editComment: async ({ id, comment, attachments }) => {
    const sql = `
      UPDATE comments_tbl 
      SET comment = ?, attachments = ?, updated_at = CURRENT_TIMESTAMP 
      WHERE id = ? AND is_deleted = 0`;
    const [result] = await db.query(sql, [comment, JSON.stringify(attachments), id]);
    return result.affectedRows;
  },

  getAllComments: async () => {
    const [rows] = await db.query(`SELECT * FROM comments_tbl WHERE is_deleted = 0 ORDER BY created_at DESC`);
    return rows;
  },

  getCommentById: async (id) => {
    const [rows] = await db.query(`SELECT * FROM comments_tbl WHERE id = ? AND is_deleted = 0`, [id]);
    return rows[0];
  },

  getCommentsByTaskId: async (task_id) => {
    const [rows] = await db.query(`SELECT * FROM comments_tbl WHERE task_id = ? AND is_deleted = 0 ORDER BY created_at ASC`, [task_id]);
    return rows;
  },
    getCommentsBySubTaskId: async (sub_task_id) => {
    const [rows] = await db.query(`SELECT * FROM comments_tbl WHERE sub_task_id = ? AND is_deleted = 0 ORDER BY created_at ASC`, [sub_task_id]);
    return rows;
  },

  deleteComment: async (id) => {
    const [result] = await db.query(`UPDATE comments_tbl SET is_deleted = 1, updated_at = CURRENT_TIMESTAMP WHERE id = ?`, [id]);
    return result.affectedRows;
  }
};

module.exports = Comments;
