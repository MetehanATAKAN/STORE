import express from "express";
import { login, sign } from "../controllers/signControllers.js";
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/sign',sign);

router.post('/login',login);

export default router;