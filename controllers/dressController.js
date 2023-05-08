const db = require('../models/index');
const Dress = db.Dress;
const User = db.User;
const jwt = require('jsonwebtoken');
const jwtKey = 'my_secret_key';
const jwtExpirySeconds = 200;

exports.dresses = async function (req, res) {
    await Dress.findAll({ attributes: ['iddress','name', 'picture'] })
        .then(data => {
            console.log("All dresses:", JSON.stringify(data, null, 2));
            res.json(data);
        })
        .catch(err => {
            res.status(500).json({ message: err.message })
        })
  }
  
  exports.getDressByName = async function (req, res) {
    await Dress.findOne({  where: { name: req.params.namedress } })
        .then(data => {
            console.log(" Dress:", JSON.stringify(data, null, 2));
            res.json(data);
        })
        .catch(err => {
            res.status(500).json({ message: err.message })
        })
  }
  
  exports.getDressByCategory = async function (req, res) {
    await Dress.findOne({  where: { category: req.params.categorydress } })
        .then(data => {
            console.log(" Dress:", JSON.stringify(data, null, 2));
            res.json(data);
        })
        .catch(err => {
            res.status(500).json({ message: err.message })
        })
  }
  
    exports.getDressById = async function (req, res) {
    await Dress.findOne({  where: { iddress: req.params.iddress } })
        .then(data => {
            console.log(" Dress:", JSON.stringify(data, null, 2));
            res.json(data);
        })
        .catch(err => {
            res.status(500).json({ message: err.message })
        })
  }
  
  
  exports.addDress = async function (req, res) {
    let dress = Dress.build({ name: req.body.name, picture: req.body.picture, price: req.body.price, material: req.body.materail, cat: req.body.cat, size: req.body.size })
    await dress.save()
        .then(data => {
            console.log(dress.toJSON());
            res.json(data);
        })
        .catch(err => {
            res.status(500).json({ message: err.message })
        })
  }
  
  exports.updateDress = async function (req, res) {
    await Dress.update(
    { name: req.body.name, picture: req.body.picture, price: req.body.price, material: req.body.materail, cat: req.body.cat, size: req.body.size },
    { where: { iddress: req.params.iddress} }
    )
    .then(data => {
    res.json(data);
    })
    .catch(err => {
    res.status(500).json({ message: err.message })
    })
  }
  
  
  
  exports.deleteDress = async function (req, res) {
    Dress.destroy({ where: { iddress: req.params.iddress } })
    .then(data => {
    res.json(data);
    })
    .catch(err => {
    res.status(500).json({ message: err.message })
    })
  }
    //rajouter la robe à la liste fav du fournisseur 

  exports.SaveDress = async function (req, res) {
    const iddress = req.body.iddress;
    const iduser = req.user.id;
    return Dress.findByPk(iddress)
      .then((dress) => {
        if (!dress) {
          console.log("Dress not found!");
          res.json({ message: "Dress not found!" });
        }
        return User.findByPk(iduser).then((user) => {
          if (!user) {
            console.log("User not found!");
            res.json({ message: "User not found!" });
          }
          user.addDress(dress);
          console.log(">> added Dress id=${dress.id} to user id=${user.id}");
          res.json({ message: 'La robe a été ajoutée' });
        });
      })
      .catch((err) => {
        console.log(">> Error while adding Tutorial to Tag: ", err);
      })}

