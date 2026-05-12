/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { createContext, useContext, useEffect, useState } from "react";
import {
    getCart,
    addToCart as apiAddToCart,
    updateCartItem as apiUpdateCartItem,
    removeFromCart as apiRemoveFromCart,
} from "@/lib/api-client";

type CartItem = {
    id: string;
    name: string;
    price: string;
    image: string;
    quantity: number;
    size?: string;
    productId?: string;
};

type CartContextType = {
    cart: CartItem[];
    addToCart: (item: CartItem) => Promise<void>;
    removeFromCart: (index: number) => Promise<void>;
    updateQuantity: (index: number, quantity: number) => Promise<void>;
    total: number;
    loading: boolean;
    refreshCart: () => Promise<void>;
};

const CartContext = createContext<CartContextType | null>(null);

export const CartProvider = ({ children }: any) => {
    const [cart, setCart] = useState<CartItem[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        refreshCart();
    }, []);

    const refreshCart = async () => {
        try {
            setLoading(true);
            const response = await getCart();
            if (response.success) {
                const cartItems = response.data.items.map((item: any) => ({
                    id: item.cartItemId || item._id,
                    productId: item.productId,
                    name: item.name,
                    price: `₹${item.price}`,
                    image: item.image,
                    quantity: item.quantity,
                    size: item.size,
                }));
                setCart(cartItems);
            }
        } catch (error) {
            console.error("Failed to load cart:", error);
        } finally {
            setLoading(false);
        }
    };

    const addToCart = async (item: CartItem) => {
        try {
            setLoading(true);
            const response = await apiAddToCart({
                productId: item.productId || item.id,
                size: item.size || "",
                quantity: item.quantity,
            });

            if (response.success) {
                await refreshCart();
            }
        } catch (error) {
            console.error("Failed to add to cart:", error);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const removeFromCart = async (index: number) => {
        try {
            setLoading(true);
            const item = cart[index];
            if (item) {
                await apiRemoveFromCart(item.id);
                await refreshCart();
            }
        } catch (error) {
            console.error("Failed to remove from cart:", error);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const updateQuantity = async (index: number, quantity: number) => {
        try {
            setLoading(true);
            const item = cart[index];
            if (item && quantity > 0) {
                await apiUpdateCartItem(item.id, quantity);
                await refreshCart();
            }
        } catch (error) {
            console.error("Failed to update quantity:", error);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const total = cart.reduce((sum, item) => {
        const priceNumber = Number(item.price.replace(/[^0-9.]/g, ""));
        return sum + priceNumber * item.quantity;
    }, 0);

    return (
        <CartContext.Provider
            value={{
                cart,
                addToCart,
                removeFromCart,
                updateQuantity,
                total,
                loading,
                refreshCart,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) throw new Error("Cart not found");
    return context;
};
