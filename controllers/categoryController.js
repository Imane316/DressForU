const db = require('../models/index');
const Category = db.Category;
const DressCategory = db.DressCategory;



exports.categories = async function (req, res) {
    await Category.findAll({ attributes: ['idcategory','name'] })
        .then(data => {
            console.log("All Categories:", JSON.stringify(data, null, 2));
            res.json(data);
            console.log(data);
        })
        .catch(err => {
            res.status(500).json({ message: err.message })
        })
  }
  
  
  exports.getCategoryById = async function (req, res) {
    await Category.findOne({  where: { idCategory: req.params.idcategory } })
        .then(data => {
            console.log(" Category:", JSON.stringify(data, null, 2));
            res.json(data);
        })
        .catch(err => {
            res.status(500).json({ message: err.message })
        })
  }
  exports.addCategory = async function (req, res) {
    let category = Category.build({ name: req.body.name })
    await category.save()
        .then(data => {
            console.log(category.toJSON());
            res.json(data);
        })
        .catch(err => {
            res.status(500).json({ message: err.message })
        })
  }
  exports.updateCategory = async function (req, res) {
      await Category.update(
      { name: req.body.name },
      { where: { idCategory: req.params.idcategory} }
      )
      .then(data => {
      res.json(data);
      })
      .catch(err => {
      res.status(500).json({ message: err.message })
      })
  }
  exports.deleteCategory = async function (req, res) {
    Category.destroy({ where: { idCategory: req.params.idcategory } })
    .then(data => {
    res.json(data);
    })
    .catch(err => {
    res.status(500).json({ message: err.message })
    })
  }
  exports.getDressIdsByCategoryId = async function (req, res) {
    const categoryId = req.params.idcategory;
  
    try {
      const dressCategories = await DressCategory.findAll({
        where: {
          idcategory: categoryId,
        },
      });
  
      const dressIds = dressCategories.map((dressCategory) => dressCategory.iddress);
      res.json({ dressIds });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  






