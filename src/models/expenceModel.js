const pool = require('../config/db');

const ExpenseModel = {
    async createExpense(data) {
        try {
            const sql = `INSERT INTO expense_tbl (user_id,date, category_id, amount, bill_img, description) 
                         VALUES (?, ?, ?, ?, ?,?)`;
            const [result] = await pool.query(sql, Object.values(data));
            return { id: result.insertId, ...data };
        } catch (error) {
            throw error;
        }
    },

    async getAllExpenses() {
            const sql = `SELECT * FROM expense_tbl WHERE is_deleted = 0`;
            const [expenses] = await pool.query(sql);

        if (expenses.length === 0) return null;

        const formatedresponce =(expenses).map((expense) => {

        const dateObj = new Date(expense.date);
        const day = String(dateObj.getDate()).padStart(2, '0');
        const month = String(dateObj.getMonth() + 1).padStart(2, '0');
        const year = dateObj.getFullYear();
        expense.date = `${day}-${month}-${year}`;

        return expense;
        })  
        return formatedresponce
    },

    async getExpenseById(id) {
        const sql = `SELECT * FROM expense_tbl WHERE id = ? AND is_deleted = 0`;
        const [expenses] = await pool.query(sql, [id]);

        if (expenses.length === 0) return null;

        const expense = expenses[0];

        const dateObj = new Date(expense.date);
        const day = String(dateObj.getDate()).padStart(2, '0');
        const month = String(dateObj.getMonth() + 1).padStart(2, '0');
        const year = dateObj.getFullYear();
        expense.date = `${day}-${month}-${year}`;

        return expense;

    },

    async updateExpense(id, data) {
        try {
            const sql = `UPDATE expense_tbl SET user_id=?,date=?, category_id=?, amount=?, bill_img=?, description=? 
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
            sql += ` AND category_id = ? `;;
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

        const [expenses] = await pool.query(sql, queryParams);
        if (expenses.length === 0) return null;

        const formatedresponce =(expenses).map((expense) => {

        const dateObj = new Date(expense.date);
        const day = String(dateObj.getDate()).padStart(2, '0');
        const month = String(dateObj.getMonth() + 1).padStart(2, '0');
        const year = dateObj.getFullYear();
        expense.date = `${day}-${month}-${year}`;

        return expense;
        })  
        return formatedresponce
    

    },

    async getFilteredExpenses (startDate, endDate, category)  {

  let filterQuery = `SELECT * FROM expense_tbl WHERE date BETWEEN ? AND ?`;
  const params = [startDate, endDate];

  if (category) {
    filterQuery += ` AND category_id = ?`;
    params.push(category);
  }

  const [expenses] = await pool.query(filterQuery, params);

  // Total & average
  const totalExpense = expenses.reduce((sum, exp) => sum + parseFloat(exp.amount), 0);
  const averageExpense = expenses.length ? (totalExpense / expenses.length).toFixed(2) : 0;

  let highestCategory = null;
  let highestAmount = 0;

  if (!category) {
    // Group by category and find highest
    const categoryTotals = {};
    expenses.forEach(exp => {
      categoryTotals[exp.category] = (categoryTotals[exp.category] || 0) + parseFloat(exp.amount);
    });

    for (const [cat, amt] of Object.entries(categoryTotals)) {
      if (amt > highestAmount) {
        highestCategory = cat;
        highestAmount = amt;
      }
    }
  } else {
    // Category is provided, just return total amount of that category
    highestCategory = category;
    highestAmount = totalExpense;
  }

  return {
    filtered_expenses: expenses,
    total_expense: totalExpense,
    average_expense: averageExpense,
    highest_expense_category: highestCategory,
    highest_expense_amount: highestAmount
  };
    },
 


//expences status

  async create(status_name) {
    const [result] = await pool.execute(
      'INSERT INTO expense_status_tbl (status_name) VALUES (?)',
      [status_name]
    );
    return { id: result.insertId, status_name };
  },

  async update(id, status_name) {
    await pool.execute(
      'UPDATE expense_status_tbl SET status_name = ? WHERE id = ? AND is_deleted = 0',
      [status_name, id]
    );
  },

  async getAll() {
    const [rows] = await pool.execute(
      'SELECT * FROM expense_status_tbl WHERE is_deleted = 0'
    );
    return rows;
  },

  async getById(id) {
    const [rows] = await pool.execute(
      'SELECT * FROM expense_status_tbl WHERE id = ? AND is_deleted = 0',
      [id]
    );
    return rows[0];
  },

  async softDelete(id) {
    await pool.execute(
      'UPDATE expense_status_tbl SET is_deleted = 1 WHERE id = ?',
      [id]
    );
  }
};


module.exports = ExpenseModel;

