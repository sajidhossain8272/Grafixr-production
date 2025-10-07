"use client";
import { useEffect, useState } from "react";
import ClientReviews from "@/components/ClientReviews";
import CTASection from "@/components/CTASection";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Hero from "@/components/Hero";
import FontsWeWorkWith from "@/components/FontsWeWorkWith";
import RecentProjects from "@/components/RecentProjects";
import Script from "next/script";
// import Script from "next/script"; // Uncomment if adding JSON-LD

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

// SEO metadata export for Next.js App Router


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
   
      <Script id="org-jsonld" type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "GrafiXr",
          "url": "https://grafixr.com",
          "logo": "https://grafixr.com/Logo.png",
          "sameAs": [
            "https://instagram.com/grafixr07",
            "https://youtube.com/@GrafiXr07"
          ]
        })}
      </Script>
     

      <div className="min-h-screen bg-black text-white transition-colors duration-500">
        <ToastContainer position="top-right" autoClose={3000} hideProgressBar />

        <main>
          {/* Hero should include the page's <h1> for SEO */}
          <section aria-label="Hero & Introduction">
            <Hero />
          </section>

          <section className="hidden lg:block" aria-label="Fonts We Work With">
            <FontsWeWorkWith />
          </section>

          <section aria-label="Recent Projects">
            <RecentProjects
              latest={latest}
              loading={loadingLatest}
              error={errorLatest}
            />
          </section>

          <section aria-label="Client Reviews">
            <ClientReviews />
          </section>

          <section aria-label="Call to Action">
            <CTASection />
          </section>
        </main>
      </div>
    </>
  );
}
