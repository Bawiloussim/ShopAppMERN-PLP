import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';

const ProductCard = ({ product }) => {
    const [loading, setLoading] = useState(false);
    const { addToCart } = useCart();
    const { user } = useAuth();

    const handleAddToCart = async () => {
        if (!user) {
            toast.error('Veuillez vous connecter pour ajouter au panier');
            return;
        }

        setLoading(true);
        try {
            await addToCart(product._id, 1);
            toast.success('Produit ajouté au panier');
        } catch (error) {
            toast.error('Erreur lors de l\'ajout au panier');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="product-card bg-white rounded-xl shadow-md overflow-hidden">
        <div className="h-48 bg-blue-100 flex items-center justify-center">
            <img src={product.image} alt={product.name} className="h-40 object-contain" />
        </div>
        <div className="p-4">
            <h3 className="font-bold text-lg mb-2">{product.name}</h3>
            <p className="text-gray-600 mb-4">{product.description}</p>
            <div className="flex justify-between items-center">
            <span className="text-2xl font-bold text-blue-600">{product.price}€</span>
            <button 
                onClick={handleAddToCart}
                disabled={loading}
                className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 disabled:opacity-50"
            >
                {loading ? '...' : <i className="fas fa-shopping-cart"></i>}
            </button>
            </div>
        </div>
        </div>
    );
};

export default ProductCard;