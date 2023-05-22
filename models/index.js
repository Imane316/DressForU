const Sequelize = require('sequelize')
const sequelize = require('../db.js');
const db = {};
const Category = require('./categoryModel');
db.Dress = require('./dressModel');
db.User = require('./userModel');
db.Category = require('./categoryModel');
db.DressCategory = require('./DressCategory.js')

db.Sequelize = Sequelize;
db.sequelize = sequelize;




db.Category.hasMany(db.Dress, { foreignKey: "idcategory" }); //ajoute une clé étrangère "idcategory" à la table Dress
db.Dress.hasOne(db.Category , { foreignKey: "iddress" });// ajoute une clé étrangère "iddress" à la table Category
// belongstomany :relation de beaucoup à beaucoup entre les tables "Category" et "Dress" à l'aide 
//d'une table intermédiaire "DressCategory" qui contient les clés étrangères "idcategory" et "iddress"
db.Category.belongsToMany(db.Dress, {
    through: "DressCategory",
    as: "categoryDresses", //alias doit être diff/unique pour chaque association
    //dresses était déjà utilisé par belongstomany pour faire référence aux robes associées à une catégorie.
    foreignKey: "idcategory",
});
db.Dress.belongsToMany(db.Category, {
    through: "DressCategory",
    as: "dressCategories",
    foreignKey: "iddress",
});

module.exports = db