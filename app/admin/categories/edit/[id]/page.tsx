"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { Plus, X } from "lucide-react";

export default function EditCategoryPage() {
    const router = useRouter();
    const params = useParams();

    const id = params.id as string;

    const [name, setName] = useState("");
    const [image, setImage] = useState("");
    const [preview, setPreview] = useState("");

    const [newImage, setNewImage] =
        useState<File | null>(null);

    const [subCategory, setSubCategory] =
        useState("");

    const [subCategories, setSubCategories] =
        useState<string[]>([]);

    const [loading, setLoading] =
        useState(false);

    const [pageLoading, setPageLoading] =
        useState(true);

    const slug = name
        .toLowerCase()
        .replace(/'/g, "")
        .replace(/\s+/g, "-");

    useEffect(() => {
        fetchCategory();
    }, []);

    const fetchCategory = async () => {
        try {
            const res = await fetch(
                `/api/categories/${id}`
            );

            const data = await res.json();

            const category = data.data;

            setName(category.name);
            setImage(category.image);
            setPreview(category.image);

            setSubCategories(
                category.subCategories || []
            );
        } catch (error) {
            console.error(error);
        } finally {
            setPageLoading(false);
        }
    };

    const addSubCategory = () => {
        if (!subCategory.trim()) return;

        setSubCategories((prev) => [
            ...prev,
            subCategory.trim(),
        ]);

        setSubCategory("");
    };

    const removeSubCategory = (
        index: number
    ) => {
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

            let imagePath = image;

            if (newImage) {
                const formData =
                    new FormData();

                formData.append(
                    "file",
                    newImage
                );

                const uploadRes =
                    await fetch(
                        "/api/upload",
                        {
                            method:
                                "POST",
                            body: formData,
                        }
                    );

                if (
                    !uploadRes.ok
                ) {
                    throw new Error(
                        "Image upload failed"
                    );
                }

                const uploadData =
                    await uploadRes.json();

                imagePath =
                    uploadData.url;
            }

            const res = await fetch(
                `/api/categories/${id}`,
                {
                    method: "PUT",
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
                    "Update failed"
                );
            }

            router.push(
                "/admin/categories"
            );
        } catch (error) {
            console.error(error);
            alert(
                "Failed to update category"
            );
        } finally {
            setLoading(false);
        }
    };

    if (pageLoading) {
        return (
            <div className="p-10">
                Loading...
            </div>
        );
    }

    return (
        <div className="max-w-5xl mx-auto">

            <div className="mb-10">

                <h1 className="text-3xl font-bold">
                    Edit Category
                </h1>

                <p className="text-gray-500 mt-2">
                    Update category details
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
                                                size={14}
                                            />
                                        </button>

                                    </div>

                                )
                            )}

                        </div>

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

                                if (!file) return;

                                setNewImage(file);

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

                                <div className="h-[350px] border rounded-2xl flex items-center justify-center text-gray-400">
                                    No Image
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
                            ? "Updating..."
                            : "Update Category"}
                    </button>

                </div>

            </form>

        </div>
    );
}