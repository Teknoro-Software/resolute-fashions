"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

interface Banner {
    _id: string;
    image: string;
}

export default function BannerPage() {
    const [banners, setBanners] = useState<Banner[]>([]);
    const [file, setFile] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);

    const fetchBanners = async () => {
        try {
            const res = await fetch("/api/banners");
            const data = await res.json();

            setBanners(data.data || []);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchBanners();
    }, []);

    const handleSubmit = async (
        e: React.FormEvent
    ) => {
        e.preventDefault();

        if (!file) {
            alert("Please select an image");
            return;
        }

        try {
            setLoading(true);

            const formData = new FormData();

            formData.append(
                "file",
                file
            );

            const uploadRes = await fetch(
                "/api/upload-banner",
                {
                    method: "POST",
                    body: formData,
                }
            );

            const uploadData =
                await uploadRes.json();

            if (!uploadRes.ok) {
                throw new Error(
                    uploadData.error ||
                    "Upload failed"
                );
            }

            await fetch(
                "/api/banners",
                {
                    method: "POST",
                    headers: {
                        "Content-Type":
                            "application/json",
                    },
                    body: JSON.stringify({
                        image:
                            uploadData.image,
                    }),
                }
            );

            setFile(null);

            const fileInput =
                document.getElementById(
                    "banner-upload"
                ) as HTMLInputElement;

            if (fileInput) {
                fileInput.value = "";
            }

            fetchBanners();
        } catch (error) {
            console.error(error);
            alert("Upload failed");
        } finally {
            setLoading(false);
        }
    };

    const deleteBanner = async (
        id: string
    ) => {
        try {
            await fetch(
                `/api/banners/${id}`,
                {
                    method: "DELETE",
                }
            );

            fetchBanners();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="p-6">
            <h1 className="mb-6 text-2xl font-bold">
                Banner Management
            </h1>

            <form
                onSubmit={handleSubmit}
                className="mb-8 rounded-lg border p-4"
            >
                <input
                    id="banner-upload"
                    type="file"
                    accept="image/*"
                    onChange={(e) =>
                        setFile(
                            e.target
                                .files?.[0] ||
                            null
                        )
                    }
                    className="w-full"
                />

                <button
                    type="submit"
                    disabled={
                        loading || !file
                    }
                    className="mt-4 rounded bg-black px-5 py-2 text-white disabled:opacity-50"
                >
                    {loading
                        ? "Uploading..."
                        : "Upload Banner"}
                </button>
            </form>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                {banners.map(
                    (banner) => (
                        <div
                            key={
                                banner._id
                            }
                            className="overflow-hidden rounded-lg border"
                        >
                            <Image
                                src={
                                    banner.image
                                }
                                alt="Banner"
                                width={
                                    600
                                }
                                height={
                                    300
                                }
                                className="h-56 w-full object-cover"
                            />

                            <div className="p-4">
                                <button
                                    onClick={() =>
                                        deleteBanner(
                                            banner._id
                                        )
                                    }
                                    className="w-full rounded bg-red-500 py-2 text-white"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    )
                )}
            </div>
        </div>
    );
}