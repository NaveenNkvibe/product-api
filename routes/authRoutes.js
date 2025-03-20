const express = require('express');
const {register, login, refreshAccessToken} = require('../controllers/authController')
const upload = require('../middlewares/upload');
const { validateUserRegistration, validateUserLogin } = require('../middlewares/validation');
const router = express.Router();

router.post('/register', upload.single('profile_photo'), validateUserRegistration, register); // Define register route
router.post('/login', validateUserLogin, login); // Define login route
router.post('/refresh', refreshAccessToken); // Define refresh route

module.exports = router;