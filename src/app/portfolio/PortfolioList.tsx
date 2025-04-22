'use client'

import { useEffect, useMemo, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
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
  const searchParams = useSearchParams()
  const router = useRouter()

  const [items, setItems] = useState<PortfolioItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // read subCategory from URL (or default to All)
  const urlSub = searchParams.get('subCategory') || 'All'
  const [selectedSubCategory, setSelectedSubCategory] = useState(urlSub)
  const [searchTerm, setSearchTerm] = useState('')

  // sync state when URL changes
  useEffect(() => {
    const current = searchParams.get('subCategory') || 'All'
    setSelectedSubCategory(current)
  }, [searchParams])

  // fetch data
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
      .catch(() => {
        setError('Failed to load portfolio.')
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  const mainCategories = useMemo(
    () => Array.from(new Set(items.map(i => i.mainCategory))),
    [items]
  )
  const subCategories = useMemo(
    () => Array.from(new Set(items.map(i => i.subCategory))),
    [items]
  )

  const displayMain = useMemo(() => {
    return mainCategories.length === 1
      ? titleize(mainCategories[0])
      : 'Portfolio'
  }, [mainCategories])

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

  // 1) Full-screen spinner overlay while loading:
  if (loading) {
    return (
      <div className="fixed inset-0 bg-white z-50 flex items-center justify-center">
        <Spinner />
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mx-auto p-8">
        <p className="text-red-500">{error}</p>
      </div>
    )
  }

  // 2) Wrap everything in a min-h-screen flex column so footer is pushed down:
  return (
    <div className="flex flex-col min-h-screen">
      {/* Content area */}
      <main className="flex-1 container mx-auto px-4 py-8">
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
              onChange={e => {
                const v = e.target.value
                setSelectedSubCategory(v)
                const url = new URL(window.location.href)
                if (v === 'All') url.searchParams.delete('subCategory')
                else url.searchParams.set('subCategory', v)
                router.push(url.pathname + url.search)
              }}
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

        {/* Grid */}
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
      </main>

      {/* footer is rendered by parent layout; this component just ensures main fills */}
    </div>
  )
}
