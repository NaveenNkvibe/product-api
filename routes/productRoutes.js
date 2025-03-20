const express = require('express');
const {createProduct, editProduct, deleteProduct, getProducts, getUserProducts} = require('../controllers/productController');
const upload = require('../middlewares/upload');
const authProtect = require('../middlewares/auth')
const router = express.Router();

router.get('/', authProtect, getProducts); // Define list product route
router.post('/create', upload.single("product_image"), authProtect, createProduct); // Define create product route
router.put('/edit', upload.single("product_image"), authProtect, editProduct); // Define edit product route
router.delete('/delete', authProtect, deleteProduct); // Define delete product route
router.get('/user-products', authProtect, getUserProducts); // Define list all user's product route

module.exports = router;