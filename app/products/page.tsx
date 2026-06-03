"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";

type Product = {
    _id: string;
    name: string;
    price: number;
    images: string[];
    subCategory: string;
    category?: {
        _id: string;
        name: string;
        slug?: string;
    };
};

function ProductsContent() {
    const searchParams = useSearchParams();

    const type =
        searchParams.get("type");

    const initialCategory =
        searchParams.get("category") || "all";

    const [selectedCategory, setSelectedCategory] =
        useState(initialCategory);

    const [selectedSubCategory, setSelectedSubCategory] =
        useState("All");

    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    const mensCategories = [
        "Formal Shirts",
        "Semi-Formal Shirts",
        "Casual Shirts",
        "T-Shirts",
        "Formal Pants",
        "Baggy Jeans",
    ];

    const ladiesCategories = [
        "Sarees",
        "Co-ord Sets",
        "Churidars",
        "Party Wear",
        "Semi-Casual Wear",
        "Ladies T-Shirts",
        "Baggy Jeans",
    ];

    const subCategories =
        selectedCategory === "mens-wear"
            ? mensCategories
            : selectedCategory === "ladies-wear"
                ? ladiesCategories
                : [];

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);

                const endpoint =
    type === "new-arrivals"
        ? "/api/products/new-arrivals"
        : type === "featured"
            ? "/api/products/featured"
            : "/api/products";

                const res = await fetch(endpoint);

                const data = await res.json();

                const allProducts: Product[] =
                    data?.data || [];

                let filteredProducts = allProducts;

                if (selectedCategory === "mens-wear") {
                    filteredProducts = allProducts.filter((item) =>
                        mensCategories.includes(item.subCategory)
                    );
                }

                if (selectedCategory === "ladies-wear") {
                    filteredProducts = allProducts.filter((item) =>
                        ladiesCategories.includes(item.subCategory)
                    );
                }

                if (selectedSubCategory !== "All") {
                    filteredProducts = filteredProducts.filter(
                        (item) =>
                            item.subCategory
                                ?.trim()
                                .toLowerCase() ===
                            selectedSubCategory
                                .trim()
                                .toLowerCase()
                    );
                }

                setProducts(filteredProducts);
            } catch (error) {
                console.error(
                    "Failed to fetch products",
                    error
                );
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [
        selectedCategory,
        selectedSubCategory,
        type,
    ]);

    return (
        <section className="min-h-screen bg-[#fafafa] px-6 md:px-16 py-20">

            {/* TITLE */}

            {/* <div className="text-center mb-10">

                <h1 className="text-4xl md:text-5xl font-light">
                    Products
                </h1>

                <p className="text-gray-400 mt-3">
                    Discover premium fashion collections
                </p>

            </div> */}

            <div className="text-center mb-12">

                <h1 className="text-4xl md:text-5xl font-light">

                    {type === "new-arrivals"
                        ? "New Arrivals"
                        : type === "featured"
                            ? "Featured Collection"
                            : "Products"}

                </h1>

                <p className="text-gray-400 mt-3">

                    {type === "new-arrivals"
                        ? "Discover our latest arrivals"
                        : type === "featured"
                            ? "Handpicked featured styles"
                            : "Discover premium fashion collections"}

                </p>

            </div>
            {/* CATEGORY FILTER */}

            <div className="flex flex-wrap justify-center gap-3 mb-8">

                <button
                    onClick={() => {
                        setSelectedCategory("all");
                        setSelectedSubCategory("All");
                    }}
                    className={`px-5 py-2 rounded-full border transition ${selectedCategory === "all"
                        ? "bg-black text-white border-black"
                        : "bg-white border-gray-300"
                        }`}
                >
                    All Products
                </button>

                <button
                    onClick={() => {
                        setSelectedCategory(
                            "mens-wear"
                        );
                        setSelectedSubCategory(
                            "All"
                        );
                    }}
                    className={`px-5 py-2 rounded-full border transition ${selectedCategory ===
                        "mens-wear"
                        ? "bg-black text-white border-black"
                        : "bg-white border-gray-300"
                        }`}
                >
                    Men&apos;s Wear
                </button>

                <button
                    onClick={() => {
                        setSelectedCategory(
                            "ladies-wear"
                        );
                        setSelectedSubCategory(
                            "All"
                        );
                    }}
                    className={`px-5 py-2 rounded-full border transition ${selectedCategory ===
                        "ladies-wear"
                        ? "bg-black text-white border-black"
                        : "bg-white border-gray-300"
                        }`}
                >
                    Ladies Wear
                </button>

            </div>

            {/* SUB CATEGORY FILTER */}

            {subCategories.length > 0 && (

                <div className="flex flex-wrap justify-center gap-3 mb-14">

                    <button
                        onClick={() =>
                            setSelectedSubCategory(
                                "All"
                            )
                        }
                        className={`px-5 py-2 rounded-full border transition ${selectedSubCategory ===
                            "All"
                            ? "bg-black text-white border-black"
                            : "bg-white border-gray-300"
                            }`}
                    >
                        All
                    </button>

                    {subCategories.map((item) => (

                        <button
                            key={item}
                            onClick={() =>
                                setSelectedSubCategory(
                                    item
                                )
                            }
                            className={`px-5 py-2 rounded-full border transition ${selectedSubCategory ===
                                item
                                ? "bg-black text-white border-black"
                                : "bg-white border-gray-300"
                                }`}
                        >
                            {item}
                        </button>

                    ))}

                </div>

            )}

            {/* LOADER */}

            {loading ? (

                <div className="flex justify-center py-20">
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
                                initial={{
                                    opacity: 0,
                                    y: 30,
                                }}
                                animate={{
                                    opacity: 1,
                                    y: 0,
                                }}
                                transition={{
                                    delay: i * 0.05,
                                }}
                                className="group cursor-pointer"
                            >

                                <div className="h-[260px] md:h-[340px] bg-[#f1f1f1] rounded-2xl overflow-hidden">

                                    <motion.img
                                        src={
                                            item.images?.[0] ||
                                            "/placeholder.jpg"
                                        }
                                        alt={item.name}
                                        className="w-full h-full object-cover"
                                        whileHover={{
                                            scale: 1.05,
                                        }}
                                    />

                                </div>

                                <div className="mt-4">

                                    <h3 className="text-sm md:text-base font-medium">
                                        {item.name}
                                    </h3>

                                    <p className="text-xs text-gray-400 mt-1">
                                        {item.subCategory}
                                    </p>

                                    <p className="text-sm font-medium mt-2">
                                        ₹{item.price}
                                    </p>

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