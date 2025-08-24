import { createContext, useContext, useState, useEffect } from 'react';
import { cartAPI } from '../services/cart';

const CartContext = createContext();

export const useCart = () => {
    return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // Charger le panier depuis l'API si l'utilisateur est connecté
        const token = localStorage.getItem('token');
        if (token) {
        fetchCart();
        }
    }, []);

    const fetchCart = async () => {
        try {
        setLoading(true);
        const response = await cartAPI.getCart();
        setCart(response.data.items || []);
        } catch (error) {
        console.error('Error fetching cart:', error);
        } finally {
        setLoading(false);
        }
    };

    const addToCart = async (productId, quantity = 1) => {
        try {
        const response = await cartAPI.addToCart(productId, quantity);
        setCart(response.data.items);
        return response;
        } catch (error) {
        throw error;
        }
    };

    const updateCartItem = async (itemId, quantity) => {
        try {
        const response = await cartAPI.updateCartItem(itemId, quantity);
        setCart(response.data.items);
        return response;
        } catch (error) {
        throw error;
        }
    };

    const removeFromCart = async (itemId) => {
        try {
        const response = await cartAPI.removeFromCart(itemId);
        setCart(response.data.items);
        return response;
        } catch (error) {
        throw error;
        }
    };

    const clearCart = async () => {
        try {
        await cartAPI.clearCart();
        setCart([]);
        } catch (error) {
        throw error;
        }
    };

    const value = {
        cart,
        addToCart,
        updateCartItem,
        removeFromCart,
        clearCart,
        loading,
    };

    return (
        <CartContext.Provider value={value}>
        {children}
        </CartContext.Provider>
    );
};