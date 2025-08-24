import { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
    const { cart, updateCartItem, removeFromCart, clearCart } = useCart();
    const { user } = useAuth();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleUpdateQuantity = async (itemId, newQuantity) => {
        if (newQuantity <= 0) {
        return;
        }
        setLoading(true);
        try {
        await updateCartItem(itemId, newQuantity);
        } catch (error) {
        toast.error('Erreur lors de la mise à jour');
        } finally {
        setLoading(false);
        }
    };

    const handleRemoveItem = async (itemId) => {
        setLoading(true);
        try {
        await removeFromCart(itemId);
        toast.success('Article retiré du panier');
        } catch (error) {
        toast.error('Erreur lors de la suppression');
        } finally {
        setLoading(false);
        }
    };

    const handleClearCart = async () => {
        setLoading(true);
        try {
        await clearCart();
        toast.success('Panier vidé');
        } catch (error) {
        toast.error('Erreur lors de la suppression du panier');
        } finally {
        setLoading(false);
        }
    };

    const handleCheckout = () => {
        if (!user) {
        toast.error('Veuillez vous connecter pour finaliser votre commande');
        return;
        }
        // Rediriger vers la page de paiement (à implémenter)
        toast.info('Fonctionnalité de paiement à implémenter');
    };

    const total = cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
    const shipping = total > 0 ? 9.99 : 0;
    const finalTotal = total + shipping;

    if (!user) {
        return (
        <div className="container mx-auto px-4 py-8">
            <h2 className="text-3xl font-bold mb-6">Votre Panier</h2>
            <div className="text-center py-12">
            <i className="fas fa-shopping-cart text-5xl text-gray-300 mb-4"></i>
            <p className="text-xl text-gray-500 mb-6">Veuillez vous connecter pour voir votre panier</p>
            <button 
                onClick={() => navigate('/login')}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
            >
                Se connecter
            </button>
            </div>
        </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold mb-6">Votre Panier</h2>
        
        {cart.length === 0 ? (
            <div className="text-center py-12">
            <i className="fas fa-shopping-cart text-5xl text-gray-300 mb-4"></i>
            <p className="text-xl text-gray-500 mb-6">Votre panier est vide</p>
            <button 
                onClick={() => navigate('/products')}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
            >
                Explorer les produits
            </button>
            </div>
        ) : (
            <div className="bg-white rounded-xl shadow-md p-6">
            <div className="overflow-x-auto">
                <table className="w-full">
                <thead>
                    <tr className="border-b">
                    <th className="py-3 text-left">Produit</th>
                    <th className="py-3 text-center">Prix</th>
                    <th className="py-3 text-center">Quantité</th>
                    <th className="py-3 text-center">Total</th>
                    <th className="py-3 text-center">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {cart.map(item => (
                    <tr key={item._id} className="border-b">
                        <td className="py-4">
                        <div className="flex items-center">
                            <div className="h-16 w-16 bg-blue-100 rounded-lg mr-4 flex items-center justify-center">
                            <img src={item.product.image} alt={item.product.name} className="h-12 object-contain" />
                            </div>
                            <div>
                            <p className="font-medium">{item.product.name}</p>
                            </div>
                        </div>
                        </td>
                        <td className="py-4 text-center">{item.product.price}€</td>
                        <td className="py-4 text-center">
                        <div className="flex items-center justify-center">
                            <button 
                            onClick={() => handleUpdateQuantity(item._id, item.quantity - 1)}
                            disabled={loading}
                            className="bg-gray-200 rounded-l-lg px-3 py-1 disabled:opacity-50"
                            >-</button>
                            <span className="px-4 py-1 border-t border-b">{item.quantity}</span>
                            <button 
                            onClick={() => handleUpdateQuantity(item._id, item.quantity + 1)}
                            disabled={loading}
                            className="bg-gray-200 rounded-r-lg px-3 py-1 disabled:opacity-50"
                            >+</button>
                        </div>
                        </td>
                        <td className="py-4 text-center font-bold">{(item.product.price * item.quantity).toFixed(2)}€</td>
                        <td className="py-4 text-center">
                        <button 
                            onClick={() => handleRemoveItem(item._id)}
                            disabled={loading}
                            className="text-red-500 hover:text-red-700 disabled:opacity-50"
                        >
                            <i className="fas fa-trash"></i>
                        </button>
                        </td>
                    </tr>
                    ))}
                </tbody>
                </table>
            </div>
            
            <div className="mt-8 flex flex-col md:flex-row justify-between">
                <div className="w-full md:w-1/2 mb-6 md:mb-0">
                <h3 className="text-xl font-bold mb-4">Code promotionnel</h3>
                <div className="flex">
                    <input 
                    type="text" 
                    placeholder="Entrez votre code" 
                    className="px-4 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                    />
                    <button className="bg-blue-600 text-white px-6 py-2 rounded-r-lg hover:bg-blue-700">
                    Appliquer
                    </button>
                </div>
                </div>
                
                <div className="w-full md:w-1/3">
                <div className="bg-gray-100 rounded-lg p-4">
                    <div className="flex justify-between mb-2">
                    <span>Sous-total:</span>
                    <span>{total.toFixed(2)}€</span>
                    </div>
                    <div className="flex justify-between mb-2">
                    <span>Frais de livraison:</span>
                    <span>{shipping.toFixed(2)}€</span>
                    </div>
                    <div className="flex justify-between mb-2">
                    <span>Remise:</span>
                    <span className="text-green-600">-0€</span>
                    </div>
                    <div className="flex justify-between font-bold text-lg mt-4 pt-4 border-t">
                    <span>Total:</span>
                    <span>{finalTotal.toFixed(2)}€</span>
                    </div>
                    <button 
                    onClick={handleCheckout}
                    className="bg-green-600 text-white w-full py-3 rounded-lg mt-4 hover:bg-green-700"
                    >
                    <i className="fas fa-lock mr-2"></i> Procéder au paiement
                    </button>
                </div>
                </div>
            </div>
            </div>
        )}
        </div>
    );
};

export default Cart;