const ExpenseModel = require('../models/expenceModel');

const ExpenseController = {
    async createExpense(req, res) {
        try {
            const expense = await ExpenseModel.createExpense(req.body);
            res.status(201).json(expense);
        } catch (error) {
            res.status(500).json({ message: 'Error creating expense', error });
        }
    },

    async getAllExpenses(req, res) {
        try {
            const expenses = await ExpenseModel.getAllExpenses();
            res.status(200).json(expenses);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching expenses', error });
        }
    },

    async getExpenseById(req, res) {
        try {
            const expense = await ExpenseModel.getExpenseById(req.params.id);
            if (!expense) {
                return res.status(404).json({ message: 'Expense not found' });
            }
            res.status(200).json(expense);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching expense', error });
        }
    },

    async updateExpense(req, res) {
        try {
            const updatedExpense = await ExpenseModel.updateExpense(req.params.id, req.body);
            res.status(200).json(updatedExpense);
        } catch (error) {
            res.status(500).json({ message: 'Error updating expense', error });
        }
    },

    async softDeleteExpense(req, res) {
        try {
            const deletedExpense = await ExpenseModel.softDeleteExpense(req.params.id);
            res.status(200).json(deletedExpense);
        } catch (error) {
            res.status(500).json({ message: 'Error deleting expense', error });
        }
    },
    async getFilteredExpenses(req, res) {
        try {
            const { category, startDate, endDate, minAmount, maxAmount, keyword } = req.query;
            const filters = { category, startDate, endDate, minAmount, maxAmount, keyword };

            const expenses = await ExpenseModel.getFilteredExpenses(filters);
            res.status(200).json(expenses);
        } catch (error) {
            res.status(500).json({ message: 'Error filtering expenses', error });
        }
    },

   async filterExpenses  (req, res) {
  try {
    const { startDate, endDate, category } = req.query;
    //console.log("Filtering expenses with:", { startDate, endDate, category });


    if (!startDate || !endDate) {
      return res.status(400).json({ message: "start_date and end_date are required." });
    }

    const result = await ExpenseModel.getFilteredExpenses(startDate, endDate, category);
    return res.status(200).json(result);

  } catch (error) {
    console.error("Error filtering expenses:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
    },

    //expence status id
  async create(req, res, next) {
    try {
      const { status_name } = req.body;
      const result = await ExpenseModel.create(status_name);
      res.status(201).json(result);
    } catch (err) {
      next(err);
    }
  },

  async update(req, res, next) {
    try {
      const { id } = req.params;
      const { status_name } = req.body;
      await ExpenseModel.update(id, status_name);
      res.json({ message: 'Status updated' });
    } catch (err) {
      next(err);
    }
  },

  async getAll(req, res, next) {
    try {
      const statuses = await ExpenseModel.getAll();
      res.json(statuses);
    } catch (err) {
      next(err);
    }
  },

  async getById(req, res, next) {
    try {
      const { id } = req.params;
      const status = await ExpenseModel.getById(id);
      res.json(status);
    } catch (err) {
      next(err);
    }
  },

  async softDelete(req, res, next) {
    try {
      const { id } = req.params;
      await ExpenseModel.softDelete(id);
      res.json({ message: 'Status soft-deleted' });
    } catch (err) {
      next(err);
    }
  }
};



module.exports = ExpenseController;
