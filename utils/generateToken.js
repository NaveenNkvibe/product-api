const jwt = require('jsonwebtoken');

module.exports = {
    generateAccessToken: async (user) => {
        const accessToken = await jwt.sign({id: user._id}, process.env.ACCESS_JWT_SECRET, {expiresIn: "15m"});
        return accessToken;
    },

    generateRefreshToken: async (user) => {
        const refreshToken = await jwt.sign({ id: user._id }, process.env.REFRESH_JWT_SECRET, { expiresIn: '7d' });
        return refreshToken;
    }
}