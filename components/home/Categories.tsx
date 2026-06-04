"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { useRouter } from "next/navigation";

type CategoryItem = {
  name: string;
  image: string;
  slug?: string;
  description?: string;
};

interface CategoriesProps {
  categories?: CategoryItem[];
}

const fallbackCategories: CategoryItem[] = [
  {
    name: "Men's Wear",
    slug: "mens-wear",
    image: "/store/r5.jpg",
    description:
      "Formal Shirts, Casual Shirts, T-Shirts, Formal Pants & Baggy Jeans",
  },
  {
    name: "Ladies Wear",
    slug: "ladies-wear",
    image: "/store/r6.jpg",
    description:
      "Sarees, Churidars, Co-ord Sets, Party Wear & Trendy Collections",
  },
];

export default function Categories({
  categories = fallbackCategories,
}: CategoriesProps) {
  const router = useRouter();

  const [active, setActive] =
    useState(0);

  return (
    <section className="h-screen bg-black">

      <div className="absolute z-20 top-12 left-1/2 -translate-x-1/2 text-center text-white">

        <p className="uppercase tracking-[0.3em] text-white/70 text-sm mb-3">
          Collections
        </p>

        <h2 className="text-5xl md:text-7xl font-light">
          Explore Collections
        </h2>

      </div>

      <div className="h-full flex overflow-hidden">

        {categories.map(
          (item, index) => {
            const isActive =
              active === index;

            return (
              <motion.div
                key={item.name}
                onMouseEnter={() =>
                  setActive(
                    index
                  )
                }
                onClick={() =>
                  router.push(
                    `/products?category=${item.slug}`
                  )
                }
                className="relative h-full cursor-pointer overflow-hidden"
                animate={{
                  flex:
                    isActive
                      ? 4
                      : 1,
                }}
                transition={{
                  duration: 0.7,
                  ease: "easeInOut",
                }}
              >

                <img
                  src={
                    item.image
                  }
                  alt={
                    item.name
                  }
                  className="absolute inset-0 w-full h-full object-cover"
                />

                <div
                  className={`absolute inset-0 transition duration-500 ${isActive
                      ? "bg-black/30"
                      : "bg-black/60"
                    }`}
                />

                {isActive ? (
                  <motion.div
                    initial={{
                      opacity: 0,
                      y: 40,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    className="absolute bottom-16 left-12 max-w-lg text-white"
                  >

                    <p className="uppercase tracking-[0.3em] text-xs mb-4">
                      Collection
                    </p>

                    <h3 className="text-5xl md:text-6xl font-light mb-6">
                      {
                        item.name
                      }
                    </h3>

                    <p className="text-white/80 leading-7">
                      {
                        item.description
                      }
                    </p>

                    <div className="mt-8 inline-flex items-center gap-3 border-b border-white pb-1">
                      <span>
                        Explore
                        Collection
                      </span>
                      <span>
                        →
                      </span>
                    </div>

                  </motion.div>
                ) : (
                  <div className="absolute bottom-24 left-1/2 -translate-x-1/2">
                    <p className="rotate-[-90deg] whitespace-nowrap text-white tracking-[0.35em] text-lg">
                      {
                        item.name
                      }
                    </p>
                  </div>
                )}

              </motion.div>
            );
          }
        )}

      </div>

    </section>
  );
}