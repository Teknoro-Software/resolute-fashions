"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Minus,
  Plus,
  ShoppingBag,
  Trash2,
} from "lucide-react";

import { useCart } from "@/context/CartContext";
import { useState } from "react";

export default function CartPage() {
  const {
    cart,
    removeFromCart,
    updateQuantity,
  } = useCart();

  const total = cart.reduce(
    (sum, item) =>
      sum +
      Number(item.price) *
      Number(item.quantity),
    0
  );

  const itemCount = cart.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  const whatsappNumber =
    process.env
      .NEXT_PUBLIC_WHATSAPP_NUMBER ||
    "918138847015";

  const [showCheckout, setShowCheckout] =
    useState(false);

  const [name, setName] =
    useState("");

  const [phone, setPhone] =
    useState("");

  const [address, setAddress] =
    useState("");

  const [pincode, setPincode] =
    useState("");


  const placeOrder = () => {
    if (
      !name ||
      !phone ||
      !address ||
      !pincode
    ) {
      alert("Please fill all fields");
      return;
    }

    const lines: string[] = [];

    lines.push(
      "NEW ORDER - RESOLUTE FASHIONS"
    );
    lines.push("");

    lines.push("CUSTOMER DETAILS");
    lines.push(
      "--------------------------------"
    );

    lines.push(`Name: ${name}`);
    lines.push(`Phone: ${phone}`);
    lines.push(`Address: ${address}`);
    lines.push(`Pincode: ${pincode}`);

    lines.push("");

    lines.push("ORDER ITEMS");
    lines.push(
      "--------------------------------"
    );

    cart.forEach((item, index) => {
      // const imageUrl =
      //   `${window.location.origin}${item.image}`;

      const imageUrl =
        item.image?.[0]?.startsWith("http")
          ? item.image[0]
          : `${window.location.origin}${item.image?.[0]}`;

      const productUrl =
        `${window.location.origin}/products/${item._id}`;

      lines.push(
        `${index + 1}. ${item.name}`
      );

      lines.push(
        `Size: ${item.size}`
      );

      lines.push(
        `Quantity: ${item.quantity}`
      );

      lines.push(
        `Price: ₹${item.price}`
      );

      lines.push("");

      lines.push(
        `Image: ${imageUrl}`
      );

      lines.push(
        `Product: ${productUrl}`
      );

      lines.push("");

      lines.push(
        "--------------------------------"
      );
    });

    lines.push("");

    lines.push("ORDER SUMMARY");

    lines.push(
      `Total Items: ${itemCount}`
    );

    lines.push(
      `Total Amount: ₹${total}`
    );

    lines.push("");

    lines.push("Thank you.");

    const message =
      lines.join("\n");

    window.open(
      `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
        message
      )}`,
      "_blank"
    );

    setShowCheckout(false);
  };

  if (cart.length === 0) {
    return (
      <section className="min-h-screen flex items-center justify-center px-6">
        <div className="text-center max-w-md">

          <div className="flex justify-center mb-6">
            <ShoppingBag
              size={80}
              strokeWidth={1}
            />
          </div>

          <h1 className="text-4xl font-light mb-4">
            Your Bag is Empty
          </h1>

          <p className="text-gray-500 mb-8">
            Discover premium fashion
            collections crafted for
            modern style.
          </p>

          <Link
            href="/products"
            className="
              inline-flex
              items-center
              justify-center
              px-8
              py-4
              bg-black
              text-white
              rounded-full
            "
          >
            Continue Shopping
          </Link>

        </div>
      </section>
    );
  }

  return (
    <section className="bg-[#fafafa] min-h-screen py-16 px-6 md:px-12">

      <div className="max-w-7xl mx-auto">

        <div className="mb-8">

          <p className="uppercase tracking-[0.3em] text-xs text-gray-400 mb-3 mt-5">
            Cart
          </p>

          <p className="text-gray-500 mt-4">
            {itemCount} item
            {itemCount > 1 ? "s" : ""}
            {" "}in your cart
          </p>

        </div>

        <div className="grid lg:grid-cols-[1fr_380px] gap-10">

          {/* PRODUCTS */}

          <div className="space-y-6">

            {cart.map((item) => (
              <div
                key={`${item._id}-${item.size}`}
                className="
                  bg-white
                  rounded-[32px]
                  border
                  p-6
                "
              >

                <div className="flex flex-col md:flex-row gap-6">

                  {/* IMAGE */}

                  <div className="w-full md:w-[180px]">

                    <Image
                      src={item.image}
                      alt={item.name}
                      width={180}
                      height={220}
                      className="
                        w-full
                        h-[220px]
                        object-cover
                        rounded-[24px]
                      "
                    />

                  </div>

                  {/* INFO */}

                  <div className="flex-1 flex flex-col justify-between">

                    <div>

                      <div className="flex justify-between">

                        <div>

                          <h2 className="text-2xl font-light">
                            {item.name}
                          </h2>

                          <div className="flex gap-2 mt-4">

                            <span
                              className="
                                px-4
                                py-1
                                rounded-full
                                bg-black
                                text-white
                                text-sm
                              "
                            >
                              {item.size}
                            </span>

                          </div>

                        </div>

                        <button
                          onClick={() =>
                            removeFromCart(
                              item._id,
                              item.size
                            )
                          }
                          className="
                            text-red-500
                            hover:text-red-600
                          "
                        >
                          <Trash2
                            size={20}
                          />
                        </button>

                      </div>

                    </div>

                    <div className="flex items-end justify-between mt-8">

                      <div className="flex items-center gap-3">

                        <button
                          onClick={() =>
                            updateQuantity(
                              item._id,
                              item.size,
                              item.quantity + 1
                            )
                          }
                          className="
                            w-10
                            h-10
                            border
                            rounded-full
                            flex
                            items-center
                            justify-center
                          "
                        >
                          <Minus
                            size={16}
                          />
                        </button>

                        <span className="w-8 text-center">
                          {item.quantity}
                        </span>

                        <button
                          onClick={() =>
                            updateQuantity(
                              item._id,
                              item.size,
                              Math.max(
                                1,
                                item.quantity - 1
                              )
                            )
                          }
                          className="
                            w-10
                            h-10
                            border
                            rounded-full
                            flex
                            items-center
                            justify-center
                          "
                        >
                          <Plus
                            size={16}
                          />
                        </button>

                      </div>

                      <div className="text-right">

                        <p className="text-gray-400 text-sm">
                          Item Total
                        </p>

                        <p className="text-2xl font-medium">
                          ₹
                          {item.price *
                            item.quantity}
                        </p>

                      </div>

                    </div>

                  </div>

                </div>

              </div>
            ))}

          </div>

          {/* SUMMARY */}

          <div>

            <div
              className="
                bg-white
                rounded-[32px]
                border
                p-8
                sticky
                top-24
              "
            >

              <h2 className="text-3xl font-light mb-8">
                Order Summary
              </h2>

              <div className="space-y-5">

                <div className="flex justify-between">

                  <span className="text-gray-500">
                    Items
                  </span>

                  <span>
                    {itemCount}
                  </span>

                </div>

                <div className="flex justify-between">

                  <span className="text-gray-500">
                    Subtotal
                  </span>

                  <span>
                    ₹{total}
                  </span>

                </div>

                <div className="flex justify-between">

                  <span className="text-gray-500">
                    Shipping
                  </span>

                  <span>
                    Free
                  </span>

                </div>

                <div className="border-t pt-5 flex justify-between text-xl font-medium">

                  <span>Total</span>

                  <span>
                    ₹{total}
                  </span>

                </div>

              </div>

              <button
                onClick={() =>
                  setShowCheckout(true)
                }
                className="
    mt-8
    w-full
    h-14
    rounded-full
    bg-[#25D366]
    text-white
    font-medium
  "
              >
                Checkout via WhatsApp
              </button>

              <Link
                href="/products"
                className="
                  mt-4
                  block
                  text-center
                  text-gray-500
                "
              >
                Continue Shopping
              </Link>

            </div>

          </div>

        </div>

      </div>
      {showCheckout && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">

          <div className="bg-white rounded-[32px] p-8 w-full max-w-lg">

            <h2 className="text-3xl font-light mb-6">
              Checkout
            </h2>

            <div className="space-y-4">

              <input
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e) =>
                  setName(
                    e.target.value
                  )
                }
                className="w-full border rounded-xl px-4 py-3"
              />

              <input
                type="tel"
                placeholder="Phone Number"
                value={phone}
                onChange={(e) =>
                  setPhone(
                    e.target.value
                  )
                }
                className="w-full border rounded-xl px-4 py-3"
              />

              <textarea
                placeholder="Address"
                value={address}
                onChange={(e) =>
                  setAddress(
                    e.target.value
                  )
                }
                rows={4}
                className="w-full border rounded-xl px-4 py-3"
              />

              <input
                type="text"
                placeholder="Pincode"
                value={pincode}
                onChange={(e) =>
                  setPincode(
                    e.target.value
                  )
                }
                className="w-full border rounded-xl px-4 py-3"
              />

            </div>

            <div className="flex gap-4 mt-8">

              <button
                onClick={() =>
                  setShowCheckout(false)
                }
                className="
            flex-1
            h-12
            border
            rounded-xl
          "
              >
                Cancel
              </button>

              <button
                onClick={placeOrder}
                className="
            flex-1
            h-12
            bg-[#25D366]
            text-white
            rounded-xl
          "
              >
                Place Order
              </button>

            </div>

          </div>

        </div>
      )}

    </section>

    
  );
}

