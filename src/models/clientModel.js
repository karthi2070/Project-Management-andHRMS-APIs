const pool = require('../config/db');

const ClientModel = {

  async createClient(data) {
    const { user_id, name, company_name, client_id, mail, phone1, phone2, phone3, gst_num, address, city, state, pincode } = data;
    const sql = `INSERT INTO client_tbl 
(user_id, name, company_name, client_id, mail, phone1, phone2, phone3, gst_num, address, city, state, pincode) 
VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
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
  async updateClient(
    id, user_id, name, company_name, mail,
    phone1, phone2, phone3, gst_num,
    address, city, state, pincode
  ) {
    const sql = `UPDATE client_tbl 
    SET user_id=?, name=?, company_name=?, mail=?, phone1=?, phone2=?, phone3=?, 
        gst_num=?, address=?, city=?, state=?, pincode=?, updated_at = NOW()
    WHERE id=? AND is_deleted = 0  `;

    const [result] = await pool.query(sql, [
      user_id, name, company_name, mail,
      phone1, phone2, phone3, gst_num,
      address, city, state, pincode, id
    ]);
    return result.affectedRows > 0;
  },

  async softDeleteClient(id) {
    const sql = `UPDATE client_tbl SET is_deleted = 1 WHERE id = ?`;
    await pool.query(sql, [id]);
    return { id, deleted: true };
  },

  async getTotalClients() {
    const sql = `SELECT COUNT(*) AS count FROM client_tbl  `
    const [rows] = await pool.query(sql);
    return rows[0].count;
  },

  // ******************************** client payments filtering and operations  ********************************
  async getPendingPaymentsValue() {
    const sql = ` SELECT SUM(balance_amount) AS total_pending_payment
      FROM invoice_tbl
      WHERE is_deleted = 0 AND balance_amount > 0`
    const [rows] = await pool.query(sql);
    return rows[0];
  },

  async getUpcomingInvoicesFromInvoice(start_date, end_date){
    const sql = `WITH upcoming_invoices AS (
  SELECT id
  FROM invoice_tbl
  WHERE is_deleted = 0 AND paid_amount = 0
    AND followup_date BETWEEN ? AND ? 
)
SELECT 
  COUNT(*) AS upcoming_invoice_count,
  JSON_ARRAYAGG(id) AS upcoming_invoice_ids
FROM upcoming_invoices;`
    const [rows] = await pool.query(sql, [start_date,end_date]);
    // console.log("upcoming_invoice", rows[0])
    const upcoming_invoice_count = rows[0].upcoming_invoice_count;
    const upcoming_invoice_ids = rows[0].upcoming_invoice_ids;
    // If no clients found, return empty
    if (!upcoming_invoice_ids || upcoming_invoice_ids.length === 0) {
      return {
        source: 'invoice_tbl',
        invoice_count: 0,
        invoice_details: []
      };
    }
    const clientQuery = ` SELECT i.id,c.name AS client_name,c.client_id,i.invoice_details, c.company_name, i.client_id, i.invoice_number,
     i.invoice_amount, i.paid_amount, i.balance_amount, i.payment_status
   FROM invoice_tbl as i
   join client_tbl as c on i.client_id = c.id
   WHERE i.payment_status IN (1,2) AND i.id IN (${upcoming_invoice_ids.map(() => '?').join(',')}) AND i.is_deleted = 0
   ORDER BY i.followup_date ASC
 `;
    const [invoiceDetails] = await pool.query(clientQuery, upcoming_invoice_ids);
      return {
    source: 'invoice_tbl',
    invoice_count: upcoming_invoice_count ,
    invoice_details: invoiceDetails
  };
  },

  async getUpcomingInvoicesfromInvoicePaymentTable(start_date,end_date) {
    const sql = `WITH upcoming_invoices AS (
  SELECT id
  FROM invoice_payment_tbl
  WHERE is_deleted = 0 
    AND followup_date BETWEEN ? AND ? 
)
SELECT 
  COUNT(*) AS upcoming_invoice_count,
  JSON_ARRAYAGG(id) AS upcoming_invoice_ids
FROM upcoming_invoices;`
    const [rows] = await pool.query(sql,[start_date,end_date]);
    // console.log("upcoming_invoice", rows[0])
    const upcoming_invoice_count = rows[0].upcoming_invoice_count;
    const upcoming_invoice_ids = rows[0].upcoming_invoice_ids;
    // If no clients found, return empty
    if (!upcoming_invoice_ids || upcoming_invoice_ids.length === 0) {
      return {
        source: 'invoice_payment_tbl',
        invoice_count: 0,
        invoice_details: []
      };
    }
    const clientQuery = ` SELECT c.name AS client_name,c.client_id, c.company_name,
    i.id, i.invoice_details, i.client_id, i.invoice_number,i.invoice_amount, i.paid_amount, i.balance_amount, i.payment_status,
    ip.id as invoice_payment_id, ip.client_id, ip.invoice_id,ip.followup_date

   FROM invoice_payment_tbl as ip
   join invoice_tbl as i on ip.invoice_id = i.id
   join client_tbl as c on ip.client_id = c.id
   WHERE i.payment_status IN (1,2) AND ip.id IN (${upcoming_invoice_ids.map(() => '?').join(',')}) AND ip.is_deleted = 0 
   ORDER BY ip.followup_date ASC
 `;
    const [invoiceDetails] = await pool.query(clientQuery, upcoming_invoice_ids);
      return {
    source: 'invoice_payment_tbl',
    invoice_count: upcoming_invoice_count ,
    invoice_details: invoiceDetails
  };
  },


  // invoice operations
  async createInvoice(invoice) {
    // id, user_id, invoice_details, client_id, invoice_number, invoice_amount, paid_amount, balance_amount, extra_amount, payment_status, payment_method, invoice_date, followup_date, due_date, notes, is_deleted, created_at, updated_at
    const query = `
    INSERT INTO invoice_tbl
    (user_id,invoice_details,client_id, invoice_number, invoice_amount, paid_amount, balance_amount,  extra_amount, payment_status, payment_method,  invoice_date, followup_date,due_date, notes)
    VALUES ( ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`;
    const invoiceAmount = Math.round(invoice.invoice_amount * 1.18 * 100) / 100;
    const balanceAmount = Math.round(invoice.invoice_amount * 1.18 * 100) / 100;

    const values = [
      invoice.user_id, JSON.stringify(invoice.invoice_details), invoice.client_id,
      invoice.invoice_number,
      invoiceAmount,
      invoice.paid_amount || 0.00,
      balanceAmount,
      invoice.extra_amount || 0.00,
      invoice.payment_status,
      invoice.payment_method,
      invoice.invoice_date,
      invoice.followup_date,
      invoice.due_date,
      invoice.notes
    ];

    const [result] = await pool.query(query, values);
    return result.insertId;
  },
  async update(id, invoice) {
    // console.log("update invoice", invoice)
    const query = `
    UPDATE invoice_tbl 
    SET user_id=?,invoice_details=?, client_id=?, invoice_amount=?, paid_amount=?, balance_amount=?, extra_amount=?,
        payment_status=?,payment_method=?, invoice_date=?,followup_date=?,due_date=?,  notes=? 
    WHERE id = ?;
  `;

    const values = [
      invoice.user_id,
      JSON.stringify(invoice.invoice_details),
      invoice.client_id,
      invoice.invoice_amount,
      invoice.paid_amount,
      invoice.balance_amount,
      invoice.extra_amount,
      invoice.payment_status,
      invoice.payment_method,
      invoice.invoice_date,
      invoice.followup_date,
      invoice.due_date,
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
  getInvoicesBetweenDates: async (start_date, end_date) => {
    const query = ` SELECT i.*, c.name AS client_name, c.company_name
    FROM invoice_tbl i
    JOIN client_tbl c ON i.client_id = c.id
      WHERE invoice_date BETWEEN ? AND ? AND i.is_deleted = 0`;
    const [rows] = await pool.query(query, [start_date, end_date]);
    return rows;
  },
  async getTotalInvoice() {
    const sql = `SELECT COUNT(*) AS count FROM invoice_tbl  WHERE is_deleted = 0 `
    const [rows] = await pool.query(sql);
    return rows[0].count;
  },
  async findById(client_id, invoice_id) {
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
    const { user_id, client_id, invoice_id, paid_amount, payment_date, payment_method, payment_status, followup_date, notes } = data;
    const query = `INSERT INTO invoice_payment_tbl 
       (user_id,client_id, invoice_id, paid_amount,payment_date, payment_method, payment_status,followup_date, notes)
       VALUES (?,?, ?, ?, ?, ?, ?, ?, ?)`
    const values = [
      user_id, client_id, invoice_id, paid_amount, payment_date, payment_method, payment_status, followup_date, notes,];
    const [result] = await pool.query(query, values);
    return result;
  },

  async getInvoiceById(invoice_id) {
    const [rows] = await pool.query(
      `SELECT id, invoice_amount, paid_amount, balance_amount FROM invoice_tbl 
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

    const { paid_amount, balance_amount, payment_status, id } = updateInvoiseData

    const query = `UPDATE invoice_tbl 
       SET paid_amount = ?, balance_amount = ?,  payment_status = ?
       WHERE id = ? AND is_deleted = 0`
    const [result] = await pool.query(query, [paid_amount, balance_amount, payment_status, id]
    );
    return result;
  }
};

module.exports = ClientModel;

