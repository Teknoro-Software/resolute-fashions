"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Plus, Pencil, Trash2, Search, Eye } from "lucide-react";

type Product = {
    _id: string;
    name: string;
    price: number;
    stock: number;
    images: string[];
    subCategory: string;
    category?: {
        _id: string;
        name: string;
    };
};

type Category = {
    _id: string;
    name: string;
    subCategories: string[];
};

export default function ProductsPage() {
    const [products, setProducts] =
        useState<Product[]>([]);

    const [categories, setCategories] =
        useState<Category[]>([]);

    const [loading, setLoading] =
        useState(true);

    const [search, setSearch] =
        useState("");

    const [selectedCategory, setSelectedCategory] =
        useState("all");

    const [selectedSubCategory, setSelectedSubCategory] =
        useState("all");

    const [stockFilter, setStockFilter] =
        useState("all");

    const [deleteId, setDeleteId] =
        useState<string | null>(null);

    const [deleting, setDeleting] =
        useState(false);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const [productsRes, categoriesRes] =
                await Promise.all([
                    fetch("/api/products"),
                    fetch("/api/categories"),
                ]);

            const productsData =
                await productsRes.json();

            const categoriesData =
                await categoriesRes.json();

            setProducts(
                productsData.data || []
            );

            setCategories(
                categoriesData.data || []
            );
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const deleteProduct = async () => {
        if (!deleteId) return;

        try {
            setDeleting(true);

            await fetch(
                `/api/products/${deleteId}`,
                {
                    method: "DELETE",
                }
            );

            setDeleteId(null);

            fetchData();
        } catch (error) {
            console.error(error);
        } finally {
            setDeleting(false);
        }
    };

    const currentCategory =
        categories.find(
            (cat) =>
                cat._id === selectedCategory
        );

    const filteredProducts =
        useMemo(() => {
            return products.filter(
                (product) => {
                    const matchesSearch =
                        product.name
                            .toLowerCase()
                            .includes(
                                search.toLowerCase()
                            );

                    const matchesCategory =
                        selectedCategory === "all"
                            ? true
                            : String(product.category) === selectedCategory;

                    const matchesSubCategory =
                        selectedSubCategory ===
                            "all"
                            ? true
                            : product.subCategory ===
                            selectedSubCategory;

                    const matchesStock =
                        stockFilter === "all"
                            ? true
                            : stockFilter ===
                                "instock"
                                ? product.stock > 0
                                : product.stock <= 0;

                    return (
                        matchesSearch &&
                        matchesCategory &&
                        matchesSubCategory &&
                        matchesStock
                    );
                }
            );
        }, [
            products,
            search,
            selectedCategory,
            selectedSubCategory,
            stockFilter,
        ]);

    return (
        <>
            <div>

                <div className="flex justify-between items-center mb-8">

                    <div>

                        <h1 className="text-3xl font-bold">
                            Products
                        </h1>

                        <p className="text-gray-500 mt-2">
                            Manage your store products
                        </p>

                    </div>

                    <Link
                        href="/admin/products/add"
                        className="flex items-center gap-2 bg-black text-white px-5 py-3 rounded-xl"
                    >
                        <Plus size={18} />
                        Add Product
                    </Link>

                </div>

                {/* FILTERS */}

                <div className="bg-white border rounded-3xl p-5 mb-8">

                    <div className="grid md:grid-cols-4 gap-4">

                        <div className="relative">

                            <Search
                                size={18}
                                className="absolute left-4 top-3.5 text-gray-400"
                            />

                            <input
                                value={search}
                                onChange={(e) =>
                                    setSearch(
                                        e.target.value
                                    )
                                }
                                placeholder="Search products..."
                                className="w-full border rounded-xl pl-10 pr-4 py-3"
                            />

                        </div>

                        <select
                            value={
                                selectedCategory
                            }
                            onChange={(e) => {
                                setSelectedCategory(
                                    e.target.value
                                );

                                setSelectedSubCategory(
                                    "all"
                                );
                            }}
                            className="border rounded-xl px-4 py-3"
                        >

                            <option value="all">
                                All Categories
                            </option>

                            {categories.map(
                                (category) => (
                                    <option
                                        key={
                                            category._id
                                        }
                                        value={
                                            category._id
                                        }
                                    >
                                        {category.name}
                                    </option>
                                )
                            )}

                        </select>

                        <select
                            value={
                                selectedSubCategory
                            }
                            onChange={(e) =>
                                setSelectedSubCategory(
                                    e.target.value
                                )
                            }
                            className="border rounded-xl px-4 py-3"
                        >

                            <option value="all">
                                All Sub Categories
                            </option>

                            {currentCategory?.subCategories.map(
                                (sub) => (
                                    <option
                                        key={sub}
                                        value={sub}
                                    >
                                        {sub}
                                    </option>
                                )
                            )}

                        </select>

                        <select
                            value={stockFilter}
                            onChange={(e) =>
                                setStockFilter(
                                    e.target.value
                                )
                            }
                            className="border rounded-xl px-4 py-3"
                        >

                            <option value="all">
                                All Stock
                            </option>

                            <option value="instock">
                                In Stock
                            </option>

                            <option value="outofstock">
                                Out Of Stock
                            </option>

                        </select>

                    </div>

                </div>

                {/* TABLE */}

                <div className="bg-white border rounded-3xl overflow-hidden">

                    {loading ? (

                        <div className="p-10 text-center">
                            Loading...
                        </div>

                    ) : filteredProducts.length ===
                        0 ? (

                        <div className="p-10 text-center text-gray-500">
                            No Products Found
                        </div>

                    ) : (

                        <table className="w-full">

                            <thead className="bg-gray-50">

                                <tr>

                                    <th className="text-left p-5">
                                        Product
                                    </th>

                                    {/* <th className="text-left p-5">
                                        Category
                                    </th> */}

                                    <th className="text-left p-5">
                                        Price
                                    </th>

                                    <th className="text-left p-5">
                                        Stock
                                    </th>

                                    <th className="text-right p-5">
                                        Actions
                                    </th>

                                </tr>

                            </thead>

                            <tbody>

                                {filteredProducts.map(
                                    (product) => (

                                        <tr
                                            key={product._id}
                                            className="border-t"
                                        >

                                            <td className="p-5">

                                                <div className="flex items-center gap-4">

                                                    <img
                                                        src={
                                                            product
                                                                .images?.[0] ||
                                                            "/placeholder.jpg"
                                                        }
                                                        alt={
                                                            product.name
                                                        }
                                                        className="w-16 h-16 rounded-xl object-cover border"
                                                    />

                                                    <div>

                                                        <h3 className="font-medium">
                                                            {
                                                                product.name
                                                            }
                                                        </h3>

                                                        <p className="text-sm text-gray-500">
                                                            {
                                                                product.subCategory
                                                            }
                                                        </p>

                                                    </div>

                                                </div>

                                            </td>

                                            {/* <td className="p-5">
                                                {product
                                                    .category
                                                    ?.name || "-"}
                                            </td> */}

                                            <td className="p-5">
                                                ₹
                                                {product.price}
                                            </td>

                                            <td className="p-5">
                                                {product.stock}
                                            </td>

                                            <td className="p-5">

                                                <div className="flex justify-end">

                                                    <Link
                                                        href={`/admin/products/${product._id}`}
                                                        className="px-4 py-2 border rounded-xl flex items-center gap-2 hover:bg-gray-50"
                                                    >
                                                        <Eye size={16} />
                                                        View
                                                    </Link>

                                                </div>

                                            </td>

                                        </tr>

                                    )
                                )}

                            </tbody>

                        </table>

                    )}

                </div>

            </div>

            {deleteId && (

                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

                    <div className="bg-white rounded-3xl p-6 w-full max-w-md">

                        <h3 className="text-xl font-semibold">
                            Delete Product
                        </h3>

                        <p className="text-gray-500 mt-3">
                            Are you sure you want to
                            delete this product?
                        </p>

                        <div className="flex justify-end gap-3 mt-8">

                            <button
                                onClick={() =>
                                    setDeleteId(null)
                                }
                                className="px-5 py-2 border rounded-xl"
                            >
                                Cancel
                            </button>

                            <button
                                onClick={
                                    deleteProduct
                                }
                                disabled={deleting}
                                className="px-5 py-2 bg-red-500 text-white rounded-xl"
                            >
                                {deleting
                                    ? "Deleting..."
                                    : "Delete"}
                            </button>

                        </div>

                    </div>

                </div>

            )}
        </>
    );
}