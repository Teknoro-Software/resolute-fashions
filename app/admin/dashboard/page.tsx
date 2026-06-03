"use client";

import { useEffect, useState } from "react";
import {
    FolderOpen,
    ShoppingBag,
    Package,
    IndianRupee,
} from "lucide-react";
import Link from "next/link";
import { FaNewspaper } from "react-icons/fa";

type DashboardStats = {
    categories: number;
    products: number;
    banners: number;
    revenue: number;
};

export default function AdminDashboard() {
    const [stats, setStats] = useState<DashboardStats>({
        categories: 0,
        products: 0,
        banners: 0,
        revenue: 0,
    });

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadDashboard = async () => {
            try {
                const [categoriesRes, productsRes, bannersRes] =
                    await Promise.all([
                        fetch("/api/categories"),
                        fetch("/api/products"),
                        fetch("/api/banners"),
                    ]);

                const categoriesData =
                    await categoriesRes.json();

                const productsData =
                    await productsRes.json();

                const bannersData =
                    await bannersRes.json();

                const categories =
                    categoriesData?.data || [];

                const products =
                    productsData?.data || [];

                const banners =
                    bannersData?.data || [];

                setStats({
                    categories: categories.length,
                    products: products.length,
                    banners: banners.length,
                    revenue: 0,
                });            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        loadDashboard();
    }, []);

    const cards = [
        {
            title: "Categories",
            value: stats.categories,
            icon: FolderOpen,
        },
        {
            title: "Products",
            value: stats.products,
            icon: ShoppingBag,
        },
        {
            title: "Banners",
            value: stats.banners,
            icon: FaNewspaper,
        },
        // {
        //     title: "Revenue",
        //     value: `₹${stats.revenue}`,
        //     icon: IndianRupee,
        // },
    ];

    return (
        <div>

            <div className="mb-8">
                <h1 className="text-3xl font-bold">
                    Dashboard
                </h1>

                <p className="text-gray-500 mt-2">
                    Welcome to Resolute Admin Panel
                </p>
            </div>

            <div className="grid md:grid-cols-4 gap-6">

                {cards.map((card) => {
                    const Icon = card.icon;

                    return (
                        <div
                            key={card.title}
                            className="bg-white rounded-2xl p-6 shadow-sm border"
                        >
                            <div className="flex justify-between items-center">

                                <div>

                                    <p className="text-gray-500 text-sm">
                                        {card.title}
                                    </p>

                                    <h2 className="text-3xl font-bold mt-3">
                                        {loading
                                            ? "..."
                                            : card.value}
                                    </h2>

                                </div>

                                <div className="h-12 w-12 rounded-xl bg-black text-white flex items-center justify-center">
                                    <Icon size={22} />
                                </div>

                            </div>
                        </div>
                    );
                })}

            </div>

            <div className="grid md:grid-cols-2 gap-6 mt-8">

                <div className="bg-white rounded-2xl p-6 shadow-sm border">
                    <h3 className="font-semibold mb-4">
                        Recent Activity
                    </h3>

                    <p className="text-gray-500">
                        No recent activity yet.
                    </p>
                </div>

                <div className="bg-white rounded-2xl p-6 shadow-sm border">
                    <h3 className="font-semibold mb-4">
                        Quick Actions
                    </h3>

                    <div className="flex flex-wrap gap-3">

                        <Link
                            href="/admin/categories/add"
                            className="px-4 py-2 bg-black text-white rounded-lg"
                        >
                            Add Category
                        </Link>

                       
                        <Link
                            href="/admin/products/add"
                            className="px-4 py-2 bg-black text-white rounded-lg"
                        >
                            Add Product
                        </Link>

                    </div>
                </div>

            </div>

        </div>
    );
}