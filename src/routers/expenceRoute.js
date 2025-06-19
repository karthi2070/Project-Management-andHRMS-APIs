const express = require('express');
const ExpenseController = require('../controllers/expenceController');

const router = express.Router();

router.post('/expense/create-expense', ExpenseController.createExpense);
router.get('/expense/get-expense-list', ExpenseController.getAllExpenses);
router.get('/expense/get-expense-id/:id', ExpenseController.getExpenseById);
router.put('/expense/update-expense/:id', ExpenseController.updateExpense);
router.patch('/expense/delete-expense/:id', ExpenseController.softDeleteExpense);
router.get('/expense/get-filtered-expenses', ExpenseController.getFilteredExpenses);
// router.get('/expense/get-expens', ExpenseController.filterExpenses);
router.post('/expense/create-status', ExpenseController.create);
router.get('/expense/get-by-id-status/:id', ExpenseController.getById);
router.get('/expense/get-all-status', ExpenseController.getAll);
router.put('/expense/update-status/:id', ExpenseController.update);
router.patch('/expense/delete-status/:id', ExpenseController.softDelete);



module.exports = router;
