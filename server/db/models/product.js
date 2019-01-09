const Sequelize = require('sequelize')
const db = require('../db')

const Product = db.define('product', {
  //CG: You should also check notEmpty being true.
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  //CG: If there is a limited number of types use ENUM. 
  productType: {
    type: Sequelize.STRING,
    allowNull: false
  },
  description: {
    type: Sequelize.TEXT
  },
  //imageURLs
  images: {
    type: Sequelize.ARRAY(Sequelize.TEXT)
  },
  //CG: Think of price in pennies. Can you have something for -$5
  price: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  //CG: You have a quantity and quantity of 0 is out of stock.
  inStock: {
    type: Sequelize.BOOLEAN,
    defaultValue: true,
    allowNull: false
  },
  brand: {
    type: Sequelize.STRING,
    allowNull: false
  },
  //CG: Knowing current rating isn't enough.
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
