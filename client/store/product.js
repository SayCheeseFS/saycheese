import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GOT_ALL_PRODUCTS = 'GOT_ALL_PRODUCTS'
const GOT_SINGLE_PRODUCT = 'GOT_SINGLE_PRODUCT'
// const REMOVE_PRODUCT = 'REMOVE_PRODUCT'

/**
 * INITIAL STATE
 */
const defaultProduct = {products: [{}], product: {}}

/**
 * ACTION CREATORS
 */
const gotAllProducts = products => ({type: GOT_ALL_PRODUCTS, products})
const gotSingleProduct = product => ({type: GOT_SINGLE_PRODUCT, product})
// const removeProduct = () => ({type: REMOVE_PRODUCT})

/**
 * THUNK CREATORS
 */

// get all products thunk
export const getAllProducts = () => async dispatch => {
  try {
    const res = await axios.get('/api/products')
    dispatch(gotAllProducts(res.data || defaultProduct))
  } catch (err) {
    console.error(err)
  }
}

// get single product thunk
export const getSingleProduct = productId => async dispatch => {
  try {
    const res = await axios.get(`/api/products/${productId}`)
    dispatch(gotSingleProduct(res.data || defaultProduct))
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
export default function(state = defaultProduct, action) {
  switch (action.type) {
    case GOT_ALL_PRODUCTS:
      return {...state, products: action.products}
    case GOT_SINGLE_PRODUCT:
      return {...state, product: action.product}
    default:
      return state
  }
}
