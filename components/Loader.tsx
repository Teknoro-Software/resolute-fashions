"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function Loader() {
    return (
        <div className="fixed inset-0 z-[999] flex items-center justify-center bg-[var(--background)]">

            <motion.div
                initial={{ opacity: 0, scale: 1.1, filter: "blur(12px)" }}
                animate={{
                    opacity: 1,
                    scale: 1,
                    filter: "blur(0px)",
                }}
                transition={{
                    duration: 1.2,
                    ease: "easeOut",
                }}
            >
                <Image
                    src="/logomix.png"
                    alt="Loading"
                    width={110}
                    height={110}
                    className="object-contain"
                    priority
                />
            </motion.div>

        </div>
    );
}