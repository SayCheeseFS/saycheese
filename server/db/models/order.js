const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  isCart: {
    type: Sequelize.BOOLEAN,
    defaultValue: true
  },
  shipDate: {
    type: Sequelize.DATE,
    defaultValue: null
  },
  deliveryDate: {
    type: Sequelize.DATE,
    defaultValue: null
  }
})

module.exports = Order
