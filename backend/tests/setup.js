const { MongoMemoryServer } = require('mongodb-memory-server');
const mongoose = require('mongoose');

let mongod;

// Configuration avant tous les tests
beforeAll(async () => {
    mongod = await MongoMemoryServer.create();
    const uri = mongod.getUri();
    
    process.env.MONGO_URI = uri;
    process.env.JWT_SECRET = 'test-secret';
    
    await mongoose.connect(uri);
});

// Nettoyage après chaque test
afterEach(async () => {
    const collections = mongoose.connection.collections;
    
    for (const key in collections) {
        await collections[key].deleteMany();
    }
});

// Déconnexion après tous les tests
afterAll(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    await mongod.stop();
});