import catchAsyncErrors from '../middlewares/catchAsyncErrors.js';
import productsModel from '../models/productsModel.js';
import ErrorHandler from '../utils/errorHandler.js';

// Obtener todos los productos
export const getProducts = catchAsyncErrors(async (req, res, next) => {
	try {
		const products = await productsModel.find();
		if (!products) {
			return next(new ErrorHandler('Producto no encontrado', 404));
		}
		res.status(200).json({
			success: true,
			count: products.length,
			products: products,
			data: products.map((product) => {
				return {
					_id: product._id,
					name: product.name,
					price: product.price,
					request: {
						type: 'GET',
						url: 'http://localhost:4000/api/product/' + product._id,
					},
				};
			}),
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			error: 'Error en el servidor',
		});
	}
});

// Obtener un producto por id
export const getProductById = catchAsyncErrors(async (req, res, next) => {
	try {
		const product = await productsModel.findById(req.params.id);
		if (!product) {
			return next(new ErrorHandler('Producto no encontrado', 404));
		}
		res.status(200).json({
			success: true,
			product: product,
			data: product,
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			error: 'Error en el servidor',
		});
	}
});

// Creando productos
export const newProduct = catchAsyncErrors(async (req, res, next) => {
	// try {
	const product = await productsModel.create(req.body);
	res.status(201).json({
		success: true,
		data: product,
	});
	// } catch (error) {
	// 	res.status(500).json({
	// 		success: false,
	// 		error: 'Error en el servidor',
	// 	});
	// }
});

// Actualizar un producto
export const updateProduct = catchAsyncErrors(async (req, res, next) => {
	try {
		let product = await productsModel.findById(req.params.id);
		if (!product) {
			return next(new ErrorHandler('Producto no encontrado', 404));
		}
		// Si el producto si existe, entonces se actualiza
		product = await productModel.findByIdAndUpdate(req.params.id, product, {
			new: true,
			runValidators: true,
		});
		res.status(200).json({
			success: true,
			data: product,
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			error: 'Error en el servidor',
		});
	}
});

// Eliminar un producto
export const deleteProduct = catchAsyncErrors(async (req, res, next) => {
	try {
		const product = await productsModel.findByIdAndRemove(req.params.id);
		if (!product) {
			return next(new ErrorHandler('Producto no encontrado', 404));
		}
		res.status(200).json({
			success: true,
			data: {
				message: 'Producto eliminado',
				id: product.id,
				name: product.name,
			},
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			error: 'Error en el servidor',
		});
	}
});
