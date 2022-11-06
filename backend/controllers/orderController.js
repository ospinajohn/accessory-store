import catchAsyncErrors from '../middlewares/catchAsyncErrors.js';
import orderModel from '../models/orderModel.js';
import ErrorHandler from '../utils/errorHandler.js';

// Crear una nueva orden
export const createOrder = catchAsyncErrors(async (req, res, next) => {
	const {
		Items,
		envioInfo,
		precioItems,
		precioImpuesto,
		precioEnvio,
		precioTotal,
		pagoInfo,
	} = req.body;

	const order = await orderModel.create({
		Items,
		envioInfo,
		precioItems,
		precioImpuesto,
		precioEnvio,
		precioTotal,
		pagoInfo,
		fechaPago: Date.now(),
		user: req.user._id,
	});

	res.status(201).json({
		success: true,
		order,
	});
});

//Obtener una orden por id
export const getOrderById = catchAsyncErrors(async (req, res, next) => {
	const order = await orderModel
		.findById(req.params.id)
		.populate('user', 'name email');

	if (!order) {
		return next(new ErrorHandler('Orden no encontrada', 404));
	}

	res.status(200).json({
		success: true,
		order,
	});
});

// Obtener ordenes del usuario
export const getMyOrders = catchAsyncErrors(async (req, res, next) => {
	const orders = await orderModel.find({user: req.user._id});

	res.status(200).json({
		success: true,
		orders,
	});
});

// admin

// ver todas las ordenes
export const getAllOrders = catchAsyncErrors(async (req, res, next) => {
	const orders = await orderModel.find();

	let totalAmount = 0;

	orders.forEach((order) => {
		totalAmount += order.precioTotal;
	});

	res.status(200).json({
		success: true,
		totalAmount,
		orders,
	});
});

// Actualizar orden
export const updateOrder = catchAsyncErrors(async (req, res, next) => {
	const order = await orderModel.findById(req.params.id);

	if (!order) {
		return next(new ErrorHandler('Orden no encontrada', 404));
	}

	if (order.pagoInfo.estado === 'Enviado') {
		return next(new ErrorHandler('Esta orden ya fue enviada', 400));
	}

	order.estado = req.body.estado;
	order.fechaPago = Date.now();

	order.save({validateBeforeSave: false});

	res.status(200).json({
		success: true,
		order,
	});
});

const updateStock = async (id, quantity) => {
	const product = await productModel.findById(id);

	product.stock = product.stock - quantity;

	await product.save({validateBeforeSave: false});
};

// Eliminar orden
export const deleteOrder = catchAsyncErrors(async (req, res, next) => {
	const order = await orderModel.findById(req.params.id);

	if (!order) {
		return next(new ErrorHandler('Orden no encontrada', 404));
	}

	await order.remove();

	res.status(200).json({
		success: true,
		message: 'Orden eliminada',
	});
});
