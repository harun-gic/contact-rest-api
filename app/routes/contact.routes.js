module.exports = app => {
    const contacts = require("../controllers/contact.controller.js");

    let router = require("express").Router();

    // membuat kontak baru
    router.post("/buat", contacts.create);

    // melihat daftar seluruh kontak
    router.get("/daftar", contacts.findAll);

    // ubah kontak
    router.put("/ubah/:id", contacts.update);

    // menghapus kontak
    router.delete("/hapus/:id", contacts.delete);

    app.use("/api/contacts", router);
}