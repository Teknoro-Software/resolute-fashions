"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";

type Product = {
    _id: string;
    name: string;
    price: number;
    image: string;
    category: {
        _id: string;
        name: string;
    };
};

function ProductsContent() {
    const searchParams = useSearchParams();

    const category = searchParams.get("category") || "All";

    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);

                const res = await fetch("/api/products");

                const data = await res.json();

                console.log("API RESPONSE:", data);

                const allProducts = data.data || [];

                // ✅ FILTER USING POPULATED CATEGORY
                const filteredProducts =
                    category === "All"
                        ? allProducts
                        : allProducts.filter(
                            (item: Product) =>
                                item.category?.name?.toLowerCase() ===
                                category.toLowerCase()
                        );

                setProducts(filteredProducts);
            } catch (error) {
                console.error("Failed to fetch products:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [category]);

    return (
        <section className="min-h-screen bg-[#fafafa] px-6 md:px-16 py-20">

            {/* TITLE */}
            <div className="text-center mb-14">

                <h1 className="text-4xl md:text-5xl font-light tracking-tight">
                    {category}
                </h1>

                <p className="text-gray-400 mt-3 text-sm">
                    Discover premium fashion collections
                </p>

            </div>

            {/* LOADING */}
            {loading ? (
                <div className="flex justify-center items-center py-20">

                    <div className="h-10 w-10 rounded-full border-2 border-black border-t-transparent animate-spin" />

                </div>
            ) : products.length === 0 ? (
                <div className="text-center py-20 text-gray-500">
                    No products found
                </div>
            ) : (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10">

                    {products.map((item, i) => (
                        <Link
                            href={`/products/${item._id}`}
                            key={item._id}
                        >

                            <motion.div
                                initial={{ opacity: 0, y: 40 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{
                                    delay: i * 0.05,
                                    duration: 0.5,
                                }}
                                className="group cursor-pointer"
                            >

                                {/* IMAGE */}
                                <div className="relative h-[260px] md:h-[340px] bg-[#f2f2f2] rounded-2xl overflow-hidden">

                                    <motion.img
                                        src={item.image}
                                        alt={item.name}
                                        className="w-full h-full object-cover"
                                        whileHover={{ scale: 1.06 }}
                                        transition={{ duration: 0.4 }}
                                    />

                                    {/* OVERLAY */}
                                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition duration-300" />

                                </div>

                                {/* INFO */}
                                <div className="mt-4">

                                    <div className="flex items-center justify-between">

                                        <div>

                                            <h3 className="text-sm md:text-base font-medium tracking-tight">
                                                {item.name}
                                            </h3>

                                            <p className="text-xs text-gray-400 mt-1">
                                                {item.category?.name}
                                            </p>

                                        </div>

                                        <p className="text-sm font-medium">
                                            ₹{item.price}
                                        </p>

                                    </div>

                                </div>

                            </motion.div>

                        </Link>
                    ))}

                </div>
            )}

        </section>
    );
}

export default function ProductsPage() {
    return (
        <Suspense
            fallback={
                <section className="min-h-screen bg-[#fafafa]" />
            }
        >
            <ProductsContent />
        </Suspense>
    );
}