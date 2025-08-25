import { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import { productsAPI } from '../services/products';

const Products = () => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState({
        category: 'all',
        priceRange: 'all',
        sortBy: 'name'
    });

    useEffect(() => {
        const fetchProducts = async () => {
        try {
            const response = await productsAPI.getProducts();
            setProducts(response.data);
            setFilteredProducts(response.data);
        } catch (error) {
            console.error('Error fetching products:', error);
        } finally {
            setLoading(false);
        }
        };

        fetchProducts();
    }, []);

    useEffect(() => {
        // Appliquer les filtres
        let result = [...products];
        
        // Filtre par catégorie - vérifiez la valeur exacte de la catégorie
        if (filters.category !== 'all') {
            result = result.filter(product => product.category === filters.category);
        }
        
        // Filtre par prix
        if (filters.priceRange !== 'all') {
            const [min, max] = filters.priceRange.split('-').map(Number);
        if (max) {
            result = result.filter(product => product.price >= min && product.price <= max);
        } else {
            result = result.filter(product => product.price >= min);
        }
        }
        
        // Tri
        switch (filters.sortBy) {
        case 'price-asc':
            result.sort((a, b) => a.price - b.price);
            break;
        case 'price-desc':
            result.sort((a, b) => b.price - a.price);
            break;
        case 'name':
            result.sort((a, b) => a.name.localeCompare(b.name));
            break;
        default:
            break;
        }
        
        setFilteredProducts(result);
    }, [filters, products]);

    const handleFilterChange = (filterType, value) => {
        setFilters(prev => ({
        ...prev,
        [filterType]: value
        }));
    };

    if (loading) {
        return <div className="flex justify-center items-center h-64">Chargement...</div>;
    }

    return (
        <div className="container mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold mb-6">Nos produits</h2>
        
        <div className="flex flex-col md:flex-row gap-6 mb-8">
            {/* Filtres */}
            <div className="w-full md:w-64 bg-white p-4 rounded-lg shadow-md">
            <h3 className="font-semibold mb-4">Filtres</h3>
            
            <div className="mb-4">
                <label className="block text-gray-700 mb-2">Catégorie</label>
                <select 
                    value={filters.category} 
                    onChange={(e) => handleFilterChange('category', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                <option value="all">Toutes les catégories</option>
                <option value="electronics">Électronique</option>
                <option value="clothing">Habillement</option>
                <option value="home">Maison</option>
                {/* Vérifiez la valeur exacte utilisée dans votre base de données */}
                <option value="sport">Sport</option>
                {/* Si dans la base de données c'est "sports" avec un s, utilisez: */}
                {/* <option value="sports">Sport</option> */}
                </select>
            </div>
            
            <div className="mb-4">
                <label className="block text-gray-700 mb-2">Prix</label>
                <select 
                    value={filters.priceRange} 
                    onChange={(e) => handleFilterChange('priceRange', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                <option value="all">Tous les prix</option>
                <option value="0-50">Moins de 50€</option>
                <option value="50-100">50€ - 100€</option>
                <option value="100-200">100€ - 200€</option>
                <option value="200-500">200€ - 500€</option>
                <option value="500-1000">500€ - 1000€</option>
                <option value="1000-">Plus de 1000€</option>
                </select>
            </div>

            <div className="mb-4">
                <label className="block text-gray-700 mb-2">Trier par</label>
                <select 
                value={filters.sortBy} 
                onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                <option value="name">Nom</option>
                <option value="price-asc">Prix croissant</option>
                <option value="price-desc">Prix décroissant</option>
                </select>
            </div>
            </div>
            
            {/* Produits */}
            <div className="flex-1">
            <div className="flex justify-between items-center mb-6">
                <p className="text-gray-600">{filteredProducts.length} produits trouvés</p>
                <button 
                onClick={() => setFilters({
                    category: 'all',
                    priceRange: 'all',
                    sortBy: 'name'
                })}
                className="text-blue-600 hover:text-blue-800 font-medium"
                >
                Réinitialiser les filtres
                </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map(product => (
                <ProductCard key={product._id} product={product} />
                ))}
            </div>
            
            {filteredProducts.length === 0 && (
                <div className="text-center py-12">
                <i className="fas fa-search text-5xl text-gray-300 mb-4"></i>
                <p className="text-xl text-gray-500">Aucun produit ne correspond à vos critères</p>
                <button 
                    onClick={() => setFilters({
                    category: 'all',
                    priceRange: 'all',
                    sortBy: 'name'
                    })}
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg mt-4 hover:bg-blue-700"
                >
                    Réinitialiser les filtres
                </button>
                </div>
            )}
            </div>
        </div>
        </div>
    );
};

export default Products;
