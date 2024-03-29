import axios from 'axios';
import apiRequest from '../http.helper';

const userId = sessionStorage.getItem('userId');

export const allFakeStoreProducts = async () => {
    try {
        const fakeProductsResponse = await axios.get('https://fakestoreapi.com/products');
        const fakeProducts = fakeProductsResponse.data;
        const response = await axios.post('http://localhost:8080/products/allFakeStoreProducts',fakeProducts);
        console.log(response);
    } catch (error) {
        console.log(error);
    }
}

export const getAllProducts = async () => {
    try {
        const response = await apiRequest('products/getAllProducts','GET');
        const data = await response.data;
        return data
    } catch (error) {
        console.log(error);
    }
}

export const basketProducts = async (products) => {
    try {
        const response = await apiRequest('products/basketProducts','POST',products);
        console.log(response);

    } catch (error) {
        console.log(error);
    }
}

export const getAllBasketProducts = async () => {
    console.log(userId);
    try {
        const response = await apiRequest(`products/getAllBasketProducts/${userId}`,'GET');
        return response.data;
    } catch (error) {
        console.log(error);
    }
}