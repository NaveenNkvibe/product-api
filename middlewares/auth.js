const jwt = require('jsonwebtoken');
const User = require('../models/User')

const authProtect = async(req, res, next) => {
    let token; // Define token variable
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try {
            token = req.headers.authorization.split(' ')[1]; // Split the token
			const decoded = jwt.verify(token, process.env.ACCESS_JWT_SECRET); // Verify if the token is valid

            req.auth = await User.findById(decoded.id).select("-password"); // Find User by Id
            next();
        } catch (error) {
            return res.status(401).json({ message: 'Not Authorized' }); // Retuen response
        }

    } else {
		return res.status(401).json({ message: 'No Token Available' }); // Retuen response
	}
}

module.exports = authProtect;