const { render, screen } = require('@testing-library/react');
const { BrowserRouter } = require('react-router-dom');

// Import des composants avec gestion des exports par défaut
const HeaderModule = require('../../components/Header');
const Header = HeaderModule.default || HeaderModule;
const AuthContextModule = require('../../context/AuthContext');
const AuthProvider = AuthContextModule.AuthProvider || AuthContextModule.default.AuthProvider;
const CartContextModule = require('../../context/CartContext');
const CartProvider = CartContextModule.CartProvider || CartContextModule.default.CartProvider;

describe('Header Component', () => {
    test('renders header with shop name', () => {
        render(
        <BrowserRouter>
            <AuthProvider>
            <CartProvider>
                <Header />
            </CartProvider>
            </AuthProvider>
        </BrowserRouter>
        );
        
        // Vérifiez que le nom du shop est présent
        expect(screen.getByText(/ShopApp/i)).toBeInTheDocument();
    });

    test('renders navigation links', () => {
        render(
        <BrowserRouter>
            <AuthProvider>
            <CartProvider>
                <Header />
            </CartProvider>
            </AuthProvider>
        </BrowserRouter>
        );
        
        // Vérifiez que les liens de navigation sont présents
        expect(screen.getByText(/Accueil/i)).toBeInTheDocument();
        expect(screen.getByText(/Catégories/i)).toBeInTheDocument();
        expect(screen.getByText(/Panier/i)).toBeInTheDocument();
    });
});