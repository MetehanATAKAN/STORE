import mongoose from 'mongoose';

const ProductsBasketSchema = mongoose.Schema({
    userId:{type:String,required:true},
    products:[
        {
            productId:{type:String,required:true},
            count:{type:Number}
        }
    ]
})

export default mongoose.model('basket',ProductsBasketSchema);