const router = require('express').Router()
const {User, Order_Product, Order, Product} = require('../db/models')
module.exports = router

router.post('/cart', async (req, res, next) => {
  let user = {}
  try {
    // check if there is a user
    if (!req.user) {
      user = await User.create()
      req.login(user, err => (err ? next(err) : null))
    } else {
      user = req.user
    }
    // check if there is a cart
    const cart = await Order.findOrCreate({
      where: {userId: user.id, isCart: true}
    })
    const newItem = await Product.findById(req.body.productId)
    await Order_Product.findOrCreate({
      where: {
        orderId: cart[0].id,
        productId: newItem.id,
        price: newItem.price
      }
    })
    res.send(cart[0])
  } catch (err) {
    next(err)
  }
})

router.get('/cart', async (req, res, next) => {
  if (req.user) {
    try {
      let user = req.user
      let cart = await Order.findAll({
        where: {isCart: true, userId: user.id},
        include: [{model: Product}]
      })
      res.json(cart)
    } catch (err) {
      next(err)
    }
  } else {
    res.send({})
  }
})

router.put('/cart', async (req, res, next) => {
  try {
    let user = req.user
    let productId = req.body.productId
    console.log(req.body)
    const order = await Order.findAll({where: {isCart: true, userId: user.id}})
    const cart = await Order_Product.update(
      {quantity: req.body.quantity},
      {
        where: {productId: productId, orderId: order[0].id}
      }
    )
    res.json(cart)
  } catch (err) {
    next(err)
  }
})
