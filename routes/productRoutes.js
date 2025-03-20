const express = require('express');
const {createProduct, editProduct, deleteProduct, getProducts, getUserProducts} = require('../controllers/productController');
const upload = require('../middlewares/upload');
const authProtect = require('../middlewares/auth')
const router = express.Router();

router.get('/', authProtect, getProducts);
router.post('/create', upload.single("product_image"), authProtect, createProduct);
router.put('/edit', upload.single("product_image"), authProtect, editProduct);
router.delete('/delete', authProtect, deleteProduct);
router.get('/user-products', authProtect, getUserProducts);

module.exports = router;