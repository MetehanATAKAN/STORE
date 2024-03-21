import productsSchema from '../models/Products.js';
import signSchema from '../models/SignUp.js';
import { ObjectId } from 'mongodb';
import productsBasketSchema from '../models/ProductsBasket.js';

export const allFakeStoreProducts = async (req, res, next) => {
    const products = req.body;
    try {

        products.map(data => {
            const newProducts = new productsSchema({
                id: data.id ? data.id : 0,
                title: data.title,
                price: data.price,
                description: data.description,
                image: data.image,
                category: data.category,
                rating: {
                    rate: data.rating.rate ? data.rating.rate : 0,
                    count: data.rating.count
                }
            })
            const savedProduct = newProducts.save();
        })
        return res.status(200).json({ message: 'fake store products saved' })
    } catch (error) {

    }
}

export const getAllProducts = async (req, res, next) => {
    try {
        const products = await productsSchema.find({});
        res.status(200).json({ data: products })
    } catch (error) {
        next(error);
    }
}

export const basketProducts = async (req, res, next) => {
    try {
        const user = await productsBasketSchema.findOne({ userId: req.body.userId });
        if (!user) {
            const newBasketData = new productsBasketSchema({
                userId:req.body.userId,
                products:[{
                    productId:req.body.products[0].productId,
                    count:1
                }]
            });
            const data = await newBasketData.save();
            res.status(200).json({ messages: 'created' })
        }
        else {
            const includesProduct = await user.products.find(data => data.productId === req.body.products[0].productId);
            if (includesProduct) { // ürün içeriyorsa önceden eklenmişse sadece count arttırıyoruz
                includesProduct.count++;
                await user.save();
                res.status(200).json({ messages: 'includes created' })
            }
            else { // ürün yoksa seçtiği ürünlere yeni ürünü ekliyoruz
                await user.products.push({
                    productId:req.body.products[0].productId,
                    count:1
                });
                await user.save();
                res.status(200).json({messages:'add new product'})
            }
        }
    } catch (error) {
        next(error);
    }
}

export const getAllBasketProducts = async (req,res,next) => {
    console.log(req);
    try {
        const id = req.params.id;
        const {products} = await productsBasketSchema.findOne({userId:id});
        const allProducts = await productsSchema.find({});
        let newProducts = [];
        products.map(data =>(
            allProducts.map(prod => {
                if(data.productId === prod.id) newProducts.push({...prod._doc,basketCount:data.count});
            })
        ));
        console.log(newProducts);
        res.status(200).json({messages:true,data:newProducts})
    } catch (error) {
        next(error);
    }
}