const express = require('express');
const {createBrand, getUserBrands} = require('../controllers/brandController');
const authProtect = require('../middlewares/auth')
const router = express.Router();

router.post('/create', authProtect, createBrand);
router.get('/user-brands', authProtect, getUserBrands);

module.exports = router;