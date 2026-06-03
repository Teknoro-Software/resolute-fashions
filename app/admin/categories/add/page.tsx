"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, X } from "lucide-react";

export default function AddCategoryPage() {
    const router = useRouter();

    const [name, setName] = useState("");
    const [image, setImage] = useState<File | null>(null);
    const [preview, setPreview] = useState("");

    const [subCategory, setSubCategory] = useState("");
    const [subCategories, setSubCategories] = useState<string[]>([]);

    const [loading, setLoading] = useState(false);

    const slug = name
        .toLowerCase()
        .replace(/'/g, "")
        .replace(/\s+/g, "-");

    const addSubCategory = () => {
        if (!subCategory.trim()) return;

        setSubCategories((prev) => [
            ...prev,
            subCategory.trim(),
        ]);

        setSubCategory("");
    };

    const removeSubCategory = (index: number) => {
        setSubCategories((prev) =>
            prev.filter((_, i) => i !== index)
        );
    };

    const handleSubmit = async (
        e: React.FormEvent<HTMLFormElement>
    ) => {
        e.preventDefault();

        try {
            setLoading(true);

            let imagePath = "";

            if (image) {
                const formData = new FormData();

                formData.append("file", image);

                const uploadRes = await fetch(
                    "/api/upload",
                    {
                        method: "POST",
                        body: formData,
                    }
                );

                const uploadData =
                    await uploadRes.json();

                imagePath = uploadData.path;
            }

            const res = await fetch(
                "/api/categories",
                {
                    method: "POST",
                    headers: {
                        "Content-Type":
                            "application/json",
                    },
                    body: JSON.stringify({
                        name,
                        slug,
                        image: imagePath,
                        subCategories,
                    }),
                }
            );

            if (!res.ok) {
                throw new Error(
                    "Failed to create category"
                );
            }

            router.push(
                "/admin/categories"
            );
        } catch (error) {
            console.error(error);
            alert(
                "Failed to create category"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-5xl mx-auto">

            <div className="mb-10">

                <h1 className="text-3xl font-bold">
                    Create Category
                </h1>

                <p className="text-gray-500 mt-2">
                    Add a new category for your store
                </p>

            </div>

            <form
                onSubmit={handleSubmit}
                className="bg-white rounded-3xl border shadow-sm p-8"
            >

                <div className="grid md:grid-cols-2 gap-8">

                    {/* LEFT */}

                    <div className="space-y-6">

                        <div>

                            <label className="block mb-2 font-medium">
                                Category Name
                            </label>

                            <input
                                value={name}
                                onChange={(e) =>
                                    setName(
                                        e.target.value
                                    )
                                }
                                placeholder="Men's Wear"
                                className="w-full border rounded-xl px-4 py-3"
                                required
                            />

                        </div>

                        <div>

                            <label className="block mb-2 font-medium">
                                Slug
                            </label>

                            <input
                                value={slug}
                                disabled
                                className="w-full border rounded-xl px-4 py-3 bg-gray-100"
                            />

                        </div>

                        <div>

                            <label className="block mb-2 font-medium">
                                Add Sub Category
                            </label>

                            <div className="flex gap-3">

                                <input
                                    value={subCategory}
                                    onChange={(e) =>
                                        setSubCategory(
                                            e.target.value
                                        )
                                    }
                                    placeholder="Formal Shirts"
                                    className="flex-1 border rounded-xl px-4 py-3"
                                />

                                <button
                                    type="button"
                                    onClick={
                                        addSubCategory
                                    }
                                    className="bg-black text-white px-5 rounded-xl"
                                >
                                    <Plus size={18} />
                                </button>

                            </div>

                        </div>

                        {subCategories.length > 0 && (

                            <div>

                                <label className="block mb-3 font-medium">
                                    Sub Categories
                                </label>

                                <div className="flex flex-wrap gap-2">

                                    {subCategories.map(
                                        (
                                            item,
                                            index
                                        ) => (

                                            <div
                                                key={index}
                                                className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full"
                                            >
                                                {item}

                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        removeSubCategory(
                                                            index
                                                        )
                                                    }
                                                >
                                                    <X
                                                        size={
                                                            14
                                                        }
                                                    />
                                                </button>

                                            </div>

                                        )
                                    )}

                                </div>

                            </div>

                        )}

                    </div>

                    {/* RIGHT */}

                    <div>

                        <label className="block mb-2 font-medium">
                            Category Image
                        </label>

                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                                const file =
                                    e.target.files?.[0];

                                if (!file)
                                    return;

                                setImage(file);

                                setPreview(
                                    URL.createObjectURL(
                                        file
                                    )
                                );
                            }}
                            className="w-full border rounded-xl px-4 py-3"
                        />

                        <div className="mt-5">

                            {preview ? (

                                <img
                                    src={preview}
                                    alt="Preview"
                                    className="w-full h-[350px] object-cover rounded-2xl border"
                                />

                            ) : (

                                <div className="h-[350px] rounded-2xl border flex items-center justify-center text-gray-400">
                                    No Image Selected
                                </div>

                            )}

                        </div>

                    </div>

                </div>

                <div className="mt-10 flex justify-end">

                    <button
                        type="submit"
                        disabled={loading}
                        className="px-8 py-3 bg-black text-white rounded-xl"
                    >
                        {loading
                            ? "Creating..."
                            : "Create Category"}
                    </button>

                </div>

            </form>

        </div>
    );
}