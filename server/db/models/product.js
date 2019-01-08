const Sequelize = require('sequelize')
const db = require('../db')

const Product = db.define('product', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  productType: {
    type: Sequelize.STRING,
    allowNull: false
  },
  description: {
    type: Sequelize.TEXT
  },
  images: {
    type: Sequelize.ARRAY(Sequelize.TEXT)
  },
  price: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  inStock: {
    type: Sequelize.BOOLEAN,
    defaultValue: true,
    allowNull: false
  },
  brand: {
    type: Sequelize.STRING,
    allowNull: false
  },
  rating: {
    type: Sequelize.INTEGER,
    defaultValue: null
  },
  discount: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  }
})

module.exports = Product
