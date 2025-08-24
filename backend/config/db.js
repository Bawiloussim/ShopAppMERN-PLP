// const mongoose = require('mongoose');

// const connectDB = async () => {
//     try {
//         const conn = await mongoose.connect(process.env.MONGO_URI, {
//         useNewUrlParser: true,
//         useUnifiedTopology: true,
//         });

//         console.log(`MongoDB Connected: ${conn.connection.host}`);
//     } catch (error) {
//         console.error(error);
//         process.exit(1);
//     }
// };

// module.exports = connectDB;







const mongoose = require('mongoose');

const connectDB = async () => {
    if (process.env.NODE_ENV === 'test') {
        return; // Ne pas se connecter en mode test
    }

    try {
        await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        });

        console.log('MongoDB Connected: ' + mongoose.connection.host);
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

module.exports = connectDB;