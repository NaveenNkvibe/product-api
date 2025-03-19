const User = require('../models/User');
const { generateAccessToken, generateRefreshToken} = require('../utils/generateToken');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

module.exports = {
    register: async(req, res) => {
        const {username, email, password} = req.body;

        try {
            const userExist = await User.findOne({email});
            if(userExist) return res.status(401).json({message: "User Already Exsist"});

            const user = new User({username, email, password});
            await user.save();

            res.status(200).json({message: "User Registered Successfully"});
        } catch (error) {
            res.status(500).json({messgae: "Server Error", error: error.message});
        }
    },

    login: async(req, res)=>{
        const {email, password} = req.body;

        try{

            const user = await User.findOne({email});
            if(!user) return res.status(401).json({message: "Invalid User"});

            const comparePassword = await bcrypt.compare(password, user.password);
            if (!comparePassword) return res.status(401).json({ message: 'Invalid User' });

            const accessToken = await generateAccessToken(user);
            const refreshToken = await generateRefreshToken(user);

            res.cookie('token', refreshToken, { httpOnly: true, secure: true });
            res.status(200).json({ message: 'User Logged In Successfully', result: {accessToken} });
        } catch(error) {
            res.status(500).json({ messgae: 'Server Error', error: error.message });
        }
    },

    refreshAccessToken: async (req, res) => {
        const refreshToken = req.cookies.token;

        if (!refreshToken) return res.status(401).json({ message: "No Refresh Token Provided" });

        try {
            const decoded = await jwt.verify(refreshToken, process.env.REFRESH_JWT_SECRET);

            const user = await User.findById(decoded.id);
			if (!user) return res.status(401).json({ message: 'Invalid User' });

            const newAccessToken = await generateAccessToken(user);

            res.status(200).json({ message: 'New Access Token Generated', result: { newAccessToken } });
        } catch (error) {
            res.status(401).json({ message: 'Invalid Refresh Token', error: error.message });
        }
    }
}