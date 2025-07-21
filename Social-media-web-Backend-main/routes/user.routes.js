const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth.middleware');
const { getUserProfile, updateProfile, getUserById } = require('../controllers/user.Controller');
const upload = require('../middleware/upload.middleware');

// Get current user's profile (authenticated)
router.get('/profile', auth, getUserProfile);

// Update current user's profile (authenticated)
router.put('/profile', auth, upload.single('profile_picture'), updateProfile);

// Get any user by ID (authenticated)
router.get('/:id', auth, getUserById);

module.exports = router;