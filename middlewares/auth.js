const jwt = require('jsonwebtoken');
const User = require('../models/User')

const authProtect = async(req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try {
            token = req.headers.authorization.split(' ')[1];
			const decoded = jwt.verify(token, process.env.ACCESS_JWT_SECRET);

            req.auth = await User.findById(decoded.id).select("-password");
            next();
        } catch (error) {
            return res.status(401).json({ message: 'Not Authorized' });
        }

    } else {
        return res.status(401).json({ message: 'No Token Available' });
    }
}

module.exports = authProtect;