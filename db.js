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


/*var mysql = require("mysql");
//Database connection
var connection = mysql.createConnection({
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: 'root',
    database : 'dressforu'
    
    });

connection.connect(function(error) {
    if (error) console.log(error);
}); 
module.exports = connection;*/