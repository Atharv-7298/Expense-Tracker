const { body } = require('express-validator');

exports.expenseCreateValidation = [
  body('title').notEmpty().withMessage('Title required'),
  body('amount').isNumeric().withMessage('Amount must be numeric'),
  body('category').notEmpty().withMessage('Category required'),
  body('date').isISO8601().toDate().withMessage('Valid date required'),
];
