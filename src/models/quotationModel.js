const pool = require('../config/db');

const QuotationModel = {
    async createQuotation(data) {

            const sql = `INSERT INTO quotation_tbl (employee_id, client_name, client_mail, project, amount, date) 
                         VALUES (?, ?, ?, ?, ?, ?)`;
                        
                         const amount=data.amount +  (data.amount*0.18) ;
                         console.log("amount",amount);
            const values = [ data.employee_id, data.client_name, data.client_mail, data.project, amount, data.date]
            const [result] = await pool.query(sql, values);
            return { id: result.insertId, ...data };
        
    },

    async getAllQuotations() {
        try {
            const sql = `SELECT * FROM quotation_tbl WHERE is_deleted = 0`;
            const [quotations] = await pool.query(sql);
            return quotations;
        } catch (error) {
            throw error;
        }
    },

    async getQuotationById(id) {
        try {
            const sql = `SELECT * FROM quotation_tbl WHERE id = ? AND is_deleted = 0`;
            const [quotations] = await pool.query(sql, [id]);
            return quotations[0] || null;
        } catch (error) {
            throw error;
        }
    },

    async updateQuotation(id, data) {
        try {
            const sql = `UPDATE quotation_tbl SET employee_id=?, client_name=?, client_mail=?, project=?, amount=?, date=? 
                         WHERE id = ? AND is_deleted = 0`;
            await pool.query(sql, [...Object.values(data), id]);
            return { id, ...data };
        } catch (error) {
            throw error;
        }
    },

    async softDeleteQuotation(id) {
        try {
            const sql = `UPDATE quotation_tbl SET is_deleted = 1 WHERE id = ?`;
            await pool.query(sql, [id]);
            return { id, deleted: true };
        } catch (error) {
            throw error;
        }
    }
};

module.exports = QuotationModel;
