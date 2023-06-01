let express = require('express');
const cors = require('cors');
let app = express();
app.use(express.json()); //express decode correctement les données json qu'il reçoit (body)
app.use(cors());

//Import the database model
const Sequelize = require('sequelize');
const db = require('./db.js');

// Creat all the tables 
db.sync({alter: true})
router = require('./routes');
app.use('/', router);


app.listen(8880,function(){
    console.log('Running on port 8880')
})

