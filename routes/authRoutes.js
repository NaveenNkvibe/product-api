const express = require('express');
const {register, login, refreshAccessToken} = require('../controllers/authController')
const upload = require('../middlewares/upload');
const router = express.Router();

router.post('/register', upload.single('profile_photo'), register);
router.post('/login', login);
router.post('/refresh', refreshAccessToken);

module.exports = router;