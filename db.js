const Sequelize = require('sequelize')
const sequelize = new Sequelize(
    'dressforu', 
    'root',
    'root', {
    dialect: 'mysql',
    host: 'localhost',
    port: '3306'
   }
);


module.exports = sequelize


