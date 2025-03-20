const express = require('express');
const {createBrand, getUserBrands} = require('../controllers/brandController');
const upload = require('../middlewares/upload');
const authProtect = require('../middlewares/auth')
const router = express.Router();

router.post('/create', upload.single('brand_logo'), authProtect, createBrand);
router.get('/user-brands', authProtect, getUserBrands);

module.exports = router;