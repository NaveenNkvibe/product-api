const express = require('express');
const {createBrand, getUserBrands} = require('../controllers/brandController');
const upload = require('../middlewares/upload');
const authProtect = require('../middlewares/auth');
const { validateCreateBrand } = require('../middlewares/validation');
const router = express.Router();

router.post('/create', upload.single('brand_logo'), authProtect, createBrand); // Define create brand route
router.get('/user-brands', authProtect, validateCreateBrand, getUserBrands); // Define list all user's brand route

module.exports = router;