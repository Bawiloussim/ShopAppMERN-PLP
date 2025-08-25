const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

// Charger les variables d'environnement
dotenv.config();

// Connexion à la base de données
connectDB();

const app = express();

// Configuration CORS
const allowedOrigins = [
  "https://shop-app-mern-plp.vercel.app", // ton frontend déployé
  "http://localhost:3000",                // React en dev (CRA)
  "http://localhost:5173"                 // Vite en dev
];

app.use(
    cors({
        origin: function (origin, callback) {
        // autorise les outils type Postman (sans origin)
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
        },
        credentials: true,
        methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    })
);

// Middleware pour parser JSON
app.use(express.json());

// Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/products", require("./routes/products"));
app.use("/api/cart", require("./routes/cart"));
app.use("/api/orders", require("./routes/orders"));

// Test route (debug rapide)
app.get("/", (req, res) => {
    res.send("Backend API is running 🚀");
});

// Middleware de gestion d'erreurs
app.use(require("./middleware/error"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
    console.log(`✅ Server running on port ${PORT}`)
);
