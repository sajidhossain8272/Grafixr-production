"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";

export interface PortfolioItem {
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
const ITEMS_PER_PAGE = 20;

function titleize(str: string) {
  return str.replace(/[-_]/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

function Spinner() {
  return (
    <div className='flex justify-center items-center py-20'>
      <div className='absolute'>
        <div className='w-20 h-20 rounded-full bg-cyan-400/20 blur-2xl opacity-70 animate-pulse'></div>
      </div>
      <div className='relative'>
        <div className='w-14 h-14 rounded-full border-4 border-t-transparent border-b-transparent border-l-cyan-400 border-r-pink-400 animate-spin bg-gradient-to-tr from-cyan-400/10 via-white/10 to-pink-400/10 shadow-xl'></div>
        <div className='absolute left-1/2 top-1/2 w-4 h-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-300/70 blur-md animate-pulse'></div>
      </div>
    </div>
  );
}

export default function PortfolioList() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const selectedSubCategory = searchParams.get("subCategory") ?? "All";
  const pageParam = parseInt(searchParams.get("page") || "1", 10);
  const [page, setPage] = useState<number>(pageParam);

  const [items, setItems] = useState<PortfolioItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => setPage(pageParam), [pageParam]);

  useEffect(() => {
    setLoading(true);
    fetch(`${API_URL}/portfolio`)
      .then((res) => {
        if (!res.ok) throw new Error(res.statusText);
        return res.json() as Promise<PortfolioItem[]>;
      })
      .then((data) => {
        setItems(data);
        setError(null);
      })
      .catch(() => setError("Failed to load portfolio."))
      .finally(() => setLoading(false));
  }, []);

  const subCategories = useMemo(
    () => Array.from(new Set(items.map((i) => i.subCategory))),
    [items]
  );

  const filtered = useMemo(() => {
    return items
      .filter((item) =>
        selectedSubCategory === "All"
          ? true
          : item.subCategory === selectedSubCategory
      )
      .filter((item) =>
        item.title.toLowerCase().includes(searchTerm.trim().toLowerCase())
      )
      .sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
  }, [items, selectedSubCategory, searchTerm]);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);

  const paginated = useMemo(() => {
    const start = (page - 1) * ITEMS_PER_PAGE;
    return filtered.slice(start, start + ITEMS_PER_PAGE);
  }, [filtered, page]);

  function goToPage(newPage: number) {
    const url = new URL(window.location.href);
    if (newPage === 1) url.searchParams.delete("page");
    else url.searchParams.set("page", String(newPage));
    router.push(url.pathname + url.search);
  }

  useEffect(() => {
    setPage(1);
    const url = new URL(window.location.href);
    url.searchParams.set("page", "1");
    router.replace(url.pathname + url.search);
    // eslint-disable-next-line
  }, [selectedSubCategory, searchTerm]);

  if (loading) {
    return (
      <div className='fixed inset-0 bg-black/80 z-50 flex items-center justify-center'>
        <Spinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className='container mx-auto p-8'>
        <p className='text-red-500'>{error}</p>
      </div>
    );
  }

  return (
    <div className='w-full max-w-7xl mx-auto px-4 py-12'>
      {/* Filters */}
      <div className='mb-12 flex flex-wrap gap-4 items-center justify-center'>
        <div>
          <label
            htmlFor='subCategory'
            className='font-semibold text-white/80 mr-2'
          >
            Category
          </label>
          <select
            id='subCategory'
            className='border-2 border-white/30 rounded-lg px-4 py-2 bg-black/30 text-white outline-none focus:ring-2 ring-cyan-400'
            value={selectedSubCategory}
            onChange={(e) => {
              const v = e.target.value;
              const url = new URL(window.location.href);
              if (v === "All") url.searchParams.delete("subCategory");
              else url.searchParams.set("subCategory", v);
              url.searchParams.set("page", "1");
              router.push(url.pathname + url.search);
            }}
          >
            <option value='All'>All</option>
            {subCategories.map((sub) => (
              <option key={sub} value={sub}>
                {titleize(sub)}
              </option>
            ))}
          </select>
        </div>
        <div className='flex-1 min-w-[200px]'>
          <label htmlFor='search' className='sr-only'>
            Search by title
          </label>
          <input
            id='search'
            type='text'
            placeholder='Search by title…'
            className='w-full border-2 border-white/20 bg-black/30 rounded-lg px-4 py-2 text-white placeholder:text-white/60 outline-none focus:ring-2 ring-cyan-400'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <p className='text-center text-white/60 text-lg font-medium py-12'>
          {items.length === 0
            ? "No portfolio items available."
            : "No items match your filters."}
        </p>
      ) : (
        <>
          <div className='grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4'>
            {paginated.map((item, idx) => {
              const cover = item.files?.[0] || "/placeholder.png";
              return (
                <motion.div
                  key={item._id}
                  initial={{ opacity: 0, y: 40, scale: 0.98 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.13, duration: 0.7 }}
                >
                  <Link
                    href={`/portfolio/${item._id}`}
                    className='
                      group block rounded-2xl border border-white/15 bg-black/60
                      hover:border-cyan-400/40 hover:shadow-[0_0_0_3px_rgba(34,211,238,.15)]
                      transition-all duration-200 overflow-hidden
                    '
                    style={{ fontFamily: "Montserrat, Arial, sans-serif" }}
                  >
                    {/* Media: strict 4:3 like Dribbble */}
                    <div className='relative w-full aspect-[4/3] overflow-hidden'>
                      <img
                        src={cover}
                        alt={item.title}
                        className='absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.03]'
                      />
                    </div>

                    {/* Compact caption */}
                    <div className='px-3 pt-3 pb-3'>
                      <h3 className='text-white text-sm font-semibold leading-tight line-clamp-1'>
                        {item.title}
                      </h3>
                      <p className='text-white/60 text-xs leading-snug line-clamp-1'>
                        {item.description || "—"}
                      </p>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div
              className='
                flex flex-wrap sm:flex-nowrap items-center justify-center
                gap-2 mt-12 select-none max-w-full
              '
            >
              <button
                disabled={page === 1}
                onClick={() => goToPage(page - 1)}
                className='px-3 py-1.5 rounded-full text-white/80 text-sm font-semibold border-2 border-white/10 hover:bg-cyan-400/10 transition disabled:opacity-40'
              >
                Prev
              </button>

              {/* Page numbers wrap on mobile */}
              <div className='flex flex-wrap justify-center gap-2 mx-1'>
                {[...Array(totalPages)].map((_, idx) => (
                  <button
                    key={idx + 1}
                    className={`
                      px-3 py-1.5 rounded-full text-sm font-bold
                      ${
                        page === idx + 1
                          ? "bg-cyan-400 text-black shadow-lg border-cyan-400 border-2"
                          : "bg-black/40 text-white/80 border-2 border-white/10 hover:bg-cyan-400/10"
                      }
                      transition
                    `}
                    onClick={() => goToPage(idx + 1)}
                    aria-current={page === idx + 1 ? "page" : undefined}
                  >
                    {idx + 1}
                  </button>
                ))}
              </div>

              <button
                disabled={page === totalPages}
                onClick={() => goToPage(page + 1)}
                className='px-3 py-1.5 rounded-full text-white/80 text-sm font-semibold border-2 border-white/10 hover:bg-cyan-400/10 transition disabled:opacity-40'
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
