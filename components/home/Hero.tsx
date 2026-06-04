"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

type Banner = {
  _id?: string;
  image: string;
};

export default function Hero({
  banners,
}: {
  banners: Banner[];
}) {
  const [index, setIndex] =
    useState(0);

  useEffect(() => {
    if (
      banners.length <= 1
    )
      return;

    const interval =
      setInterval(() => {
        setIndex(
          (prev) =>
            (prev + 1) %
            banners.length
        );
      }, 5000);

    return () =>
      clearInterval(interval);
  }, [banners]);

  if (!banners.length)
    return null;

  return (
    <section className="relative w-full aspect-[16/7] overflow-hidden mt-20 md:mt-25 md:mb-10">
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{
            opacity: 0,
            scale: 1.05,
          }}
          animate={{
            opacity: 1,
            scale: 1,
          }}
          exit={{
            opacity: 0,
          }}
          transition={{
            duration: 1,
          }}
          className="absolute inset-0"
        >
          <Image
            src={banners[index].image}
            alt="Banner"
            fill
            priority
            className="object-cover"
          />

          <div className="absolute inset-0 bg-black/20" />
        </motion.div>
      </AnimatePresence>

      <div className="absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 gap-3">
        {banners.map(
          (_, i) => (
            <button
              key={i}
              onClick={() =>
                setIndex(
                  i
                )
              }
              className={`h-2 rounded-full transition-all ${index === i
                  ? "w-8 bg-white"
                  : "w-2 bg-white/50"
                }`}
            />
          )
        )}
      </div>
    </section>
  );
}