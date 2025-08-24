const request = require('supertest');
const app = require('../server');
const Product = require('../models/Product');
const User = require('../models/User');

let authToken;

// Fonction utilitaire pour créer un utilisateur et obtenir un token
const createUserAndGetToken = async () => {
    const user = await User.create({
        name: 'Admin User',
        email: 'admin@example.com',
        password: 'password123'
    });

    // Simuler la connexion pour obtenir un token
    const loginRes = await request(app)
        .post('/api/auth/login')
        .send({
        email: 'admin@example.com',
        password: 'password123'
        });

    return loginRes.body.token;
};

describe('Products API', () => {
    beforeEach(async () => {
        authToken = await createUserAndGetToken();
    });

    describe('GET /api/products', () => {
        it('should get all products', async () => {
        // Créer quelques produits de test
        await Product.create([
            {
            name: 'Product 1',
            description: 'Description 1',
            price: 100,
            category: 'electronics',
            image: 'image1.jpg'
            },
            {
            name: 'Product 2',
            description: 'Description 2',
            price: 200,
            category: 'clothing',
            image: 'image2.jpg'
            }
        ]);

        const res = await request(app)
            .get('/api/products');
        
        expect(res.statusCode).toEqual(200);
        expect(res.body.length).toEqual(2);
        expect(res.body[0].name).toEqual('Product 1');
        expect(res.body[1].name).toEqual('Product 2');
        });

        it('should filter products by category', async () => {
        // Créer des produits de différentes catégories
        await Product.create([
            {
            name: 'Electronics Product',
            description: 'Electronics Description',
            price: 100,
            category: 'electronics',
            image: 'image1.jpg'
            },
            {
            name: 'Clothing Product',
            description: 'Clothing Description',
            price: 200,
            category: 'clothing',
            image: 'image2.jpg'
            }
        ]);

        const res = await request(app)
            .get('/api/products?category=electronics');
        
        expect(res.statusCode).toEqual(200);
        expect(res.body.length).toEqual(1);
        expect(res.body[0].category).toEqual('electronics');
        });
    });

    describe('POST /api/products', () => {
        it('should create a new product', async () => {
        const productData = {
            name: 'New Product',
            description: 'New Description',
            price: 300,
            category: 'electronics',
            image: 'new-image.jpg',
            featured: true
        };

        const res = await request(app)
            .post('/api/products')
            .set('Authorization', `Bearer ${authToken}`)
            .send(productData);
        
        expect(res.statusCode).toEqual(201);
        expect(res.body.name).toEqual(productData.name);
        expect(res.body.description).toEqual(productData.description);
        expect(res.body.price).toEqual(productData.price);
        expect(res.body.category).toEqual(productData.category);
        });

        it('should not create product without authentication', async () => {
        const productData = {
            name: 'New Product',
            description: 'New Description',
            price: 300,
            category: 'electronics',
            image: 'new-image.jpg'
        };

        const res = await request(app)
            .post('/api/products')
            .send(productData);
        
        expect(res.statusCode).toEqual(401);
        expect(res.body.message).toContain('Not authorized');
        });
    });

    describe('GET /api/products/:id', () => {
        it('should get a single product by ID', async () => {
        const product = await Product.create({
            name: 'Test Product',
            description: 'Test Description',
            price: 100,
            category: 'electronics',
            image: 'test-image.jpg'
        });

        const res = await request(app)
            .get(`/api/products/${product._id}`);
        
        expect(res.statusCode).toEqual(200);
        expect(res.body.name).toEqual('Test Product');
        expect(res.body._id).toEqual(product._id.toString());
        });

        it('should return 404 for non-existent product', async () => {
        const fakeId = '607f1f77bcf86cd799439011'; // ID MongoDB valide mais inexistant
        
        const res = await request(app)
            .get(`/api/products/${fakeId}`);
        
        expect(res.statusCode).toEqual(404);
        expect(res.body.message).toEqual('Product not found');
        });
    });
});