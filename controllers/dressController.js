const db = require('../models/index');
const Dress = db.Dress;


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
  