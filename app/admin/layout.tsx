"use client";

import { useState } from "react";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminHeader from "@/components/admin/AdminHeader";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [collapsed, setCollapsed] = useState(false);

    return (
        <div className="min-h-screen bg-gray-50">
            <AdminSidebar collapsed={collapsed} />

            <div
                className={`transition-all duration-300 ${collapsed ? "ml-20" : "ml-64"
                    }`}
            >
                <AdminHeader
                    collapsed={collapsed}
                    setCollapsed={setCollapsed}
                />

                <main className="p-6">
                    {children}
                </main>
            </div>
        </div>
    );
}