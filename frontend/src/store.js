import {applyMiddleware, combineReducers, createStore} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import {productDetailsReducer, productsReducer} from './reducer/productReducer';

const reducer = combineReducers({
	products: productsReducer,
	productDetails: productDetailsReducer,
});

let initialState = {};

const middleware = [thunk];
const store = createStore(
	reducer,
	initialState,
	composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
