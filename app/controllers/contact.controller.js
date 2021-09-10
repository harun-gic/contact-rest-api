const db = require("../models");
const Contact = db.contacts;
const config = require('../config/db_config');
const redisHelper = require('../helper/redis_helper');
const Redis = require('ioredis');
const redis = new Redis();
const Op = db.Sequelize.Op;

class ContactController{

// Create contact
    static create = (req, res, next) => {
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
    static findAll = async (req, res) => {
        const nama = req.query.nama;
        let condition = nama ? { nama: { [Op.like]: `%${nama}%` } } : null;
        
        await redis.get('contact', async (err, contact) => {
            if(err) {
                res.sendStatus(404);
            }
            if(contact) {
                res.send(JSON.parse(contact)); 
                redis.del('contact');
            }else {
                const contactData = await Contact.findAll({ where: condition })
                redis.set('contact', JSON.stringify(contactData));
                res.json(contactData)
                return;
            }
        });
};
//kalo tabelredisnya ada, hapus lalu buat lagi, kalo gaada, buat baru

// edit contact
    static update = (req, res, next) => {
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
    static delete = (req, res, next) => {
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

    
}
module.exports = ContactController;
