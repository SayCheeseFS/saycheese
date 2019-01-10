import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const ADD_PRODUCT_TO_CART = 'ADD_PRODUCT_TO_CART'
// const GET_CART = 'GET_CART'
// const UPDATE_CART = 'UPDATE_CART'

/**
 * INITIAL STATE
 */
const defaultCart = {
  cart: {}
}

/**
 * ACTION CREATORS
 */
const addProductToCart = product => ({
  type: ADD_PRODUCT_TO_CART,
  payload: product
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

/**
 * REDUCER
 */
export default function(state = defaultCart, action) {
  switch (action.type) {
    case ADD_PRODUCT_TO_CART:
      return {...state, cart: action.payload}
    default:
      return state
  }
}
