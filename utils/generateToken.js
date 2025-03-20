const jwt = require('jsonwebtoken');

module.exports = {
	generateAccessToken: async (user) => {
		const accessToken = await jwt.sign({ id: user._id }, process.env.ACCESS_JWT_SECRET, { expiresIn: '15m' });
		return accessToken;
	}, // Generate Access Token and set expiry time to 15 minutes

	generateRefreshToken: async (user) => {
		const refreshToken = await jwt.sign({ id: user._id }, process.env.REFRESH_JWT_SECRET, { expiresIn: '7d' });
		return refreshToken;
	}, // Generate RefreshToken and set expiry time to 7 days
};