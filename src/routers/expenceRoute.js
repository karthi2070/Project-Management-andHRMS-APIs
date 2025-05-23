const express = require('express');
const ExpenseController = require('../controllers/expenceController');

const router = express.Router();

router.post('/expense/create-expense', ExpenseController.createExpense);
router.get('/expense/get-expense-list', ExpenseController.getAllExpenses);
router.get('/expense/get-expense-id/:id', ExpenseController.getExpenseById);
router.put('/expense/update-expense/:id', ExpenseController.updateExpense);
router.patch('/expense/delete-expense/:id', ExpenseController.softDeleteExpense);

module.exports = router;
