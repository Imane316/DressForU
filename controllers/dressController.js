const db = require('../models/index');
const fs = require ('fs');

const Dress = db.Dress;
const User = db.User;
const Category = db.Category;
const DressCategory = db.DressCategory;

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
    
    console.log(req.body.picture);
    let dress = Dress.build({ name: req.body.name, picture: req.body.picture, price: req.body.price, material: req.body.material, size: req.body.size })
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
    { name: req.body.name, picture: req.body.picture, price: req.body.price, material: req.body.material, cat: req.body.cat, size: req.body.size },
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
      })
  }
  exports.addDressToCategory = async (req, res) => {
    const { idcategory, iddress } = req.params;
  
    try {
      // Vérifier si la robe et la catégorie existent
      const dress = await Dress.findByPk(iddress);
      if (!dress) {
        return res.status(404).json({ message: "La robe n'existe pas" });
      }
      const category = await Category.findByPk(idcategory);
      if (!category) {
        return res.status(404).json({ message: "La catégorie n'existe pas" });
      }
      // Vérifier si le lien existe déjà dans la table DressCategory
      const existingLink = await DressCategory.findOne({ where: { iddress, idcategory } });
      if (existingLink) {
        return res.status(409).json({ message: "Le lien entre la robe et la catégorie existe déjà" });
      }
      // Mettre à jour la robe avec la catégorie correspondante
      dress.idcategory = idcategory;
      await dress.save();
      category.iddress =iddress
      await category.save();
      // Créer un lien entre la robe et la catégorie
      const dresscategory = DressCategory.build({ iddress, idcategory });
      await dresscategory.save();
      res.json(dresscategory);
    } 
    catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
  exports.removeDressFromCategory = async (req, res) => {
    const { idcategory, iddress } = req.params;
  
    try {
      // Vérifier si la robe et la catégorie existent
      const dress = await Dress.findByPk(iddress);
      if (!dress) {
        return res.status(404).json({ message: "La robe n'existe pas" });
      }
      const category = await Category.findByPk(idcategory);
      if (!category) {
        return res.status(404).json({ message: "La catégorie n'existe pas" });
      }
  
      // Supprimer le lien entre la robe et la catégorie
      const deletedLink = await DressCategory.destroy({ where: { iddress, idcategory } });
  
      if (deletedLink) {
        res.json({ message: "Le lien entre la robe et la catégorie a été supprimé avec succès" });
      } else {
        res.status(404).json({ message: "Le lien entre la robe et la catégorie n'a pas été trouvé" });
      }
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
  
 