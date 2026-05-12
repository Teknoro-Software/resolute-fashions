"use client";

import { useMemo } from "react";
import { useCart } from "@/context/CartContext";

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, total, loading } = useCart();

  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "917560928352";
  const formattedPhone = whatsappNumber.replace(/[^0-9]/g, "");

  const message = useMemo(() => {
    if (cart.length === 0) return "";

    const lines = cart.map((item, index) => {
      const priceNumber = Number(item.price.toString().replace(/[^0-9.]/g, "")) || 0;
      const lineTotal = priceNumber * item.quantity;
      return `${index + 1}. ${item.name} ${item.size ? `(${item.size})` : ""} x${item.quantity} - ${item.price} each - subtotal ₹${lineTotal}`;
    });

    return [
      "Hello, I would like to purchase the following items:",
      ...lines,
      `Total: ₹${total}`,
    ].join("\n");
  }, [cart, total]);

  const handleBuy = () => {
    if (cart.length === 0) return;
    window.open(`https://wa.me/${formattedPhone}?text=${encodeURIComponent(message)}`, "_blank");
  };

  const handleQuantityChange = async (index: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    try {
      await updateQuantity(index, newQuantity);
    } catch (error) {
      console.error("Failed to update quantity:", error);
    }
  };

  if (loading) {
    return (
      <div className="p-10">
        <div className="text-center">Loading cart...</div>
      </div>
    );
  }

  return (
    <div className="p-10">
      <h1 className="text-2xl mb-6">Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <div className="space-y-4 mb-8">
            {cart.map((item, i) => {
              const priceNumber = Number(item.price.toString().replace(/[^0-9.]/g, "")) || 0;
              return (
                <div key={item.id || i} className="grid grid-cols-[80px_1fr_auto] gap-4 items-center p-4 border rounded-lg">
                  <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-md" />
                  <div>
                    <p className="font-semibold">{item.name}</p>
                    <p className="text-sm text-gray-600">{item.size ? `Size: ${item.size}` : ""}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => handleQuantityChange(i, item.quantity - 1)}
                        className="px-2 py-1 border rounded text-sm"
                        disabled={item.quantity <= 1}
                      >
                        -
                      </button>
                      <span className="text-sm">Qty: {item.quantity}</span>
                      <button
                        onClick={() => handleQuantityChange(i, item.quantity + 1)}
                        className="px-2 py-1 border rounded text-sm"
                      >
                        +
                      </button>
                    </div>
                    <p className="text-sm text-gray-600">Price: {item.price}</p>
                    <p className="text-sm text-gray-800">Subtotal: ₹{priceNumber * item.quantity}</p>
                  </div>
                  <button
                    onClick={() => removeFromCart(i)}
                    className="text-sm text-red-600 hover:underline"
                    disabled={loading}
                  >
                    Remove
                  </button>
                </div>
              );
            })}
          </div>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-lg font-semibold">Total</p>
              <p className="text-2xl">₹{total}</p>
            </div>
            <button
              onClick={handleBuy}
              className="px-6 py-3 bg-[var(--primary)] text-white rounded-full hover:opacity-90 transition"
              disabled={loading}
            >
              Buy via WhatsApp
            </button>
          </div>
        </>
      )}
    </div>
  );
}
