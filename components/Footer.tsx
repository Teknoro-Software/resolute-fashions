"use client";

import Image from "next/image";
import Link from "next/link";

export default function Footer() {
    return (
        <footer className="px-6 md:px-12 py-10 bg-[var(--foreground)] border-t">

            <div className="grid md:grid-cols-3 gap-10">

                {/* 🔥 LEFT - Logo + About */}
                <div className="flex flex-col items-center text-center">

                    <Link href="/" className="mb-4">
                        <Image
                            src="/logo1.png"
                            alt="Resolute Fashions"
                            width={150}
                            height={40}
                            className="object-contain"
                        />
                    </Link>

                    <p className="text-sm text-muted max-w-sm">
                        Resolute Fashions brings modern elegance and timeless style
                        crafted for every occasion.
                    </p>

                </div>

                {/* 🔗 MIDDLE - Links */}
                <div>
                    <h3 className="text-sm text-muted font-medium mb-4">Quick Links</h3>

                    <ul className="space-y-2 text-sm text-muted">
                        <li><Link href="/">Home</Link></li>
                        <li><Link href="/products">Shop</Link></li>
                        <li><Link href="/store">Our Store</Link></li>
                        <li><Link href="/contact">Contact</Link></li>
                    </ul>
                </div>

                <div>
                    <h3 className="text-sm text-muted font-medium mb-4">Contact</h3>

                    <p className="text-sm text-muted">
                        Resolute Fashions,
                        Opposite Second Choice,
                        Near Malabar Hotel,
                        Edapazhanji, Trivandrum
                    </p>
                    <p className="text-sm text-muted mt-2">
                        +91 8089081837
                    </p>
                    <p className="text-sm text-muted mt-2">
                        resolutefashions@gmail.com
                    </p>
                </div>

            </div>

            {/* Bottom */}
            <div className="mt-12 pt-6 border-t text-center text-sm text-muted">
                © {new Date().getFullYear()} Resolute Fashions. All rights reserved.
            </div>

        </footer>
    );
}