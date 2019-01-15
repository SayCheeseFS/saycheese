const router = require('express').Router();
const {stripeSecretKey} = process.env;
// require('../../secrets');

const {User, Order, Product} = require('../db/models');

module.exports = router;

const stripe = require('stripe')(stripeSecretKey);
const stripeChargeCallback = res => (stripeErr, stripeRes) => {
  if (stripeErr) {
    res.status(500).send({error: stripeErr});
  } else {
    res.status(200).send({success: stripeRes});
  }
};

router.get('/', async (req, res) => {
  res.send({
    message: 'Hello Stripe checkout server!',
    timestamp: new Date().toISOString()
  });
});

router.post('/', async (req, res) => {
  const card = req.body.token.card;
  const userId = req.params.userId;
  const email = req.body.token.email;

  const body = {
    source: req.body.token.id,
    amount: req.body.amount,
    currency: 'usd'
  };
  stripe.charges.create(body, stripeChargeCallback(res));

  try {
    const findOrder = await Order.findOne({
      where: {isCart: true, userId: req.user.id}
    });
    console.log(findOrder);
    await findOrder.update({
      shippingAddress: card.address_line1,
      isCart: false
    });
    await User.update({email: email}, {where: {id: userId}});

    await Order.findById(findOrder.id, {
      include: [{model: Product}]
    });
  } catch (error) {
    next(error);
  }
});
