const pool = require('../config/db');

const ClientModel = {
    
      async getClientCount() {
        const sql = `SELECT COUNT(*) AS count FROM client_tbl`;
        const [rows] = await pool.query(sql);
        console.log(rows[0].count)
        return rows[0].count;
    },
    async createClient(data) {
        const sql = `INSERT INTO client_tbl (user_id,name, company_name, client_id, mail, phone1, phone2, phone3, gst_num, address, city , state ,pincode) 
                     VALUES (?,?, ?, ?, ?, ?, ?, ?, ?, ? , ?, ?, ?)`;
        const [result] = await pool.query(sql, Object.values(data));
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

    async updateClient(id, data) {
        console.log (data)
        const sql = `UPDATE client_tbl SET user_id=?,name=?, company_name=?, client_id=?, mail=?, phone1=?, phone2=?, phone3=?, gst_num=?, address=? ,
                    city =? , state = ? ,pincode= ? WHERE id = ? AND is_deleted = 0`;
        await pool.query(sql, [...Object.values(data), id]);
        return { id, ...data };
    },

    async softDeleteClient(id) {
        const sql = `UPDATE client_tbl SET is_deleted = 1 WHERE id = ?`;
        await pool.query(sql, [id]);
        return { id, deleted: true };
    },
    //invoise
    // id, client_id, invoice_number, invoice_amount, paid_amount, balance_amount, extra_amount, status_id,
    //  invoice_date, due_date, payment_method, notes, is_deleted, created_at, updated_at
async createInvoice(invoice) {

  const query = `
    INSERT INTO invoice_tbl
    (user_id,client_id, invoice_number, invoice_amount, paid_amount, balance_amount, extra_amount, invoice_date, due_date, payment_method, notes)
    VALUES ( ?,?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  const values = [
    invoice.user_id,invoice.client_id,
    invoice.invoice_number,
    invoice.invoice_amount,
    invoice.paid_amount || 0.00,
    invoice.balance_amount || invoice.invoice_amount, // if full balance
    invoice.extra_amount || 0.00,
    invoice.invoice_date,
    invoice.due_date,
    invoice.payment_method,
    invoice.notes
  ];

  const [result] = await pool.query(query, values);
  return result.insertId;
},
async update(id, invoice) {
  const query = `
    UPDATE invoice_tbl 
    SET user_id=?, client_id=?, invoice_number=?, invoice_amount=?, paid_amount=?, balance_amount=?, extra_amount=?,
        status_id=?, invoice_date=?, due_date=?, payment_method=?, notes=? 
    WHERE id = ?;
  `;

  const values = [
    invoice.user_id,
    invoice.client_id,
    invoice.invoice_number,
    invoice.invoice_amount,
    invoice.paid_amount,
    invoice.balance_amount,
    invoice.extra_amount, 
    invoice.status_id,
    invoice.invoice_date,
    invoice.due_date,
    invoice.payment_method,
    invoice.notes,
    id
  ];

  const [result] = await pool.query(query, values);
  return result;
}
,

   async findAllincoice() {
    const query=`SELECT * FROM invoice_tbl WHERE is_deleted = 0`
    const [rows] = await pool.query(query);
    return rows;
  },

   async findById(client_id,invoice_id) {
    console.log(client_id,invoice_id)
    const query = `SELECT * FROM invoice_tbl WHERE client_id = ? AND id = ? AND is_deleted = 0 `
    const [rows] = await pool.query(query, [client_id,invoice_id]);
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

async  insertPayment (data)  {
    const {user_id, client_id, invoice_id, payment_amount,payment_date, payment_method, payment_status, notes, extra_amount } = data;
    const [result] = await pool.query(
      `INSERT INTO invoice_payment_tbl 
       (user_id,client_id, invoice_id, payment_amount,payment_date, payment_method, payment_status, notes, extra_amount)
       VALUES (?,?, ?, ?, ?, ?, ?,?, ?)`,
      [user_id,client_id, invoice_id, payment_amount,payment_date, payment_method, payment_status, notes, extra_amount]
    );
    return result;
  },

 async getInvoiceById (invoice_id)  {
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
       async findEMIPymentInvoiceById(invoice_id,id) {

    const query = `SELECT * FROM invoice_payment_tbl WHERE invoice_id = ? AND id = ? AND is_deleted = 0 `
    const [rows] = await pool.query(query, [invoice_id,id]);
    return rows;
  },

 async updateInvoiceTotals (updateInvoiseData)  {

  const {user_id,paid_amount,balance_amount,extra_amount,status_id,id } =updateInvoiseData
    
     const query = `UPDATE invoice_tbl 
       SET user_id =?,paid_amount = ?, balance_amount = ?, extra_amount=?, status_id = ?, updated_at = NOW()
       WHERE id = ? AND is_deleted = 0`
      const [result] = await pool.query(query,[user_id,paid_amount, balance_amount, extra_amount,status_id, id]
    );
    return result;
  }



};

module.exports = ClientModel;

