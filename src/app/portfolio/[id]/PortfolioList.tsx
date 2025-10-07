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
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-[#18181B]/90 backdrop-blur-2xl'>
      <div className='absolute'>
        <div className='w-28 h-28 rounded-full bg-cyan-400/20 blur-2xl opacity-60 animate-pulse' />
      </div>
      <div className='relative'>
        <div className='w-16 h-16 rounded-full border-4 border-t-transparent border-b-transparent border-l-cyan-400 border-r-pink-400 animate-spin bg-gradient-to-tr from-cyan-400/10 via-white/10 to-pink-400/10 shadow-xl' />
        <div className='absolute left-1/2 top-1/2 w-5 h-5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-300/70 blur-md animate-pulse' />
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
      prev.src =
        item.files[(lightboxIndex - 1 + item.files.length) % item.files.length];
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
          setLightboxIndex(
            (i) => (i! - 1 + item.files.length) % item.files.length
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
      <div className='fixed inset-0 flex items-center justify-center bg-[#18181B]/90 z-50 backdrop-blur-lg'>
        <p className='text-red-400 text-lg bg-black/60 rounded-lg px-6 py-4 shadow-xl'>
          {error}
        </p>
      </div>
    );
  if (!item)
    return (
      <div className='fixed inset-0 flex items-center justify-center bg-[#18181B]/90 z-50 backdrop-blur-lg'>
        <p className='text-white text-lg'>Item not found.</p>
      </div>
    );

  const { title, description, mainCategory, subCategory, files } = item;

  return (
    <>
      {/* FULLSCREEN LAYER — keep content below nav and fully viewable */}
      <div
        onClick={(e) => e.stopPropagation()}
        className={`
    relative lg:w-[66vw] max-w-[1400px] w-[92vw] mx-auto my-4
    bg-black/80 rounded-[30px] border border-white/20 shadow-2xl
    transition-opacity duration-300
    ${mounted ? "opacity-100" : "opacity-0"}
    p-3 sm:p-5 md:p-8
  `}
        style={{ fontFamily: "Montserrat, Arial, sans-serif" }}
      >
        {/* CONTENT WRAPPER */}
        <div
          onClick={(e) => e.stopPropagation()}
          className={`
            relative lg:w-[66vw] max-w-[1400px] mx-auto
            bg-black/80 rounded-[30px] border border-white/20 shadow-2xl
            transition-opacity duration-300
            ${mounted ? "opacity-100" : "opacity-0"}
            p-3 sm:p-5 md:p-8
          `}
          style={{ fontFamily: "Montserrat, Arial, sans-serif" }}
        >
          {/* Close */}
          <button
            onClick={close}
            aria-label='Close'
            className='absolute top-3 right-3 sm:top-4 sm:right-4 p-2 rounded-full z-50 shadow focus:outline-none'
          >
            ✕
          </button>

          {/* ====== GALLERY (4:3 ON MOBILE TOO) ====== */}
          <div className='flex flex-col gap-6 sm:gap-8'>
            {files.map((src, idx) => (
              <div
                key={idx}
                onClick={() => openLightbox(idx)}
                className='
                  relative w-full overflow-hidden rounded-2xl border-2 border-cyan-200/20
                  bg-gradient-to-br from-black/60 to-cyan-700/5
                  shadow-md cursor-zoom-in group hover:shadow-cyan-400/30
                  aspect-[4/3]              /* 4:3 at all breakpoints */
                  max-h-[82vh]             /* never exceed viewport */
                '
              >
                <img
                  src={src}
                  alt={`${title} image ${idx + 1}`}
                  className='absolute inset-0 w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-300'
                  loading={idx === 0 ? "eager" : "lazy"}
                />
                {/* overlays */}
                <div className='absolute top-2 right-2 bg-black/60 text-cyan-100 text-xs px-2 py-1 rounded-lg shadow-lg select-none z-10'>
                  {idx + 1}/{files.length}
                </div>
                <div className='absolute bottom-2 left-2 text-white/80 text-xs bg-black/50 px-2 py-0.5 rounded-lg hidden sm:block z-10'>
                  Click to enlarge
                </div>
              </div>
            ))}
          </div>

          {/* ====== META BELOW ZOOM STAGE ====== */}
          <div className='mt-6 sm:mt-8'>
            <h1 className='text-lg sm:text-xl md:text-2xl font-extrabold text-white drop-shadow-lg tracking-tight'>
              {title}
            </h1>

            <div className='mt-3 flex flex-wrap items-center gap-2 text-xs sm:text-sm'>
              <span className='px-2 py-1 bg-cyan-800/20 text-cyan-200 rounded shadow'>
                {titleize(mainCategory)}
              </span>
              {subCategory && (
                <span className='px-2 py-1 bg-pink-800/20 text-pink-200 rounded shadow'>
                  {titleize(subCategory)}
                </span>
              )}
            </div>

            {!!description && (
              <p className='mt-4 text-white/80 text-xs sm:text-lg leading-relaxed font-light'>
                {description}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* ===== LIGHTBOX FULLSCREEN VIEWER ===== */}
      {lightboxIndex !== null && (
        <div
          onClick={closeLightbox}
          className='fixed inset-0 z-50 bg-black/90 backdrop-blur-lg flex items-center justify-center p-3 sm:p-4'
          role='dialog'
          aria-modal='true'
        >
          <button
            ref={lightboxCloseRef}
            onClick={closeLightbox}
            aria-label='Close image viewer'
            className='fixed top-4 right-4 sm:top-6 sm:right-7 text-white hover:text-cyan-200 text-3xl sm:text-4xl p-2 rounded-full z-50 bg-black/60 backdrop-blur-lg'
          >
            ✕
          </button>

          {files.length > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setLightboxIndex(
                  (lightboxIndex + files.length - 1) % files.length
                );
              }}
              className='absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-50 bg-black/50 text-white hover:bg-cyan-400/70 text-2xl sm:text-3xl p-3 sm:p-4 rounded-full focus:outline-none'
              aria-label='Previous image'
            >
              ‹
            </button>
          )}

          {files.length > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setLightboxIndex((lightboxIndex + 1) % files.length);
              }}
              className='absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-50 bg-black/50 text-white hover:bg-cyan-400/70 text-2xl sm:text-3xl p-3 sm:p-4 rounded-full focus:outline-none'
              aria-label='Next image'
            >
              ›
            </button>
          )}

          <div className='max-h-full max-w-full flex flex-col items-center'>
            <img
              src={files[lightboxIndex!]}
              alt={`${title} full view ${lightboxIndex! + 1}`}
              className='max-h-[82vh] max-w-[96vw] w-full object-contain rounded-lg border-2 border-cyan-200/30 shadow-2xl bg-black/80'
              loading='eager'
            />
            <div className='mt-2 text-center text-cyan-100 text-sm sm:text-base font-semibold drop-shadow'>
              {lightboxIndex! + 1} / {files.length} — {title}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
