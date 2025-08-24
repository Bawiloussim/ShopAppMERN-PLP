const express = require('express');
const {
    createOrder,
    getUserOrders,
    getOrderById,
    updateOrderToPaid,
} = require('../controllers/orderController');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.route('/')
    .post(protect, createOrder)
    .get(protect, getUserOrders);

router.route('/:id')
    .get(protect, getOrderById);

router.route('/:id/pay')
    .put(protect, updateOrderToPaid);

module.exports = router;