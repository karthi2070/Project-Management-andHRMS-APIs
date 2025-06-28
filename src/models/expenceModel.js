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

    const formatedresponce = (expenses).map((expense) => {

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

async getFilteredExpenses(startDate, endDate, category_id) {

  let categoryName = null;

  if (category_id) {
    const category = await this.getById(category_id);
    if (!category) {
      
      // Category ID not found
      return {
        filtered_expenses: [],
        total_expense: 0,
        average_expense: 0,
        highest_expense_category: null,
        highest_expense_amount: 0
      };
    }
    categoryName = category.name;
  }

  console.log('Resolved Category Name:', categoryName);

  let filterQuery = `
    SELECT e.*, c.name AS category_name
    FROM expense_tbl e
    JOIN expense_category_tbl c ON e.category_id = c.id
    WHERE e.date BETWEEN ? AND ?
  `;

  const params = [startDate, endDate];

  if (category_id) {
    filterQuery += ` AND e.category_id = ?`;
    params.push(category_id);
  }

  const [expenses] = await pool.query(filterQuery, params);

  // Total & average
  const totalExpense = expenses.reduce((sum, exp) => sum + parseFloat(exp.amount), 0);
  const averageExpense = expenses.length ? (totalExpense / expenses.length).toFixed(2) : 0;

  let highestCategory = null;
  let highestAmount = 0;

  if (!category_id) {
    // Group by category_name and find highest
    const categoryTotals = {};
    expenses.forEach(exp => {
      categoryTotals[exp.category_name] =
        (categoryTotals[exp.category_name] || 0) + parseFloat(exp.amount);
    });

    for (const [cat, amt] of Object.entries(categoryTotals)) {
      if (amt > highestAmount) {
        highestCategory = cat;
        highestAmount = amt;
      }
    }
  } else {
    highestCategory = categoryName;
    highestAmount = totalExpense;
  }

  return {
    filtered_expenses: expenses,
    category_name:categoryName,
    total_expense: totalExpense,
    average_expense: averageExpense,
    highest_expense_category: highestCategory,
    highest_expense_amount: highestAmount
  };
},
  //expences status
async getById(id) {
  const [rows] = await pool.execute(
    'SELECT * FROM expense_category_tbl WHERE id = ? AND is_deleted = 0',
    [id]
  );
  return rows; // this returns a single object
},
  async create(name) {
    const [result] = await pool.execute(
      'INSERT INTO expense_category_tbl (name) VALUES (?)',
      [name]
    );
    return { id: result.insertId, name };
  },

  async update(id, name) {
    await pool.execute(
      'UPDATE expense_category_tbl SET name = ? WHERE id = ? AND is_deleted = 0',
      [name, id]
    );
  },

  async getAll() {
    const [rows] = await pool.execute(
      'SELECT * FROM expense_category_tbl WHERE is_deleted = 0'
    );
    return rows;
  },


  async softDelete(id) {
    await pool.execute( 'UPDATE expense_category_tbl SET is_deleted = 1 WHERE id = ?', [id] );
  }
};


module.exports = ExpenseModel;

