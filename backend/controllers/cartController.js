const Cart = require('../models/Cart');
const Product = require('../models/Product');

// Get user cart
exports.getCart = async (req, res) => {
    try {
        const cart = await Cart.findOne({ user: req.user._id }).populate('items.product');

        if (cart) {
        res.json(cart);
        } else {
        res.json({ items: [] });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Add item to cart
exports.addToCart = async (req, res) => {
    try {
        const { productId, quantity } = req.body;

        const product = await Product.findById(productId);
        if (!product) {
        return res.status(404).json({ message: 'Product not found' });
        }

        let cart = await Cart.findOne({ user: req.user._id });

        if (!cart) {
        cart = new Cart({ user: req.user._id, items: [] });
        }

        const existingItemIndex = cart.items.findIndex(
        item => item.product.toString() === productId
        );

        if (existingItemIndex > -1) {
        cart.items[existingItemIndex].quantity += quantity;
        } else {
        cart.items.push({ product: productId, quantity });
        }

        await cart.save();
        await cart.populate('items.product');
        
        res.json(cart);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update cart item quantity
exports.updateCartItem = async (req, res) => {
    try {
        const { quantity } = req.body;
        const cart = await Cart.findOne({ user: req.user._id });

        if (!cart) {
        return res.status(404).json({ message: 'Cart not found' });
        }

        const itemIndex = cart.items.findIndex(
        item => item._id.toString() === req.params.itemId
        );

        if (itemIndex > -1) {
        if (quantity <= 0) {
            cart.items.splice(itemIndex, 1);
        } else {
            cart.items[itemIndex].quantity = quantity;
        }

        await cart.save();
        await cart.populate('items.product');
        
        res.json(cart);
        } else {
        res.status(404).json({ message: 'Item not found in cart' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Remove item from cart
exports.removeFromCart = async (req, res) => {
    try {
        const cart = await Cart.findOne({ user: req.user._id });

        if (!cart) {
        return res.status(404).json({ message: 'Cart not found' });
        }

        cart.items = cart.items.filter(
        item => item._id.toString() !== req.params.itemId
        );

        await cart.save();
        await cart.populate('items.product');
        
        res.json(cart);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Clear cart
exports.clearCart = async (req, res) => {
    try {
        const cart = await Cart.findOne({ user: req.user._id });

        if (cart) {
        cart.items = [];
        await cart.save();
        res.json({ message: 'Cart cleared' });
        } else {
        res.status(404).json({ message: 'Cart not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};