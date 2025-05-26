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
    }
};

module.exports = ClientModel;
