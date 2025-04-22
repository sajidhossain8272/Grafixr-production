'use client'

// pages/portfolio/[id].tsx
import React, { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'


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

const API_URL = process.env.NEXT_PUBLIC_API_URL!

const PortfolioItemPage = () => {
  const router = useRouter()
  const { id } = useParams()

  const [item, setItem] = useState<PortfolioItem | null>(null)
  const [current, setCurrent] = useState<number>(0)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!id || Array.isArray(id)) return
    fetch(`${API_URL}/portfolio/${id}`)
      .then(async res => {
        if (!res.ok) throw new Error(`Status ${res.status}`)
        return res.json() as Promise<PortfolioItem>
      })
      .then(data => {
        setItem(data)
        setCurrent(0)
      })
      .catch(err => {
        console.error(err)
        setError('Could not load this item.')
      })
  }, [id])

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-red-500">{error}</p>
      </div>
    )
  }

  if (!item) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg">Loading…</p>
      </div>
    )
  }

  const { files, title, description, mainCategory, subCategory } = item
  const lastIndex = files.length - 1

  const prev = (): void => setCurrent(c => (c === 0 ? lastIndex : c - 1))
  const next = (): void => setCurrent(c => (c === lastIndex ? 0 : c + 1))
  const close = (): void => router.back()

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-80 flex items-center justify-center p-4">
      <div className="relative max-w-4xl w-full bg-white rounded-lg overflow-hidden">
        <button
          onClick={close}
          className="absolute top-2 right-2 text-gray-700 hover:text-gray-900 focus:outline-none"
          aria-label="Close"
        >
          ✕
        </button>

        <div className="relative h-96 bg-black">
          <img
            src={files[current]}
            alt={`${title} (${current + 1}/${files.length})`}
            className="object-contain w-full h-full"
          />
          {files.length > 1 && (
            <>
              <button
                onClick={prev}
                className="absolute left-2 top-1/2 -translate-y-1/2 text-3xl text-white bg-gray-800 bg-opacity-50 rounded-full p-2 focus:outline-none"
                aria-label="Previous"
              >
                ‹
              </button>
              <button
                onClick={next}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-3xl text-white bg-gray-800 bg-opacity-50 rounded-full p-2 focus:outline-none"
                aria-label="Next"
              >
                ›
              </button>
            </>
          )}
        </div>

        <div className="p-6">
          <h2 className="text-2xl font-bold">{title}</h2>
          <p className="mt-4 text-gray-700">{description}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded">
              {mainCategory}
            </span>
            <span className="px-3 py-1 bg-green-100 text-green-800 rounded">
              {subCategory}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PortfolioItemPage
