const Sequelize = require('sequelize')
const db = require('../db.js')

const Dress = db.define('dress', {
    iddress: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: { type: Sequelize.STRING, allowNull: false },
    picture: { type: Sequelize.STRING, allowNull: true },
    price: { type: Sequelize.INTEGER, allowNull: true },
    material: { type: Sequelize.STRING, allowNull: true },
    cat: { type: Sequelize.STRING, allowNull: true },
    size: { type: Sequelize.STRING, allowNull: true },
})

 

module.exports = Dress;