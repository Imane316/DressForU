const Sequelize = require('sequelize')
const db = require('../db.js')

const Category = db.define('category', {
    idcategory: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: { type: Sequelize.STRING, allowNull: false },
    
})

 

module.exports = Category;