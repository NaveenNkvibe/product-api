const User = require('../models/User');
const bcrypt = require('bcrypt');

module.exports = {
	getUser: async (req, res) => {
		const id = req.auth._id;
		try {
			const user = await User.findById(id);
			if (!user) return res.status(401).json({ message: 'User Not Found' });

			return res.status(200).json({ message: 'User Details Fetched Successfully', result: user });
		} catch (error) {
			return res.status(500).json({ message: 'Server Error', error: error.message });
		}
	},
	deleteUser: async (req, res) => {
		const id = req.auth._id;
		try {
			await User.findByIdAndDelete(id);
			return res.status(200).json({ message: 'User Deleted Successfully' });
		} catch (error) {
			return res.status(500).json({ message: 'Server Error', error: error.message });
		}
	},
	editUser: async (req, res) => {
		const id = req.auth._id;
		const { username, email, password } = req.body;

		try {
			const user = await User.findById(id);
			if (!user) return res.status(401).json({ message: 'Invalid User' });

			if (username) user.username = username;
			if (email) user.email = email;
			if (password) {
				const salt = await bcrypt.genSalt(10);
				user.password = await bcrypt.hash(password, salt);
			}

			await user.save();
			return res.status(200).json({ message: 'User Updated Successfully', result: user });
		} catch (error) {
			return res.status(500).json({ message: 'Server Error', error: error.message });
		}
	},

	blockUser: async (req, res) => {
		const id = req.auth._id;
		const { blockUser } = req.body;

		try {
			const user = await User.findById(id);
			if (!user) return res.status(401).json({ message: 'Invalid User' });

			if (user.blocked.includes(blockUser)) {
				return res.status(401).json({ message: 'User Is Already Blocked' });
			}

			user.blocked.push(blockUser);
			await user.save();

			return res.status(200).json({ message: 'User Blocked Successfully', result: user });
		} catch (error) {
			return res.status(500).json({ message: 'Server Error', error: error.message });
		}
	},

	unBlockUser: async (req, res) => {
		const id = req.auth._id;
		const { blockUser } = req.body;

		try {
			const user = await User.findById(id);
			if (!user) return res.status(401).json({ message: 'Invalid User' });

			if (!user.blocked.includes(blockUser)) {
				return res.status(401).json({ message: 'User Is Not Blocked' });
			}

			user.blocked = user.blocked.filter((id) => id.toString() !== blockUser);
			await user.save();

			return res.status(200).json({ message: 'User Unblocked Successfully', result: user });
		} catch (error) {
			return res.status(500).json({ message: 'Server Error', error: error.message });
		}
	},
};