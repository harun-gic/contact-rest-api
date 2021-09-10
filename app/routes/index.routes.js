module.exports = app => {
    const contacts = require("../controllers/contact.controller");
    const auth = require("../controllers/auth.controller");
    const authMiddle = require("../middleware/authmiddleware");
    const jwt = require("jsonwebtoken");
    const Redis = require("ioredis");
    const redis = new Redis();

    const validator = require("express-validator");

    let router = require("express").Router();
    

    // Route Login
    router.post("/login", validator.body("username").isLength({min:5}).withMessage("Username minimal 5 karakter"), validator.body("password")
    .isLength({min:4}).withMessage("Password minimal 4 karakter"), auth.login);

    //Route Register
    router.post("/register", validator.body("username").isLength({min:5}).withMessage("Username minimal 5 karakter"), validator.body("password")
    .isLength({min:4}).withMessage("Password minimal 4 karakter"), auth.register);


    // membuat kontak baru
    router.post("/buat", authMiddle.checkToken, contacts.create);

    // melihat daftar seluruh kontak
    router.get("/daftar", authMiddle.checkToken, contacts.findAll);

    // ubah kontak
    router.put("/ubah/:id", authMiddle.checkToken, contacts.update);

    // menghapus kontak
    router.delete("/hapus/:id", authMiddle.checkToken, contacts.delete);

    app.use("/api/contacts", router);
}