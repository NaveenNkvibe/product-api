const mongoose = require('mongoose');

const brandSchema = new mongoose.Schema(
	{
		brand_name: { type: String, required: true, unique: true },
		brand_logo: { type: String, required: true, default: "" },
		categories: { type: [String], required: true },
		user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
	},
	{ timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } },
);

module.exports = Brand = mongoose.model('brands', brandSchema);