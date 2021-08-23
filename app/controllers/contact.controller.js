const db = require("../models");
const Contact = db.contacts;
const Op = db.Sequelize.Op;

// Create contact
exports.create = (req, res) => {
    // kondisi request
    if (!req.body.nama) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return ;
    }
    // tambah kontak
    const contact = {
        nama: req.body.nama,
        no_hp: req.body.no_hp,
        email: req.body.email
    };

    // tambah kontak ke mysql
    Contact.create(contact)
        .then((data) => {
            res.send(data);
        }).catch((err) => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Contact."
            })
        });
};

// get all contact
exports.findAll = (req, res) => {
    const nama = req.query.nama;
    let condition = nama ? { nama: { [Op.like]: `%${nama}%` } } : null;

    Contact.findAll({ where: condition })
        .then((data) => {
            res.send(data);
        }).catch((err) => {
            res.status(500).send({
                message:
                    err.message || "Some error occured while find contact"
            });
        });
};


// edit contact
exports.update = (req, res) => {
    const id = req.params.id;

    Contact.update(req.body, {
        where: { id: id }
    }).then((result) => {
        if ( result == 1 ) {
            res.send({
                message: "Contact was updated successfully"
            });
        } else {
            res.send({
                message: `Cannot update Contact with id=${id}.`
            })
        }
    }).catch((err) => {
        res.status(500).send({
            message: "Error updating contact with id=" + id
        })
    });
};

// delete contact by id
exports.delete = (req, res) => {
    const id = req.params.id;

    Contact.destroy({
        where: { id: id }
    }).then((result) => {
        if (result == 1) {
            res.send({
                message: "Contact was deleted successfully"
            })
        } else {
            res.send({
                message: `Cannot delete contact with id=${id}`
            })
        }
    }).catch((err) => {
        res.status(500).send({
            message: "Could not delete contact with id=" + id
        })
    });
};
