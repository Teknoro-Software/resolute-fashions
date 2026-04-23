"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Hero() {
    const [index, setIndex] = useState(0);

    const slides = [
        {
            title: "Trending Now",
            subtitle: "Discover your signature look",
            image:
                "https://images.unsplash.com/photo-1523381294911-8d3cead13475",
        },
        {
            title: "New Collection",
            subtitle: "Elegance in every thread",
            image:
                "https://images.unsplash.com/photo-1521335629791-ce4aec67dd53",
        },
        {
            title: "Premium Styles",
            subtitle: "Crafted for modern fashion",
            image:
                "https://images.unsplash.com/photo-1490481651871-ab68de25d43d",
        },
    ];

    // Auto slide
    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prev) => (prev + 1) % slides.length);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    const prev = () =>
        setIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));

    const next = () =>
        setIndex((prev) => (prev + 1) % slides.length);

    return (
        <section className="h-screen overflow-hidden relative">

            {/* Slides */}
            <motion.div
                animate={{ x: `-${index * 100}%` }}
                transition={{ duration: 0.9, ease: "easeInOut" }}
                className="flex h-full"
            >
                {slides.map((slide, i) => (
                    <div
                        key={i}
                        className="min-w-full h-full relative flex items-center justify-center"
                    >

                        {/* Background Image with Zoom */}
                        <motion.div
                            initial={{ scale: 1.08 }}
                            animate={{ scale: 1 }}
                            transition={{ duration: 6 }}
                            className="absolute inset-0 bg-cover bg-center"
                            style={{ backgroundImage: `url(${slide.image})` }}
                        />

                        {/* Brand Color Glow */}
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(2,73,156,0.15),transparent_60%)]" />

                        {/* Premium Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

                        {/* Content */}
                        <div className="relative text-center text-white px-6 max-w-2xl">

                            {/* Brand Label */}
                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 0.7 }}
                                className="uppercase tracking-[6px] text-[10px] mb-4 text-white/70"
                            >
                                Resolute Fashions
                            </motion.p>

                            {/* Title */}
                            <motion.h1
                                key={index}
                                initial={{ opacity: 0, y: 40 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="text-4xl md:text-6xl font-light leading-tight mb-4"
                            >
                                {slide.title}
                            </motion.h1>

                            {/* Subtitle */}
                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 0.85 }}
                                className="text-sm md:text-base mb-8 text-white/80"
                            >
                                {slide.subtitle}
                            </motion.p>

                            {/* CTA */}
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                className="px-8 py-3 text-sm tracking-wide 
                  bg-[var(--primary)] 
                  text-white 
                  hover:opacity-90 
                  transition"
                            >
                                Explore Collection
                            </motion.button>

                        </div>
                    </div>
                ))}
            </motion.div>

            {/* Arrows */}
            <button
                onClick={prev}
                className="absolute left-6 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition"
            >
                <ChevronLeft size={28} />
            </button>

            <button
                onClick={next}
                className="absolute right-6 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition"
            >
                <ChevronRight size={28} />
            </button>

            {/* Dots */}
            <div className="absolute bottom-8 w-full flex justify-center gap-3">
                {slides.map((_, i) => (
                    <div
                        key={i}
                        onClick={() => setIndex(i)}
                        className={`h-[2px] w-8 cursor-pointer transition ${index === i ? "bg-white" : "bg-white/40"
                            }`}
                    />
                ))}
            </div>
        </section>
    );
}