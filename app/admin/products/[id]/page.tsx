"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Pencil, Trash2 } from "lucide-react";

type Product = {
    _id: string;
    name: string;
    description: string;
    price: number;
    stock: number;
    subCategory: string;
    images: string[];
    sizes: string[];
    category?: {
        _id: string;
        name: string;
    } | null;
};

export default function ProductDetailsPage() {
    const params = useParams();
    const router = useRouter();

    const [product, setProduct] =
        useState<Product | null>(null);

    const [selectedImage, setSelectedImage] =
        useState("");

    const [showDeleteModal, setShowDeleteModal] =
        useState(false);

    const [deleting, setDeleting] =
        useState(false);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await fetch(
                    `/api/products/${params.id}`
                );

                const data = await res.json();

                setProduct(data.data);

                setSelectedImage(
                    data.data.images?.[0] || ""
                );
            } catch (error) {
                console.error(error);
            }
        };

        fetchProduct();
    }, [params.id]);

    const deleteProduct = async () => {
        if (!product) return;

        try {
            setDeleting(true);

            const res = await fetch(
                `/api/products/${product._id}`,
                {
                    method: "DELETE",
                }
            );

            if (!res.ok) {
                throw new Error(
                    "Failed to delete product"
                );
            }

            router.push("/admin/products");
        } catch (error) {
            console.error(error);
            alert("Failed to delete product");
        } finally {
            setDeleting(false);
        }
    };

    if (!product) {
        return (
            <div className="p-10">
                Loading...
            </div>
        );
    }

    return (
        <>
            <div className="max-w-7xl mx-auto">

                <div className="flex justify-between items-center mb-10">

                    <div>

                        <h1 className="text-3xl font-bold">
                            Product Details
                        </h1>

                        <p className="text-gray-500 mt-2">
                            View product information
                        </p>

                    </div>

                    <div className="flex gap-3">

                        <Link
                            href={`/admin/products/edit/${product._id}`}
                            className="px-5 py-3 border rounded-xl flex items-center gap-2 hover:bg-gray-50"
                        >
                            <Pencil size={16} />
                            Edit
                        </Link>

                        <button
                            onClick={() =>
                                setShowDeleteModal(true)
                            }
                            className="px-5 py-3 bg-red-500 text-white rounded-xl flex items-center gap-2 hover:bg-red-600"
                        >
                            <Trash2 size={16} />
                            Delete
                        </button>

                    </div>

                </div>

                <div className="grid lg:grid-cols-2 gap-10">

                    {/* Images */}

                    <div>

                        <img
                            src={selectedImage}
                            alt={product.name}
                            className="w-full h-[400px] object-fit rounded-3xl border"
                        />

                        <div className="grid grid-cols-3 gap-4 mt-4">

                            {product.images
                                ?.slice(0, 3)
                                .map((image, index) => (

                                    <img
                                        key={index}
                                        src={image}
                                        alt={`${product.name}-${index}`}
                                        onClick={() =>
                                            setSelectedImage(image)
                                        }
                                        className={`h-28 w-full object-fit rounded-xl border cursor-pointer transition ${selectedImage === image
                                                ? "ring-2 ring-black"
                                                : ""
                                            }`}
                                    />

                                ))}

                        </div>

                    </div>

                    {/* Details */}

                    <div className="space-y-6">

                        <h2 className="text-4xl font-bold">
                            {product.name}
                        </h2>

                        <p className="text-gray-500 leading-7">
                            {product.description}
                        </p>

                        <div className="grid grid-cols-2 gap-6">

                            <div>

                                <p className="text-sm text-gray-500">
                                    Price
                                </p>

                                <p className="text-xl font-semibold">
                                    ₹{product.price}
                                </p>

                            </div>

                            <div>

                                <p className="text-sm text-gray-500">
                                    Stock
                                </p>

                                <p className="text-xl font-semibold">
                                    {product.stock}
                                </p>

                            </div>

                            <div>

                                <p className="text-sm text-gray-500">
                                    Category
                                </p>

                                <p className="font-medium">
                                    {product.category
                                        ?.name || "-"}
                                </p>

                            </div>

                            <div>

                                <p className="text-sm text-gray-500">
                                    Sub Category
                                </p>

                                <p className="font-medium">
                                    {product.subCategory}
                                </p>

                            </div>

                        </div>

                        <div>

                            <p className="text-sm text-gray-500 mb-3">
                                Available Sizes
                            </p>

                            <div className="flex flex-wrap gap-2">

                                {product.sizes.map(
                                    (size) => (

                                        <span
                                            key={size}
                                            className="px-4 py-2 bg-gray-100 rounded-xl"
                                        >
                                            {size}
                                        </span>

                                    )
                                )}

                            </div>

                        </div>

                    </div>

                </div>

            </div>

            {/* Delete Modal */}

            {showDeleteModal && (

                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

                    <div className="bg-white rounded-3xl p-6 w-full max-w-md">

                        <h3 className="text-xl font-semibold">
                            Delete Product
                        </h3>

                        <p className="text-gray-500 mt-3">
                            Are you sure you want to
                            delete this product?
                        </p>

                        <p className="text-red-500 text-sm mt-2">
                            This action cannot be undone.
                        </p>

                        <div className="flex justify-end gap-3 mt-8">

                            <button
                                onClick={() =>
                                    setShowDeleteModal(false)
                                }
                                className="px-5 py-2 border rounded-xl"
                            >
                                Cancel
                            </button>

                            <button
                                onClick={deleteProduct}
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