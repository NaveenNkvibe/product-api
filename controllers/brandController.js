const Brand = require('../models/Brand');

module.exports = {
	createBrand: async (req, res) => {
		const id = req.auth._id;
		const { brandName, brandLogo, categories } = req.body;
		try {
			const brandExist = await Brand.findOne({ brandName });
			if (brandExist) return res.status(401).json({ message: 'Brand Name Already Exist' });

			const newBrand = new Brand({ brand_name: brandName, brand_logo: brandLogo, categories, user_id: id });
			await newBrand.save();

			return res.status(200).json({ message: 'Brand created successfully', result: { brand: newBrand } });
		} catch (error) {
			return res.status(500).json({ message: 'Server Error', error: error.message });
		}
	},

	getUserBrands: async (req, res) => {
		const id = req.auth._id;

		try {
			const brands = await Brand.find({ user_id: id });
			if (brands.length === 0) return res.status(401).json({ message: 'No Brand Found' });

			return res.status(200).json({ message: 'All Brands Fetched successfully', result: { brands: brands } });
		} catch (error) {
			return res.status(500).json({ message: 'Server Error', error: error.message });
		}
	},
};