const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const { addExpense, getAllExpenses, updateExpense, deleteExpense, getSummary } = require('../controllers/expenseController');
const { expenseCreateValidation } = require('../validators/expenseValidators');

// All routes protected
router.post('/add', protect, expenseCreateValidation, addExpense);
router.get('/all', protect, getAllExpenses);
router.put('/:id', protect, updateExpense);
router.delete('/:id', protect, deleteExpense);
router.get('/summary', protect, getSummary);

module.exports = router;
