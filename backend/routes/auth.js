const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const { registerValidation, loginValidation } = require('../validators/authValidators');
const { register, login } = require('../controllers/authController');

// register (with optional profile image)
router.post('/register', upload.single('profileImage'), registerValidation, register);

// login
router.post('/login', loginValidation, login);

module.exports = router;
