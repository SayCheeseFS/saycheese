const router = require('express').Router()
const {Product} = require('../db/models')
module.exports = router

//CG: I would make it go from most general products route to more specific.
//If the order of your routes matter, you're doing something wrong.

router.get('/:productId', async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.productId)
    res.json(product)
  } catch (err) {
    next(err)
  }
})

// /cookies?productType=camera  --> req.query
router.get('/', async (req, res, next) => {
  try {
    const products = await Product.findAll({
      // CG: Get rid of these comments.
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
    })
    res.json(products)
  } catch (err) {
    next(err)
  }
})
