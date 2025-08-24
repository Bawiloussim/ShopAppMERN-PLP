import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const Header = () => {
    const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
    const { user, logout } = useAuth();
    const { cart } = useCart();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <header className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
            <Link to="/" className="text-2xl font-bold text-blue-600">
            <i className="fas fa-shopping-cart mr-2"></i>ShopApp
            </Link>
            
            <nav className="hidden md:block">
            <ul className="flex space-x-8">
                <li><Link to="/" className="text-gray-700 hover:text-blue-600 font-medium">Accueil</Link></li>
                <li className="relative"
                    onMouseEnter={() => setIsCategoriesOpen(true)}
                    onMouseLeave={() => setIsCategoriesOpen(false)}>
                <button className="text-gray-700 hover:text-blue-600 font-medium flex items-center">
                    Catégories <i className="fas fa-chevron-down ml-1 text-xs"></i>
                </button>
                {isCategoriesOpen && (
                    <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2 z-50">
                    <Link to="/products?category=electronics" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Électronique</Link>
                    <Link to="/products?category=clothing" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Vêtements</Link>
                    <Link to="/products?category=home" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Maison</Link>
                    <Link to="/products?category=sports" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">sports</Link>
                    </div>
                )}
                </li>
                <li><Link to="/cart" className="text-gray-700 hover:text-blue-600 font-medium">Panier ({cart.length})</Link></li>
            </ul>
            </nav>

            <div className="flex items-center space-x-4">
            {user ? (
                <>
                <span className="hidden md:inline">Bonjour, {user.name || user.email}</span>
                <button onClick={handleLogout} className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                    Déconnexion
                </button>
                </>
            ) : (
                <>
                <Link to="/login" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                    Connexion
                </Link>
                <Link to="/register" className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">
                    Inscription
                </Link>
                </>
            )}
            </div>
        </div>
        </header>
    );
};

export default Header;