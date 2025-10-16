const { body } = require('express-validator');

exports.registerValidation = [
  body('name').notEmpty().withMessage('Name required'),
  body('email').isEmail().withMessage('Valid email required'),
  body('password').isLength({ min: 6 }).withMessage('Password min 6 chars'),
];

exports.loginValidation = [
  body('email').isEmail().withMessage('Valid email required'),
  body('password').exists().withMessage('Password required'),
];
