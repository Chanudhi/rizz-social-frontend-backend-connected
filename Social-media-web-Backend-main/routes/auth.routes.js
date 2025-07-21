const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/auth.Controller');
const upload = require('../middleware/upload.middleware');

router.post('/register', upload.single('profile_picture'), register); // Add middleware for single file upload
router.post('/login', login);

module.exports = router;
