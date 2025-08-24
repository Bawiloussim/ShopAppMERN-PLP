import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    const [loading, setLoading] = useState(false);
    const { user, register } = useAuth();
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
        
        if (formData.password !== formData.confirmPassword) {
        toast.error('Les mots de passe ne correspondent pas');
        return;
        }

        setLoading(true);

        try {
            await register(formData.name, formData.email, formData.password);
            toast.success('Inscription réussie');
            navigate('/');
        } catch (error) {
        toast.error(error.response?.data?.message || 'Erreur lors de l\'inscription');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mx-auto px-4 py-8 max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-center">Inscription</h2>
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
            <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="name">
                Nom complet
            </label>
            <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            </div>
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
            <div className="mb-4">
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
            <div className="mb-6">
            <label className="block text-gray-700 mb-2" htmlFor="confirmPassword">
                Confirmer le mot de passe
            </label>
            <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
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
            {loading ? 'Inscription...' : 'S\'inscrire'}
            </button>
            <p className="text-center mt-4">
                Déjà un compte?{' '}
            <Link to="/login" className="text-blue-600 hover:underline">
                Se connecter
            </Link>
            </p>
        </form>
        </div>
    );
};

export default Register;