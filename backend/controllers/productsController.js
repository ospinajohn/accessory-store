import catchAsyncErrors from '../middlewares/catchAsyncErrors.js';
import productsModel from '../models/productsModel.js';
import APIFeatures from '../utils/apiFeatures.js';
import ErrorHandler from '../utils/errorHandler.js';

// Obtener todos los productos
export const getProducts = catchAsyncErrors(async (req, res, next) => {
	const resPerPage = 5;
	const productsCount = await productsModel.countDocuments();

	const apiFeatures = new APIFeatures(productsModel.find(), req.query)
		.search()
		.filter();

	let productos = await apiFeatures.query;
	let filteredProductsCount = productos.length;
	apiFeatures.pagination(resPerPage);
	productos = await apiFeatures.query.clone();

	res.status(200).json({
		success: true,
		productsCount,
		resPerPage,
		filteredProductsCount,
		productos: productos,
	});
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
	req.body.user = req.user.id;
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
		product = await productsModel.findByIdAndUpdate(req.params.id, product, {
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

// Crear un nuevo review
export const createProductReview = catchAsyncErrors(async (req, res, next) => {
	try {
		const {rating, comment, productId} = req.body;
		const review = {
			user: req.user._id,
			name: req.user.name,
			rating: Number(rating),
			comment,
		};
		const product = await productsModel.findById(productId);
		const isReviewed = product.reviews.find(
			(item) => item.user.toString() === req.user._id.toString()
		);
		if (isReviewed) {
			product.reviews.forEach((review) => {
				if (review.user.toString() === req.user._id.toString()) {
					review.comment = comment;
					review.rating = rating;
				}
			});
		} else {
			product.reviews.push(review);
			product.numOfReviews = product.reviews.length;
		}
		product.ratings =
			product.reviews.reduce((acc, item) => item.rating + acc, 0) /
			product.reviews.length;
		await product.save({validateBeforeSave: false});
		res.status(200).json({
			success: true,
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			error: 'Error en el servidor',
		});
	}
});

// Obtener todos los reviews de un producto
export const getProductReviews = catchAsyncErrors(async (req, res, next) => {
	try {
		const product = await productsModel.findById(req.query.id);
		res.status(200).json({
			success: true,
			reviews: product.reviews,
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			error: 'Error en el servidor',
		});
	}
});

// Eliminar un review
export const deleteReview = catchAsyncErrors(async (req, res, next) => {
	try {
		const product = await productsModel.findById(req.query.productId);
		const reviews = product.reviews.filter(
			(review) => review._id.toString() !== req.query.id.toString()
		);
		const numOfReviews = reviews.length;
		const ratings =
			product.reviews.reduce((acc, item) => item.rating + acc, 0) /
			reviews.length;
		await productsModel.findByIdAndUpdate(
			req.query.productId,
			{
				reviews,
				numOfReviews,
				ratings,
			},
			{
				new: true,
				runValidators: true,
			}
		);
		res.status(200).json({
			success: true,
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			error: 'Error en el servidor',
		});
	}
});
