"use client";

import { motion } from "framer-motion";
import { useState } from "react";

export default function Categories() {
    const items = [
        {
            name: "Hoodies",
            image: "https://images.unsplash.com/photo-1520975916090-3105956dac38",
        },
        {
            name: "Sweatshirts",
            image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab",
        },
        {
            name: "Shirts",
            image: "https://images.unsplash.com/photo-1593032465175-481ac7f401a0",
        },
        {
            name: "T-Shirts",
            image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d",
        },
        {
            name: "Jackets",
            image: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f",
        },
    ];

    const [active, setActive] = useState(2); // center default

    return (
        <section className="h-screen w-full flex overflow-hidden">

            {items.map((item, i) => {
                const isActive = i === active;

                return (
                    <motion.div
                        key={i}
                        onMouseEnter={() => setActive(i)}
                        className="relative h-full cursor-pointer overflow-hidden"

                        /* 🔥 WIDTH CONTROL (SMOOTH) */
                        animate={{
                            flex: isActive ? 4 : 1,
                        }}

                        transition={{
                            duration: 0.6,
                            ease: "easeInOut",
                        }}
                    >

                        {/* IMAGE */}
                        <div
                            className="absolute inset-0 bg-cover bg-center"
                            style={{ backgroundImage: `url(${item.image})` }}
                        />

                        {/* DARK OVERLAY */}
                        <div className={`absolute inset-0 transition duration-500 ${isActive ? "bg-black/20" : "bg-black/50"
                            }`} />

                        {/* TEXT */}
                        <motion.div
                            className="absolute bottom-100 left-1/2 -translate-x-1/2 text-white"

                            initial={{ opacity: 0, y: 20 }}
                            animate={{
                                opacity: isActive ? 1 : 0.6,
                                y: isActive ? 0 : 20,
                            }}
                            transition={{ duration: 0.4 }}
                        >
                            <p className={`rotate-[-90deg] text-center tracking-[0.3em] ${isActive ? "text-xl" : "text-sm"
                                }`}>
                                {item.name}
                            </p>
                        </motion.div>

                    </motion.div>
                );
            })}
        </section>
    );
}