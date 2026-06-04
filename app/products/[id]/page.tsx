"use client";

import { useParams } from "next/navigation";
import { useEffect,  useState } from "react";
import { motion } from "framer-motion";
import { useCart } from "@/context/CartContext";

type Product = {
    _id: string;
    name: string;
    description: string;
    price: number;
    images: string[];
    sizes: string[];
    category?: {
        _id: string;
        name: string;
    };
};

export default function ProductDetails() {
    const params = useParams();

    const id = Array.isArray(params.id)
        ? params.id[0]
        : params.id;

    const { addToCart } = useCart();

    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);

    const [selectedImage, setSelectedImage] =
        useState<string>("");

    const [size, setSize] = useState("M");
    const [qty, setQty] = useState(1);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await fetch(
                    `/api/products/${id}`
                );

                const data = await res.json();

                const productData = data.data;

                setProduct(productData);

                setSelectedImage(
                    productData.images?.[0] || ""
                );

                if (
                    productData.sizes &&
                    productData.sizes.length > 0
                ) {
                    setSize(productData.sizes[0]);
                }
            } catch (error) {
                console.error(
                    "Failed to fetch product",
                    error
                );
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchProduct();
        }
    }, [id]);

    const whatsappNumber =
        process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ||
        "918138847015";

    const formattedPhone =
        whatsappNumber.replace(/[^0-9]/g, "");

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
        

    const handleBuyNow = () => {
        if (
            !name ||
            !phone ||
            !address ||
            !pincode
        ) {
            alert("Please fill all fields");
            return;
        }

        if (!product) return;

        const imageUrl =
            product.images?.[0]?.startsWith("http")
                ? product.images[0]
                : `${window.location.origin}${product.images?.[0]}`;

        const productUrl =
            `${window.location.origin}/products/${product._id}`;

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

        lines.push(
            `1. ${product.name}`
        );

        lines.push(
            `Size: ${size}`
        );

        lines.push(
            `Quantity: ${qty}`
        );

        lines.push(
            `Price: ₹${product.price}`
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

        lines.push("");

        lines.push("ORDER SUMMARY");

        lines.push(
            `Total Items: ${qty}`
        );

        lines.push(
            `Total Amount: ₹${product.price * qty}`
        );

        lines.push("");

        lines.push("Thank you.");

        const message =
            lines.join("\n");

        window.open(
            `https://wa.me/${formattedPhone}?text=${encodeURIComponent(
                message
            )}`,
            "_blank"
        );

        setShowCheckout(false);
    };

    if (loading) {
        return (
            <section className="min-h-screen flex items-center justify-center bg-[#f8f8f8]">
                <div className="h-10 w-10 rounded-full border-2 border-black border-t-transparent animate-spin" />
            </section>
        );
    }

    if (!product) {
        return (
            <section className="min-h-screen flex items-center justify-center bg-[#f8f8f8]">
                <h2 className="text-2xl font-medium">
                    Product not found
                </h2>
            </section>
        );
    }

    const allImages = product.images || [];

    return (
        <section className="min-h-screen bg-[#f8f8f8] px-6 md:px-24 py-16 md:py-24">

            <div className="grid md:grid-cols-2 gap-12 md:gap-20">

                {/* LEFT */}

                <div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="bg-white rounded-3xl overflow-hidden"
                    >
                        <img
                            src={selectedImage}
                            alt={product.name}
                            className="w-full h-[500px] object-cover"
                        />
                    </motion.div>

                    {allImages.length > 1 && (
                        <div className="flex gap-4 mt-5">

                            {allImages.map(
                                (img, index) => (
                                    <button
                                        key={index}
                                        onClick={() =>
                                            setSelectedImage(
                                                img
                                            )
                                        }
                                        className={`border rounded-xl overflow-hidden ${selectedImage ===
                                                img
                                                ? "border-black"
                                                : "border-gray-200"
                                            }`}
                                    >
                                        <img
                                            src={img}
                                            alt=""
                                            className="w-20 h-20 object-cover"
                                        />
                                    </button>
                                )
                            )}

                        </div>
                    )}

                </div>

                {/* RIGHT */}

                <div className="flex flex-col justify-center">

                    <p className="text-sm text-gray-400 uppercase tracking-[0.2em] mb-3">
                        {product.category?.name}
                    </p>

                    <h1 className="text-4xl md:text-5xl font-light mb-5">
                        {product.name}
                    </h1>

                    <p className="text-2xl font-medium mb-6">
                        ₹{product.price}
                    </p>

                    <p className="text-gray-600 leading-relaxed mb-10">
                        {product.description}
                    </p>

                    {/* SIZE */}

                    {product.sizes?.length > 0 && (
                        <div className="mb-8">

                            <p className="text-sm font-medium mb-4">
                                Select Size
                            </p>

                            <div className="flex gap-3">

                                {product.sizes.map(
                                    (s) => (
                                        <button
                                            key={s}
                                            onClick={() =>
                                                setSize(
                                                    s
                                                )
                                            }
                                            className={`h-12 w-12 rounded-full border ${size ===
                                                    s
                                                    ? "bg-black text-white border-black"
                                                    : "bg-white border-gray-300"
                                                }`}
                                        >
                                            {s}
                                        </button>
                                    )
                                )}

                            </div>

                        </div>
                    )}

                    {/* QUANTITY */}

                    <div className="mb-10">

                        <p className="text-sm font-medium mb-4">
                            Quantity
                        </p>

                        <div className="flex items-center gap-4">

                            <button
                                onClick={() =>
                                    setQty(
                                        (
                                            prev
                                        ) =>
                                            Math.max(
                                                1,
                                                prev -
                                                1
                                            )
                                    )
                                }
                                className="h-12 w-12 rounded-full border"
                            >
                                -
                            </button>

                            <span className="text-lg font-medium">
                                {qty}
                            </span>

                            <button
                                onClick={() =>
                                    setQty(
                                        (
                                            prev
                                        ) =>
                                            prev +
                                            1
                                    )
                                }
                                className="h-12 w-12 rounded-full border"
                            >
                                +
                            </button>

                        </div>

                    </div>

                    {/* BUTTONS */}

                    <div className="space-y-4">

                        <button
                            onClick={() =>
                                addToCart({
                                    _id: product._id,
                                    name: product.name,
                                    price: product.price,
                                    image:
                                        product
                                            .images?.[0] ||
                                        "",
                                    quantity:
                                        qty,
                                    size,
                                })
                            }
                            className="w-full h-14 rounded-full bg-black text-white"
                        >
                            ADD TO CART
                        </button>

                        <button
                            onClick={() =>
                                setShowCheckout(true)
                            }
                            className="w-full h-14 rounded-full border border-black"
                        >
                            BUY VIA WHATSAPP
                        </button>

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
                                onClick={handleBuyNow}
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