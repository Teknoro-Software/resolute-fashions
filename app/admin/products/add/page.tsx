"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

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

export default function AddProductPage() {
    const router = useRouter();

    const [categories, setCategories] =
        useState<Category[]>([]);

    const [newArrival, setNewArrival] =
        useState(false);
    const [featured, setFeatured] =
        useState(false);
    const [name, setName] = useState("");
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

    const [sizes, setSizes] = useState<
        string[]
    >([]);

    const [images, setImages] =
        useState<File[]>([]);

    const [previews, setPreviews] =
        useState<string[]>([]);

    const [loading, setLoading] =
        useState(false);

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        const res = await fetch(
            "/api/categories"
        );

        const data = await res.json();

        setCategories(data.data || []);
    };

    const currentCategory =
        categories.find(
            (item) =>
                item._id === category
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

    const handleImageChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const files = Array.from(
            e.target.files || []
        );

        setImages(files);

        const imagePreviews =
            files.map((file) =>
                URL.createObjectURL(file)
            );

        setPreviews(imagePreviews);
    };

    const handleSubmit = async (
        e: React.FormEvent
    ) => {
        e.preventDefault();

        try {
            setLoading(true);

            const uploadedImages: string[] =
                [];

            for (const image of images) {
                const formData =
                    new FormData();

                formData.append(
                    "file",
                    image
                );

                const uploadRes =
                    await fetch(
                        "/api/upload",
                        {
                            method: "POST",
                            body: formData,
                        }
                    );

                if (!uploadRes.ok) {
                    throw new Error(
                        "Image upload failed"
                    );
                }

                const uploadData =
                    await uploadRes.json();

                uploadedImages.push(
                    uploadData.url
                );
            }

            const res = await fetch(
                "/api/products",
                {
                    method: "POST",
                    headers: {
                        "Content-Type":
                            "application/json",
                    },
                    body: JSON.stringify({
                        name,
                        description,
                        price: Number(price),
                        category,
                        subCategory,
                        images: uploadedImages,
                        sizes,
                        stock: Number(stock),
                        newArrival,
                        featured,
                    }),
                }
            );

            if (!res.ok) {
                throw new Error(
                    "Failed to create product"
                );
            }

            router.push(
                "/admin/products"
            );
        } catch (error) {
            console.error(error);

            alert(
                "Failed to create product"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-6xl mx-auto">

            <div className="mb-10">

                <h1 className="text-3xl font-bold">
                    Add Product
                </h1>

                <p className="text-gray-500 mt-2">
                    Create a new product
                </p>

            </div>

            <form
                onSubmit={handleSubmit}
                className="bg-white rounded-3xl border p-8"
            >

                <div className="grid lg:grid-cols-2 gap-10">

                    {/* LEFT */}

                    <div className="space-y-6">

                        <div>

                            <label className="block mb-2 font-medium">
                                Product Name
                            </label>

                            <input
                                value={name}
                                onChange={(e) =>
                                    setName(
                                        e.target.value
                                    )
                                }
                                className="w-full border rounded-xl px-4 py-3"
                                required
                            />

                        </div>

                        <div>

                            <label className="block mb-2 font-medium">
                                Description
                            </label>

                            <textarea
                                value={description}
                                onChange={(e) =>
                                    setDescription(
                                        e.target.value
                                    )
                                }
                                rows={5}
                                className="w-full border rounded-xl px-4 py-3"
                                required
                            />

                        </div>

                        <div className="grid grid-cols-2 gap-4">

                            <div>

                                <label className="block mb-2 font-medium">
                                    Price
                                </label>

                                <input
                                    type="number"
                                    value={price}
                                    onChange={(e) =>
                                        setPrice(
                                            e.target.value
                                        )
                                    }
                                    className="w-full border rounded-xl px-4 py-3"
                                />

                            </div>

                            <div>

                                <label className="block mb-2 font-medium">
                                    Stock
                                </label>

                                <input
                                    type="number"
                                    value={stock}
                                    onChange={(e) =>
                                        setStock(
                                            e.target.value
                                        )
                                    }
                                    className="w-full border rounded-xl px-4 py-3"
                                />

                            </div>

                        </div>

                        <div>

                            <label className="block mb-2 font-medium">
                                Category
                            </label>

                            <select
                                value={category}
                                onChange={(e) => {
                                    setCategory(
                                        e.target.value
                                    );

                                    setSubCategory(
                                        ""
                                    );
                                }}
                                className="w-full border rounded-xl px-4 py-3"
                                required
                            >

                                <option value="">
                                    Select Category
                                </option>

                                {categories.map(
                                    (cat) => (
                                        <option
                                            key={
                                                cat._id
                                            }
                                            value={
                                                cat._id
                                            }
                                        >
                                            {cat.name}
                                        </option>
                                    )
                                )}

                            </select>

                        </div>

                        <div>

                            <label className="block mb-2 font-medium">
                                Sub Category
                            </label>

                            <select
                                value={
                                    subCategory
                                }
                                onChange={(e) =>
                                    setSubCategory(
                                        e.target.value
                                    )
                                }
                                className="w-full border rounded-xl px-4 py-3"
                                required
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

                        </div>

                        <div>

                            <label className="block mb-3 font-medium">
                                Sizes
                            </label>

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

                            <div className="flex items-center gap-8 mt-10">

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

                    </div>

                    {/* RIGHT */}

                    <div>

                        <label className="block mb-2 font-medium">
                            Product Images
                        </label>

                        <input
                            type="file"
                            multiple
                            accept="image/*"
                            onChange={
                                handleImageChange
                            }
                            className="w-full border rounded-xl px-4 py-3"
                        />

                        <div className="grid grid-cols-2 gap-4 mt-6">

                            {previews.map(
                                (
                                    preview,
                                    index
                                ) => (

                                    <img
                                        key={index}
                                        src={preview}
                                        alt=""
                                        className="h-52 w-full object-cover rounded-2xl border"
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
                            ? "Creating..."
                            : "Create Product"}
                    </button>

                </div>

            </form>

        </div>
    );
}