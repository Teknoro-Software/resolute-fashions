"use client";

import { motion } from "framer-motion";
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

  return (
    <section className="py-24 bg-[#fafafa']">
      <div className="text-center mb-16">
        <p className="uppercase tracking-[0.3em] text-gray-400 text-sm mb-3">
          Collections
        </p>

        <h2 className="text-5xl md:text-6xl font-light">
          Explore Our Collections
        </h2>
      </div>

      <div className="grid md:grid-cols-2 gap-8 px-6 md:px-16">
        {categories.map((item, index) => (
          <motion.div
            key={item.name}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.6,
              delay: index * 0.2,
            }}
            onClick={() =>
              router.push(
                `/products?category=${item.slug ||
                item.name.toLowerCase().replace(/\s+/g, "-")
                }`
              )
            }
            className="group relative h-[650px] rounded-[32px] overflow-hidden cursor-pointer"
          >
            <img
              src={item.image}
              alt={item.name}
              className="
                absolute inset-0
                w-full h-full
                object-cover
                group-hover:scale-110
                transition duration-700
              "
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

            <div className="absolute bottom-10 left-10 right-10 text-white">
              <p className="uppercase tracking-[0.3em] text-xs mb-4">
                Collection
              </p>

              <h3 className="text-5xl md:text-6xl font-light mb-6">
                {item.name}
              </h3>

              <p className="text-white/80 leading-7 max-w-md">
                {item.description}
              </p>

              <div className="mt-8 inline-flex items-center gap-3 border-b border-white pb-1">
                <span>Explore Collection</span>
                <span>→</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}