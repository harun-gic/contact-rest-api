class Contact {
    constructor(sequelize, Sequelize) {
        this.sequelize = sequelize;
        this.Sequelize = Sequelize;
    }
    getContact() {
        const Contact = this.sequelize.define("contacts", {
        nama: {
            type: this.Sequelize.STRING,
            unique: true,
        },
        no_hp: {
            type: this.Sequelize.STRING
        },
        email: {
            type: this.Sequelize.STRING,
            validate: {
                isEmail: {
                    args: true,
                    msg: "Format Email tidak Benar",
                },
            },
            unique: true,
        }
    });

    return Contact;
    }
}
module.exports = Contact;