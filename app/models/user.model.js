class User {
    constructor(sequelize, Sequelize) {
        this.sequelize = sequelize;
        this.Sequelize = Sequelize;
    }
    getUser() {
        const User = this.sequelize.define("user", {
        username: {
            type: this.Sequelize.STRING,
        },
        password: {
            type: this.Sequelize.STRING,
        },
        token: {
            type: this.Sequelize.STRING,
        },
        role: {
            type: this.Sequelize.STRING,
            validate: {
                isIn: [['user', 'admin']],
            },
        },
    });

    return User;
    }
}
module.exports = User;