"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { useRouter } from "next/navigation";

type CategoryItem = {
  name: string;
  image: string;
};

type CategoriesProps = {
  categories?: CategoryItem[];
};

const fallbackItems: CategoryItem[] = [
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

export default function Categories({ categories }: CategoriesProps) {
  const router = useRouter();
  const [active, setActive] = useState(2);
  const items = categories && categories.length > 0 ? categories : fallbackItems;

  return (
    <section className="h-screen w-full flex overflow-hidden">
      {items.map((item, i) => {
        const isActive = i === active;

        return (
          <motion.div
            key={i}
            onMouseEnter={() => setActive(i)}
            onClick={() => router.push(`/products?category=${item.name}`)}
            className="relative h-full cursor-pointer overflow-hidden"
            animate={{
              flex: isActive ? 4 : 1,
            }}
            transition={{
              duration: 0.6,
              ease: "easeInOut",
            }}
          >
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${item.image})` }}
            />
            <div
              className={`absolute inset-0 transition duration-500 ${isActive ? "bg-black/20" : "bg-black/50"}`}
            />
            <motion.div
              className="absolute bottom-20 left-1/2 -translate-x-1/2 text-white"
              animate={{
                opacity: isActive ? 1 : 0.6,
                y: isActive ? 0 : 20,
              }}
              transition={{ duration: 0.4 }}
            >
              <p className={`rotate-[-90deg] tracking-[0.3em] ${isActive ? "text-xl" : "text-sm"}`}>
                {item.name}
              </p>
            </motion.div>
          </motion.div>
        );
      })}
    </section>
  );
}
