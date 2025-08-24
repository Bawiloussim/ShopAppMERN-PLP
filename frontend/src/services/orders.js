import api from './api';

export const ordersAPI = {
    createOrder: (orderData) => {
        return api.post('/orders', orderData);
    },
    getOrders: () => {
        return api.get('/orders');
    },
    getOrder: (id) => {
        return api.get(`/orders/${id}`);
    },
    updateOrderToPaid: (id, paymentData) => {
        return api.put(`/orders/${id}/pay`, paymentData);
    },
};