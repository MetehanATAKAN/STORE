import favoritesSchema from '../models/Favorites.js';
import productsSchema from '../models/Products.js';

export const favoritesProduct = async (req, res, next) => {
    console.log(req.body);
    const productId = req.body.favoritesProduct[0].productId;
    const userId = req.body.userId;
    console.log('productId', productId);
    try {
        const user = await favoritesSchema.findOne({ userId: userId });
        if (user) {
            const includesData = await user.favoritesProduct.find(data => data.productId === productId);
            console.log('xxx', includesData);
            if (includesData) {
                const newFavoritesArr = await user.favoritesProduct.filter(data => data.productId !== productId);
                user.favoritesProduct = newFavoritesArr;
                await user.save();
                res.status(200).json({ messages: 'remove favorites product' })
            }
            else {
                await user.favoritesProduct.push(req.body.favoritesProduct[0]);
                await user.save();
                res.status(200).json({ messages: 'add favorites product' })
            }
        }
        else {
            const newFavoritesProduct = await new favoritesSchema(req.body);
            const data = await newFavoritesProduct.save();
            res.status(201).json({ status: true, data: newFavoritesProduct })
        }
    } catch (error) {
        next(error);
    }
}

export const getAllFavoritesProduct = async (req, res, next) => {
    
    try {
        const id = await req.params.id;
        const user = await favoritesSchema.findOne({userId:id});
        const allProducts = await productsSchema.find({});

        if(user){
            let products = [];
            user.favoritesProduct.map(item => (
                allProducts.find(data => {
                    if(data.id === item.productId) products.push(data);
                })
            ))
            return res.status(200).json({status:true,data:products})
        }
        else {
            return res.status(409).json({message:'not user'})
        }
    } catch (error) {
        next(error);
    }
}