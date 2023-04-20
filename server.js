let express = require('express');

let app = express();
app.use(express.json()); //express decode correctement les données json qu'il reçoit (body)

//Importing the database model
const Sequelize = require('sequelize');
const db = require('./db.js');

// Creating all the tables defined in agency
db.sync({alter: true})
router = require('./routes');
app.use('/', router);


app.listen(8880,function(){
    console.log('Running on port 8880')
})

