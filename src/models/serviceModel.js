const db = require('../config/db'); // adjust DB import if needed

const serviceModel = {
  async create(data) {
    const sql = `INSERT INTO service_tbl 
      (client_id, service_name, from_date, to_date, amount, payment_status) 
      VALUES ( ?, ?, ?, ?, ?, ?)`;
    const [result] = await db.execute(sql, [
      data.client_id,
      data.service_name,
      data.from_date,
      data.to_date,
      data.amount,
      data.payment_status || 0
    ]);
    return { id: result.insertId, ...data };
  },

  async update(id, data) {
    const sql = `UPDATE service_tbl SET 
      client_id = ?, service_name = ?, from_date = ?, to_date = ?, amount = ?, payment_status = ? 
      WHERE id = ? AND is_deleted = 0`;
    await db.execute(sql, [
      data.client_id,
      data.service_name,
      data.from_date,
      data.to_date,
      data.amount,
      data.payment_status,
      id
    ]);
    return { id, ...data };
  },

  async getAll() {
    const sql = `SELECT * FROM service_tbl WHERE is_deleted = 0 ORDER BY id DESC`;
    const [rows] = await db.execute(sql);
    return rows;
  },

  async getById(id) {
    const sql = `SELECT * FROM service_tbl WHERE id = ? AND is_deleted = 0`;
    const [rows] = await db.execute(sql, [id]);
    return rows[0];
  },

  async delete(id) {
    const sql = `UPDATE service_tbl SET is_deleted = 1 WHERE id = ?`;
    await db.execute(sql, [id]);
    return { id, deleted: true };
  }
};

module.exports = serviceModel;
