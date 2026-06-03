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

export default function NewArrivals() {
  const [products, setProducts] =
    useState<ProductItem[]>([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(
          "/api/products/new-arrivals"
        );

        const data = await res.json();

        const formattedProducts =
          (data.data as ApiProduct[]).map(
            (item) => ({
              id: item._id,
              name: item.name,
              price: item.price,
              image:
                item.images?.[0] || "",
              category:
                item.category?.name ||
                "",
            })
          );

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
    return (
      <section className="py-28 text-center">
        Loading...
      </section>
    );
  }

  return (
    <section className="relative px-6 md:px-24 py-28 bg-[#fafafa] overflow-hidden">

      <h1
        className="
                absolute
                top-0
                right-0
                text-[140px]
                md:text-[220px]
                font-semibold
                text-black/5
                leading-none
                select-none
                pointer-events-none
                "
      >
        ARRIVALS
      </h1>

      <div className="relative z-10 max-w-7xl mx-auto">

        <div className="flex justify-between items-start mb-20">

          <div className="max-w-md">

            <motion.h2
              initial={{
                opacity: 0,
                y: 20,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.6,
              }}
              className="
                                text-4xl
                                md:text-5xl
                                font-semibold
                                tracking-tight
                                mb-6
                            "
            >
              NEW
            </motion.h2>

            <p className="text-gray-500 text-[15px] leading-relaxed">
              Discover our latest
              arrivals curated for
              modern lifestyles and
              timeless style.
            </p>

          </div>

          <Link
            href="/products?type=new-arrivals"
            className="
                            text-sm
                            tracking-wide
                            flex
                            items-center
                            gap-2
                            mt-2
                            hover:opacity-70
                            transition
                        "
          >
            VIEW ALL →
          </Link>

        </div>

        {products.length === 0 ? (
          <p className="text-center text-gray-500">
            No new arrivals found.
          </p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">

            {products
              .slice(0, 4)
              .map(
                (
                  item,
                  i
                ) => (
                  <Link
                    key={
                      item.id
                    }
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
                          i *
                          0.08,
                      }}
                      className="group cursor-pointer"
                    >

                      <div
                        className="
                                                relative
                                                h-[280px]
                                                bg-[#f3f3f3]
                                                overflow-hidden
                                                rounded-md
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
                                                        w-full
                                                        h-full
                                                        object-contain
                                                        p-6
                                                    "
                          whileHover={{
                            scale: 1.08,
                          }}
                          transition={{
                            duration: 0.5,
                          }}
                        />

                        <div
                          className="
                                                    absolute
                                                    inset-0
                                                    bg-black/0
                                                    group-hover:bg-black/5
                                                    transition
                                                    duration-300
                                                    "
                        />

                        <div
                          className="
                                                    absolute
                                                    bottom-4
                                                    right-4
                                                    opacity-0
                                                    group-hover:opacity-100
                                                    transition
                                                    "
                        >

                          <div
                            className="
                                                        bg-white
                                                        p-2
                                                        rounded-full
                                                        shadow-sm
                                                        "
                          >
                            <span className="text-sm">
                              +
                            </span>
                          </div>

                        </div>

                      </div>

                      <div className="mt-3 flex justify-between items-start">

                        <div>

                          <p
                            className="
                                                        text-sm
                                                        font-medium
                                                        tracking-tight
                                                        "
                          >
                            {
                              item.name
                            }
                          </p>

                          <p className="text-xs text-gray-400 mt-1">
                            {formatPrice(
                              item.price
                            )}
                          </p>

                        </div>

                      </div>

                    </motion.div>

                  </Link>
                )
              )}

          </div>
        )}

      </div>

    </section>
  );
}