const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema(
	{
		username: { type: String, required: true },
		email: { type: String, required: true, unique: true },
		password: { type: String, required: true },
		profile_photo: { type: String, default: '' },
		blocked: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
	},
	{ timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } },
); // Create a user schema

userSchema.pre('save', async function (next) {
	if(!this.isModified('password')) return next();

	const salt = await bcrypt.genSalt(10);
	this.password = await bcrypt.hash(this.password, salt);
	next();
}); // Middleware to hash password before saving to DB

module.exports = User = mongoose.model('users', userSchema);