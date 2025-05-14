"use client";

import React, {
  useEffect,
  useState,
  useCallback,
  useRef,
} from "react";
import { useRouter } from "next/navigation";

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

interface Props {
  id: string;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL!;

function titleize(str: string) {
  return str
    .replace(/[-_]/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

function SpinnerOverlay() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/30 backdrop-blur-sm">
      <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
    </div>
  );
}

export default function PortfolioItemClient({ id }: Props) {
  const router = useRouter();

  const [item, setItem] = useState<PortfolioItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const lightboxCloseRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setLoading(true);
    fetch(`${API_URL}/portfolio/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error(`Status ${res.status}`);
        return res.json() as Promise<PortfolioItem>;
      })
      .then((data) => setItem(data))
      .catch(() => setError("Could not load this portfolio item."))
      .finally(() => setLoading(false));
  }, [id]);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (lightboxIndex !== null && item) {
      const next = new Image();
      const prev = new Image();
      next.src = item.files[(lightboxIndex + 1) % item.files.length];
      prev.src =
        item.files[
          (lightboxIndex - 1 + item.files.length) % item.files.length
        ];
      lightboxCloseRef.current?.focus();
    }
  }, [lightboxIndex, item]);

  const onKey = useCallback(
    (e: KeyboardEvent) => {
      if (lightboxIndex !== null && item) {
        if (e.key === "Escape") setLightboxIndex(null);
        if (e.key === "ArrowRight")
          setLightboxIndex((i) => (i! + 1) % item.files.length);
        if (e.key === "ArrowLeft")
          setLightboxIndex((i) =>
            (i! - 1 + item.files.length) % item.files.length
          );
      } else if (e.key === "Escape") {
        router.push("/portfolio");
      }
    },
    [lightboxIndex, item, router]
  );

  useEffect(() => {
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onKey]);

  const close = useCallback(() => router.push("/portfolio"), [router]);
  const openLightbox = useCallback((idx: number) => setLightboxIndex(idx), []);
  const closeLightbox = useCallback(() => setLightboxIndex(null), []);

  if (loading) return <SpinnerOverlay />;
  if (error)
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white/80 z-50">
        <p className="text-red-500 text-lg">{error}</p>
      </div>
    );
  if (!item)
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white/80 z-50">
        <p className="text-gray-700 text-lg">Item not found.</p>
      </div>
    );

  const { title, description, mainCategory, subCategory, files, createdAt } =
    item;

  return (
    <>
      {/* Main Modal Overlay */}
      <div
        onClick={close}
        className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm overflow-y-auto pt-10"
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className={`relative bg-white rounded-lg shadow-xl w-full sm:w-[80vw] max-w-7xl mx-auto my-8 overflow-hidden transition-opacity duration-300 ${
            mounted ? "opacity-100" : "opacity-0"
          }`}
        >
          {/* Close Button */}
          <button
            onClick={close}
            aria-label="Close"
            className="fixed sm:absolute top-4 right-4 p-2 rounded-full z-50 bg-white/80 hover:bg-white shadow focus:outline-none"
          >
            <svg
              className="w-6 h-6 text-gray-600 hover:text-gray-900"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          {/* Scrollable Content */}
          <div className="p-4 sm:p-6 space-y-6 overflow-y-auto max-h-[90vh] scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 bg-white/10 backdrop-blur-lg">
            {/* Header */}
            <div className="space-y-2">
              <h1 className="text-2xl sm:text-3xl font-bold">
                {titleize(mainCategory)} Portfolio
                {subCategory && (
                  <span className="text-gray-600">
                    : {titleize(subCategory)}
                  </span>
                )}
              </h1>
              <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500">
                <span>
                  Created on {new Date(createdAt).toLocaleDateString()}
                </span>
                <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded">
                  {titleize(mainCategory)}
                </span>
                {subCategory && (
                  <span className="px-2 py-1 bg-green-100 text-green-800 rounded">
                    {titleize(subCategory)}
                  </span>
                )}
              </div>
            </div>

            {/* Description */}
            {description && (
              <p className="text-gray-700 leading-relaxed">{description}</p>
            )}

            {/* Gallery */}
            <div className="space-y-6">
              {files.map((src, idx) => (
                <div
                  key={idx}
                  onClick={() => openLightbox(idx)}
                  className="relative overflow-hidden lg:bg-gray-50 rounded-lg cursor-pointer hover:shadow-lg transition-shadow"
                  style={{
                  aspectRatio:
                    typeof window !== "undefined" && window.innerWidth < 640
                    ? "16 / 16"
                    : "16 / 9",
                  }}
                >
                  <img
                  src={src}
                  alt={`${title} image ${idx + 1}`}
                  className="w-full h-full object-contain"
                  loading="lazy"
                  />
                  <div className="absolute top-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded">
                  {idx + 1}/{files.length}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox Fullscreen Viewer */}
   {lightboxIndex !== null && (
  <div
    onClick={closeLightbox}
    className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
    role="dialog"
    aria-modal="true"
  >
    {/* Close Button */}
    <button
      ref={lightboxCloseRef}
      onClick={closeLightbox}
      aria-label="Close image viewer"
      className="fixed top-4 right-4 text-white hover:text-gray-300 text-3xl p-2 rounded-full z-50 bg-black/50 backdrop-blur"
    >
      ✕
    </button>

    {/* Prev Button */}
    {files.length > 1 && (
      <button
        onClick={(e) => {
          e.stopPropagation();
          setLightboxIndex(
            (lightboxIndex + files.length - 1) % files.length
          );
        }}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-50 bg-black/40 text-white hover:bg-black/60 text-2xl sm:text-2xl p-3 sm:p-4 rounded-full focus:outline-none"
        aria-label="Previous image"
      >
        ‹
      </button>
    )}

    {/* Next Button */}
    {files.length > 1 && (
      <button
        onClick={(e) => {
          e.stopPropagation();
          setLightboxIndex((lightboxIndex + 1) % files.length);
        }}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-50 bg-black/40 text-white hover:bg-black/60 text-2xl sm:text-2xl p-3 sm:p-4 rounded-full focus:outline-none"
        aria-label="Next image"
      >
        ›
      </button>
    )}

    {/* Main Image */}
    <div className="max-h-full max-w-full">
      <img
        src={files[lightboxIndex!]}
        alt={`${title} full view ${lightboxIndex! + 1}`}
        className="max-h-[90vh] max-w-[90vw] w-full object-contain"
        loading="eager"
      />
      <div className="mt-2 text-center text-white text-sm">
        {lightboxIndex! + 1} / {files.length} — {title}
      </div>
    </div>
  </div>
)}

    </>
  );
}
