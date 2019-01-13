import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const ADD_PRODUCT_TO_CART = 'ADD_PRODUCT_TO_CART'
const GET_CART = 'GET_CART'
const DELETE_PRODUCT_FROM_CART = 'DELETE_PRODUCT_FROM_CART'
const UPDATE_PRODUCT_IN_CART = 'UPDATE_PRODUCT_IN_CART'

/**
 * INITIAL STATE
 */
const defaultCart = {
  cart: {
    products: []
  }
}

/**
 * ACTION CREATORS
 */
const addProductToCart = cart => ({
  type: ADD_PRODUCT_TO_CART,
  payload: cart
})

const getCart = cart => ({
  type: GET_CART,
  payload: cart
})

const deleteProductFromCart = cart => ({
  type: DELETE_PRODUCT_FROM_CART,
  payload: cart
})

const updateProductInCart = cart => ({
  type: UPDATE_PRODUCT_IN_CART,
  payload: cart
})

/**
 * THUNK CREATORS
 */

// get all products thunk
export const setProductToCart = productId => async dispatch => {
  try {
    const res = await axios.post(`/api/users/cart`, {productId})
    dispatch(addProductToCart(res.data))
  } catch (err) {
    console.error(err)
  }
}

// get cart from server thunk
export const setCart = () => async dispatch => {
  try {
    const res = await axios.get(`/api/users/cart`)
    dispatch(getCart(res.data))
  } catch (err) {
    console.log(err)
  }
}

// delete Product from cart thunk
export const setProductOnCart = productId => async dispatch => {
  try {
    const res = await axios.delete(`/api/users/cart/${productId}`)
    dispatch(deleteProductFromCart(res.data))
  } catch (err) {
    console.log(err)
  }
}

// update Product quantity from the cart thunk
export const updateProductQuantity = (
  productId,
  quantity
) => async dispatch => {
  try {
    const res = await axios.put(`/api/users/cart/`, {productId, quantity})
    dispatch(updateProductInCart(res.data))
  } catch (err) {
    console.log(err)
  }
}

/**
 * REDUCER
 */
export default function(state = defaultCart, action) {
  switch (action.type) {
    case ADD_PRODUCT_TO_CART:
      return {...state, cart: action.payload}
    case GET_CART:
      return {...state, cart: action.payload}
    case DELETE_PRODUCT_FROM_CART:
      return {...state, cart: action.payload}
    case UPDATE_PRODUCT_IN_CART:
      return {...state, cart: action.payload}
    default:
      return state
  }
}
