import axios from 'axios';
import history from '../history';

/**
 * ACTION TYPES
 */
const SET_ALL_PRODUCTS = 'SET_ALL_PRODUCTS';
const SET_SINGLE_PRODUCT = 'SET_SINGLE_PRODUCT';
// const REMOVE_PRODUCT = 'REMOVE_PRODUCT'

/**
 * INITIAL STATE
 */
const defaultProduct = {
  products: [],
  product: {}
};

/**
 * ACTION CREATORS
 */
const setAllProducts = products => ({type: SET_ALL_PRODUCTS, products});
const setSingleProduct = product => ({type: SET_SINGLE_PRODUCT, product});
// const removeProduct = () => ({type: REMOVE_PRODUCT})

/**
 * THUNK CREATORS
 */

// get all products thunk
export const fetchAllProducts = () => async dispatch => {
  try {
    const res = await axios.get('/api/products');
    dispatch(setAllProducts(res.data));
  } catch (err) {
    console.error(err);
  }
};

// get single product thunk
export const fetchSingleProduct = productId => async dispatch => {
  try {
    const res = await axios.get(`/api/products/${productId}`);
    dispatch(setSingleProduct(res.data));
  } catch (err) {
    console.error(err);
  }
};

/**
 * REDUCER
 */
export default function(state = defaultProduct, action) {
  switch (action.type) {
    case SET_ALL_PRODUCTS:
      return {...state, products: action.products};
    case SET_SINGLE_PRODUCT:
      return {...state, product: action.product};
    default:
      return state;
  }
}
