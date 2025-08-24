import api from './api';

export const cartAPI = {
    getCart: () => {
        return api.get('/cart');
    },
    addToCart: (productId, quantity) => {
        return api.post('/cart', { productId, quantity });
    },
    updateCartItem: (itemId, quantity) => {
        return api.put(`/cart/${itemId}`, { quantity });
    },
    removeFromCart: (itemId) => {
        return api.delete(`/cart/${itemId}`);
    },
    clearCart: () => {
        return api.delete('/cart');
    },
};