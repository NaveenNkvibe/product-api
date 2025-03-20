const Product = require('../models/Product');
const Brand = require('../models/Brand');
const User = require('../models/User');

module.exports = {
	createProduct: async (req, res) => {
		const id = req.auth._id; // Fetch _id from req.auth
		const { productName, description, price, category, brand } = req.body; // Fetch all data from body
		const productImage = req.file ? req.file.filename : null; // Fetch file from req.file

		try {
			const brandExist = await Brand.findById(brand); // Fetch data by Brand Id
			if (!brandExist) return res.status(401).json({ message: 'Brand Does Not Exist' });

			if (!brandExist.categories.includes(category)) {
				return res.status(401).json({ message: 'Category Does Not Exist In Selected Brand' });
			} // Check if category is included in categories

			const newProduct = new Product({ product_name: productName, description, price, category, brand, product_image: productImage, added_by: id }); // Sets new data to DB
			await newProduct.save(); // Saves new data to DB

			return res.status(200).json({ message: 'Product created successfully', result: { product: newProduct } }); // Return response
		} catch (error) {
			return res.status(500).json({ message: 'Server Error', error: error.message }); // Return response
		}
	},

	editProduct: async (req, res) => {
		const id = req.auth._id; // Fetch _id from req.auth
		const { productName, description, price, category, brand, product_id } = req.body; // Fetch all data from body
		const productImage = req.file ? req.file.filename : null; // Fetch file from req.file

		try {
			const product = await Product.findById(product_id); // Fetch data by Product Id
			if (!product) return res.status(401).json({ message: 'Product Does Not Exist' });

			if (product.added_by.toString() !== id.toString()) {
				return res.status(401).json({ message: 'You Can Only Edit Your Product' });
			} // Ckecks if user created this product

			const brandExist = await Brand.findById(brand); // Fetch data by Brand Id
			if (!brandExist) return res.status(401).json({ message: 'Brand Does Not Exist' });

			if (!brandExist.categories.includes(category)) {
				return res.status(401).json({ message: 'Category Does Not Exist In Selected Brand' });
			} // Check if category is included in categories

			product.product_name = productName; // Set new product name
			product.description = description; // Set new description
			product.price = price; // Set new price
			product.category = category; // Set new category
			product.brand = brand; // Set new brand
			product.product_image = productImage; // Set new product image

			await product.save(); // Save data to DB

			return res.status(200).json({ message: 'Product Updated successfully', result: { updatedProduct: product } }); // Return response
		} catch (error) {
			return res.status(500).json({ message: 'Server Error', error: error.message }); // Return response
		}
	},

    deleteProduct: async (req, res) => {
		const id = req.auth._id; // Fetch _id from req.auth
		const { product_id } = req.body; // Fetch all data from body

		try {
			const product = await Product.findById(product_id); // Fetch data by Product Id
			if (!product) return res.status(401).json({ message: 'Product Does Not Exist' });

			if (product.added_by.toString() !== id.toString()) {
				return res.status(401).json({ message: 'You Can Only Delete Your Product' });
			} // Ckecks if user created this product

			await Product.findByIdAndDelete(product_id); // Fetch Product by Id and delete it

			return res.status(200).json({ message: 'Product Deleted Successfully' }); // Return response
		} catch (error) {
			return res.status(500).json({ message: 'Server Error', error: error.message }); // Return response
		}
	},

	getProducts: async (req, res) => {
		const id = req.auth._id; // Fetch _id from req.auth
		const { sort, brand, category } = req.body; // Fetch all data from body

		try {
			const usersBlockedMe = await User.find({ blocked: id }).select('_id'); // Find User blocked Ids
			const blockedIds = usersBlockedMe.map((user) => user._id); // Array all blocked Ids

			const matchFilter = {
				added_by: { $nin: blockedIds },
			}; // Set math filter

			if (brand) matchFilter.brand = brand; // If brand given, set brand filter
			if (category) matchFilter.category = category; // If category given, set category filter

			const sortedBy = {}; // Set sort value to -1/1 depending on price and product_name fields
			if (sort === 'price_asc') sortedBy.price = 1;
			else if (sort === 'price_desc') sortedBy.price = -1;
			else if (sort === 'name_asc') sortedBy.product_name = 1;
			else if (sort === 'name_desc') sortedBy.product_name = -1;

			const products = await Product.aggregate([
				{ $match: matchFilter },
				{
					$lookup: {
						from: 'brands',
						localField: 'brand',
						foreignField: '_id',
						as: 'brandDetails',
					},
				},
				{ $unwind: '$brandDetails' },
				{ $sort: sortedBy },
			]);

			return res.status(200).json({ message: 'All Products Fetched successfully', result: { products: products } }); // Return response
		} catch (error) {
			return res.status(500).json({ message: 'Server Error', error: error.message }); // Return response
		}
	},

    getUserProducts: async (req, res) => {
		const id = req.auth._id; // Fetch _id from req.auth

		try {
			const products = await Product.find({ added_by: id }).populate('brand', 'brand_name'); // Find product data by Id and add brand obj with brand_name from brand collection
			if (products.length === 0) return res.status(401).json({ message: 'No Products Found' });

			return res.status(200).json({ message: 'All User Products Fetched successfully', result: { products: products } }); // Return response
		} catch (error) {
			return res.status(500).json({ message: 'Server Error', error: error.message }); // Return response
		}
	}
};