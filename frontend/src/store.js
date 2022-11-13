import {applyMiddleware, combineReducers, createStore} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import {productDetailsReducer, productsReducer} from './reducer/productReducer';
import { authReducer } from './reducer/userReducer';

const reducer = combineReducers({
	products: productsReducer,
	productDetails: productDetailsReducer,
  auth: authReducer
});

let initialState = {};

const middleware = [thunk];
const store = createStore(
	reducer,
	initialState,
	composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
