"use client";

import { motion } from "framer-motion";

type ProductItem = {
  id?: string;
  name: string;
  price: string | number;
  image: string;
  category?: string;
};

type ProductsProps = {
  products?: ProductItem[];
  searchTerm?: string;
};

const fallbackProducts: ProductItem[] = [
  {
    name: "Premium Shirt",
    price: "₹1299",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab",
    category: "Shirts",
  },
  {
    name: "Classic Hoodie",
    price: "₹1999",
    image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea",
    category: "Hoodies",
  },
  {
    name: "Modern Jacket",
    price: "₹2499",
    image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf",
    category: "Jackets",
  },
  {
    name: "Casual Tee",
    price: "₹899",
    image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d",
    category: "T-Shirts",
  },
];

function formatPrice(price: string | number) {
  if (typeof price === "number") {
    return `₹${price}`;
  }
  return price;
}

export default function Products({ products, searchTerm }: ProductsProps) {
  const items = products && products.length > 0 ? products : fallbackProducts;
  const filter = searchTerm?.trim().toLowerCase() || "";
  const visibleItems = items.filter((item) => {
    const name = item.name.toLowerCase();
    const category = (item.category || "").toLowerCase();
    return !filter || name.includes(filter) || category.includes(filter);
  });

  return (
    <section className="relative px-6 md:px-24 py-28 bg-[#f5f5f5] overflow-hidden">
      <h1 className="absolute top-10 right-10 text-[120px] md:text-[180px] font-bold text-black/5 leading-none select-none">
        COLLECTION
      </h1>
      <div className="relative z-10 flex flex-col md:flex-row justify-between items-start gap-10 mb-20">
        <div className="max-w-xl">
          <motion.h2
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-5xl md:text-6xl font-bold mb-6 tracking-tight"
          >
            FEATURED
          </motion.h2>
          <p className="text-gray-600 leading-relaxed text-[15px]">
            Discover our handpicked featured styles designed for comfort, elegance, and everyday wear.
          </p>
        </div>
        <div className="mt-6 md:mt-12">
          <button className="text-sm tracking-wide flex items-center gap-2 hover:opacity-70 transition">
            VIEW ALL →
          </button>
        </div>
      </div>
      {visibleItems.length === 0 ? (
        <p className="text-center text-gray-500">No products found.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 relative z-10">
          {visibleItems.map((item, i) => (
            <motion.div
              key={item.id || `${item.name}-${i}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="group cursor-pointer relative overflow-hidden rounded-lg"
            >
              <div className="h-[280px] bg-[#ececec] flex items-center justify-center p-6">
                <motion.img
                  src={item.image}
                  alt={item.name}
                  className="max-h-full object-contain"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.4 }}
                />
              </div>
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition duration-300" />
              <div className="absolute bottom-0 left-0 w-full p-4 text-white translate-y-full group-hover:translate-y-0 transition duration-300">
                <p className="text-sm font-medium">{item.name}</p>
                <p className="text-xs text-white/80 mt-1">{formatPrice(item.price)}</p>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    // For now, just show an alert - you'll need to implement size selection
                    alert("Please select a size first!");
                  }}
                  className="mt-2 px-3 py-1 bg-white text-black text-xs rounded hover:bg-gray-200 transition"
                >
                  Add to Cart
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </section>
  );
}
