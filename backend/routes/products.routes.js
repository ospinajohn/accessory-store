import { Router } from 'express';
import { getProducts, newProduct } from '../controllers/productsController.js';

const router = Router();
router.get('/products', getProducts); // Obtener todos los productos
router.post('/product/new', newProduct); // Creando producto

export default router;
