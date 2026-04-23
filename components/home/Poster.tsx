"use client";

import { motion } from "framer-motion";

export default function PosterGrid() {
    return (
        <section className="px-6 md:px-12 py-12">

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-[400px]">

                {/* BIG LEFT */}
                <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="relative md:col-span-2 h-full rounded-xl overflow-hidden"
                >
                    <div
                        className="absolute inset-0 bg-cover bg-center"
                        style={{
                            backgroundImage:
                                "url(https://images.unsplash.com/photo-1490481651871-ab68de25d43d)",
                        }}
                    />
                    <div className="absolute inset-0 bg-black/40" />

                    <div className="absolute bottom-6 left-6 text-white">
                        <h2 className="text-2xl font-light mb-2">
                            Celebrate Style
                        </h2>
                        <p className="text-sm mb-3 text-white/80">
                            Discover new arrivals
                        </p>
                        <button className="border px-4 py-1 text-sm hover:bg-white hover:text-black transition">
                            Explore
                        </button>
                    </div>
                </motion.div>

                {/* RIGHT SIDE STACK */}
                <div className="flex flex-col gap-4">

                    {/* Top small */}
                    <motion.div
                        whileHover={{ scale: 1.02 }}
                        className="relative flex-1 rounded-xl overflow-hidden"
                    >
                        <div
                            className="absolute inset-0 bg-cover bg-center"
                            style={{
                                backgroundImage:
                                    "url(https://images.unsplash.com/photo-1521572163474-6864f9cf17ab)",
                            }}
                        />
                        <div className="absolute inset-0 bg-black/40" />

                        <div className="absolute bottom-4 left-4 text-white">
                            <h3 className="text-sm">New Collection</h3>
                        </div>
                    </motion.div>

                    {/* Bottom small */}
                    <motion.div
                        whileHover={{ scale: 1.02 }}
                        className="relative flex-1 rounded-xl overflow-hidden"
                    >
                        <div
                            className="absolute inset-0 bg-cover bg-center"
                            style={{
                                backgroundImage:
                                    "url(https://images.unsplash.com/photo-1618354691373-d851c5c3a990)",
                            }}
                        />
                        <div className="absolute inset-0 bg-black/40" />

                        <div className="absolute bottom-4 left-4 text-white">
                            <h3 className="text-sm">Trending Now</h3>
                        </div>
                    </motion.div>

                </div>
            </div>

        </section>
    );
}