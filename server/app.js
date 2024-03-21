import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import signRoutes from './routes/signRoutes.js';
import cookieParser from 'cookie-parser';
import productsRoutes from './routes/productsRoutes.js';

dotenv.config();

const app = express();
const url = 'mongodb://0.0.0.0:27017/store';
const port = 8080;

app.use(cors({
    origin:['http://localhost:5173'],
    credentials:true
}));
app.use(express.json());
app.use(cookieParser())

const connect = async () => {

    try {
        await mongoose.connect(url);
        console.log('Connected mongo db');
    } catch (error) {
        console.log(error);
    }
}

app.listen(port , () => {
    connect();
    console.log('Connect to backend');
})

app.use('/auth',signRoutes);
app.use('/products',productsRoutes);