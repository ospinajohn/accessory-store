import productsModel from '../models/productsModel.js';

// Obtener todos los productos
export const getProducts = async (req, res, next) => {
    try {
        const products = await productsModel.find({});
        res.status(200).json(products);
    } catch (error) {
        next(error);
    }
};

// Creando productos
export const newProduct = async (req, res, next) => {
    try {
        const product = await productsModel.create(req.body);
        res.status(201).json({
            success: true,
            product,
        });
    } catch (error) {
        next(error);
    }
};
