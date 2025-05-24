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
    }
};

module.exports = ExpenseController;
