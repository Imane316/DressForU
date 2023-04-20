//let user = require('../models/userModel');
//let connection = require('../db');
const db = require('../models/index');
const User = db.User;


const jwt = require('jsonwebtoken');
const jwtKey = 'my_secret_key';
const jwtExpirySeconds = 300;

isAuthorized = async (req, res) => {
    if (typeof req.headers.authorization !== "undefined") {
      // retrieve the authorization header and parse out the JWT using the split function
      let token = req.headers.authorization.split(" ")[1];
      // Here we validate that the JSON Web Token is valid
      jwt.verify(token, 'my_secret_key', (err, payload) => {
      if (err) {
      res.status(401).json({ error: "Not Authorized" });
      }
      req.user = payload; // allow to use the user id in the controller
      console.log(req.user);
      return next(); }); }
  }

exports.userList = async function (req, res) {
    await User.findAll({ attributes: ['iduser','pseudo', 'role'] })
        .then(data => {
            console.log("All users:", JSON.stringify(data, null, 2));
            res.json(data);
        })
        .catch(err => {
            res.status(500).json({ message: err.message })
        })
  }
  
  
  exports.userNew = async function (req, res) {
    let user = User.build({ pseudo: req.body.pseudo, password: req.body.password, role: req.body.role })
    await user.save()
        .then(data => {
            console.log(user.toJSON());
            res.json(data);
        })
        .catch(err => {
            res.status(500).json({ message: err.message })
        })
  }




















/*exports.userList = (req, res) => {
    //res.json({'test': 'test'})
    connection.query("SELECT * FROM dressforu.user;", function (err, result){
        if(err){
            console.log(err);
            res.status(400).json({'message': err});
        }
        res.status(200).json(result);
    });
}

exports.userNew = (req, res) => {
    let user = {"lastname":req.body.lastname, "firstname" : req.body.firstname};
    console.log('new');
    connection.query("INSERT INTO dressforu.user SET ?;", user, function(err, result){
        if (err){
            console.log(err);
            res.status(400).json({'message': err});
        }
        res.status(200).json({'message': 'success'});
    });
}
exports.user = (req, res) => {
    let i = req.params.i;
    connection.query("SELECT * FROM dressforu.user WHERE iduser = ?;", i, function(err, result) 
    {
        if (err){
            console.log(err);
        }
        res.json(result);
    });
}

exports.userUpdate = (req,res)=>{
    let i = req.body.iduser; 
    let user = {"lastname": req.body.lastname, "firstname":req.body.firstname};
    connection.query("UPDATE dressforu.user SET ? where iduser = ?", [user, i], function(err, result)
    {
        if (err){
            console.log(err);
        }
        res.status(200).json({'message':'success'});
    });
}
exports.userDelete = (req,res)=>{
    let i = req.params.i;  //recupere le num de l'utilisateur à supp
    connection.query("DELETE FROM dressforu.user where iduser = ?", i, function(err, result)
    {
        if (err){
            console.log(err);
        }
        res.status(200).json({'message':'success'});
    });
}*/