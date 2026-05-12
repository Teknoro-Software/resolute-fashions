"use client";

import { motion } from "framer-motion";

type ProductItem = {
  id?: string;
  name: string;
  price: string | number;
  image: string;
  category?: string;
};

type NewArrivalsProps = {
  products?: ProductItem[];
  searchTerm?: string;
};

const fallbackProducts: ProductItem[] = [
  {
    name: "Crew New Shirt",
    price: "€59.50",
    image: "https://images.unsplash.com/photo-1603252109303-2751441dd157",
    category: "Shirts",
  },
  {
    name: "White Hoodie",
    price: "€49.50",
    image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea",
    category: "Hoodies",
  },
  {
    name: "White Tshirt",
    price: "€49.50",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab",
    category: "T-Shirts",
  },
  {
    name: "Black Hoodie",
    price: "€99.50",
    image: "https://images.unsplash.com/photo-1585386959984-a41552231658",
    category: "Hoodies",
  },
];

function formatPrice(price: string | number) {
  return typeof price === "number" ? `₹${price}` : price;
}

export default function NewArrivals({ products, searchTerm }: NewArrivalsProps) {
  const items = products && products.length > 0 ? products : fallbackProducts;
  const filter = searchTerm?.trim().toLowerCase() || "";
  const visibleItems = items.filter((item) => {
    const name = item.name.toLowerCase();
    const category = (item.category || "").toLowerCase();
    return !filter || name.includes(filter) || category.includes(filter);
  });

  return (
    <section className="relative px-6 md:px-24 py-28 bg-[#fafafa] overflow-hidden">
      <h1 className="absolute top-0 right-0 text-[140px] md:text-[220px] font-semibold text-black/5 leading-none select-none pointer-events-none">
        PRODUCTS
      </h1>
      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="flex justify-between items-start mb-20">
          <div className="max-w-md">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-5xl font-semibold tracking-tight mb-6"
            >
              NEWEST
            </motion.h2>
            <p className="text-gray-500 text-[15px] leading-relaxed">
              Discover refined essentials crafted for modern lifestyles. Clean silhouettes, premium fabrics, and timeless appeal.
            </p>
          </div>
          <button className="text-sm tracking-wide flex items-center gap-2 mt-2 hover:opacity-70 transition">
            VIEW ALL →
          </button>
        </div>
        {visibleItems.length === 0 ? (
          <p className="text-center text-gray-500">No products match your search.</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {visibleItems.map((item, i) => (
              <motion.div
                key={item.id || `${item.name}-${i}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                className="group cursor-pointer"
              >
                <div className="relative h-[280px] bg-[#f3f3f3] overflow-hidden rounded-md">
                  <motion.img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-contain p-6"
                    whileHover={{ scale: 1.08 }}
                    transition={{ duration: 0.5 }}
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition duration-300" />
                  <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition">
                    <div className="bg-white p-2 rounded-full shadow-sm">
                      <span className="text-sm">+</span>
                    </div>
                  </div>
                </div>
                <div className="mt-3 flex justify-between items-start">
                  <div>
                    <p className="text-sm font-medium tracking-tight">{item.name}</p>
                    <p className="text-xs text-gray-400 mt-1">{formatPrice(item.price)}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
