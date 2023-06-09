let express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
let app = express();

app.use(cors());
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
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

