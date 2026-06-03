"use client";

import { useEffect, useState } from "react";
import {
    Plus,
    Pencil,
    Trash2,
} from "lucide-react";
import Link from "next/link";

type Category = {
    _id: string;
    name: string;
    slug: string;
    image: string;
    subCategories: string[];
};

export default function CategoriesPage() {
    const [categories, setCategories] =
        useState<Category[]>([]);

    const [loading, setLoading] =
        useState(true);

    const [deleteId, setDeleteId] =
        useState<string | null>(null);

    const [deleting, setDeleting] =
        useState(false);

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const res = await fetch(
                "/api/categories"
            );

            const data = await res.json();

            setCategories(data.data || []);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const deleteCategory = async () => {
        if (!deleteId) return;

        try {
            setDeleting(true);

            await fetch(
                `/api/categories/${deleteId}`,
                {
                    method: "DELETE",
                }
            );

            setDeleteId(null);

            fetchCategories();
        } catch (error) {
            console.error(error);
        } finally {
            setDeleting(false);
        }
    };

    return (
        <>
            <div>

                <div className="flex items-center justify-between mb-10">

                    <div>

                        <h1 className="text-3xl font-bold">
                            Categories
                        </h1>

                        <p className="text-gray-500 mt-2">
                            Manage product categories
                        </p>

                    </div>

                    <Link
                        href="/admin/categories/add"
                        className="flex items-center gap-2 bg-black text-white px-5 py-3 rounded-xl"
                    >
                        <Plus size={18} />
                        New Category
                    </Link>

                </div>

                {loading ? (

                    <div className="text-center py-20">
                        Loading...
                    </div>

                ) : categories.length === 0 ? (

                    <div className="text-center py-20 text-gray-500">
                        No Categories Found
                    </div>

                ) : (

                    <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">

                        {categories.map((category) => (

                            <div
                                key={category._id}
                                className="bg-white rounded-3xl overflow-hidden border shadow-sm hover:shadow-lg transition"
                            >

                                <div className="h-52 overflow-hidden">

                                    <img
                                        src={
                                            category.image ||
                                            "/placeholder.jpg"
                                        }
                                        alt={category.name}
                                        className="w-full h-full object-cover"
                                    />

                                </div>

                                <div className="p-6">

                                    <h2 className="text-2xl font-semibold">
                                        {category.name}
                                    </h2>

                                    <p className="text-gray-500 mt-1">
                                        {
                                            category.subCategories
                                                .length
                                        }{" "}
                                        Sub Categories
                                    </p>

                                    <div className="flex flex-wrap gap-2 mt-5">

                                        {category.subCategories
                                            .slice(0, 4)
                                            .map((sub) => (

                                                <span
                                                    key={sub}
                                                    className="px-3 py-1 rounded-full bg-gray-100 text-sm"
                                                >
                                                    {sub}
                                                </span>

                                            ))}

                                        {category.subCategories
                                            .length > 4 && (

                                                <span className="px-3 py-1 rounded-full bg-black text-white text-sm">
                                                    +
                                                    {category
                                                        .subCategories
                                                        .length - 4}
                                                </span>

                                            )}

                                    </div>

                                    <div className="flex gap-3 mt-6">

                                        <Link
                                            href={`/admin/categories/edit/${category._id}`}
                                            className="flex-1 flex justify-center items-center gap-2 border rounded-xl py-3 hover:bg-gray-50"
                                        >
                                            <Pencil size={16} />
                                            Edit
                                        </Link>

                                        <button
                                            onClick={() =>
                                                setDeleteId(
                                                    category._id
                                                )
                                            }
                                            className="flex-1 flex justify-center items-center gap-2 bg-red-500 text-white rounded-xl py-3 hover:bg-red-600"
                                        >
                                            <Trash2 size={16} />
                                            Delete
                                        </button>

                                    </div>

                                </div>

                            </div>

                        ))}

                    </div>

                )}

            </div>

            {/* DELETE MODAL */}

            {deleteId && (

                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">

                    <div className="bg-white w-full max-w-md rounded-3xl p-6 shadow-2xl">

                        <h3 className="text-2xl font-semibold">
                            Delete Category
                        </h3>

                        <p className="text-gray-500 mt-3">
                            Are you sure you want to delete
                            this category?
                        </p>

                        <p className="text-red-500 text-sm mt-2">
                            This action cannot be undone.
                        </p>

                        <div className="flex justify-end gap-3 mt-8">

                            <button
                                onClick={() =>
                                    setDeleteId(null)
                                }
                                disabled={deleting}
                                className="px-5 py-2 border rounded-xl"
                            >
                                Cancel
                            </button>

                            <button
                                onClick={deleteCategory}
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