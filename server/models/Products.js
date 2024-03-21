import mongoose from 'mongoose';

const productsSchema = mongoose.Schema({
    id:{type:String || Number},
    title:{type:String,required:true},
    price:{type:String,required:true},
    description:{type:String,required:true},
    image:{type:String,required:true},
    category:{type:String},
    rating:{
        rate:{type:Number},
        count:{type:Number,required:true}
    }
})

export default mongoose.model('products',productsSchema);