'use client'

import { useEffect, useState } from 'react'
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

export default function PortfolioList() {
  const [items, setItems] = useState<PortfolioItem[]>([])
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetch(`${API_URL}/portfolio`)
      .then(res => {
        if (!res.ok) throw new Error(res.statusText)
        return res.json() as Promise<PortfolioItem[]>
      })
      .then(setItems)
      .catch(err => {
        console.error(err)
        setError('Failed to load portfolio.')
      })
  }, [])

  if (error)
    return (
      <div className="container mx-auto p-8">
        <p className="text-red-500">{error}</p>
      </div>
    )

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Portfolio</h1>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {items.map(item => (
          <Link
            key={item._id}
            href={`/portfolio/${item._id}`}
            className="group block bg-white rounded-lg overflow-hidden shadow hover:shadow-lg transition-shadow"
          >
            <div className="h-48 overflow-hidden">
              <img
                src={item.files[0]}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transform transition-transform duration-200"
              />
            </div>
            <div className="p-4">
              <h2 className="text-xl font-semibold">{item.title}</h2>
              <p className="text-gray-600 mt-1 line-clamp-2">
                {item.description || 'No description'}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
