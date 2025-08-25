const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// Variable environnement chargée
dotenv.config();

// connection of the database
connectDB();

const app = express();

// Middleware
app.use(cors(
        {
    origin: [
        'https://shop-app-mern-plp.vercel.app',
        'http://localhost:5173'
    ],
    credentials: true
}));
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/products', require('./routes/products'));
app.use('/api/cart', require('./routes/cart'));
app.use('/api/orders', require('./routes/orders'));

// Middleware of error handling
app.use(require('./middleware/error'));

const PORT = process.env.PORT || 5000;


// À la fin de server.js, remplacez le code existant par :
if (process.env.NODE_ENV !== 'test') {
    mongoose.connect(process.env.MONGO_URI)
        .then(() => {
        console.log('MongoDB Connected: ' + process.env.MONGO_URI);
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
        })
        .catch(err => {
        console.log(err);
        });
    }

module.exports = app;