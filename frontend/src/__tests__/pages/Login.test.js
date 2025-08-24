const { render, screen } = require('@testing-library/react');
const { BrowserRouter } = require('react-router-dom');

// Import des composants avec gestion des exports par défaut
const AuthContextModule = require('../../context/AuthContext');
const AuthProvider = AuthContextModule.AuthProvider || AuthContextModule.default.AuthProvider;
const LoginModule = require('../../pages/Login');
const Login = LoginModule.default || LoginModule;

// Mock du service d'authentification
jest.mock('../../services/auth', () => ({
    authAPI: {
        login: jest.fn(),
    }
}));

describe('Login Page', () => {
    const renderLogin = () => {
        return render(
        <BrowserRouter>
            <AuthProvider>
            <Login />
            </AuthProvider>
        </BrowserRouter>
        );
    };

    test('renders login form', () => {
        renderLogin();
        
        // Utilisez le texte en français pour les labels
        expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/mot de passe/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /se connecter/i })).toBeInTheDocument();
    });
});