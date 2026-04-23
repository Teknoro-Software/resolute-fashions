"use client";

import { motion } from "framer-motion";

export default function ContactSection() {
    return (
        <section className="min-h-screen grid md:grid-cols-2 bg-[#111] text-white">

            {/* LEFT SIDE */}
            <div className="flex flex-col justify-center px-8 md:px-20 py-20">

                {/* TITLE */}
                <motion.h2
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7 }}
                    className="text-3xl md:text-5xl font-light leading-tight mb-10"
                >
                    Visit our store or
                    <br />
                    get in touch
                </motion.h2>

                {/* DESCRIPTION */}
                <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.7 }}
                    className="text-gray-400 mb-10 max-w-md"
                >
                    Experience our premium collection in-store or reach out to us for
                    exclusive designs and personalized service.
                </motion.p>

                {/* CONTACT INFO */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.7 }}
                    className="space-y-5 text-sm text-gray-300 mb-12"
                >

                    <div>
                        <p className="text-gray-500 text-xs mb-1">ADDRESS</p>
                        <p>Resolute Fashions, MG Road, Kochi</p>

                        {/* 🔥 BUTTON */}
                        <a
                            href="https://www.google.com/maps/search/?api=1&query=MG+Road+Kochi"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block mt-3 text-xs px-4 py-2 border border-white/20 rounded-md hover:bg-white hover:text-black transition"
                        >
                            Get Directions →
                        </a>
                    </div>

                    <div>
                        <p className="text-gray-500 text-xs mb-1">STORE HOURS</p>
                        <p>Mon - Sat: 10:00 AM – 8:00 PM</p>
                        <p>Sunday: Closed</p>
                    </div>

                    <div>
                        <p className="text-gray-500 text-xs mb-1">CONTACT</p>
                        <p>+91 98765 43210</p>
                    </div>

                </motion.div>

               

            </div>

            {/* RIGHT SIDE */}
            <motion.div
                initial={{ opacity: 0, scale: 1.1 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1 }}
                className="relative hidden md:block overflow-hidden"
            >

                <motion.img
                    src="https://images.unsplash.com/photo-1520975916090-3105956dac38"
                    className="absolute inset-0 w-full h-full object-cover"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 1 }}
                />

                {/* OVERLAY */}
                <div className="absolute inset-0 bg-black/40" />

                {/* TEXT OVER IMAGE */}
                <div className="absolute bottom-10 left-10">
                    <p className="text-sm text-white/70">Resolute Fashions</p>
                    <p className="text-lg font-medium">Premium Collection</p>
                </div>

            </motion.div>

        </section>
    );
}