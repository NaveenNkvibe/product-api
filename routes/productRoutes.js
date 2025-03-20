const express = require('express');
const {createProduct, editProduct, deleteProduct, getProducts, getUserProducts} = require('../controllers/productController');
const upload = require('../middlewares/upload');
const authProtect = require('../middlewares/auth');
const { validateCreateProduct, validateEditProduct } = require('../middlewares/validation');
const router = express.Router();

router.get('/', authProtect, getProducts); // Define list product route
router.post('/create', upload.single("product_image"), authProtect, validateCreateProduct, createProduct); // Define create product route
router.put('/edit', upload.single("product_image"), authProtect, validateEditProduct, editProduct); // Define edit product route
router.delete('/delete', authProtect, deleteProduct); // Define delete product route
router.get('/user-products', authProtect, getUserProducts); // Define list all user's product routes

module.exports = router;