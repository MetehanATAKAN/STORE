import express from 'express';
import { favoritesProduct, getAllFavoritesProduct } from '../controllers/favoritesControllers.js';

const router = express.Router();

router.post('/favoriteProduct',favoritesProduct);
router.get('/getAllFavoritesProduct/:id',getAllFavoritesProduct);

export default router;