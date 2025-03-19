const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
	{
		product_name: { type: String, required: true, unique: true },
		description: { type: String, required: true },
		price: { type: Number, required: true },
		category: { type: String, required: true },
		brand: { type: mongoose.Schema.Types.ObjectId, ref: 'Brand', required: true },
		product_image: { type: String, required: true, default: '' },
		added_by: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
	},
	{ timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } },
);

module.exports = Product = mongoose.model('products', productSchema);