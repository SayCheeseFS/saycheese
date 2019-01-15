import axios from 'axios';

/**
 * ACTION TYPES
 */
const SET_ORDERS = 'SET_ORDERS';

/**
 * INITIAL STATE
 */
const initialState = {orders: []};

/**
 * ACTION CREATORS
 */
const setOrders = orders => ({type: SET_ORDERS, orders});

/**
 * THUNK CREATORS
 */

// get all products thunk
export const fetchOrders = userId => async dispatch => {
  try {
    const res = await axios.get(`/api/users/${userId}`);
    dispatch(setOrders(res.data));
  } catch (err) {
    console.error(err);
  }
};

/**
 * REDUCER
 */
export default function(state = initialState, action) {
  switch (action.type) {
    case SET_ORDERS:
      return {...state, orders: action.orders};
    default:
      return state;
  }
}
