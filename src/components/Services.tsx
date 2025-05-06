'use client'

import React, { useEffect, useState } from 'react'
import {
  FaPaintBrush,
  FaIdCard,
  FaTshirt,
  FaFacebookF,
  FaFileAlt,
  FaImage,
} from 'react-icons/fa'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { JSX } from 'react/jsx-runtime'

interface Category {
  _id: string
  mainCategory: string
  subCategories: string[]
}

const API_URL = process.env.NEXT_PUBLIC_API_URL!

const iconMap: { [key: string]: JSX.Element } = {
  'Logo Design': <FaPaintBrush />,
  'Business Cards': <FaIdCard />,
  'T-shirt Graphics': <FaTshirt />,
  'Social Media Design': <FaFacebookF />,
  'Flyers & Brochures': <FaFileAlt />,
  'Banners & Signs': <FaImage />,
}

const defaultDescriptions: { [key: string]: string } = {
  'Logo Design': 'Custom brand logos tailored to your vision.',
  'Business Cards': 'Professional and creative card layouts.',
  'T-shirt Graphics': 'Unique designs for apparel and merchandise.',
  'Social Media Design': 'Eye-catching content for all platforms.',
  'Flyers & Brochures': 'Promotional material that converts.',
  'Banners & Signs': 'Large-scale visuals that grab attention.',
}

const Services: React.FC = () => {
  const [services, setServices] = useState<string[]>([])

  useEffect(() => {
    fetch(`${API_URL}/admin/categories`)
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch categories')
        return res.json() as Promise<Category[]>
      })
      .then(data => {
        const graphicDesign = data.find(cat => cat.mainCategory === 'graphic-design')
        if (graphicDesign) {
          setServices(graphicDesign.subCategories)
        }
      })
      .catch(console.error)
  }, [])

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-extrabold text-gray-800">Services Offered</h2>
        <p className="text-gray-500 mt-2 text-lg">
          Creative solutions tailored to elevate your brand
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto px-6">
        {services.map((title, index) => {
          const queryString = new URLSearchParams({ subCategory: title }).toString()
          return (
            <Link href={`/portfolio?${queryString}`} key={title} className="group">
              <motion.div
                className="relative group rounded-xl bg-white/40 backdrop-blur-md border border-white/30 p-8 text-center shadow-xl transition-all duration-300 hover:shadow-2xl hover:scale-[1.02]"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="flex justify-center mb-6">
                  <div className="relative w-16 h-16 rounded-full bg-indigo-100 group-hover:scale-110 transition-transform flex items-center justify-center shadow-inner">
                    <div className="text-indigo-600 text-2xl">
                      {iconMap[title] || <FaPaintBrush />}
                    </div>
                    <div className="absolute -inset-1 rounded-full bg-indigo-400 opacity-10 blur-xl"></div>
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
                <p className="text-gray-600 mt-2 text-sm leading-relaxed">
                  {defaultDescriptions[title] || 'Creative and professional design service.'}
                </p>
              </motion.div>
            </Link>
          )
        })}
      </div>
    </section>
  )
}

export default Services
