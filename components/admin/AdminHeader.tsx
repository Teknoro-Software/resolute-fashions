"use client";

import { Menu, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

interface HeaderProps {
    collapsed: boolean;
    setCollapsed: (value: boolean) => void;
}

export default function AdminHeader({
    collapsed,
    setCollapsed,
}: HeaderProps) {
    const router = useRouter();

    const handleLogout = () => {
        localStorage.removeItem("adminToken");
        router.push("/admin-login");
    };

    return (
        <header className="bg-white border-b px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
                <button
                    onClick={() =>
                        setCollapsed(!collapsed)
                    }
                >
                    <Menu size={22} />
                </button>

                <h1 className="text-xl font-bold">
                    Admin Dashboard
                </h1>
            </div>

            <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-lg"
            >
                <LogOut size={18} />
                <span className="hidden sm:block">
                    Logout
                </span>
            </button>
        </header>
    );
}