"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

type ProductItem = {
  id: string;
  name: string;
  price: number;
  image: string;
  category?: string;
};

type ApiProduct = {
  _id: string;
  name: string;
  price: number;
  images: string[];
  category?: {
    _id: string;
    name: string;
  };
};

function formatPrice(price: number) {
  return `₹${price}`;
}

export default function FeaturedCollection() {
  const [products, setProducts] =
    useState<ProductItem[]>([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(
          "/api/products/featured"
        );

        const data = await res.json();

        const products: ApiProduct[] =
          data.data || [];

        const formattedProducts =
          products.map((item) => ({
            id: item._id,
            name: item.name,
            price: item.price,
            image:
              item.images?.[0] || "",
            category:
              item.category?.name ||
              "",
          }));

        setProducts(
          formattedProducts
        );
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return null;
  }

  const visibleItems =
    products.slice(0, 4);

  return (
    <section className="relative px-6 md:px-24 py-28 bg-[#f5f5f5] overflow-hidden">

      <h1
        className="
                absolute
                top-10
                right-10
                text-[120px]
                md:text-[180px]
                font-bold
                text-black/5
                leading-none
                select-none
                pointer-events-none
                "
      >
        COLLECTION
      </h1>

      <div
        className="
                relative
                z-10
                flex
                flex-col
                md:flex-row
                justify-between
                items-start
                gap-10
                mb-20
                "
      >

        <div className="max-w-xl">

          <motion.h2
            initial={{
              y: 30,
              opacity: 0,
            }}
            whileInView={{
              y: 0,
              opacity: 1,
            }}
            transition={{
              duration: 0.6,
            }}
            className="
                            text-5xl
                            md:text-6xl
                            font-bold
                            mb-6
                            tracking-tight
                        "
          >
            FEATURED COLLECTION
          </motion.h2>

          <p className="text-gray-600 leading-relaxed text-[15px]">
            Discover our handpicked
            featured styles designed
            for comfort, elegance,
            and everyday wear.
          </p>

        </div>

        <div className="mt-6 md:mt-12">

          <Link
            href="/products?type=featured"
            className="
                            text-sm
                            tracking-wide
                            flex
                            items-center
                            gap-2
                            hover:opacity-70
                            transition
                        "
          >
            VIEW ALL →
          </Link>

        </div>

      </div>

      {visibleItems.length === 0 ? (

        <p className="text-center text-gray-500">
          No featured products found.
        </p>

      ) : (

        <div
          className="
                    grid
                    grid-cols-2
                    md:grid-cols-4
                    gap-8
                    relative
                    z-10
                    "
        >

          {visibleItems.map(
            (item, i) => (

              <Link
                key={item.id}
                href={`/products/${item.id}`}
              >

                <motion.div
                  initial={{
                    opacity: 0,
                    y: 30,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    delay:
                      i * 0.08,
                  }}
                  className="
                                        group
                                        cursor-pointer
                                        relative
                                        overflow-hidden
                                        rounded-lg
                                    "
                >

                  <div
                    className="
                                        h-[280px]
                                        bg-[#ececec]
                                        flex
                                        items-center
                                        justify-center
                                        p-6
                                        "
                  >

                    <motion.img
                      src={
                        item.image
                      }
                      alt={
                        item.name
                      }
                      className="
                                                max-h-full
                                                object-contain
                                            "
                      whileHover={{
                        scale: 1.05,
                      }}
                      transition={{
                        duration: 0.4,
                      }}
                    />

                  </div>

                  <div
                    className="
                                        absolute
                                        inset-0
                                        bg-black/0
                                        group-hover:bg-black/50
                                        transition
                                        duration-300
                                        "
                  />

                  <div
                    className="
                                        absolute
                                        bottom-0
                                        left-0
                                        w-full
                                        p-4
                                        text-white
                                        translate-y-full
                                        group-hover:translate-y-0
                                        transition
                                        duration-300
                                        "
                  >

                    <p className="text-sm font-medium">
                      {
                        item.name
                      }
                    </p>

                    <p className="text-xs text-white/80 mt-1">
                      {formatPrice(
                        item.price
                      )}
                    </p>

                  </div>

                </motion.div>

              </Link>

            )
          )}

        </div>

      )}

    </section>
  );
}