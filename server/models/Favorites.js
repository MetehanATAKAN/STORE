import mongoose from 'mongoose';

const favoritesSchema = mongoose.Schema({
    userId:{type:String,required:true},
    favoritesProduct:[
        {
            productId:{type:String,required:true}
        }
    ]
})

export default mongoose.model('favorites',favoritesSchema);