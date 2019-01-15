const Sequelize = require('sequelize');
const db = require('../db');

const Order_Product = db.define('order_product', {
  quantity: {
    type: Sequelize.INTEGER,
    defaultValue: 1,
    validate: {
      min: 1
    }
  },
  price: {
    type: Sequelize.INTEGER,
    defaultValue: null,
    validate: {
      min: 1
    }
  }
});

module.exports = Order_Product;
