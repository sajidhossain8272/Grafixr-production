"use client";

import { useEffect, useState } from "react";

import ClientReviews from "@/components/ClientReviews";
import CTASection from "@/components/CTASection";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Hero from "@/components/Hero";
import FontsWeWorkWith from "@/components/FontsWeWorkWith";
import RecentProjects from "@/components/RecentProjects";

interface PortfolioItem {
  _id: string;
  title: string;
  description: string;
  mainCategory: string;
  subCategory: string;
  mediaType: "image" | "video";
  files: string[];
  createdAt: string;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL!;

export default function Home() {
  const [latest, setLatest] = useState<PortfolioItem[]>([]);
  const [loadingLatest, setLoadingLatest] = useState(true);
  const [errorLatest, setErrorLatest] = useState<string | null>(null);

  useEffect(() => {
    setLoadingLatest(true);
    fetch(`${API_URL}/portfolio`)
      .then((res) => {
        if (!res.ok) throw new Error(res.statusText);
        return res.json() as Promise<PortfolioItem[]>;
      })
      .then((data) => {
        const sorted = data.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        setLatest(sorted.slice(0, 3));
        setErrorLatest(null);
      })
      .catch(() => setErrorLatest("Failed to load latest projects."))
      .finally(() => setLoadingLatest(false));
  }, []);


  return (
    <>
      <div className='min-h-screen bg-black text-white dark:bg-white dark:text-gray-900 transition-colors duration-500'>
        <ToastContainer position='top-right' autoClose={3000} hideProgressBar />

        {/* Hero */}
        <Hero />
        <FontsWeWorkWith />
        <RecentProjects
          latest={latest}
          loading={loadingLatest}
          error={errorLatest}
        />

        <ClientReviews />
  
        <CTASection />
      </div>
    </>
  );
}
