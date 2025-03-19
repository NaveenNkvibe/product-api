const express = require('express');
const {createProduct, editProduct, deleteProduct, getProducts, getUserProducts} = require('../controllers/productController');
const authProtect = require('../middlewares/auth')
const router = express.Router();

router.get('/', authProtect, getProducts);
router.post('/create', authProtect, createProduct);
router.put('/edit', authProtect, editProduct);
router.delete('/delete', authProtect, deleteProduct);
router.get('/user-products', authProtect, getUserProducts);

module.exports = router;