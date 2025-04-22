'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'

export interface PortfolioItem {
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

// helper to turn "graphic-design" → "Graphic Design"
function titleize(str: string) {
  return str
    .replace(/[-_]/g, ' ')
    .replace(/\b\w/g, c => c.toUpperCase())
}

function Spinner() {
  return (
    <div className="flex justify-center items-center py-16">
      <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
    </div>
  )
}

export default function PortfolioList() {
  const [items, setItems] = useState<PortfolioItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const [selectedSubCategory, setSelectedSubCategory] = useState<string>('All')
  const [searchTerm, setSearchTerm] = useState<string>('')

  useEffect(() => {
    setLoading(true)
    fetch(`${API_URL}/portfolio`)
      .then(res => {
        if (!res.ok) throw new Error(res.statusText)
        return res.json() as Promise<PortfolioItem[]>
      })
      .then(data => {
        setItems(data)
        setError(null)
      })
      .catch(err => {
        console.error(err)
        setError('Failed to load portfolio.')
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  // derive lists of unique main- and sub-categories
  const mainCategories = useMemo(
    () => Array.from(new Set(items.map(i => i.mainCategory))),
    [items]
  )
  const subCategories = useMemo(
    () => Array.from(new Set(items.map(i => i.subCategory))),
    [items]
  )

  // prettified main category (or 'Portfolio' fallback)
  const displayMain = useMemo(() => {
    return mainCategories.length === 1
      ? titleize(mainCategories[0])
      : 'Portfolio'
  }, [mainCategories])

  // build dynamic page title
  const pageTitle = useMemo(() => {
    if (selectedSubCategory === 'All') {
      return displayMain === 'Portfolio'
        ? 'Portfolio'
        : `${displayMain} Portfolio`
    }

    const subTitle = titleize(selectedSubCategory)
    return displayMain === 'Portfolio'
      ? `Portfolio: ${subTitle}`
      : `${displayMain} Portfolio: ${subTitle}`
  }, [displayMain, selectedSubCategory])

  // apply sub‑category filter, search, then sort newest→oldest
  const filtered = useMemo(() => {
    return items
      .filter(i =>
        selectedSubCategory === 'All'
          ? true
          : i.subCategory === selectedSubCategory
      )
      .filter(i =>
        i.title.toLowerCase().includes(searchTerm.trim().toLowerCase())
      )
      .sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      )
  }, [items, selectedSubCategory, searchTerm])

  if (loading) return <Spinner />

  if (error)
    return (
      <div className="container mx-auto p-8">
        <p className="text-red-500">{error}</p>
      </div>
    )

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">{pageTitle}</h1>

      {/* Filters */}
      <div className="mb-6 flex flex-wrap gap-4 items-center">
        <div>
          <label htmlFor="subCategory" className="font-medium mr-2">
            Sub‑category:
          </label>
          <select
            id="subCategory"
            className="border border-gray-300 rounded px-3 py-2"
            value={selectedSubCategory}
            onChange={e => setSelectedSubCategory(e.target.value)}
          >
            <option value="All">All</option>
            {subCategories.map(sub => (
              <option key={sub} value={sub}>
                {titleize(sub)}
              </option>
            ))}
          </select>
        </div>

        <div className="flex-1 min-w-[200px]">
          <label htmlFor="search" className="sr-only">
            Search by title
          </label>
          <input
            id="search"
            type="text"
            placeholder="Search by title…"
            className="w-full border border-gray-300 rounded px-3 py-2"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Empty state */}
      {filtered.length === 0 ? (
        <p className="text-center text-gray-500">
          {items.length === 0
            ? 'No portfolio items available.'
            : 'No items match your filters.'}
        </p>
      ) : (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {filtered.map(item => (
            <Link
              key={item._id}
              href={`/portfolio/${item._id}`}
              className="group block bg-white rounded-lg overflow-hidden shadow hover:shadow-lg transition-shadow"
            >
              {/* square thumbnail */}
              <div
                className="w-full overflow-hidden bg-gray-50"
                style={{ aspectRatio: '1 / 1' }}
              >
                <img
                  src={item.files[0]}
                  alt={item.title}
                  className="w-full h-full object-contain group-hover:scale-105 transform transition-transform duration-200"
                />
              </div>
              <div className="p-4">
                <h2 className="text-xl font-semibold">{item.title}</h2>
                <p className="text-gray-600 mt-1 line-clamp-2">
                  {item.description || 'No description'}
                </p>
                <p className="text-sm text-gray-400 mt-1">
                  {new Date(item.createdAt).toLocaleDateString()}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
