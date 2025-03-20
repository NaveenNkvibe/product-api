const Brand = require('../models/Brand');

module.exports = {
	createBrand: async (req, res) => {
		const id = req.auth._id; // Fetch _id from req.auth
		const { brandName, categories } = req.body; // Fetch all data from body
		const brandLogo = req.file ? req.file.filename : null; // Fetch file from req.file
		try {
			const brandExist = await Brand.findOne({ brandName }); // Find data from Brand with brand name
			if (brandExist) return res.status(401).json({ message: 'Brand Name Already Exist' });

			const newBrand = new Brand({ brand_name: brandName, brand_logo: brandLogo, categories, user_id: id }); // Sets new data to DB
			await newBrand.save(); // Saves new data to DB

			return res.status(200).json({ message: 'Brand created successfully', result: { brand: newBrand } }); // Return response
		} catch (error) {
			return res.status(500).json({ message: 'Server Error', error: error.message }); // Return response
		}
	},

	getUserBrands: async (req, res) => {
		const id = req.auth._id; // Fetch _id from req.auth

		try {
			const brands = await Brand.find({ user_id: id }); // Fetch data by Brand by Id
			if (brands.length === 0) return res.status(401).json({ message: 'No Brand Found' });

			return res.status(200).json({ message: 'All Brands Fetched successfully', result: { brands: brands } }); // Return response
		} catch (error) {
			return res.status(500).json({ message: 'Server Error', error: error.message }); // Return response
		}
	},
};