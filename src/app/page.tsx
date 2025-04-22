// pages/index.tsx
'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'

import ColorfulScene from '@/components/ColorfulHoverEffect'
import ProjectsCompleted from '@/components/ProjectsCompleted'
import ClientReviews from '@/components/ClientReviews'


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

function Spinner() {
  return (
    <div className="flex justify-center items-center py-16">
      <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
    </div>
  )
}

export default function Home() {
  const [latest, setLatest] = useState<PortfolioItem[]>([])
  const [loadingLatest, setLoadingLatest] = useState(true)
  const [errorLatest, setErrorLatest] = useState<string | null>(null)

  // 1) Fetch featured (latest 3) projects
  useEffect(() => {
    setLoadingLatest(true)
    fetch(`${API_URL}/portfolio`)
      .then(res => {
        if (!res.ok) throw new Error(res.statusText)
        return res.json() as Promise<PortfolioItem[]>
      })
      .then(data => {
        const sorted = data.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        )
        setLatest(sorted.slice(0, 3))
        setErrorLatest(null)
      })
      .catch(() => setErrorLatest('Failed to load latest projects.'))
      .finally(() => setLoadingLatest(false))
  }, [])

  // 2) Sample data for GlobalServices
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const countryData = [
    { iso: 'US', count: 50 },
    { iso: 'GB', count: 30 },
    { iso: 'AE', count: 10 },
    { iso: 'BD', count: 15 },
    { iso: 'IN', count: 70 },
    { iso: 'PK', count: 25 },
    { iso: 'SA', count: 20 },
    { iso: 'AU', count: 18 },
    { iso: 'CA', count: 22 },
  ]

  // 3) Sample data for ClientReviews
  const reviews = [
    {
      id: 1,
      name: 'Alice Johnson',
      photo: 'https://randomuser.me/api/portraits/women/44.jpg',
      text: 'GrafiXr completely transformed our brand identity—highly recommended!',
      rating: 5,
    },
    {
      id: 2,
      name: 'Michael Smith',
      photo: 'https://randomuser.me/api/portraits/men/32.jpg',
      text: 'Their team was professional and delivered ahead of schedule.',
      rating: 4,
    },
    {
      id: 3,
      name: 'Sara Lee',
      photo: 'https://randomuser.me/api/portraits/women/68.jpg',
      text: 'Ongoing support and creativity have been outstanding.',
      rating: 5,
    },
    {
      id: 4,
      name: 'Alice Johnson',
      photo: 'https://randomuser.me/api/portraits/women/44.jpg',
      text: 'GrafiXr completely transformed our brand identity—highly recommended!',
      rating: 5,
    },
    {
      id: 5,
      name: 'Michael Smith',
      photo: 'https://randomuser.me/api/portraits/men/32.jpg',
      text: 'Their team was professional and delivered ahead of schedule.',
      rating: 4,
    },
    {
      id: 6,
      name: 'Sara Lee',
      photo: 'https://randomuser.me/api/portraits/women/68.jpg',
      text: 'Ongoing support and creativity have been outstanding.',
      rating: 5,
    },
    
  ]

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Hero */}
      <section className="lg:h-[450px] h-[400px] flex flex-col justify-center items-center text-center px-4 relative overflow-hidden">
        <ColorfulScene />
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-6xl font-bold mb-4 relative z-10"
        >
          We Create <span className="text-gray-950">Digital Experiences</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="text-xl mb-8 text-gray-900 relative z-10"
        >
          Transforming ideas into stunning realities.
        </motion.p>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="relative z-10"
        >
          <Link
            href="/portfolio"
            className="bg-gray-900 text-white font-bold px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors"
          >
            View Our Work
          </Link>
        </motion.div>
      </section>

      {/* Featured Projects */}
      <section className="py-16 px-4">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl font-bold text-center mb-4"
        >
          Featured Projects
        </motion.h2>
        <p className="text-center text-gray-700 mb-8 max-w-2xl mx-auto">
          These are our most recent and exciting projects. Take a look at what we’ve been working on!
        </p>

        {loadingLatest ? (
          <Spinner />
        ) : errorLatest ? (
          <p className="text-center text-red-500">{errorLatest}</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {latest.map((item, idx) => (
              <Link
                key={item._id}
                href={`/portfolio?subCategory=${encodeURIComponent(item.subCategory)}`}
                className="block bg-gray-100 rounded-lg overflow-hidden shadow hover:shadow-lg transition-shadow"
              >
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: idx * 0.2 }}
                  viewport={{ once: true }}
                  className="relative w-full overflow-hidden"
                  style={{ aspectRatio: '1 / 1' }}
                >
                  <Image
                    src={item.files[0]}
                    alt={item.title}
                    fill
                    className="object-contain"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    priority={idx === 0}
                  />
                </motion.div>
                <div className="p-4">
                  <h3 className="text-xl font-bold">{item.title}</h3>
                  <p className="text-gray-600 line-clamp-2">
                    {item.description || 'No description'}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* Stats & CTA */}
      <section className="bg-gray-50">
        <div className="container mx-auto px-4 py-16 flex flex-col items-center space-y-6">
          <ProjectsCompleted
            clientsServed={120}
            projectsCompleted={85}
            ongoingProjects={12}
          />
          <p className="text-center text-gray-700 max-w-2xl">
            We take pride in delivering exceptional results for our clients.
            With a proven track record of success, we are committed to turning
            your vision into reality.
          </p>
          <Link
            href="/about"
            className="bg-blue-600 text-white font-bold px-6 py-3 rounded-lg hover:bg-blue-500 transition-colors"
          >
            Learn More About Us
          </Link>
        </div>
      </section>

      {/* Client Reviews */}
      <ClientReviews reviews={reviews} />
    </div>
  )
}
