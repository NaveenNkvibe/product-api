const Product = require('../models/Product');
const Brand = require('../models/Brand');
const User = require('../models/User');

module.exports = {
	createProduct: async (req, res) => {
		const id = req.auth._id;
		const { productName, description, price, category, brand, productImage } = req.body;

		try {
			const brandExist = await Brand.findById(brand);
			if (!brandExist) return res.status(401).json({ message: 'Brand Does Not Exist' });

			if (!brandExist.categories.includes(category)) {
				return res.status(401).json({ message: 'Category Does Not Exist In Selected Brand' });
			}

			const newProduct = new Product({ product_name: productName, description, price, category, brand, product_image: productImage, added_by: id });
			await newProduct.save();

			return res.status(200).json({ message: 'Brand created successfully', result: { product: newProduct } });
		} catch (error) {
			return res.status(500).json({ message: 'Server Error', error: error.message });
		}
	},

	editProduct: async (req, res) => {
		const id = req.auth._id;
		const { productName, description, price, category, brand, productImage, product_id } = req.body;

		try {
			const product = await Product.findById(product_id);
			if (!product) return res.status(401).json({ message: 'Product Does Not Exist' });

            if (product.added_by.toString() !== id.toString()) {
				return res.status(401).json({ message: 'You Can Only Edit Your Product' });
			}

            const brandExist = await Brand.findById(brand);
			if (!brandExist) return res.status(401).json({ message: 'Brand Does Not Exist' });

			if (!brandExist.categories.includes(category)) {
				return res.status(401).json({ message: 'Category Does Not Exist In Selected Brand' });
			}

            product.product_name = productName;
			product.description = description;
			product.price = price;
			product.category = category;
			product.brand = brand;
			product.product_image = productImage;

			await product.save();

			return res.status(200).json({ message: 'Product Updated successfully', result: { updatedProduct: product } });
		} catch (error) {
			return res.status(500).json({ message: 'Server Error', error: error.message });
		}
	},

    deleteProduct: async (req, res) => {
        const id = req.auth._id;
        const { product_id } = req.body;
        console.log(product_id);
        try {
            const product = await Product.findById(product_id);
			if (!product) return res.status(401).json({ message: 'Product Does Not Exist' });

			if (product.added_by.toString() !== id.toString()) {
				return res.status(401).json({ message: 'You Can Only Delete Your Product' });
			}

            await Product.findByIdAndDelete(product_id);
            return res.status(200).json({ message: 'Product Deleted Successfully' });
        } catch (error) {
            return res.status(500).json({ message: 'Server Error', error: error.message });
        }
    },

	getProducts: async (req, res) => {
		const id = req.auth._id;
        const { sort, brand, category } = req.body;

		try {
            const usersBlockedMe = await User.find({ blocked: id }).select('_id');
            const blockedIds = usersBlockedMe.map((user) => user._id);

            const matchFilter = {
				added_by: { $nin: blockedIds },
			};

            if (brand) matchFilter.brand = brand;
			if (category) matchFilter.category = category;

            const sortedBy = {};
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

			return res.status(200).json({ message: 'All Products Fetched successfully', result: { products: products } });
		} catch (error) {
			return res.status(500).json({ message: 'Server Error', error: error.message });
		}
	},

    getUserProducts: async (req, res) => {
		const id = req.auth._id;

		try {
            const products = await Product.find({ added_by: id }).populate("brand", "brand_name");
            if (products.length === 0) return res.status(401).json({ message: 'No Products Found' });

            return res.status(200).json({ message: 'All User Products Fetched successfully', result: { products: products } });
        } catch (error) {

        }
    }
};