const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth.middleware');
const { getUserProfile, updateProfile } = require('../controllers/user.Controller');
const upload = require('../middleware/upload.middleware');

router.get('/profile', auth, getUserProfile);
router.put('/profile', auth, upload.single('profile_picture'), updateProfile);

module.exports = router;