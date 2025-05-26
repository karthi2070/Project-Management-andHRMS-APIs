const pool = require('../config/db');

const ClientModel = {
    async createClient(data) {
        console.log("Creating client with data:", data);
        const sql = `INSERT INTO client_tbl (name, company_name, clientid, mail, phone1, phone2, phone3, gst_num, address, city , state ,pincode) 
                     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ? , ?, ?, ?)`;
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
        const sql = `UPDATE client_tbl SET name=?, company_name=?, clientid=?, mail=?, phone1=?, phone2=?, phone3=?, gst_num=?, address=? ,
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
     async createInvoice(invoice) {
   // invoice.balance_amount = invoice.invoice_amount - (invoice.paid_amount || 0);
    // invoice.invoice_date = new Date(invoice.invoice_date);
        const query = `INSERT INTO invoice_tbl
        (client_id, invoice_number, invoice_amount, paid_amount, balance_amount, invoice_date, due_date, payment_method, notes)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`

    const [result] = await pool.query(query,Object.values(invoice));
        return result.insertId;
  },
  async update(id, invoice) {
   
     const query = `UPDATE invoice_tbl SET client_id=?, invoice_number=?, invoice_amount=?, paid_amount=?,  balance_amount =?,invoice_date=?, due_date=?, payment_method=?, notes=? WHERE id = ?`,
     values = [   invoice.client_id,
        invoice.invoice_number,
        invoice.invoice_amount,
        invoice.paid_amount,
        invoice.balance_amount ,
        invoice.invoice_date,
        invoice.due_date,
        invoice.payment_method,
        invoice.notes,
        id]
       const [result] = await pool.query(query, values);
    return result.affectedRows;
  },

   async findAllincoice() {
    const query=`SELECT * FROM invoice_tbl WHERE is_deleted = 0`
    const [rows] = await pool.query(query);
    return rows;
  },

   async findById(id) {
    const query = `SELECT * FROM invoice_tbl WHERE id = ? AND is_deleted = 0 `
    const [rows] = await pool.query(query, [id]);
    return rows[0];
  },

  async findByInvoiseNum(inoice_number) {
    const query = `SELECT * FROM invoice_tbl WHERE invoice_number = ? AND is_deleted = 0 `
    const [rows] = await pool.query(query, [inoice_number]);
    return rows[0];
  },

  async findByInvoiseclintId(clientId) {

    const query = `select * FROM invoice_tbl as i
     join client_tbl as c on i.client_id =c.id WHERE i.client_id = ? AND i.is_deleted = 0 `
    const [rows] = await pool.query(query, [clientId]);
    return rows;
  },
   async softDelete(id) {
    const query = `UPDATE invoice_tbl SET is_deleted = 1 WHERE id = ?`;
    const [result] = await pool.query(query, [id]);
    return result.affectedRows;
  }

};

module.exports = ClientModel;

// const db = require('../db/db');

// const InvoiceModel = {
//   async createInvoice(invoice) {
//     const [result] = await db.query(
//       `INSERT INTO invoice_tbl
//         (client_id, invoice_number, invoice_amount, paid_amount, balance_amount, invoice_date, due_date, payment_method, notes)
//        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
//       [
//         invoice.client_id,
//         invoice.invoice_number,
//         invoice.invoice_amount,
//         invoice.paid_amount || 0,
//         invoice.invoice_date,
//         invoice.due_date,
//         invoice.payment_method,
//         invoice.notes
//       ]
//     );
//     return result.insertId;
//   },

//   async findAll() {
//     const [rows] = await db.query(`SELECT * FROM invoices WHERE is_deleted = 1`);
//     return rows;
//   },

//   async findById(id) {
//     const [rows] = await db.query(`SELECT * FROM invoices WHERE id = ? AND is_deleted IS NULL`, [id]);
//     return rows[0];
//   },

//   async update(id, invoice) {
//     const [result] = await db.query(
//       `UPDATE invoices SET client_id=?, invoice_number=?, invoice_amount=?, paid_amount=?, invoice_date=?, due_date=?, payment_method=?, notes=? WHERE id = ?`,
//       [
//         invoice.client_id,
//         invoice.invoice_number,
//         invoice.invoice_amount,
//         invoice.paid_amount,
//         invoice.invoice_date,
//         invoice.due_date,
//         invoice.payment_method,
//         invoice.notes,
//         id
//       ]
//     );
//     return result.affectedRows;
//   },

//   async softDelete(id) {
//     const [result] = await db.query(`UPDATE invoices SET is_deleted = 1 WHERE id = ?`, [id]);
//     return result.affectedRows;
//   }
// };

// module.exports = InvoiceModel;
