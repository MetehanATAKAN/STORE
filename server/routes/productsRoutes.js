import express from 'express';
import { allFakeStoreProducts, basketProducts, getAllBasketProducts, getAllProducts } from '../controllers/productsControllers.js';
import verifyToken from '../middleware/authMiddleware.js';
const router = express.Router();

router.post('/allFakeStoreProducts',allFakeStoreProducts);
router.get('/getAllProducts',getAllProducts);
router.post('/basketProducts',verifyToken,basketProducts);
router.get('/getAllBasketProducts/:id',getAllBasketProducts);

export default router;