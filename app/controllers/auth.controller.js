require('dotenv').config();
const db = require('../models');
const User = db.user;
const jwt = require('jsonwebtoken');
const validator = require('express-validator');
const Redis = require("ioredis");
const redis = new Redis();

class AuthController {
    static login (req, res) {
        const errors = validator.validationResult(req);
        if(!errors.isEmpty()) {
            res.status(400).json({errors: errors.array()});
        }
        const username = req.body.username;
        const password = req.body.password;

        User.findOne({
            where: {
                username:username,
            },
        })
            .then((user) => {
                if(!user) {
                    res.status(401).json({
                        message: "Username atau Password salah!"
                    })
                }
                else if (user.dataValues.password === password) {
                    const userData = user.dataValues;
                    console.log(`Login Berhasil ${userData}`);
                    let token = jwt.sign({ userData }, 'secretkey', {
                        expiresIn: 172800,
                    }); 
                    user.token = token;
                    res.status(200).json({
                        message: "Login Berhasil",
                        token: token,
                        data: user,
                    });
                } else {
                    res.status(401).json({
                        message: "Password Salah!"
                    });
                }
            })
                .catch((err) => {
                    console.log(err);
                });
    }

    static register (req, res) {
        const errors = validator.validationResult(req);
        if(!errors.isEmpty()) {
            res.status(400).json({ errors: errors.array() });
        }
        const username = req.body.username;
        const password = req.body.password;
        const role = req.body.role;

        if (!username || !password) {
            res.status(400).json({
                message: "Username dan Password harus diisi",
            });
            return;
        }

        const user = {
            username: username,
            password: password,
            role:role,
        };
        User.create(user)
            .then(() => {
                res.status(200).json({
                    success: true,
                    message: "Akun berhasil dibuat",
                });
            })
            .catch((err) => {
                console.log("error ", err.errors[0].message);
                res.status(500).json({
                    success: false,
                    message: err.errors[0].message || err.message || "Akun gagal dibuat",
                });
            });
    }

}

module.exports = AuthController;
