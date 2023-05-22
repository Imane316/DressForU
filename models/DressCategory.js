const Sequelize = require('sequelize');
const db = require('../db.js');
const Dress = require('./dressModel');
const Category = require('./categoryModel');

const DressCategory = db.define('dresscategory', {
    
  iddress: {
    type: Sequelize.INTEGER,
    references: {
      model: Dress,
      key: 'iddress',
    },
    allowNull: false,
  },
  idcategory: {
    type: Sequelize.INTEGER,
    references: {
      model: Category,
      key: 'idcategory',
    },
    allowNull: false,
  },
});

module.exports = DressCategory;