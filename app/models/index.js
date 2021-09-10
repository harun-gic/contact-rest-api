const User = require("./user.model");
const Contact = require("./contact.model");
const dbConfig = require("../config/db_config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.mysql.DB, dbConfig.mysql.USER, dbConfig.mysql.PASSWORD, {
    host: dbConfig.mysql.HOST,
    dialect: dbConfig.mysql.dialect,
    operatorAliases: false,
});

const userModel = new User(sequelize, Sequelize);
const contactModel = new Contact(sequelize, Sequelize);
const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.contacts = contactModel.getContact();
db.user = userModel.getUser();


module.exports = db;