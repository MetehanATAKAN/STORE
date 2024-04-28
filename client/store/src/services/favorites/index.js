import apiRequest from '../http.helper';

export const favoritesProduct = async (product) => {
try {
    const response = await apiRequest('favorites/favoriteProduct','POST',product);
    const data = await response.data;
    return data
} catch (error) {
    console.log(error);
}
}

export const getAllFavorites = async (id) => {
    try {
        const response = await apiRequest(`favorites/getAllFavoritesProduct/${id}`,'GET');
        const data = await response.data;
        return data;
    } catch (error) {
        console.log(error);
    }
}