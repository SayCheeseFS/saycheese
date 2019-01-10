const router = require('express').Router()
const {User, Order_Product, Order, Product} = require('../db/models')
module.exports = router

router.post('/:userId/cart', async (req, res, next) => {
  let user = {}
  try {
    // check if there is a user
    if (!req.user) {
      user = await User.create()
      req.login(user, err => (err ? next(err) : null))
    }
    // check if there is a cart
    const cart = await Order.findOrCreate({
      where: {userId: user.id, isCart: true}
    })
    const newItem = await Product.findById(req.body.productId)
    await Order_Product.create({
      orderId: cart[0].id,
      productId: newItem.id,
      price: newItem.price
    })
    res.send(cart)
  } catch (err) {
    next(err)
  }
})
