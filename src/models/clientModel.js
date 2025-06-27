const pool = require('../config/db');

const ClientModel = {

  async createClient(data) {
    const { user_id, name, company_name, client_id, mail, phone1, phone2, phone3, gst_num, address, city, state, pincode } = data;
    const sql = `INSERT INTO client_tbl 
(user_id, name, company_name, client_id, mail, phone1, phone2, phone3, gst_num, address, city, state, pincode) 
VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    console.log(data)
    const values = [user_id, name, company_name, client_id, mail, phone1, phone2, phone3, gst_num, address, city, state, pincode]
    const [result] = await pool.query(sql, values);
    return { id: result.insertId, ...data };
  },

  async getAllClients() {
    const sql = `SELECT * FROM client_tbl WHERE is_deleted = 0`;
    const [clients] = await pool.query(sql);
    return clients;
  },

  async getClientById(id) {
    const sql = `SELECT * FROM client_tbl WHERE id = ? AND is_deleted = 0`;
    const [clients] = await pool.query(sql, [id]);
    return clients[0] || null;
  },
    async perClientDashBoard(id) {
    const sql = `SELECT SUM(invoice_amount),sum(balance_amount),sum(paid_amount) FROM invoice_tbl where client_id = ?`;
    const [clients] = await pool.query(sql, [id]);
    return clients;
  },

  async updateClient(id, data) {
    const sql = `UPDATE client_tbl SET user_id=?,name=?, company_name=?, mail=?, phone1=?, phone2=?, phone3=?, gst_num=?, address=? ,
                    city =? , state = ? ,pincode= ? WHERE id = ? AND is_deleted = 0`;
    await pool.query(sql, [...Object.values(data), id]);
    return { id, ...data };
  },

  async softDeleteClient(id) {
    const sql = `UPDATE client_tbl SET is_deleted = 1 WHERE id = ?`;
    await pool.query(sql, [id]);
    return { id, deleted: true };
  },

  async getTotalClients() {
    const sql = `SELECT COUNT(*) AS count FROM client_tbl WHERE is_deleted = 0 `
    const [rows] = await pool.query(sql);
    return rows[0].count;
  },

  // 2. Total pending payments (balance > 0)
  async getPendingPaymentsValue() {
    const sql = ` SELECT SUM(balance_amount) AS total_pending_payment
      FROM invoice_tbl
      WHERE is_deleted = 0 AND balance_amount > 0`
    const [rows] = await pool.query(sql);
    return rows[0];
  },

  async upcomingDueClients() {
    const sql = ` WITH upcoming_clients AS (
  SELECT DISTINCT client_id
  FROM invoice_tbl
  WHERE is_deleted = 0
    AND balance_amount <> 0
    AND followup_date BETWEEN CURRENT_DATE() AND CURRENT_DATE() + INTERVAL 30 DAY
)

SELECT 
  COUNT(*) AS upcoming_due_clients_count,
  JSON_ARRAYAGG(client_id) AS upcoming_due_clients_ids
FROM upcoming_clients; `
    const [rows] = await pool.query(sql);
    // console.log("upcoming due clients", rows[0])
    const upcoming_due_clients_count = rows[0].upcoming_due_clients_count;
    const client_ids = rows[0].upcoming_due_clients_ids;
  // If no clients found, return empty
  if (!client_ids || client_ids.length === 0) {
    return [];
  }

  // Query client details for the given IDs
  const clientQuery = ` SELECT service_name, client_id, invoice_number, invoice_amount, paid_amount, balance_amount,followup_date FROM invoice_tbl 
   WHERE id IN (${client_ids.map(() => '?').join(',')})    AND is_deleted = 0 `;
  const [clients] = await pool.query(clientQuery, client_ids);
  // console.log(upcoming_due_clients_count, clients)
  return { upcoming_due_clients_count, clients };
  },

  async getRenewalClients() {
    const sql = `WITH clients_renewal AS (
  SELECT DISTINCT client_id
  FROM invoice_tbl
  WHERE is_deleted = 0
    AND service_renewal_date BETWEEN CURRENT_DATE() AND CURRENT_DATE() + INTERVAL 30 DAY
)
SELECT 
  COUNT(*) AS renewal_clients_count,
  JSON_ARRAYAGG(client_id) AS clients_renewal_id
FROM clients_renewal; `
    const [rows] = await pool.query(sql);
    // console.log("clients_renewal ", rows[0])
    const  renewal_clients_count = rows[0]. renewal_clients_count;
    const client_ids = rows[0].clients_renewal_id;
  // If no clients found, return empty
  if (!client_ids || client_ids.length === 0) {
    return [];
  }
//id, user_id, service_name, client_id, invoice_number, invoice_amount, paid_amount, balance_amount, extra_amount, status_id, invoice_date, followup_date, service_renewal_date, payment_method, notes, is_deleted, created_at, updated_at
  // Query client details for the given IDs
  const clientQuery = ` SELECT service_name, client_id, invoice_number, service_renewal_date
   FROM invoice_tbl  WHERE balance_amount <> 0 AND client_id  IN (${client_ids.map(() => '?').join(',')})    AND is_deleted = 0 `;
  const [clients] = await pool.query(clientQuery, client_ids);
  // console.log(renewal_clients_count, clients)
  return { renewal_clients_count, clients };
  },

  async getTotalInvoice() {
    const sql = `SELECT COUNT(*) AS count FROM invoice_tbl  WHERE is_deleted = 0 `
    const [rows] = await pool.query(sql);
    return rows[0].count;
  },

  async createInvoice(invoice) {

    const query = `
    INSERT INTO invoice_tbl
    (user_id,service_name,client_id, invoice_number, invoice_amount, paid_amount, balance_amount, extra_amount, invoice_date, followup_date,service_renewal_date, payment_method, notes)
    VALUES ( ?,?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`;

    const values = [
      invoice.user_id, invoice.service_name, invoice.client_id,
      invoice.invoice_number,
      invoice.invoice_amount,
      invoice.paid_amount || 0.00,
      invoice.balance_amount || invoice.invoice_amount,
      invoice.extra_amount || 0.00,
      invoice.invoice_date,
      invoice.followup_date,
      invoice.service_renewal_date,
      invoice.payment_method,
      invoice.notes
    ];

    const [result] = await pool.query(query, values);
    return result.insertId;
  },
  async update(id, invoice) {
    const query = `
    UPDATE invoice_tbl 
    SET user_id=?,service_name=?, client_id=?, invoice_number=?, invoice_amount=?, paid_amount=?, balance_amount=?, extra_amount=?,
        status_id=?, invoice_date=?, followup_date=?,service_renewal_date=?, payment_method=?, notes=? 
    WHERE id = ?;
  `;

    const values = [
      invoice.user_id,
      invoice.service_name,
      invoice.client_id,
      invoice.invoice_number,
      invoice.invoice_amount,
      invoice.paid_amount,
      invoice.balance_amount,
      invoice.extra_amount,
      invoice.status_id,
      invoice.invoice_date,
      invoice.followup_date,
      invoice.service_renewal_date,
      invoice.payment_method,
      invoice.notes,
      id
    ];

    const [result] = await pool.query(query, values);
    return result;
  },

  async findAllincoice() {
    const query = `SELECT * FROM invoice_tbl WHERE is_deleted = 0`
    const [rows] = await pool.query(query);
    return rows;
  },

  async findById(client_id, invoice_id) {
    console.log(client_id, invoice_id)
    const query = `SELECT * FROM invoice_tbl WHERE client_id = ? AND id = ? AND is_deleted = 0 `
    const [rows] = await pool.query(query, [client_id, invoice_id]);
    return rows[0];
  },

  async findByInvoiseNum(inoice_number) {
    const query = `SELECT * FROM invoice_tbl WHERE invoice_number = ? AND is_deleted = 0 `
    const [rows] = await pool.query(query, [inoice_number]);
    return rows[0];
  },

  async findByInvoiseclintId(clientId) {
    const query = `select * FROM invoice_tbl WHERE client_id=? AND is_deleted = 0 `
    // const query = select * FROM invoice_tbl as i
    const [rows] = await pool.query(query, [clientId]);
    return rows;
  },
  async softDelete(id) {
    const query = `UPDATE invoice_tbl SET is_deleted = 1 WHERE id = ?`;
    const [result] = await pool.query(query, [id]);
    return result.affectedRows;
  },
  // insert EMI payment

  async insertPayment(data) {
    const { user_id, client_id, invoice_id, payment_amount, payment_date, payment_method, payment_status, notes, extra_amount } = data;
    const [result] = await pool.query(
      `INSERT INTO invoice_payment_tbl 
       (user_id,client_id, invoice_id, payment_amount,payment_date, payment_method, payment_status, notes, extra_amount)
       VALUES (?,?, ?, ?, ?, ?, ?,?, ?)`,
      [user_id, client_id, invoice_id, payment_amount, payment_date, payment_method, payment_status, notes, extra_amount]
    );
    return result;
  },

  async getInvoiceById(invoice_id) {
    const [rows] = await pool.query(
      `SELECT id, invoice_amount, paid_amount FROM invoice_tbl 
       WHERE id = ? AND is_deleted = 0`,
      [invoice_id]
    );
    return rows[0];
  },

  async findEMIPymentInvoiceId(client_id, invoice_id) {
    const query = `SELECT * FROM invoice_payment_tbl WHERE client_id = ? AND invoice_id = ? AND is_deleted = 0`;
    const [rows] = await pool.query(query, [client_id, invoice_id]);
    return rows;

  },
  async findEMIPymentInvoiceById(invoice_id, id) {

    const query = `SELECT * FROM invoice_payment_tbl WHERE invoice_id = ? AND id = ? AND is_deleted = 0 `
    const [rows] = await pool.query(query, [invoice_id, id]);
    return rows;
  },

  async updateInvoiceTotals(updateInvoiseData) {

    const { user_id, paid_amount, balance_amount, extra_amount, status_id, id } = updateInvoiseData

    const query = `UPDATE invoice_tbl 
       SET user_id =?,paid_amount = ?, balance_amount = ?, extra_amount=?, status_id = ?
       WHERE id = ? AND is_deleted = 0`
    const [result] = await pool.query(query, [user_id, paid_amount, balance_amount, extra_amount, status_id, id]
    );
    return result;
  }



};

module.exports = ClientModel;

