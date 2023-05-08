const Sequelize = require('sequelize')
const sequelize = require('../db.js');
const Category = require('./categoryModel');

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.Dress = require('./dressModel');
db.User = require('./userModel');
db.Category = require('./categoryModel');


db.Category.hasMany(db.Dress, { foreignKey: "idcategory" });
db.Dress.hasOne(db.Category , { foreignKey: "iddress" });
db.User.belongsToMany(db.Dress, {
    through: "linkUDs",
    as: "users",
    foreignKey: "iduser",
});
db.Dress.belongsToMany(db.User, {
    through: "linkUDs",
    as: "dresses",
    foreignKey: "iddress",
});

module.exports = db