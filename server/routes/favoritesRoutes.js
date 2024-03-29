import express from 'express';
import { favoritesProduct } from '../controllers/favoritesControllers.js';

const router = express.Router();

router.post('/favoriteProduct',favoritesProduct);

export default router;