"use client";

import {
    createContext,
    useContext,
    useEffect,
    useState,
} from "react";

export type CartItem = {
    _id: string;
    name: string;
    price: number;
    image: string;
    size: string;
    quantity: number;
};

type CartContextType = {
    cart: CartItem[];
    addToCart: (item: CartItem) => void;
    removeFromCart: (
        id: string,
        size: string
    ) => void;
    updateQuantity: (
  id: string,
  size: string,
  quantity: number
) => void;
    clearCart: () => void;
};

const CartContext =
    createContext<CartContextType | null>(
        null
    );

export function CartProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const [cart, setCart] = useState<CartItem[]>(() => {
        if (typeof window === "undefined") {
            return [];
        }

        const stored = localStorage.getItem("cart");

        return stored ? JSON.parse(stored) : [];
    });

    useEffect(() => {
        localStorage.setItem(
            "cart",
            JSON.stringify(cart)
        );
    }, [cart]);

    const addToCart = (
        item: CartItem
    ) => {
        setCart((prev) => {
            const existing =
                prev.find(
                    (p) =>
                        p._id === item._id &&
                        p.size === item.size
                );

            if (existing) {
                return prev.map((p) =>
                    p._id === item._id &&
                        p.size === item.size
                        ? {
                            ...p,
                            quantity:
                                p.quantity + 1,
                        }
                        : p
                );
            }

            return [...prev, item];
        });
    };

    const removeFromCart = (
        id: string,
        size: string
    ) => {
        setCart(prev =>
            prev.filter(
                item =>
                    !(
                        item._id === id &&
                        item.size === size
                    )
            )
        );
    };

    const updateQuantity = (
        id: string,
        size: string,
        quantity: number
    ) => {
        setCart(prev =>
            prev.map(item =>
                item._id === id &&
                    item.size === size
                    ? {
                        ...item,
                        quantity,
                    }
                    : item
            )
        );
    };

    const clearCart = () =>
        setCart([]);

    return (
        <CartContext.Provider
            value={{
                cart,
                addToCart,
                removeFromCart,
                updateQuantity,
                clearCart,
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

export const useCart = () => {
    const context =
        useContext(CartContext);

    if (!context) {
        throw new Error(
            "useCart must be used inside CartProvider"
        );
    }

    return context;
};