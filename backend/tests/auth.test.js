const request = require('supertest');
const app = require('../server');
const User = require('../models/User');

describe('Authentication API', () => {
    describe('POST /api/auth/register', () => {
        it('should register a new user', async () => {
        const res = await request(app)
            .post('/api/auth/register')
            .send({
            name: 'Test User',
            email: 'test@example.com',
            password: 'password123'
            });
        
        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('token');
        expect(res.body).toHaveProperty('_id');
        expect(res.body.name).toEqual('Test User');
        expect(res.body.email).toEqual('test@example.com');
        });

        it('should not register user with existing email', async () => {
        // Créer un utilisateur d'abord
        await User.create({
            name: 'Existing User',
            email: 'test@example.com',
            password: 'password123'
        });

        const res = await request(app)
            .post('/api/auth/register')
            .send({
            name: 'Test User',
            email: 'test@example.com',
            password: 'password123'
            });
        
        expect(res.statusCode).toEqual(400);
        expect(res.body.message).toEqual('User already exists');
        });
    });

    describe('POST /api/auth/login', () => {
        beforeEach(async () => {
        // Créer un utilisateur pour les tests de connexion
        await request(app)
            .post('/api/auth/register')
            .send({
            name: 'Test User',
            email: 'test@example.com',
            password: 'password123'
            });
        });

        it('should login existing user', async () => {
        const res = await request(app)
            .post('/api/auth/login')
            .send({
            email: 'test@example.com',
            password: 'password123'
            });
        
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('token');
        expect(res.body.email).toEqual('test@example.com');
        });

        it('should not login with wrong password', async () => {
        const res = await request(app)
            .post('/api/auth/login')
            .send({
            email: 'test@example.com',
            password: 'wrongpassword'
            });
        
        expect(res.statusCode).toEqual(401);
        expect(res.body.message).toEqual('Invalid email or password');
        });

        it('should not login with non-existent email', async () => {
        const res = await request(app)
            .post('/api/auth/login')
            .send({
            email: 'nonexistent@example.com',
            password: 'password123'
            });
        
        expect(res.statusCode).toEqual(401);
        expect(res.body.message).toEqual('Invalid email or password');
        });
    });
});