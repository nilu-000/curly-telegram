require('dotenv/config');
const {sign, verify} = require('jsonwebtoken');
const PRIVATE_KEY = process.env.PRIVATE_KEY;

module.exports = {
    generateToken: (obj) => {
        return sign(obj, PRIVATE_KEY);
    },

    verifyToken: (token) => {
        return verify(token, PRIVATE_KEY);
    }
}