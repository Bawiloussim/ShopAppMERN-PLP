import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children }) => {
    const { user } = useAuth();
    
    if (!user) {
        // Rediriger vers la page de connexion si l'utilisateur n'est pas connecté
        return <Navigate to="/login" replace />;
    }
    
    return children;
};

export default ProtectedRoute;