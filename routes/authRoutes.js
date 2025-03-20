const express = require('express');
const {register, login, refreshAccessToken} = require('../controllers/authController')
const upload = require('../middlewares/upload');
const router = express.Router();

router.post('/register', upload.single('profile_photo'), register); // Define register route
router.post('/login', login); // Define login route
router.post('/refresh', refreshAccessToken); // Define refresh route

module.exports = router;