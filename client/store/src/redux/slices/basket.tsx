import { createSlice } from "@reduxjs/toolkit";

type productType = {
    id: number,
    category: string,
    description: string,
    image: string,
    price: string,
    rating: {
        rate: number,
        count: number
    },
    title: string,
    basketCount : number
}
type initialStateType = {
    products : productType[]
}

const initialState :initialStateType = {
    products : []
}
const basketSlice = createSlice({
    name:'basket',
    initialState,
    reducers:{
        allBasketProducts : (state,action) => {
            state.products = action.payload;
        },
        addBasketProducts : (state,action) => {
            const data = action.payload;    
            const isProducts = state.products.find(item => item.id === data.id);

            if(!isProducts) state.products.push({...data,basketCount:1});
            else   isProducts.basketCount += 1;      
        },
        favoritesProduct:(state,action) => {
            const newData = state.products.filter(data => data.id === action.payload.id);  
        }
    }
})

export default basketSlice.reducer;
export const { addBasketProducts, allBasketProducts, favoritesProduct } = basketSlice.actions