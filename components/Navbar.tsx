"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ShoppingBag, Search, Heart } from "lucide-react";
import Image from "next/image";

export default function Navbar() {
    return (
        <motion.header
            initial={{ y: -40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="fixed top-0 left-0 w-full z-50"
        >
            <div
                className="flex items-center justify-between px-6 md:px-12 py-3
        bg-[var(--background)]/80 backdrop-blur-xl
        border-b border-gray-200"
            >

                {/* LEFT - Logo */}
                <Link href="/" className="flex items-center">
                    <Image
                        src="/l1.png"
                        alt="Resolute Fashions"
                        width={110}   // 👈 reduced (important)
                        height={32}
                        className="object-contain hover:opacity-80 transition"
                        priority
                    />
                </Link>

                {/* CENTER - Search */}
                <div className="hidden md:flex items-center w-[42%] relative">
                    <Search
                        size={16}
                        className="absolute left-4 text-gray-400"
                    />
                    <input
                        type="text"
                        placeholder="Search for products..."
                        className="w-full pl-11 pr-4 py-2.5 rounded-full 
              bg-gray-100/80 backdrop-blur 
              text-sm outline-none 
              focus:ring-1 focus:ring-[var(--primary)]
              transition"
                    />
                </div>

                {/* RIGHT - Icons */}
                <div className="flex items-center gap-6">

                    {/* Mobile Search */}
                    <Search className="md:hidden" size={20} />

                    {/* Wishlist */}
                    <Heart
                        size={20}
                        className="cursor-pointer text-gray-700 hover:text-[var(--primary)] transition"
                    />

                    {/* Cart */}
                    <div className="relative">
                        <ShoppingBag
                            size={20}
                            className="cursor-pointer text-gray-700 hover:text-[var(--primary)] transition"
                        />

                        {/* Cart badge */}
                        <span className="absolute -top-2 -right-2 text-[10px] bg-[var(--primary)] text-white px-1.5 py-[1px] rounded-full">
                            2
                        </span>
                    </div>

                </div>
            </div>
        </motion.header>
    );
}