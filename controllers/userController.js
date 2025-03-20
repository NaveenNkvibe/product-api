const User = require('../models/User');
const bcrypt = require('bcrypt');

module.exports = {
	getUser: async (req, res) => {
		const id = req.auth._id; // Fetch _id from req.auth
		try {
			const user = await User.findById(id); // Fetch data by Id
			if (!user) return res.status(401).json({ message: 'User Not Found' });

			return res.status(200).json({ message: 'User Details Fetched Successfully', result: user }); // Return response
		} catch (error) {
			return res.status(500).json({ message: 'Server Error', error: error.message }); // Return response
		}
	},
	deleteUser: async (req, res) => {
		const id = req.auth._id; // Fetch _id from req.auth
		try {
			await User.findByIdAndDelete(id); // Find user by Id and delete it
			return res.status(200).json({ message: 'User Deleted Successfully' }); // Return response
		} catch (error) {
			return res.status(500).json({ message: 'Server Error', error: error.message }); // Return response
		}
	},
	editUser: async (req, res) => {
		const id = req.auth._id; // Fetch _id from req.auth
		const { username, email, password } = req.body; // Fetch all data from body

		try {
			const user = await User.findById(id); // Find User by Id
			if (!user) return res.status(401).json({ message: 'Invalid User' });

			if (username) user.username = username; // Set new username
			if (email) user.email = email; // Set new email
			if (password) {
				const salt = await bcrypt.genSalt(10);
				user.password = await bcrypt.hash(password, salt);
			} // Set new password

			await user.save(); // Save new data to DB
			return res.status(200).json({ message: 'User Updated Successfully', result: user }); // Return response
		} catch (error) {
			return res.status(500).json({ message: 'Server Error', error: error.message }); // Return response
		}
	},

	blockUser: async (req, res) => {
		const id = req.auth._id; // Fetch _id from req.auth
		const { blockUser } = req.body; // Fetch all data from body

		try {
			const user = await User.findById(id); // Find User by Id
			if (!user) return res.status(401).json({ message: 'Invalid User' });

			if (user.blocked.includes(blockUser)) {
				return res.status(401).json({ message: 'User Is Already Blocked' });
			} // Check if blockUser Id is already present in blocked field

			user.blocked.push(blockUser); // Push new blockUser data to blocked field array
			await user.save(); // Save new data to DB

			return res.status(200).json({ message: 'User Blocked Successfully', result: user }); // Return response
		} catch (error) {
			return res.status(500).json({ message: 'Server Error', error: error.message }); // Return response
		}
	},

	unBlockUser: async (req, res) => {
		const id = req.auth._id; // Fetch _id from req.auth
		const { blockUser } = req.body; // Fetch all data from body

		try {
			const user = await User.findById(id); // Fetch data by User Id
			if (!user) return res.status(401).json({ message: 'Invalid User' });

			if (!user.blocked.includes(blockUser)) {
				return res.status(401).json({ message: 'User Is Not Blocked' });
			} // Check if blockUser Id is already not present in blocked field

			user.blocked = user.blocked.filter((id) => id.toString() !== blockUser); // Filter out blockUser data from blocked field array
			await user.save(); // Save new data to DB

			return res.status(200).json({ message: 'User Unblocked Successfully', result: user }); // Return response
		} catch (error) {
			return res.status(500).json({ message: 'Server Error', error: error.message }); // Return response
		}
	},
};