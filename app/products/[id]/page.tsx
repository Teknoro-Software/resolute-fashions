"use client";

import { useParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { useCart } from "@/context/CartContext";

type Product = {
    _id: string;
    name: string;
    description: string;
    price: number;
    image: string;
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

    // FETCH PRODUCT
    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await fetch(`/api/products/${id}`);

                const data = await res.json();

                console.log("PRODUCT:", data);

                const productData = data.data;

                setProduct(productData);

                // MAIN IMAGE
                setSelectedImage(
                    productData.image ||
                    productData.images?.[0] ||
                    ""
                );

                // DEFAULT SIZE
                if (productData.sizes?.length > 0) {
                    setSize(productData.sizes[0]);
                }

            } catch (error) {
                console.error("Failed to fetch product", error);
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchProduct();
        }
    }, [id]);

    // WHATSAPP NUMBER
    const whatsappNumber =
        process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ||
        "918138847015";

    const formattedPhone =
        whatsappNumber.replace(/[^0-9]/g, "");

    // WHATSAPP MESSAGE
    const buyMessage = useMemo(() => {
        if (!product) return "";

        const total = product.price * qty;

        const websiteUrl =
            typeof window !== "undefined"
                ? window.location.origin
                : "";

        const productUrl = `${websiteUrl}/products/${product._id}`;

        const imageUrl = product.image.startsWith("http")
            ? product.image
            : `${websiteUrl}${product.image}`;

        return [
            "Hello, I would like to buy this product:",
            "",
            `Product: ${product.name}`,
            `Category: ${product.category?.name || ""}`,
            `Size: ${size}`,
            `Quantity: ${qty}`,
            `Price: ₹${product.price}`,
            `Total: ₹${total}`,
            "",
            `Product Link: ${productUrl}`,
            `Product Image: ${imageUrl}`,
        ].join("\n");

    }, [product, qty, size]);

    // BUY NOW
    const handleBuyNow = () => {
        if (!product) return;

        window.open(
            `https://wa.me/${formattedPhone}?text=${encodeURIComponent(
                buyMessage
            )}`,
            "_blank"
        );
    };

    // LOADING
    if (loading) {
        return (
            <section className="min-h-screen flex items-center justify-center bg-[#f8f8f8]">

                <div className="h-10 w-10 rounded-full border-2 border-black border-t-transparent animate-spin" />

            </section>
        );
    }

    // NOT FOUND
    if (!product) {
        return (
            <section className="min-h-screen flex items-center justify-center bg-[#f8f8f8]">

                <div className="text-center">

                    <h2 className="text-2xl font-medium">
                        Product not found
                    </h2>

                </div>

            </section>
        );
    }

    // ALL IMAGES
    const allImages = [
        product.image,
        ...(product.images || []),
    ].filter(Boolean);

    return (
        <section className="min-h-screen bg-[#f8f8f8] px-6 md:px-24 py-16 md:py-24">

            <div className="grid md:grid-cols-2 gap-12 md:gap-20">

                {/* LEFT */}
                <div>

                    {/* MAIN IMAGE */}
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

                    {/* THUMBNAILS */}
                    {allImages.length > 1 && (
                        <div className="flex gap-4 mt-5">

                            {allImages.map((img, i) => (
                                <button
                                    key={i}
                                    onClick={() => setSelectedImage(img)}
                                    className={`border rounded-xl overflow-hidden transition ${selectedImage === img
                                            ? "border-black"
                                            : "border-gray-200"
                                        }`}
                                >

                                    <img
                                        src={img}
                                        alt={`${product.name}-${i}`}
                                        className="w-20 h-20 object-cover"
                                    />

                                </button>
                            ))}

                        </div>
                    )}

                </div>

                {/* RIGHT */}
                <div className="flex flex-col justify-center">

                    {/* CATEGORY */}
                    <p className="text-sm text-gray-400 uppercase tracking-[0.2em] mb-3">
                        {product.category?.name}
                    </p>

                    {/* TITLE */}
                    <h1 className="text-4xl md:text-5xl font-light tracking-tight mb-5">
                        {product.name}
                    </h1>

                    {/* PRICE */}
                    <p className="text-2xl font-medium mb-6">
                        ₹{product.price}
                    </p>

                    {/* DESCRIPTION */}
                    <p className="text-gray-600 leading-relaxed mb-10">
                        {product.description}
                    </p>

                    {/* SIZES */}
                    {product.sizes?.length > 0 && (
                        <div className="mb-8">

                            <p className="text-sm font-medium mb-4">
                                Select Size
                            </p>

                            <div className="flex gap-3">

                                {product.sizes.map((s) => (
                                    <button
                                        key={s}
                                        onClick={() => setSize(s)}
                                        className={`h-12 w-12 rounded-full border text-sm transition ${size === s
                                                ? "bg-black text-white border-black"
                                                : "bg-white border-gray-300 hover:border-black"
                                            }`}
                                    >
                                        {s}
                                    </button>
                                ))}

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
                                    setQty((q) => Math.max(1, q - 1))
                                }
                                className="h-12 w-12 rounded-full border border-gray-300 text-xl"
                            >
                                -
                            </button>

                            <span className="text-lg font-medium">
                                {qty}
                            </span>

                            <button
                                onClick={() => setQty((q) => q + 1)}
                                className="h-12 w-12 rounded-full border border-gray-300 text-xl"
                            >
                                +
                            </button>

                        </div>

                    </div>

                    {/* BUTTONS */}
                    <div className="space-y-4">

                        {/* ADD TO CART */}
                        <button
                            onClick={() =>
                                addToCart({
                                    id: product._id,
                                    name: product.name,
                                    price: `₹${product.price}`,
                                    image: product.image,
                                    quantity: qty,
                                    size,
                                })
                            }
                            className="w-full h-14 rounded-full bg-black text-white text-sm tracking-wide hover:opacity-90 transition"
                        >
                            ADD TO CART
                        </button>

                        {/* BUY VIA WHATSAPP */}
                        <button
                            onClick={handleBuyNow}
                            className="w-full h-14 rounded-full border border-black text-black text-sm tracking-wide hover:bg-black hover:text-white transition"
                        >
                            BUY VIA WHATSAPP
                        </button>

                    </div>

                </div>

            </div>

        </section>
    );
}