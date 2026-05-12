"use client"

import { useEffect, useState } from "react";
import Hero from "@/components/home/Hero";
import Categories from "@/components/home/Categories";
import Products from "@/components/home/Products";
import PosterGrid from "@/components/home/Poster";
import NewArrivals from "@/components/home/NewArrivals";
import Loader from "@/components/Loader";
import ContactSection from "@/components/home/ContactSection";
import { useSearch } from "@/context/SearchContext";
import { getBanners, getCategories, getProducts } from "@/lib/api-client";

type CategoryItem = {
  name: string;
  image: string;
};

type BannerItem = {
  title: string;
  subtitle: string;
  image: string;
  link: string;
};

type ProductItem = {
  id?: string;
  name: string;
  price: string | number;
  image: string;
  category?: string;
};

const fallbackCategories: CategoryItem[] = [
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

const fallbackBanners: BannerItem[] = [
  {
    title: "Trending Now",
    subtitle: "Discover your signature look",
    image: "https://images.unsplash.com/photo-1523381294911-8d3cead13475",
    link: "/",
  },
  {
    title: "New Collection",
    subtitle: "Elegance in every thread",
    image: "https://images.unsplash.com/photo-1521335629791-ce4aec67dd53",
    link: "/",
  },
  {
    title: "Premium Styles",
    subtitle: "Crafted for modern fashion",
    image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d",
    link: "/",
  },
];

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

export default function Home() {
  const { searchTerm } = useSearch();
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState<CategoryItem[]>(fallbackCategories);
  const [banners, setBanners] = useState<BannerItem[]>(fallbackBanners);
  const [products, setProducts] = useState<ProductItem[]>(fallbackProducts);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [categoriesRes, bannersRes, productsRes] = await Promise.allSettled([
          getCategories(),
          getBanners(),
          getProducts(),
        ]);

        if (
          categoriesRes.status === "fulfilled" &&
          categoriesRes.value?.success &&
          Array.isArray(categoriesRes.value.data) &&
          categoriesRes.value.data.length > 0
        ) {
          setCategories(
            categoriesRes.value.data.map((category: any) => ({
              name: category.name || "Category",
              image:
                category.image ||
                "https://images.unsplash.com/photo-1490481651871-ab68de25d43d",
            }))
          );
        }

        if (
          bannersRes.status === "fulfilled" &&
          bannersRes.value?.success &&
          Array.isArray(bannersRes.value.data) &&
          bannersRes.value.data.length > 0
        ) {
          const activeBanners = bannersRes.value.data
            .filter((banner: any) => banner.isActive !== false)
            .sort((a: any, b: any) => (a.order ?? 0) - (b.order ?? 0))
            .map((banner: any) => ({
              title: banner.title || "Banner",
              subtitle: banner.subtitle || "",
              image:
                banner.image ||
                "https://images.unsplash.com/photo-1490481651871-ab68de25d43d",
              link: banner.link || "/",
            }));

          if (activeBanners.length > 0) {
            setBanners(activeBanners);
          }
        }

        if (
          productsRes.status === "fulfilled" &&
          productsRes.value?.success &&
          Array.isArray(productsRes.value.data) &&
          productsRes.value.data.length > 0
        ) {
          setProducts(
            productsRes.value.data.map((product: any) => ({
              id: product._id || product.id,
              name: product.name || "Product",
              price: product.price ?? "₹0",
              image:
                product.image ||
                "https://images.unsplash.com/photo-1490481651871-ab68de25d43d",
              category: product.category || "",
            }))
          );
        }
      } catch (error) {
        console.warn("Home data fetch failed", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <Loader />;

  return (
    <main className="bg-[var(--background)] text-[var(--foreground)]">
      <Hero banners={banners} />
      <Categories categories={categories} />
      {/* <Products products={products} searchTerm={searchTerm} /> */}
      <PosterGrid />
      {/* <NewArrivals products={products} searchTerm={searchTerm} /> */}
      <ContactSection />
    </main>
  );
}
