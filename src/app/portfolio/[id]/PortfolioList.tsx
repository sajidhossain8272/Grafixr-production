'use client'

import React, {
  useEffect,
  useState,
  useCallback,
  useRef,
} from 'react'
import { useRouter } from 'next/navigation'

interface PortfolioItem {
  _id: string
  title: string
  description: string
  mainCategory: string
  subCategory: string
  mediaType: 'image' | 'video'
  files: string[]
  createdAt: string
}

interface Props {
  id: string
}

const API_URL = process.env.NEXT_PUBLIC_API_URL!

function titleize(str: string) {
  return str
    .replace(/[-_]/g, ' ')
    .replace(/\b\w/g, c => c.toUpperCase())
}

function SpinnerOverlay() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/30 backdrop-blur-sm">
      <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
    </div>
  )
}

export default function PortfolioItemClient({ id }: Props) {
  const router = useRouter()

  const [item, setItem] = useState<PortfolioItem | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [mounted, setMounted] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  const lightboxCloseRef = useRef<HTMLButtonElement>(null)

  // fetch portfolio item
  useEffect(() => {
    setLoading(true)
    fetch(`${API_URL}/portfolio/${id}`)
      .then(res => {
        if (!res.ok) throw new Error(`Status ${res.status}`)
        return res.json() as Promise<PortfolioItem>
      })
      .then(data => setItem(data))
      .catch(() => setError('Could not load this portfolio item.'))
      .finally(() => setLoading(false))
  }, [id])

  // fade‑in panel
  useEffect(() => {
    setMounted(true)
  }, [])

  // preload next/prev & focus close
  useEffect(() => {
    if (lightboxIndex !== null && item) {
      const next = new Image()
      const prev = new Image()
      next.src = item.files[(lightboxIndex + 1) % item.files.length]
      prev.src =
        item.files[
          (lightboxIndex - 1 + item.files.length) % item.files.length
        ]
      lightboxCloseRef.current?.focus()
    }
  }, [lightboxIndex, item])

  // global key handler
  const onKey = useCallback(
    (e: KeyboardEvent) => {
      if (lightboxIndex !== null && item) {
        if (e.key === 'Escape') setLightboxIndex(null)
        if (e.key === 'ArrowRight')
          setLightboxIndex(i => (i! + 1) % item.files.length)
        if (e.key === 'ArrowLeft')
          setLightboxIndex(i =>
            (i! - 1 + item.files.length) % item.files.length
          )
      } else if (e.key === 'Escape') {
        router.push('/portfolio')
      }
    },
    [lightboxIndex, item, router]
  )

  useEffect(() => {
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [onKey])

  const close = useCallback(() => router.push('/portfolio'), [router])
  const openLightbox = useCallback((idx: number) => setLightboxIndex(idx), [])
  const closeLightbox = useCallback(() => setLightboxIndex(null), [])

  // early return states
  if (loading) return <SpinnerOverlay />
  if (error)
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white/80 z-50">
        <p className="text-red-500 text-lg">{error}</p>
      </div>
    )
  if (!item)
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white/80 z-50">
        <p className="text-gray-700 text-lg">Item not found.</p>
      </div>
    )

  const { title, description, mainCategory, subCategory, files, createdAt } =
    item

  return (
    <>
      {/* Backdrop + main panel */}
      <div
        onClick={close}
        className="fixed inset-0 z-40 bg-white/30 backdrop-blur-sm overflow-y-auto"
      >
        <div
          onClick={e => e.stopPropagation()}
          className={`
            relative bg-white rounded-lg shadow-xl
            w-[80vw] max-w-7xl mx-auto my-8
            overflow-hidden transition-opacity duration-300
            ${mounted ? 'opacity-100' : 'opacity-0'}
          `}
        >
          {/* Close button */}
          <button
            onClick={close}
            aria-label="Close"
            className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 focus:outline-none z-10"
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

          {/* Scrollable content */}
          <div className="p-6 space-y-6 overflow-y-auto max-h-[90vh] scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
            {/* Header */}
            <div className="space-y-2">
              <h1 className="text-3xl font-bold">
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

            {/* Gallery Thumbnails */}
            <div className="space-y-6">
              {files.map((src, idx) => (
                <div
                  key={idx}
                  onClick={() => openLightbox(idx)}
                  className="relative overflow-hidden bg-gray-50 rounded-lg cursor-pointer hover:shadow-lg transition-shadow"
                  style={{ aspectRatio: '16 / 9' }}
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

      {/* Lightbox overlay */}
      {lightboxIndex !== null && (
        <div
          onClick={closeLightbox}
          className="fixed inset-0 z-50 bg-black bg-opacity-80 flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
        >
          <button
            ref={lightboxCloseRef}
            onClick={closeLightbox}
            aria-label="Close image viewer"
            className="absolute top-6 right-6 text-white hover:text-gray-200 text-2xl p-2 rounded-full focus:outline-none"
          >
            ✕
          </button>

          {/* Prev / Next */}
          {files.length > 1 && (
            <>
              <button
                onClick={e => {
                  e.stopPropagation()
                  setLightboxIndex(
                    (lightboxIndex + files.length - 1) % files.length
                  )
                }}
                className="absolute left-6 text-white hover:text-gray-200 text-4xl p-2 rounded-full focus:outline-none"
                aria-label="Previous image"
              >
                ‹
              </button>
              <button
                onClick={e => {
                  e.stopPropagation()
                  setLightboxIndex((lightboxIndex + 1) % files.length)
                }}
                className="absolute right-6 text-white hover:text-gray-200 text-4xl p-2 rounded-full focus:outline-none"
                aria-label="Next image"
              >
                ›
              </button>
            </>
          )}

          <div className="max-h-full max-w-full">
            <img
              src={files[lightboxIndex!]}
              alt={`${title} full view ${lightboxIndex! + 1}`}
              className="max-h-[90vh] max-w-[90vw] object-contain"
              loading="eager"
            />
            <div className="mt-2 text-center text-white text-sm">
              {lightboxIndex! + 1} / {files.length} — {title}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
