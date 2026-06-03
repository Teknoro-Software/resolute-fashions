"use client";

import { motion } from "framer-motion";

export default function StorePage() {
    return (
        <main className="bg-[#fafafa] overflow-hidden">

            {/* HERO */}
            <section className="relative h-screen">

                <img
                    src="/images/r2.jpg"
                    alt=""
                    className="absolute inset-0 w-full h-full object-cover"
                />

                <div className="absolute inset-0 bg-black/60" />

                <div className="relative z-10 h-full flex items-center justify-center">

                    <div className="text-center text-white px-6">

                        <p className="uppercase tracking-[0.5em] text-sm mb-6">
                            Resolute Fashions
                        </p>

                        <h1 className="text-6xl md:text-8xl font-light mb-8">
                            Unlock The New You
                        </h1>

                        <p className="text-white/80 text-lg max-w-2xl mx-auto">
                            Men&apos;s Wear • Ladies Wear • Online & Offline Shopping
                        </p>

                    </div>

                </div>

            </section>

            {/* BRAND STORY */}
            <section className="py-32 px-6 md:px-20">

                <div className="grid md:grid-cols-2 gap-20 items-center">

                    <motion.img
                        initial={{ opacity: 0, x: -40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        src="/store/r1.jpg"
                        alt=""
                        className="w-full rounded-[30px]"
                    />

                    <motion.div
                        initial={{ opacity: 0, x: 40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >

                        <p className="uppercase tracking-[0.3em] text-gray-400 mb-5">
                            About Our Store
                        </p>

                        <h2 className="text-5xl font-light mb-8">
                            A Modern Fashion Destination
                        </h2>

                        <p className="text-gray-600 leading-9 text-lg">
                            Discover carefully curated collections for men and women,
                            from everyday essentials to occasion wear. Our showroom
                            is designed to provide a premium shopping experience with
                            quality, comfort and style.
                        </p>

                    </motion.div>

                </div>

            </section>

            {/* LADIES SECTION */}
            <section className="grid md:grid-cols-2 min-h-screen">

                <div className="relative">

                    <img
                        src="/images/r6.jpg"
                        alt=""
                        className="w-full h-full object-cover"
                    />

                </div>

                <div className="flex items-center px-8 md:px-20 bg-white">

                    <div>

                        <p className="uppercase tracking-[0.3em] text-gray-400 mb-5">
                            Ladies Collection
                        </p>

                        <h2 className="text-5xl md:text-6xl font-light mb-8">
                            Elegant & Timeless
                        </h2>

                        <ul className="space-y-4 text-lg text-gray-600">

                            <li>Sarees</li>
                            <li>Co-ord Sets</li>
                            <li>Party Wear</li>
                            <li>Churidars</li>
                            <li>Semi Casual Wear</li>

                        </ul>

                    </div>

                </div>

            </section>

            {/* MEN SECTION */}
            <section className="grid md:grid-cols-2 min-h-screen">

                <div className="flex items-center px-8 md:px-20 bg-[#f4f4f4]">

                    <div>

                        <p className="uppercase tracking-[0.3em] text-gray-400 mb-5">
                            Men&apos;s Collection
                        </p>

                        <h2 className="text-5xl md:text-6xl font-light mb-8">
                            Modern Everyday Style
                        </h2>

                        <ul className="space-y-4 text-lg text-gray-600">

                            <li>Formal Shirts</li>
                            <li>Casual Shirts</li>
                            <li>T-Shirts</li>
                            <li>Baggy Jeans</li>
                            <li>Semi Formal Wear</li>

                        </ul>

                    </div>

                </div>

                <div>

                    <img
                        src="/images/r5.jpg"
                        alt=""
                        className="w-full h-full object-cover"
                    />

                </div>

            </section>

            {/* SHOWROOM GALLERY */}
            <section className="py-32 px-6 md:px-20">

                <div className="text-center mb-20">

                    <p className="uppercase tracking-[0.3em] text-gray-400 mb-4">
                        Inside The Store
                    </p>

                    <h2 className="text-5xl font-light">
                        Showroom Highlights
                    </h2>

                </div>

                <div className="grid md:grid-cols-12 gap-6">

                    <div className="md:col-span-7">

                        <img
                            src="/images/r4.jpg"
                            alt=""
                            className="w-full h-[700px] object-cover rounded-[30px]"
                        />

                    </div>

                    <div className="md:col-span-5 flex flex-col gap-6">

                        <img
                            src="/images/r3.jpg"
                            alt=""
                            className="w-full h-[340px] object-cover rounded-[30px]"
                        />

                        <img
                            src="/images/r1.jpg"
                            alt=""
                            className="w-full h-[340px] object-cover rounded-[30px]"
                        />

                    </div>

                </div>

            </section>

            {/* VISIT STORE */}
            <section className="relative h-[80vh]">

                <img
                    src="/images/r1.jpg"
                    alt=""
                    className="absolute inset-0 w-full h-full object-cover"
                />

                <div className="absolute inset-0 bg-black/65" />

                <div className="relative z-10 h-full flex items-center justify-center">

                    <div className="text-center text-white px-6">

                        <h2 className="text-5xl md:text-7xl font-light mb-6">
                            Visit Our Store
                        </h2>

                        <p className="text-white/80 max-w-xl mx-auto mb-10">
                            Experience fashion beyond online shopping and
                            discover our latest collections in person.
                        </p>

                        <button className="px-10 py-4 rounded-full bg-white text-black hover:scale-105 transition">
                            Get Directions
                        </button>

                    </div>

                </div>

            </section>

        </main>
    );
}