"use client";

import React, { useEffect, useState, useCallback, useRef } from "react";
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
  return str.replace(/[-_]/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

function SpinnerOverlay() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#18181B]/90 backdrop-blur-2xl">
      {/* Outer blurred/pulsing glow */}
      <div className="absolute">
        <div className="w-28 h-28 rounded-full bg-cyan-400/20 blur-2xl opacity-60 animate-pulse"></div>
      </div>
      {/* Modern gradient spinner ring */}
      <div className="relative">
        <div className="w-16 h-16 rounded-full border-4 border-t-transparent border-b-transparent border-l-cyan-400 border-r-pink-400 animate-spin bg-gradient-to-tr from-cyan-400/10 via-white/10 to-pink-400/10 shadow-xl"></div>
        {/* Center glowing dot */}
        <div className="absolute left-1/2 top-1/2 w-5 h-5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-300/70 blur-md animate-pulse"></div>
      </div>
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

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (lightboxIndex !== null && item) {
      const next = new Image();
      const prev = new Image();
      next.src = item.files[(lightboxIndex + 1) % item.files.length];
      prev.src = item.files[(lightboxIndex - 1 + item.files.length) % item.files.length];
      lightboxCloseRef.current?.focus();
    }
  }, [lightboxIndex, item]);

  const onKey = useCallback(
    (e: KeyboardEvent) => {
      if (lightboxIndex !== null && item) {
        if (e.key === "Escape") setLightboxIndex(null);
        if (e.key === "ArrowRight") setLightboxIndex((i) => (i! + 1) % item.files.length);
        if (e.key === "ArrowLeft") setLightboxIndex((i) => (i! - 1 + item.files.length) % item.files.length);
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
      <div className="fixed inset-0 flex items-center justify-center bg-[#18181B]/90 z-50 backdrop-blur-lg">
        <p className="text-red-400 text-lg bg-black/60 rounded-lg px-6 py-4 shadow-xl">{error}</p>
      </div>
    );
  if (!item)
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-[#18181B]/90 z-50 backdrop-blur-lg">
        <p className="text-white text-lg">Item not found.</p>
      </div>
    );

  const { title, description, mainCategory, subCategory, files, createdAt } = item;

  return (
    <>
      {/* Main Modal Overlay */}
      <div
        onClick={close}
        className="fixed inset-0 z-40 bg-[#18181B]/80 backdrop-blur-xl overflow-y-auto pt-10 flex items-center justify-center px-2"
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className={`relative bg-black/80 rounded-[30px] border-2 border-white/20 shadow-2xl w-full sm:w-[80vw] max-w-5xl mx-auto my-8 overflow-hidden transition-opacity duration-300 flex flex-col ${
            mounted ? "opacity-100" : "opacity-0"
          }`}
          style={{ fontFamily: "Montserrat, Arial, sans-serif" }}
        >
          {/* Close Button */}
          <button
            onClick={close}
            aria-label="Close"
            className="fixed sm:absolute top-4 right-5 p-2 rounded-full z-50 bg-white/80 hover:bg-cyan-100 shadow focus:outline-none"
          >
            <svg
              className="w-7 h-7 text-gray-600 hover:text-cyan-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Scrollable Content */}
          <div className="p-6 md:p-10 space-y-8 overflow-y-auto max-h-[85vh] bg-black/10 backdrop-blur-lg rounded-b-[28px] scrollbar-thin scrollbar-thumb-cyan-200/40 scrollbar-track-black/10">
            {/* Header */}
            <div className="space-y-2">
              <h1 className="text-3xl md:text-4xl font-extrabold text-white drop-shadow-lg tracking-tight">
                {title}
              </h1>
              <div className="flex flex-wrap items-center gap-3 text-sm text-cyan-200 mt-1">
                <span>
                  Created on {new Date(createdAt).toLocaleDateString()}
                </span>
                <span className="px-2 py-1 bg-cyan-800/20 text-cyan-200 rounded shadow">
                  {titleize(mainCategory)}
                </span>
                {subCategory && (
                  <span className="px-2 py-1 bg-pink-800/20 text-pink-200 rounded shadow">
                    {titleize(subCategory)}
                  </span>
                )}
              </div>
            </div>

            {/* Description */}
            {description && (
              <p className="text-white/80 text-lg leading-relaxed font-light max-w-2xl">
                {description}
              </p>
            )}

            {/* Gallery */}
            <div className="flex flex-col gap-8">
              {files.map((src, idx) => (
                <div
                  key={idx}
                  onClick={() => openLightbox(idx)}
                  className="relative overflow-hidden rounded-2xl border-2 border-cyan-200/20 bg-gradient-to-br from-black/80 to-cyan-700/10 shadow-md cursor-zoom-in group hover:shadow-cyan-400/30"
                  style={{
                    aspectRatio: "16 / 9",
                    minHeight: 170,
                  }}
                >
                  <img
                    src={src}
                    alt={`${title} image ${idx + 1}`}
                    className="w-full h-full object-contain bg-black/60 group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                  <div className="absolute top-2 right-2 bg-black/60 text-cyan-100 text-xs px-2 py-1 rounded-lg shadow-lg select-none">
                    {idx + 1}/{files.length}
                  </div>
                  <div className="absolute bottom-2 left-2 text-white/80 text-xs bg-black/50 px-2 py-0.5 rounded-lg hidden sm:block">
                    Click to enlarge
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
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-lg flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
        >
          {/* Close Button */}
          <button
            ref={lightboxCloseRef}
            onClick={closeLightbox}
            aria-label="Close image viewer"
            className="fixed top-7 right-8 text-white hover:text-cyan-200 text-4xl p-2 rounded-full z-50 bg-black/60 backdrop-blur-lg"
          >
            ✕
          </button>

          {/* Prev Button */}
          {files.length > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setLightboxIndex((lightboxIndex + files.length - 1) % files.length);
              }}
              className="absolute left-6 top-1/2 -translate-y-1/2 z-50 bg-black/50 text-white hover:bg-cyan-400/70 text-3xl p-4 rounded-full focus:outline-none"
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
              className="absolute right-6 top-1/2 -translate-y-1/2 z-50 bg-black/50 text-white hover:bg-cyan-400/70 text-3xl p-4 rounded-full focus:outline-none"
              aria-label="Next image"
            >
              ›
            </button>
          )}

          {/* Main Image */}
          <div className="max-h-full max-w-full flex flex-col items-center">
            <img
              src={files[lightboxIndex!]}
              alt={`${title} full view ${lightboxIndex! + 1}`}
              className="max-h-[85vh] max-w-[90vw] w-full object-contain rounded-lg border-2 border-cyan-200/30 shadow-2xl bg-black/80"
              loading="eager"
            />
            <div className="mt-2 text-center text-cyan-100 text-base font-semibold drop-shadow">
              {lightboxIndex! + 1} / {files.length} — {title}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
