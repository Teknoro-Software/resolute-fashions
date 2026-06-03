"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

type Category = {
    _id: string;
    name: string;
    subCategories: string[];
};

const availableSizes = [
    "S",
    "M",
    "L",
    "XL",
    "XXL",
];

export default function EditProductPage() {
    const params = useParams();
    const router = useRouter();

    const [loading, setLoading] =
        useState(false);

    const [categories, setCategories] =
        useState<Category[]>([]);


    const [newArrival, setNewArrival] =
        useState(false);

    const [featured, setFeatured] =
        useState(false);

    const [name, setName] =
        useState("");

    const [description, setDescription] =
        useState("");

    const [price, setPrice] =
        useState("");

    const [stock, setStock] =
        useState("");

    const [category, setCategory] =
        useState("");

    const [subCategory, setSubCategory] =
        useState("");

    const [sizes, setSizes] =
        useState<string[]>([]);

    const [images, setImages] =
        useState<string[]>([]);

    const [newFiles, setNewFiles] =
        useState<File[]>([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const [productRes, categoriesRes] =
                await Promise.all([
                    fetch(
                        `/api/products/${params.id}`
                    ),
                    fetch("/api/categories"),
                ]);

            const productData =
                await productRes.json();

            const categoriesData =
                await categoriesRes.json();

            const product =
                productData.data;

            setCategories(
                categoriesData.data || []
            );

            setName(product.name);
            setDescription(
                product.description
            );
            setPrice(
                String(product.price)
            );
            setStock(
                String(product.stock)
            );

            setCategory(
                product.category?._id ||
                product.category
            );

            setSubCategory(
                product.subCategory
            );

            setSizes(
                product.sizes || []
            );

            setNewArrival(
                product.newArrival || false
            );
            setFeatured(
                product.featured || false
            );

            setImages(
                product.images || []
            );
        } catch (error) {
            console.error(error);
        }
    };

    const currentCategory =
        categories.find(
            (cat) =>
                cat._id === category
        );

    const toggleSize = (
        size: string
    ) => {
        setSizes((prev) =>
            prev.includes(size)
                ? prev.filter(
                    (s) => s !== size
                )
                : [...prev, size]
        );
    };

    const handleImageUpload = async () => {
        const uploadedImages: string[] =
            [...images];

        for (const file of newFiles) {
            const formData =
                new FormData();

            formData.append(
                "file",
                file
            );

            const uploadRes =
                await fetch(
                    "/api/upload-product",
                    {
                        method: "POST",
                        body: formData,
                    }
                );

            const uploadData =
                await uploadRes.json();

            uploadedImages.push(
                uploadData.path
            );
        }

        return uploadedImages;
    };


    
    const updateProduct = async (
        e: React.FormEvent
    ) => {
        e.preventDefault();

        try {
            setLoading(true);

            const finalImages =
                await handleImageUpload();

            const res = await fetch(
                `/api/products/${params.id}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type":
                            "application/json",
                    },
                    body: JSON.stringify({
                        name,
                        description,
                        price:
                            Number(price),
                        stock:
                            Number(stock),
                        category,
                        subCategory,
                        sizes,
                        newArrival,
                        featured,
                        images:
                            finalImages,
                    }),
                }
            );

            if (!res.ok) {
                throw new Error(
                    "Failed to update"
                );
            }

            router.push(
                `/admin/products/${params.id}`
            );
        } catch (error) {
            console.error(error);
            alert(
                "Failed to update product"
            );
        } finally {
            setLoading(false);
            
        }
    };

    return (
        <div className="max-w-6xl mx-auto">

            <div className="mb-10">

                <h1 className="text-3xl font-bold">
                    Edit Product
                </h1>

                <p className="text-gray-500 mt-2">
                    Update product details
                </p>

            </div>

            <form
                onSubmit={updateProduct}
                className="bg-white rounded-3xl border p-8"
            >

                <div className="grid lg:grid-cols-2 gap-10">

                    <div className="space-y-6">

                        <input
                            value={name}
                            onChange={(e) =>
                                setName(
                                    e.target.value
                                )
                            }
                            placeholder="Product Name"
                            className="w-full border rounded-xl px-4 py-3"
                        />

                        <textarea
                            value={description}
                            onChange={(e) =>
                                setDescription(
                                    e.target.value
                                )
                            }
                            rows={5}
                            placeholder="Description"
                            className="w-full border rounded-xl px-4 py-3"
                        />

                        <div className="grid grid-cols-2 gap-4">

                            <input
                                type="number"
                                value={price}
                                onChange={(e) =>
                                    setPrice(
                                        e.target.value
                                    )
                                }
                                placeholder="Price"
                                className="border rounded-xl px-4 py-3"
                            />

                            <input
                                type="number"
                                value={stock}
                                onChange={(e) =>
                                    setStock(
                                        e.target.value
                                    )
                                }
                                placeholder="Stock"
                                className="border rounded-xl px-4 py-3"
                            />

                        </div>

                        <select
                            value={category}
                            onChange={(e) => {
                                setCategory(
                                    e.target.value
                                );
                                setSubCategory("");
                            }}
                            className="w-full border rounded-xl px-4 py-3"
                        >

                            <option value="">
                                Select Category
                            </option>

                            {categories.map(
                                (cat) => (
                                    <option
                                        key={cat._id}
                                        value={cat._id}
                                    >
                                        {cat.name}
                                    </option>
                                )
                            )}

                        </select>

                        <select
                            value={subCategory}
                            onChange={(e) =>
                                setSubCategory(
                                    e.target.value
                                )
                            }
                            className="w-full border rounded-xl px-4 py-3"
                        >

                            <option value="">
                                Select Sub Category
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

                        <div className="flex flex-wrap gap-3">

                            {availableSizes.map(
                                (size) => (

                                    <button
                                        key={size}
                                        type="button"
                                        onClick={() =>
                                            toggleSize(
                                                size
                                            )
                                        }
                                        className={`px-4 py-2 rounded-xl border ${sizes.includes(
                                            size
                                        )
                                                ? "bg-black text-white"
                                                : ""
                                            }`}
                                    >
                                        {size}
                                    </button>

                                )
                            )}

                        </div>

                        <div className="flex items-center gap-8">

                            <div className="flex items-center gap-3">
                                <input
                                    type="checkbox"
                                    id="newArrival"
                                    checked={newArrival}
                                    onChange={(e) =>
                                        setNewArrival(
                                            e.target.checked
                                        )
                                    }
                                />

                                <label htmlFor="newArrival">
                                    New Arrival
                                </label>
                            </div>

                            <div className="flex items-center gap-3">
                                <input
                                    type="checkbox"
                                    id="featured"
                                    checked={featured}
                                    onChange={(e) =>
                                        setFeatured(
                                            e.target.checked
                                        )
                                    }
                                />

                                <label htmlFor="featured">
                                    Featured Collection
                                </label>
                            </div>

                        </div>
                    </div>

                    <div>

                        <input
                            type="file"
                            multiple
                            accept="image/*"
                            onChange={(e) =>
                                setNewFiles(
                                    Array.from(
                                        e.target
                                            .files || []
                                    )
                                )
                            }
                            className="w-full border rounded-xl px-4 py-3"
                        />

                        <div className="grid grid-cols-3 gap-4 mt-6">

                            {images.map(
                                (
                                    image,
                                    index
                                ) => (

                                    <img
                                        key={index}
                                        src={image}
                                        alt=""
                                        className="h-28 w-full object-cover rounded-xl border"
                                    />

                                )
                            )}

                        </div>

                    </div>

                </div>

                <div className="flex justify-end mt-10">

                    <button
                        type="submit"
                        disabled={loading}
                        className="px-8 py-3 bg-black text-white rounded-xl"
                    >
                        {loading
                            ? "Updating..."
                            : "Update Product"}
                    </button>

                </div>

            </form>

        </div>
    );
}