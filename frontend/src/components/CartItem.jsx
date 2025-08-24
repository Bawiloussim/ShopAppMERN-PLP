import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { toast } from 'react-toastify';

const CartItem = ({ item }) => {
    const [loading, setLoading] = useState(false);
    const { updateCartItem, removeFromCart } = useCart();

    const handleUpdateQuantity = async (newQuantity) => {
        if (newQuantity <= 0) {
        return;
        }
        setLoading(true);
        try {
            await updateCartItem(item._id, newQuantity);
        } catch (error) {
            toast.error('Erreur lors de la mise à jour');
        } finally {
            setLoading(false);
        }
    };

    const handleRemove = async () => {
        setLoading(true);
        try {
            await removeFromCart(item._id);
            toast.success('Article retiré du panier');
        } catch (error) {
            toast.error('Erreur lors de la suppression');
        } finally {
            setLoading(false);
        }
    };

    return (
        <tr className="border-b">
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
                onClick={() => handleUpdateQuantity(item.quantity - 1)}
                disabled={loading}
                className="bg-gray-200 rounded-l-lg px-3 py-1 disabled:opacity-50"
            >-</button>
            <span className="px-4 py-1 border-t border-b">{item.quantity}</span>
            <button 
                onClick={() => handleUpdateQuantity(item.quantity + 1)}
                disabled={loading}
                className="bg-gray-200 rounded-r-lg px-3 py-1 disabled:opacity-50"
            >+</button>
            </div>
        </td>
        <td className="py-4 text-center font-bold">{(item.product.price * item.quantity).toFixed(2)}€</td>
        <td className="py-4 text-center">
            <button 
            onClick={handleRemove}
            disabled={loading}
            className="text-red-500 hover:text-red-700 disabled:opacity-50"
            >
            <i className="fas fa-trash"></i>
            </button>
        </td>
        </tr>
    );
};

export default CartItem;