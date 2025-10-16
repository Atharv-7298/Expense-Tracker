const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const upload = require('../middleware/upload');
const { getProfile, updateProfile } = require('../controllers/userController');

// GET logged-in profile
router.get('/profile', protect, getProfile);

// Update profile (can include new profileImage)
router.put('/profile', protect, upload.single('profileImage'), updateProfile);

module.exports = router;
