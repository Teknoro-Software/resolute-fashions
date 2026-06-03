"use client";

import { useEffect, useState } from "react";
import Hero from "@/components/home/Hero";
import Categories from "@/components/home/Categories";
import Products from "@/components/home/Products";
import PosterGrid from "@/components/home/Poster";
import NewArrivals from "@/components/home/NewArrivals";
import ContactSection from "@/components/home/ContactSection";
import Loader from "@/components/Loader";
import { useSearch } from "@/context/SearchContext";
import {
  getBanners,
  getCategories,
  getProducts,
} from "@/lib/api-client";

type CategoryItem = {
  name: string;
  image: string;
};

type BannerItem = {
  image: string;
};

type ProductItem = {
  id?: string;
  name: string;
  price: string | number;
  image: string;
  category?: string;
};

export default function Home() {
  const { searchTerm } =
    useSearch();

  const [loading, setLoading] =
    useState(true);

  const [categories, setCategories] =
    useState<CategoryItem[]>(
      []
    );

  const [banners, setBanners] =
    useState<BannerItem[]>([]);

  const [products, setProducts] =
    useState<ProductItem[]>([]);

  useEffect(() => {
    const fetchData =
      async () => {
        try {
          const [
            categoriesRes,
            bannersRes,
            productsRes,
          ] =
            await Promise.allSettled(
              [
                getCategories(),
                getBanners(),
                getProducts(),
              ]
            );

          if (
            categoriesRes.status ===
            "fulfilled" &&
            categoriesRes.value
              ?.success
          ) {
            setCategories(
              categoriesRes.value
                .data || []
            );
          }

          if (
            bannersRes.status ===
            "fulfilled" &&
            bannersRes.value
              ?.success
          ) {
            setBanners(
              bannersRes.value
                .data || []
            );
          }

          if (
            productsRes.status ===
            "fulfilled" &&
            productsRes.value
              ?.success
          ) {
            setProducts(
              productsRes.value
                .data || []
            );
          }
        } catch (error) {
          console.error(
            error
          );
        } finally {
          setLoading(
            false
          );
        }
      };

    fetchData();
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <main className="bg-[var(--background)] text-[var(--foreground)]">
      {banners.length >
        0 && (
          <Hero
            banners={
              banners
            }
          />
        )}

      {categories.length >
        0 && (
          <Categories
            categories={
              categories
            }
          />
        )}

      {products.length >
        0 && (
          <>
            <Products />

            <PosterGrid />

            <NewArrivals />
          </>
        )}

      <ContactSection />
    </main>
  );
}