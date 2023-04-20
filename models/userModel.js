const Sequelize = require('sequelize')
const db = require('../db.js')

const User = db.define('user', {
    iduser: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    pseudo: { type: Sequelize.STRING, allowNull: false },
    password: { type: Sequelize.STRING, allowNull: false },
    role: { type: Sequelize.STRING, allowNull: false },


})


  

  module.exports = User;