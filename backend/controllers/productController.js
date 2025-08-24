const Product = require('../models/Product');

// Get all products
exports.getProducts = async (req, res) => {
    try {
        const { category, featured } = req.query;
        let filter = {};

        if (category && category !== 'all') {
        filter.category = category;
        }

        if (featured) {
        filter.featured = featured === 'true';
        }

        const products = await Product.find(filter);
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get single product
exports.getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (product) {
        res.json(product);
        } else {
        res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create product (admin only)
exports.createProduct = async (req, res) => {
    try {
        const product = new Product(req.body);
        const createdProduct = await product.save();
        res.status(201).json(createdProduct);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update product (admin only)
exports.updateProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (product) {
        Object.assign(product, req.body);
        const updatedProduct = await product.save();
        res.json(updatedProduct);
        } else {
        res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete product (admin only)
exports.deleteProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (product) {
        await product.remove();
        res.json({ message: 'Product removed' });
        } else {
        res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};