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
router.get(
	'/products',
	isAuthenticatedUser,
	authorizeRoles('admin'),
	getProducts
); // Obtener todos los productos
router.get('/product/:id', getProductById); // Obtener un producto por id
router.post('/product/new', newProduct); // Creando producto
router.put('/product/:id', updateProduct); // Actualizando producto
router.delete('/product/:id', deleteProduct); // Eliminar producto

export default router;
