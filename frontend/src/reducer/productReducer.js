import {
	ALL_PRODUCTS_FAIL,
	ALL_PRODUCTS_REQUEST,
	ALL_PRODUCTS_SUCCESS,
	CLEAR_ERRORS,
} from '../constants/productConstants';

// es para obtener los productos del back
export const productsReducer = (state = {products: []}, action) => {
	switch (action.type) {
		case ALL_PRODUCTS_REQUEST:
			return {
				loading: true,
				products: [],
			};
		case ALL_PRODUCTS_SUCCESS:
			return {
				loading: false,
				count: action.payload.count,
				data: action.payload.data,
				products: action.payload.products,
			};
		case ALL_PRODUCTS_FAIL:
			return {
				loading: false,
				error: action.payload,
			};
		case CLEAR_ERRORS:
			return {
				...state,
				error: null,
			};
		default:
			return state;
	}
};
