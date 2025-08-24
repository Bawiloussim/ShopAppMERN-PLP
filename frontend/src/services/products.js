import api from './api';

export const productsAPI = {
    getProducts: (category) => {
        const params = category && category !== 'all' ? { category } : {};
        return api.get('/products', { params });
    },
    getProduct: (id) => {
        return api.get(`/products/${id}`);
    },
};