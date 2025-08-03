"use client";

import React, { useMemo, useState } from "react";
import Image from "next/image";

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

interface AdminListProps {
  items: PortfolioItem[];
  loading: boolean;
  onDelete: (id: string) => void;
}

export default function AdminList({
  items,
  loading,
  onDelete,
}: AdminListProps) {
  // ====== PAGINATION ======
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 6;

  // ====== CATEGORY FILTERING ======
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  // Build unique list of main categories from items
  const categories = useMemo(() => {
    const set = new Set(items.map((i) => i.mainCategory));
    return Array.from(set).sort();
  }, [items]);

  // Filter items by selected category
  const filteredItems = useMemo(() => {
    return selectedCategory
      ? items.filter((item) => item.mainCategory === selectedCategory)
      : items;
  }, [items, selectedCategory]);

  // Paginate
  const totalPages = Math.ceil(filteredItems.length / pageSize);
  const paginatedItems = useMemo(
    () =>
      filteredItems.slice((currentPage - 1) * pageSize, currentPage * pageSize),
    [filteredItems, currentPage, pageSize]
  );

  // Reset to first page if filter changes
  React.useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory]);

  // ===== RENDER =====
  if (loading) {
    return (
      <div className="text-center text-cyan-300 p-8 text-lg font-semibold">
        Loading items...
      </div>
    );
  }
  if (!items.length) {
    return (
      <div className="text-center text-cyan-400 p-8 text-xl">
        No portfolio items found.
      </div>
    );
  }

  return (
    <div className="bg-[#181924]/90 border border-white/10 backdrop-blur-xl rounded-2xl shadow-xl p-7">
      <h2 className="text-2xl font-bold mb-6 text-center text-white tracking-tight">
        Existing Portfolio Items
      </h2>
      {/* FILTER */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-5 gap-3">
        <div className="flex items-center gap-2">
          <label className="text-cyan-300 font-semibold text-sm">
            Filter by Category:
          </label>
          <select
            className="bg-black/40 border border-cyan-500/20 rounded text-cyan-100 px-3 py-1 focus:ring-2 focus:ring-cyan-500 transition min-w-[120px]"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="">All</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
        <div className="text-cyan-200 text-sm font-medium opacity-70">
          Showing {filteredItems.length} item{filteredItems.length !== 1 ? "s" : ""}
        </div>
      </div>
      {/* LIST */}
      <div className="divide-y divide-cyan-900/40">
        {paginatedItems.map((item) => {
          const thumb = item.files[0] || "";
          return (
            <div
              key={item._id}
              className="py-5 flex flex-col md:flex-row md:items-center md:justify-between gap-5"
            >
              <div className="flex items-center gap-5 min-w-0">
                <div className="relative w-20 h-20 flex-shrink-0 rounded-2xl overflow-hidden bg-cyan-900/20 border border-cyan-600/20">
                  {thumb && item.mediaType === "image" ? (
                    <Image
                      src={thumb}
                      alt={item.title}
                      fill
                      className="object-cover"
                    />
                  ) : thumb && item.mediaType === "video" ? (
                    <video
                      src={thumb}
                      className="w-full h-full object-cover rounded-2xl"
                      muted
                      controls={false}
                      autoPlay={false}
                    />
                  ) : (
                    <div className="flex items-center justify-center w-full h-full text-cyan-900/70 font-bold">
                      No preview
                    </div>
                  )}
                </div>
                <div className="min-w-0">
                  <h3 className="text-lg font-semibold text-cyan-100 truncate">
                    {item.title}
                  </h3>
                  <p className="text-xs text-cyan-400 mb-1 truncate">
                    {item.mainCategory} / {item.subCategory}
                  </p>
                  <p className="text-xs text-cyan-700 truncate opacity-80">
                    {item.description}
                  </p>
                  <span className="text-xs text-gray-500 block mt-1 opacity-70">
                    {new Date(item.createdAt).toLocaleString()}
                  </span>
                </div>
              </div>
              <button
                onClick={() => onDelete(item._id)}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-1.5 rounded-lg transition font-medium shadow"
              >
                Delete
              </button>
            </div>
          );
        })}
      </div>

      {/* PAGINATION */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-6">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className={`px-3 py-1 rounded-lg text-cyan-100 bg-cyan-900/40 hover:bg-cyan-900/70 font-medium ${
              currentPage === 1 ? "opacity-40 cursor-not-allowed" : ""
            }`}
          >
            Prev
          </button>
          {Array.from({ length: totalPages }).map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentPage(idx + 1)}
              className={`px-3 py-1 rounded-lg font-medium ${
                currentPage === idx + 1
                  ? "bg-cyan-600 text-white"
                  : "bg-cyan-900/40 text-cyan-200 hover:bg-cyan-900/70"
              }`}
            >
              {idx + 1}
            </button>
          ))}
          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className={`px-3 py-1 rounded-lg text-cyan-100 bg-cyan-900/40 hover:bg-cyan-900/70 font-medium ${
              currentPage === totalPages ? "opacity-40 cursor-not-allowed" : ""
            }`}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
