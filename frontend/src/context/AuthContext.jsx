import { createContext, useContext, useState, useEffect } from 'react';
import { authAPI } from '../services/auth';

// Création du contexte
const AuthContext = createContext();

// Hook personnalisé pour utiliser le contexte d'authentification
export const useAuth = () => {
    const context = useContext(AuthContext);
    
    if (!context) {
        throw new Error('useAuth doit être utilisé within an AuthProvider');
    }
    
    return context;
};

// Provider du contexte d'authentification
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');
        
        if (token) {
        // Vérifier si le token est valide
        verifyToken(token);
        } else {
        setLoading(false);
        }
    }, []);

    const verifyToken = async (token) => {
        try {
        // Pour l'instant, nous allons simplement stocker le token
        // Dans une application réelle, vous vérifieriez le token avec votre API
        setUser({ token });
        } catch (error) {
            console.error('Token verification failed:', error);
            localStorage.removeItem('token');
        } finally {
            setLoading(false);
        }
    };

    const login = async (email, password) => {
        try {
            const response = await authAPI.login(email, password);
            setUser(response.data);
            localStorage.setItem('token', response.data.token);
            return response;
        } catch (error) {
            throw error;
        }
    };

    const register = async (name, email, password) => {
    try {
        const response = await authAPI.register(name, email, password);
        setUser(response.data);
        localStorage.setItem('token', response.data.token);
        return response;
    } catch (error) {
        throw error;
    }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('token');
    };

    const value = {
    user,
        login,
        register,
        logout,
        loading
    };

    return (
        <AuthContext.Provider value={value}>
        {!loading && children}
        </AuthContext.Provider>
    );
};

export default AuthContext;