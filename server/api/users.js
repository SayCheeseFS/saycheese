const router = require('express').Router()
const {User, Order_Product, Order, Product} = require('../db/models')
module.exports = router

// create the cart for current user
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
    let cart = await Order.findOrCreate({
      where: {userId: user.id, isCart: true}
    })
    const orderId = cart[0].id
    const newItem = await Product.findById(req.body.productId)
    await Order_Product.findOrCreate({
      where: {
        orderId,
        productId: newItem.id,
        price: newItem.price
      }
    })
    cart = await Order.findById(orderId, {include: [{model: Product}]})
    console.log(cart.id)
    res.send(cart)
  } catch (err) {
    next(err)
  }
})

// getting cart from the server
router.get('/cart', async (req, res, next) => {
  if (req.user) {
    try {
      let user = req.user
      let cart = await Order.findAll({
        where: {isCart: true, userId: user.id},
        include: [{model: Product}]
      })
      console.log(cart[0].id, cart[0].products)
      res.json(cart[0])
    } catch (err) {
      next(err)
    }
  } else {
    res.send({products: []})
  }
})

// updating product quantity
router.put('/cart', async (req, res, next) => {
  try {
    let user = req.user
    let productId = req.body.productId
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

// delete product from cart
router.delete('/cart/:productId', async (req, res, next) => {
  const productId = Number(req.params.productId)
  try {
    // check if there is a cart and if there is an item in it
    let cart = await Order.findAll({
      where: {isCart: true, userId: req.user.id},
      include: [{model: Product}]
    })
    cart = cart[0]
    const orderId = cart.id
    if (cart.products) {
      const checkProduct = cart.products.some(
        product => product.id === productId
      )
      if (checkProduct) {
        await Order_Product.destroy({where: {orderId, productId}})
      }
    }
    cart = await Order.findById(orderId, {include: [{model: Product}]})
    res.json(cart)
  } catch (err) {
    next(err)
  }
})
