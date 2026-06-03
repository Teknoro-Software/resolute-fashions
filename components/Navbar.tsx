"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
    ShoppingBag,
    Search,
    Menu,
    X,
} from "lucide-react";
import {
    useEffect,
    useRef,
    useState,
} from "react";

import { useSearch } from "@/context/SearchContext";
import { useCart } from "@/context/CartContext";

type SearchProduct = {
    _id: string;
    name: string;
    price: number;
    images: string[];
};

export default function Navbar() {
    const { searchTerm, setSearchTerm } =
        useSearch();

    const { cart } = useCart();
    const [mobileMenuOpen, setMobileMenuOpen] =
        useState(false);

    const [mobileSearchOpen, setMobileSearchOpen] =
        useState(false);

    const [results, setResults] =
        useState<SearchProduct[]>([]);

    const [loading, setLoading] =
        useState(false);

    const searchRef =
        useRef<HTMLDivElement>(null);

    const cartCount = cart.reduce(
        (total, item) =>
            total + item.quantity,
        0
    );

    useEffect(() => {
        const fetchProducts = async () => {
            if (!searchTerm.trim()) {
                setResults([]);
                return;
            }

            try {
                setLoading(true);

                const res = await fetch(
                    `/api/products/search?q=${encodeURIComponent(
                        searchTerm
                    )}`
                );

                const data = await res.json();

                setResults(data.data || []);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        const timer = setTimeout(
            fetchProducts,
            300
        );

        return () =>
            clearTimeout(timer);
    }, [searchTerm]);

    useEffect(() => {
        const handleClickOutside = (
            event: MouseEvent
        ) => {
            if (
                searchRef.current &&
                !searchRef.current.contains(
                    event.target as Node
                )
            ) {
                setResults([]);
            }
        };

        document.addEventListener(
            "mousedown",
            handleClickOutside
        );

        return () =>
            document.removeEventListener(
                "mousedown",
                handleClickOutside
            );
    }, []);

    return (
        <motion.header
            initial={{
                y: -40,
                opacity: 0,
            }}
            animate={{
                y: 0,
                opacity: 1,
            }}
            className="fixed top-0 left-0 w-full z-50"
        >
            <div
                className="
          flex items-center justify-between
          px-6 md:px-12 py-4
          bg-white/90 backdrop-blur-xl
          border-b border-gray-100
        "
            >
                {/* LOGO */}

                <Link
                    href="/"
                    className="flex items-center shrink-0"
                >
                    <Image
                        src="/l1.png"
                        alt="Resolute Fashions"
                        width={120}
                        height={40}
                        priority
                        className="object-contain"
                    />
                </Link>

                {/* NAVIGATION */}

                <nav className="hidden lg:flex items-center gap-10">

                    <Link
                        href="/"
                        className="text-sm font-medium hover:text-gray-500 transition"
                    >
                        Home
                    </Link>

                    <Link
                        href="/products"
                        className="text-sm font-medium hover:text-gray-500 transition"
                    >
                        Products
                    </Link>

                    <Link
                        href="/store"
                        className="text-sm font-medium hover:text-gray-500 transition"
                    >
                        Our Store
                    </Link>

                    <Link
                        href="/contact"
                        className="text-sm font-medium hover:text-gray-500 transition"
                    >
                        Contact
                    </Link>

                </nav>

                {/* RIGHT SIDE */}

                <div className="flex items-center gap-5">

                    {/* SEARCH */}

                    <div
                        ref={searchRef}
                        className="hidden md:block relative w-[320px]"
                    >

                        <Search
                            size={16}
                            className="
                absolute
                left-4
                top-1/2
                -translate-y-1/2
                text-gray-400
                z-10
              "
                        />

                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(event) =>
                                setSearchTerm(
                                    event.target.value
                                )
                            }
                            placeholder="Search products..."
                            className="
                w-full
                pl-11
                pr-4
                py-2.5
                rounded-full
                bg-gray-100
                text-sm
                outline-none
                focus:ring-1
                focus:ring-black
              "
                        />

                        {searchTerm && (
                            <div
                                className="
                  absolute
                  top-14
                  left-0
                  w-full
                  bg-white
                  rounded-3xl
                  shadow-xl
                  border
                  overflow-hidden
                  z-50
                "
                            >

                                {loading ? (
                                    <div className="p-4 text-sm">
                                        Searching...
                                    </div>
                                ) : results.length > 0 ? (
                                    results.map(
                                        (product) => (
                                            <Link
                                                key={product._id}
                                                href={`/products/${product._id}`}
                                                onClick={() => {
                                                    setSearchTerm("");
                                                    setResults([]);
                                                }}
                                                className="
                          flex
                          items-center
                          gap-3
                          p-4
                          hover:bg-gray-50
                        "
                                            >

                                                <img
                                                    src={
                                                        product
                                                            .images?.[0]
                                                    }
                                                    alt={
                                                        product.name
                                                    }
                                                    className="
                            w-12
                            h-12
                            object-cover
                            rounded-xl
                          "
                                                />

                                                <div>

                                                    <h4 className="text-sm font-medium">
                                                        {
                                                            product.name
                                                        }
                                                    </h4>

                                                    <p className="text-xs text-gray-500">
                                                        ₹
                                                        {
                                                            product.price
                                                        }
                                                    </p>

                                                </div>

                                            </Link>
                                        )
                                    )
                                ) : (
                                    <div className="p-4 text-sm text-gray-500">
                                        No products found
                                    </div>
                                )}

                            </div>
                        )}

                    </div>

                    {/* MOBILE SEARCH ICON */}

                    <div className="flex items-center gap-4 md:hidden">

                        <button
                            onClick={() =>
                                setMobileSearchOpen(true)
                            }
                        >
                            <Search size={20} />
                        </button>

                        <button
                            onClick={() =>
                                setMobileMenuOpen(true)
                            }
                        >
                            <Menu size={22} />
                        </button>

                    </div>

                    {/* CART */}

                    <Link
                        href="/cart"
                        className="relative"
                    >
                        <ShoppingBag size={22} />

                        {cartCount > 0 && (
                            <span
                                className="
                  absolute
                  -top-2
                  -right-2
                  w-5
                  h-5
                  bg-red-500
                  text-white
                  text-xs
                  rounded-full
                  flex
                  items-center
                  justify-center
                "
                            >
                                {cartCount}
                            </span>
                        )}
                    </Link>

                </div>

            </div>
            {mobileSearchOpen && (
                <div className="fixed inset-0 bg-white z-[100] md:hidden">

                    <div className="flex items-center gap-3 p-4 border-b">

                        <input
                            autoFocus
                            type="text"
                            value={searchTerm}
                            onChange={(e) =>
                                setSearchTerm(e.target.value)
                            }
                            placeholder="Search products..."
                            className="
                    flex-1
                    border
                    rounded-full
                    px-4
                    py-3
                    outline-none
                "
                        />

                        <button
                            onClick={() =>
                                setMobileSearchOpen(false)
                            }
                        >
                            <X size={22} />
                        </button>

                    </div>

                    <div className="overflow-y-auto">

                        {loading ? (
                            <div className="p-4">
                                Searching...
                            </div>
                        ) : (
                            results.map((product) => (
                                <Link
                                    key={product._id}
                                    href={`/products/${product._id}`}
                                    onClick={() => {
                                        setMobileSearchOpen(false);
                                        setSearchTerm("");
                                    }}
                                    className="
                            flex
                            items-center
                            gap-3
                            p-4
                            border-b
                        "
                                >
                                    <img
                                        src={product.images?.[0]}
                                        alt={product.name}
                                        className="
                                w-14
                                h-14
                                rounded-xl
                                object-cover
                            "
                                    />

                                    <div>
                                        <h4 className="font-medium">
                                            {product.name}
                                        </h4>

                                        <p className="text-sm text-gray-500">
                                            ₹{product.price}
                                        </p>
                                    </div>
                                </Link>
                            ))
                        )}

                    </div>

                </div>
            )}

            {mobileMenuOpen && (
                <div className="fixed inset-0 z-[100] lg:hidden">

                    <div
                        className="
        absolute
        inset-0
        bg-black/30
        backdrop-blur-lg
      "
                        onClick={() =>
                            setMobileMenuOpen(false)
                        }
                    />


                    <div
                        className="
        absolute
        top-0
        left-0
        h-full
        w-[85%]
        max-w-sm
        bg-white/10
        backdrop-blur-5xl
        border-r
        border-white/30
        shadow-2xl
      "
                    >

                        <div className="flex items-center justify-between p-6">

                            <Image
                                src="/l1.png"
                                alt="Resolute Fashions"
                                width={120}
                                height={40}
                            />

                            <button
                                onClick={() =>
                                    setMobileMenuOpen(false)
                                }
                                className="
            h-10
            w-10
            rounded-full
            bg-white/60
            flex
            items-center
            justify-center
          "
                            >
                                <X size={20} />
                            </button>

                        </div>


                        <nav className="px-8 mt-12">

                            <div className="flex flex-col gap-8">

                                <Link
                                    href="/"
                                    onClick={() =>
                                        setMobileMenuOpen(false)
                                    }
                                    className="
              text-2xl
              font-light
              tracking-wide
              hover:translate-x-2
              transition
            "
                                >
                                    Home
                                </Link>

                                <Link
                                    href="/products"
                                    onClick={() =>
                                        setMobileMenuOpen(false)
                                    }
                                    className="
              text-2xl
              font-light
              tracking-wide
              hover:translate-x-2
              transition
            "
                                >
                                    Products
                                </Link>

                                <Link
                                    href="/store"
                                    onClick={() =>
                                        setMobileMenuOpen(false)
                                    }
                                    className="
              text-2xl
              font-light
              tracking-wide
              hover:translate-x-2
              transition
            "
                                >
                                    Our Store
                                </Link>

                                <Link
                                    href="/contact"
                                    onClick={() =>
                                        setMobileMenuOpen(false)
                                    }
                                    className="
              text-2xl
              font-light
              tracking-wide
              hover:translate-x-2
              transition
            "
                                >
                                    Contact
                                </Link>

                            </div>

                        </nav>

                        {/* BOTTOM */}

                        <div
                            className="
          absolute
          bottom-0
          left-0
          right-0
          p-8
        "
                        >

                            {/* <Link
                                href="/cart"
                                onClick={() =>
                                    setMobileMenuOpen(false)
                                }
                                className="
            flex
            items-center
            justify-between
            mb-6
            text-lg
          "
                            >
                                <span>Cart</span>
                                <span>
                                    ({cartCount})
                                </span>
                            </Link> */}

                            <div className="border-t pt-6">

                                <p
                                    className="
              text-xs
              uppercase
              tracking-[0.3em]
              text-gray-400
              mb-2
            "
                                >
                                    Resolute Fashions
                                </p>

                                <p className="text-sm text-gray-500">
                                    Premium Clothing For Modern Style
                                </p>

                            </div>

                        </div>

                    </div>

                </div>
            )}
        </motion.header>
    );
}