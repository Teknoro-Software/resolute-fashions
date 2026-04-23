"use client"

import { useState, useEffect } from "react";
import Hero from "@/components/home/Hero";
import Categories from "@/components/home/Categories";
import Products from "@/components/home/Products";
import PosterGrid from "@/components/home/Poster";
import NewArrivals from "@/components/home/NewArrivals";
import Loader  from "@/components/Loader";
import ContactSection from "@/components/home/ContactSection";

export default function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 2000);
  }, []);

  if (loading) return <Loader />;
  return (
    <main className="bg-[var(--background)] text-[var(--foreground)]">
      <Hero />
      <Categories />
      <Products />
      <PosterGrid />
      <NewArrivals />
      <ContactSection/>
    </main>
  );
}