const User = require('../models/User');
const { generateAccessToken, generateRefreshToken} = require('../utils/generateToken');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

module.exports = {
    register: async(req, res) => {
		const { username, email, password } = req.body; // Fetch all body data
		const profilePhoto = req.file ? req.file.path : null; // Fetch files data path

		try {
			const userExist = await User.findOne({ email }); // Find user data with email field
			if (userExist) return res.status(401).json({ message: 'User Already Exsist' });

			const user = new User({ username, email, password, profile_photo: profilePhoto }); // Create new user data
			await user.save(); // Save new user to DB

			res.status(200).json({ message: 'User Registered Successfully' }); // Return response
		} catch (error) {
			res.status(500).json({ messgae: 'Server Error', error: error.message }); // Return response
		}
	},

    login: async(req, res)=>{
		const { email, password } = req.body; // Fetch all body data

		try {
			const user = await User.findOne({ email }); // Find user data with email field
			if (!user) return res.status(401).json({ message: 'Invalid User' });

			const comparePassword = await bcrypt.compare(password, user.password); // Check if the provided password is correct
			if (!comparePassword) return res.status(401).json({ message: 'Invalid User' });

			const accessToken = await generateAccessToken(user); // Generate Access Token
			const refreshToken = await generateRefreshToken(user); // Generate Refresh Token

			res.cookie('token', refreshToken, { httpOnly: true, secure: true }); // Create a cookie named "token" in response
			res.status(200).json({ message: 'User Logged In Successfully', result: { accessToken } }); // Return response
		} catch (error) {
			res.status(500).json({ messgae: 'Server Error', error: error.message }); // Return response
		}
	},

    refreshAccessToken: async (req, res) => {
		const refreshToken = req.cookies.token; // Fetch token from cookies

		if (!refreshToken) return res.status(401).json({ message: 'No Refresh Token Provided' });

		try {
			const decoded = await jwt.verify(refreshToken, process.env.REFRESH_JWT_SECRET); // Verify if the token is valid

			const user = await User.findById(decoded.id); // Find user by Id
			if (!user) return res.status(401).json({ message: 'Invalid User' });

			const newAccessToken = await generateAccessToken(user); // Generate Access Token

			res.status(200).json({ message: 'New Access Token Generated', result: { newAccessToken } }); // Return response
		} catch (error) {
			res.status(401).json({ message: 'Invalid Refresh Token', error: error.message }); // Return response
		}
	}
}