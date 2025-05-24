const pool = require('../config/db');

const ExpenseModel = {
    async createExpense(data) {
        try {
            const sql = `INSERT INTO expense_tbl (date, category, amount, bill_img, description) 
                         VALUES (?, ?, ?, ?, ?)`;
            const [result] = await pool.query(sql, Object.values(data));
            return { id: result.insertId, ...data };
        } catch (error) {
            throw error;
        }
    },

    async getAllExpenses() {
        try {
            const sql = `SELECT * FROM expense_tbl WHERE is_deleted = 0`;
            const [expenses] = await pool.query(sql);
            return expenses;
        } catch (error) {
            throw error;
        }
    },

    async getExpenseById(id) {
        try {
            const sql = `SELECT * FROM expense_tbl WHERE id = ? AND is_deleted = 0`;
            const [expenses] = await pool.query(sql, [id]);
            return expenses[0] || null;
        } catch (error) {
            throw error;
        }
    },

    async updateExpense(id, data) {
        try {
            const sql = `UPDATE expense_tbl SET date=?, category=?, amount=?, bill_img=?, description=? 
                         WHERE id = ? AND is_deleted = 0`;
            await pool.query(sql, [...Object.values(data), id]);
            return { id, ...data };
        } catch (error) {
            throw error;
        }
    },

    async softDeleteExpense(id) {
        try {
            const sql = `UPDATE expense_tbl SET is_deleted = 1 WHERE id = ?`;
            await pool.query(sql, [id]);
            return { id, deleted: true };
        } catch (error) {
            throw error;
        }
    },  
    async getFilteredExpenses(filters) {
      let sql = `SELECT * FROM expense_tbl WHERE is_deleted = 0`;
            const queryParams = [];

            if (filters.category) {
                sql += ` AND category LIKE ? `;;
                queryParams.push(filters.category);
            }
            if (filters.startDate && filters.endDate) {
                sql += ` AND date BETWEEN ? AND ?`;
                queryParams.push(filters.startDate, filters.endDate);
            }
            if (filters.minAmount && filters.maxAmount) {
                sql += ` AND amount BETWEEN ? AND ?`;
                queryParams.push(filters.minAmount, filters.maxAmount);
            }

            const [result] = await pool.query(sql, queryParams);
            return result;

    }
};

module.exports = ExpenseModel;

