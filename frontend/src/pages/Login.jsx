import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [loading, setLoading] = useState(false);
    const { user, login } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
        navigate('/');
        }
    }, [user, navigate]);

    const handleChange = (e) => {
        setFormData({
        ...formData,
        [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
        await login(formData.email, formData.password);
        toast.success('Connexion réussie');
        navigate('/');
        } catch (error) {
        toast.error(error.response?.data?.message || 'Erreur de connexion');
        } finally {
        setLoading(false);
        }
    };

    return (
        <div className="container mx-auto px-4 py-8 max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-center">Connexion</h2>
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
            <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="email">
                Email
            </label>
            <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            </div>
            <div className="mb-6">
            <label className="block text-gray-700 mb-2" htmlFor="password">
                Mot de passe
            </label>
            <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            </div>
            <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white w-full py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
            {loading ? 'Connexion...' : 'Se connecter'}
            </button>
            <p className="text-center mt-4">
            Pas encore de compte?{' '}
            <Link to="/register" className="text-blue-600 hover:underline">
                S'inscrire
            </Link>
            </p>
        </form>
        </div>
    );
};

export default Login;