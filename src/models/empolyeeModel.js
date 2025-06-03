const pool = require('../config/db'); // adjust path to your DB connection

const taskModel = {
  // Create Task
  async createTask(data) {
    const sql = `
      INSERT INTO tasks (title, description, priority, label, due_date, assignee, parent_id)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
    const values =[data.title, data.description, data.priority, data.label, data.due_date, data.assignee, data.parent_id || null];

    const [result] = await pool.query(sql, values);
    return { id: result.insertId, ...data };
  },

  // Get Task by ID
  async getTaskById(id) {
    const sql = `SELECT * FROM tasks WHERE id = ? AND is_deleted = 0`;
    const [rows] = await pool.query(sql, id);
    return rows[0] || null;
  },

  // Get All Tasks (with optional parent_id)
  async getAllTasks(parentId = null) {
    const sql = `SELECT * FROM tasks WHERE parent_id ${parentId === null ? 'IS NULL' : '= ?'} AND is_deleted = 0`;
    const values = parentId === null ? [] : [parentId];
    const [rows] = await pool.query(sql, values);
    return rows;
  },

  // Update Task
  async updateTask(id, data) {
    const sql = `
      UPDATE tasks 
      SET title = ?, description = ?, priority = ?, label = ?, due_date = ?, assignee = ?, parent_id = ?
      WHERE id = ? AND is_deleted = 0
    `;
    const values = [
      data.title,
      data.description,
      data.priority,
      data.label,
      data.due_date,
      data.assignee,
      data.parent_id || null,
      id
    ];
    const [result] = await pool.query(sql, values);
    return result.affectedRows > 0;
  },

  async getSubTasks(parentId) {
    const sql = `SELECT * FROM tasks WHERE parent_id = ? AND is_deleted = 0`;
    const values = [parentId];
    const [rows] = await pool.query(sql, values);
    return rows;
  },


  // Soft Delete Task
  async deleteTask(id) {
    const sql = `UPDATE tasks SET is_deleted = 1 WHERE id = ?`;
    const values = [id];
    const [result] = await pool.query(sql, values);
    return result.affectedRows > 0;
  }
};

module.exports = taskModel;
