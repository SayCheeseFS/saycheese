import {createStore, combineReducers, applyMiddleware} from 'redux';
import createLogger from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';
import user from './user';
import inventory from './product';
import cartObj from './cart';
import orderArr from './order';

const reducer = combineReducers({inventory, user, cartObj, orderArr});
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
);
const store = createStore(reducer, middleware);

export default store;
export * from './order';
export * from './product';
export * from './user';
export * from './cart';
