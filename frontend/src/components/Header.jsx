import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const Header = () => {
    const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
    const { user, logout } = useAuth();
    const { cart } = useCart();
    const navigate = useNavigate();
    const categoriesRef = useRef(null);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    // Gestion de la fermeture du menu en cliquant à l'extérieur
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (categoriesRef.current && !categoriesRef.current.contains(event.target)) {
                setIsCategoriesOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <header className="fixed top-0 left-0 w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-md z-50">
            <div className="container mx-auto px-4 py-3 flex justify-between items-center">
                <Link to="/" className="text-2xl font-bold text-white flex items-center">
                    <i className="fas fa-shopping-cart mr-2"></i>ShopApp
                </Link>
                
                <nav className="hidden md:block">
                    <ul className="flex space-x-8 items-center">
                        <li>
                            <Link to="/" className="text-white hover:text-blue-200 text-lg font-semibold transition duration-200">
                                Accueil
                            </Link>
                        </li>
                        <li 
                            className="relative"
                            ref={categoriesRef}
                            onMouseEnter={() => setIsCategoriesOpen(true)}
                            onMouseLeave={() => setIsCategoriesOpen(false)}
                        >
                            <button 
                                className="text-white hover:text-blue-200 flex items-center text-lg font-semibold transition duration-200"
                                onClick={() => setIsCategoriesOpen(!isCategoriesOpen)}
                                aria-expanded={isCategoriesOpen}
                            >
                                Catégories <i className="fas fa-chevron-down ml-1 text-xs"></i>
                            </button>
                            {isCategoriesOpen && (
                                <div 
                                    className="absolute top-full left-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2 z-50"
                                    onMouseEnter={() => setIsCategoriesOpen(true)}
                                >
                                    <Link 
                                        to="/products?category=electronics" 
                                        className="block px-4 py-2 text-gray-700 hover:bg-blue-100 transition duration-150"
                                        onClick={() => setIsCategoriesOpen(false)}
                                    >
                                        Électronique
                                    </Link>
                                    <Link 
                                        to="/products?category=clothing" 
                                        className="block px-4 py-2 text-gray-700 hover:bg-blue-100 transition duration-150"
                                        onClick={() => setIsCategoriesOpen(false)}
                                    >
                                        Vêtements
                                    </Link>
                                    <Link 
                                        to="/products?category=home" 
                                        className="block px-4 py-2 text-gray-700 hover:bg-blue-100 transition duration-150"
                                        onClick={() => setIsCategoriesOpen(false)}
                                    >
                                        Maison
                                    </Link>
                                    <Link 
                                        to="/products?category=sports" 
                                        className="block px-4 py-2 text-gray-700 hover:bg-blue-100 transition duration-150"
                                        onClick={() => setIsCategoriesOpen(false)}
                                    >
                                        Sports
                                    </Link>
                                </div>
                            )}
                        </li>
                        <li>
                            <Link to="/cart" className="text-white hover:text-blue-200 text-lg font-semibold transition duration-200 flex items-center">
                                <i className="fas fa-shopping-cart mr-1"></i> Panier ({cart.length})
                            </Link>
                        </li>
                    </ul>
                </nav>

                <div className="flex items-center space-x-4">
                    {user ? (
                        <>
                            <span className="hidden md:inline text-white">{user.name || user.email}</span>
                            <button 
                                onClick={handleLogout} 
                                className="bg-white text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-100 transition duration-200 font-semibold"
                            >
                                Déconnexion
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="bg-white text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-100 transition duration-200 font-semibold">
                                Connexion
                            </Link>
                            <Link to="/register" className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition duration-200 font-semibold">
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