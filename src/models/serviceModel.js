const db = require('../config/db'); 

const serviceModel = {
  async create(data) {

    //id, client_id, service_name, from_date, to_date, service_amount, paid_amount, balance_amount, renewal_amount, last_renewal_date,
    //  payment_status, is_deleted, created_at, updated_at
    const sql = `INSERT INTO service_tbl 
      (client_id, service_name, from_date, to_date,service_amount, paid_amount, balance_amount, renewal_amount,last_renewal_date, payment_status,notes) 
      VALUES ( ?, ?, ?, ?, ?, ?, ?, ?,?, ?,  ?)`;
      console.log("data", data);
    // const serviceAmountWithTax = data.service_amount * 1.18;
    // const renewalAmountWithTax = data.renewal_amount * 1.18;

    const [result] = await db.execute(sql, [
      data.client_id,
      data.service_name,
      data.from_date,
      data.to_date,
      data.service_amount,
      data.paid_amount,
      data.balance_amount,
      data.renewal_amount || null,
      data.last_renewal_date || null,
      data.payment_status || 0,
      data.notes || null
    ]);
    console.log(result);
    return { id: result.insertId, ...data };
  },

  async updateServiceTotals(updateServiceData) {
    const { user_id, paid_amount, balance_amount, due_date, payment_status, id } = updateServiceData
console.log(updateServiceData)
    const query = `UPDATE service_tbl 
       SET user_id =?, paid_amount = ?, balance_amount = ?, due_date = ?, payment_status = ?
       WHERE id = ? AND is_deleted = 0`
    const [result] = await db.query(query, [user_id, paid_amount, balance_amount, due_date, payment_status, id])
    return result;
  },
  async update(id, data) {
    const sql = `UPDATE service_tbl SET 
      client_id = ?, service_name = ?, from_date = ?, to_date = ?,service_amount=?, paid_amount=?, balance_amount=?,followup_date=?, renewal_amount=?,
      last_renewal_date=?, payment_status = ? ,notes = ?
      WHERE id = ? AND is_deleted = 0`;
    await db.execute(sql, [
      data.client_id,
      data.service_name,
      data.from_date,
      data.to_date,
      data.service_amount * 0.18,
      data.paid_amount,
      data.balance_amount,
      data.followup_date ,
      data.renewal_amount * 0.18,
      data.last_renewal_date || null,
      data.payment_status,
      data.notes || null,
      id
    ]);
    return { id, ...data };
  },
  async paymentUpdate(id, status) {// payment date,amount,
    const sql = `UPDATE service_tbl SET  payment_status = ? WHERE id = ? AND is_deleted = 0`;
    await db.execute(sql, [status, id]);
    return { id, payment_status: status };
  },


  async getAll() {
    const sql = `SELECT * FROM service_tbl WHERE is_deleted = 0 ORDER BY id DESC`;
    const [rows] = await db.execute(sql);
    return rows;
  },
  async paymentFilter(status) {
    const sql = `SELECT * FROM service_tbl WHERE payment_status = ? AND is_deleted = 0 ORDER BY id DESC`;
    const [rows] = await db.execute(sql, [status]);
    return rows;
  },
  async getByClientId(clientId) {
    const sql = `SELECT * FROM service_tbl WHERE client_id = ? AND is_deleted = 0 ORDER BY id DESC`;
    const [rows] = await db.execute(sql, [clientId]);
    return rows;
  },
  //  async getInvoiceById(invoice_id) {
  //   const [rows] = await pool.query(
  //     `SELECT id, invoice_amount, paid_amount FROM invoice_tbl 
  //      WHERE id = ? AND is_deleted = 0`,
  //     [invoice_id]
  //   );
  //   return rows[0];
  // },
  async getById(id) {
    const sql = `SELECT * FROM service_tbl WHERE id = ? AND is_deleted = 0`;
    const [rows] = await db.execute(sql, [id]);
    return rows[0];
  },
// get  next  due payment data
  async delete(id) {
    const sql = `UPDATE service_tbl SET is_deleted = 1 WHERE id = ?`;
    await db.execute(sql, [id]);
    return { id, deleted: true };
  },
    async upcomingPaymentDue() {
    const sql = ` WITH upcoming_service_followup_payment AS (
  SELECT DISTINCT client_id
  FROM service_payment_tbl
  WHERE is_deleted = 0
    AND payment_status = 1
    AND next_due_date BETWEEN 
    () AND CURRENT_DATE() + INTERVAL 30 DAY
)

SELECT 
  COUNT(*) AS upcoming_due_clients_count,
  JSON_ARRAYAGG(client_id) AS upcoming_due_clients_ids
FROM upcoming_service_followup_payment; `
    const [rows] = await db.query(sql);
    // console.log("upcoming due clients", rows[0])
    const upcoming_due_clients_count = rows[0].upcoming_due_clients_count;
    const client_ids = rows[0].upcoming_due_clients_ids;
  // If no clients found, return empty
  if (!client_ids || client_ids.length === 0) {
    return [];
  }

  // Query client details for the given IDs
  const clientQuery = ` SELECT service_name, client_id, from_date,to_date, service_amount, paid_amount, balance_amount FROM service_tbl 
   WHERE id IN (${client_ids.map(() => '?').join(',')})    AND is_deleted = 0 `;
  const [clients] = await db.query(clientQuery, client_ids);

  return { upcoming_due_clients_count, clients };
  },


//
  async insertServicePayment(data) {
    console.log(data)
    const { user_id, client_id, service_id, payment_amount,paid_amount,balance_amount, payment_date, payment_method, payment_status,next_due_date,followup_date, notes, extra_amount } = data;
   
     const query = `INSERT INTO service_payment_tbl 
       (user_id,client_id, service_id,payment_amount ,paid_amount,balance_amount,payment_date, payment_method, payment_status,next_due_date, followup_date, notes, extra_amount)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?,?, ?)`
     const values= [user_id, client_id, service_id, payment_amount,paid_amount,balance_amount, payment_date, payment_method, payment_status,next_due_date,followup_date, notes, extra_amount]
    const [result] = await db.query(query, values);
    return result;
  },

   async getFollowupPaymentId(client_id, service_id) {
    const query = `SELECT * FROM service_payment_tbl WHERE client_id = ? AND service_id = ? AND is_deleted = 0 ORDER BY created_at DESC`;
    const [rows] = await db.query(query, [client_id,  service_id]);
    return rows;

  },
  async getFollowupPaymentServiceId(service_id, id) {

    const query = `SELECT * FROM service_payment_tbl WHERE service_id = ? AND id = ? AND is_deleted = 0 `
    const [rows] = await db.query(query, [ service_id, id]);
    return rows;
  },
};

module.exports = serviceModel;
