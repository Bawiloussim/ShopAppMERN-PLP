const express = require('express');
const { register, login, getProfile, verifyToken } = require('../controllers/authController');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.post('/Register', register);
router.post('/Login', login);
router.get('/profile', protect, getProfile);
router.get('/verify', protect, verifyToken);

module.exports = router;