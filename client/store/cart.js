import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const ADD_PRODUCT = 'ADD_PRODUCT'
// const GET_CART = 'GET_CART'
// const UPDATE_CART = 'UPDATE_CART'

/**
 * INITIAL STATE
 */
const defaultCart = {
  cart: []
}

/**
 * ACTION CREATORS
 */
const addProduct = product => ({type: ADD_PRODUCT, payload: product})

/**
 * THUNK CREATORS
 */

// get all products thunk
export const setProductToCart = (userId, productId) => async dispatch => {
  try {
    const res = await axios.post(`/api/users/${userId}/cart`, {productId})
    dispatch(addProduct(res.data))
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
export default function(state = defaultCart, action) {
  switch (action.type) {
    case ADD_PRODUCT:
      return {...state, cart: action.payload}
    default:
      return state
  }
}
