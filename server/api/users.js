const router = require('express').Router();
const {User, Order_Product, Order, Product} = require('../db/models');
module.exports = router;

// create the cart for current user
router.post('/cart', async (req, res, next) => {
  let user = {};
  try {
    // check if there is a user
    if (!req.user) {
      user = await User.create();
      req.login(user, err => (err ? next(err) : null));
    } else {
      user = req.user;
    }
    // check if there is a cart
    let cart = await Order.findOrCreate({
      where: {userId: user.id, isCart: true}
    });
    const orderId = cart[0].id;
    const newItem = await Product.findById(req.body.productId);
    await Order_Product.findOrCreate({
      where: {
        orderId,
        productId: newItem.id,
        price: newItem.price
      }
    });
    cart = await Order.findById(orderId, {include: [{model: Product}]});
    res.send(cart);
  } catch (err) {
    next(err);
  }
});

// getting cart from the server
router.get('/cart', async (req, res, next) => {
  if (req.user) {
    try {
      let user = req.user;
      let cart = await Order.findAll({
        where: {isCart: true, userId: user.id},
        include: [{model: Product}]
      });
      res.json(cart[0]);
    } catch (err) {
      next(err);
    }
  } else {
    res.send({products: []});
  }
});

// updating product quantity
router.put('/cart', async (req, res, next) => {
  try {
    let user = req.user;
    let productId = req.body.productId;
    const order = await Order.findAll({where: {isCart: true, userId: user.id}});
    let cart = await Order_Product.update(
      {quantity: req.body.quantity},
      {
        where: {productId: productId, orderId: order[0].id}
      }
    );
    cart = await Order.findAll({
      where: {isCart: true, userId: user.id},
      include: [{model: Product}]
    });
    res.json(cart[0]);
  } catch (err) {
    next(err);
  }
});

// delete product from cart
router.delete('/cart/:productId', async (req, res, next) => {
  const productId = Number(req.params.productId);
  try {
    // check if there is a cart and if there is an item in it
    let cart = await Order.findAll({
      where: {isCart: true, userId: req.user.id},
      include: [{model: Product}]
    });
    cart = cart[0];
    const orderId = cart.id;
    if (cart.products) {
      const checkProduct = cart.products.some(
        product => product.id === productId
      );
      if (checkProduct) {
        await Order_Product.destroy({where: {orderId, productId}});
      }
    }
    cart = await Order.findById(orderId, {include: [{model: Product}]});
    res.json(cart);
  } catch (err) {
    next(err);
  }
});

//checkout route and update cart to order (setting isCart to false)
router.put('/:userId/checkout', async (req, res, next) => {
  const {address, email} = req.body;
  const userId = req.params.userId;

  if (req.user.id === Number(req.params.userId)) {
    try {
      const findOrder = await Order.findOne({
        where: {isCart: true, userId: userId}
      });
      await findOrder.update({shippingAddress: address, isCart: false});
      const userEmailUpdate = await User.update(
        {email: email},
        {where: {id: userId}}
      );

      const submittedOrder = await Order.findById(findOrder.id, {
        include: [{model: Product}]
      });
      res.json(submittedOrder);
    } catch (error) {
      next(error);
    }
  } else {
    const userError = new Error('you are not an authorized user');
    next(userError);
  }
});
