import {Router} from 'express';
import {
	deleteProduct,
	getProductById,
	getProducts,
	newProduct,
	updateProduct,
} from '../controllers/productsController.js';
import {
	authorizeRoles,
	isAuthenticatedUser,
} from '../middlewares/authMiddleware.js';

const router = Router();
router.get('/products', getProducts); // Obtener todos los productos
router.get('/product/:id', getProductById); // Obtener un producto por id
router.post(
	'/product/new',
	isAuthenticatedUser,
	authorizeRoles('admin'),
	newProduct
); // Creando producto
router.put(
	'/product/:id',
	isAuthenticatedUser,
	authorizeRoles('admin'),
	updateProduct
); // Actualizando producto
router.delete(
	'/product/:id',
	isAuthenticatedUser,
	authorizeRoles('admin'),
	deleteProduct
); // Eliminar producto

export default router;
