require('dotenv').config();
const jwt = require("jsonwebtoken");
const Redis = require("ioredis");
const redis = new Redis();

class Auth {
    static checkToken(req, res, next) {
        let x;
        let token = (x = req.header("Authorization")) === null || x === void 0 ? void 0 : x.replace("Bearer ", "");
        console.log("token ", typeof token);
        if (!token) {
            res.status(404).json({
                success: false,
                message: "Silahkan login terlebih dahulu",
            });
        }
        jwt.verify(token, 'secretkey', (err, userJwt) => {
            req.user = userJwt.userData;
            if (err) {
                res.status(401).json({
                    message: "Akun tidak terdaftar",
                });
            }
        });
        next();    
    }

}

module.exports = Auth;