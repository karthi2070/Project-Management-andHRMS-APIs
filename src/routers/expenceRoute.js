const express = require('express');
const ExpenseController = require('../controllers/expenceController');

const router = express.Router();

router.post('/create-expense', ExpenseController.createExpense);
router.get('/get-expense-list', ExpenseController.getAllExpenses);
router.get('/get-expense-id/:id', ExpenseController.getExpenseById);
router.put('/update-expense/:id', ExpenseController.updateExpense);
router.patch('/delete-expense/:id', ExpenseController.softDeleteExpense);
router.get('/get-expens-by-filter', ExpenseController.filterExpenses);
router.post('/create-status', ExpenseController.create);
router.get('/get-by-id-status/:id', ExpenseController.getById);
router.get('/get-all-status', ExpenseController.getAll);
router.put('/update-status/:id', ExpenseController.update);
router.patch('/delete-status/:id', ExpenseController.softDelete);
// router.get('/expense/get-filtered-expenses', ExpenseController.getFilteredExpenses);


module.exports = router;
