import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Ajout de l'import manquant
import ProductCard from '../components/ProductCard';
import { productsAPI } from '../services/products';

const Home = () => {
    const [featuredProducts, setFeaturedProducts] = useState([]);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        // Charger les produits en vedette
        const fetchFeaturedProducts = async () => {
        try {
            const response = await productsAPI.getProducts();
            setFeaturedProducts(response.data.slice(0, 4));
        } catch (error) {
            console.error('Error fetching featured products:', error);
        }
    };

    // Charger les catégories
    const fetchCategories = async () => {
        // Simuler des catégories
        setCategories([
            { name: 'Électronique', icon: 'fas fa-laptop', count: 24, value: 'electronics' },
            { name: 'Vêtements', icon: 'fas fa-tshirt', count: 32, value: 'clothing' },
            { name: 'Maison', icon: 'fas fa-couch', count: 18, value: 'home' },
            { name: 'Sport', icon: 'fas fa-dumbbell', count: 15, value: 'sport' },
        ]);
    };

        fetchFeaturedProducts();
        fetchCategories();
    }, []);

    return (
        <div className="container mx-auto px-4 py-8">
        {/* Bannière Hero */}
        <section className="mt-4 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl text-white p-8 mb-12 relative overflow-hidden">
            <div className="absolute inset-0 bg-black opacity-10"></div>
            <div className="relative z-10 max-w-2xl">
            <h2 className="text-4xl font-bold mb-4">Bienvenue sur ShopAppBG</h2>
            <p className="text-xl mb-6">Découvrez notre collection exclusive de produits soigneusement sélectionnés pour vous.</p>
            <Link to="/products" className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-lg text-lg inline-block">
                Découvrir les offres <i className="fas fa-arrow-right ml-2"></i>
            </Link>
            </div>
        </section>

        {/* Section Catégories */}
        <section className="mb-12 bg-yellow-50">
            <h2 className="text-3xl font-bold mb-6 text-center">Catégories populaires</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category, index) => (
                <Link 
                key={index} 
                to={`/products?category=${category.value}`}
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 text-center"
                >
                <i className={`${category.icon} text-4xl text-blue-600 mb-3`}></i>
                <h3 className="font-semibold text-lg mb-1">{category.name}</h3>
                <p className="text-gray-500">{category.count} produits</p>
                </Link>
            ))}
            </div>
        </section>

        {/* Section Produits en vedette */}
        <section className="mb-12">
            <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold">Produits populaires</h2>
            <Link to="/products" className="text-blue-600 hover:text-blue-800 font-medium">
                Voir tout <i className="fas fa-arrow-right ml-1"></i>
            </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map(product => (
                <ProductCard key={product._id} product={product} />
            ))}
            </div>
        </section>

        {/* Section Avantages */}
        <section className="bg-gray-300 rounded-xl p-8 mb-12">
            <h2 className="text-3xl font-bold mb-8 text-center">Pourquoi nous choisir ?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
                <i className="fas fa-truck text-4xl text-blue-600 mb-4"></i>
                <h3 className="font-semibold text-lg mb-2">Livraison rapide</h3>
                <p className="text-gray-600">Livraison gratuite à partir de 50€ d'achat</p>
            </div>
            <div className="text-center">
                <i className="fas fa-shield-alt text-4xl text-blue-600 mb-4"></i>
                <h3 className="font-semibold text-lg mb-2">Paiement sécurisé</h3>
                <p className="text-gray-600">Vos transactions sont 100% sécurisées</p>
            </div>
            <div className="text-center">
                <i className="fas fa-headset text-4xl text-blue-600 mb-4"></i>
                <h3 className="font-semibold text-lg mb-2">Support 24/7</h3>
                <p className="text-gray-600">Notre équipe est là pour vous aider</p>
            </div>
            </div>
        </section>
        </div>
    );
};

export default Home;
