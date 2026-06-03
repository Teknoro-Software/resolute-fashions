"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard,
    FolderOpen,
    ShoppingBag,
    ImageIcon,
    Package,
} from "lucide-react";

const menu = [
    {
        name: "Dashboard",
        href: "/admin/dashboard",
        icon: LayoutDashboard,
    },
    {
        name: "Categories",
        href: "/admin/categories",
        icon: FolderOpen,
    },
    {
        name: "Products",
        href: "/admin/products",
        icon: ShoppingBag,
    },
    {
        name: "Banners",
        href: "/admin/banners",
        icon: ImageIcon,
    },
    // {
    //     name: "Orders",
    //     href: "/admin/orders",
    //     icon: Package,
    // },
];

interface SidebarProps {
    collapsed: boolean;
}

export default function AdminSidebar({
    collapsed,
}: SidebarProps) {
    const pathname = usePathname();

    return (
        <aside
            className={`
                fixed top-0 left-0 z-40
                h-screen bg-black text-white
                transition-all duration-300
                ${collapsed ? "w-20" : "w-64"}
            `}
        >
            {/* Logo */}
            <div className="border-b border-zinc-800 p-4">
                <div
                    className={`flex items-center ${collapsed
                            ? "justify-center"
                            : "justify-center"
                        }`}
                >
                    {collapsed ? (
                        <Image
                            src="/logo.png"
                            alt="Resolute Logo"
                            width={50}
                            height={50}
                            className="object-contain"
                            priority
                        />
                    ) : (
                        <Image
                            src="/l1.png"
                            alt="Resolute Fashions"
                            width={220}
                            height={70}
                            className="object-contain w-full h-auto"
                            priority
                        />
                    )}
                </div>
            </div>

            {/* Menu */}
            <nav className="mt-6 px-3 space-y-2">
                {menu.map((item) => {
                    const Icon = item.icon;

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            title={item.name}
                            className={`
                                flex items-center h-12 rounded-lg
                                transition-all duration-200
                                ${collapsed
                                    ? "justify-center"
                                    : "gap-3 px-4"
                                }
                                ${pathname === item.href
                                    ? "bg-white text-black"
                                    : "hover:bg-zinc-800"
                                }
                            `}
                        >
                            <Icon size={20} />

                            {!collapsed && (
                                <span className="text-sm font-medium">
                                    {item.name}
                                </span>
                            )}
                        </Link>
                    );
                })}
            </nav>
        </aside>
    );
}