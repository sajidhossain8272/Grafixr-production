'use client'

import React, { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination } from 'swiper/modules'
import { FaStar } from 'react-icons/fa'
import 'swiper/css'
import 'swiper/css/pagination'

interface Review {
  _id: string
  name: string
  photo: string
  text: string
  rating: number
}


export default function ClientReviews() {
  const [reviews, setReviews] = useState<Review[]>([])
  const API_URL = process.env.NEXT_PUBLIC_API_URL

  useEffect(() => {
    fetch(`${API_URL}/reviews`)
      .then(res => res.json())
      .then(setReviews)
      .catch(() => console.error('Failed to fetch reviews'))
  }, [API_URL])

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-3xl mx-auto text-center mb-12 px-4">
        <h2 className="text-3xl font-bold text-gray-900">
          What Our Clients Say
        </h2>
      </div>
      <div className="max-w-7xl mx-auto px-4">
        <Swiper
          modules={[Autoplay, Pagination]}
          spaceBetween={30}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 }
          }}
          pagination={{ clickable: true }}
          autoplay={{ delay: 3000 }}
          loop
        >
          {reviews.map(r => (
            <SwiperSlide key={r._id}>
              <div className="bg-white p-6 rounded-lg shadow-md h-full">
                <div className="flex items-center mb-4">
                  <img
                    src={r.photo}
                    alt={r.name}
                    className="w-12 h-12 rounded-full mr-4 object-cover"
                  />
                  <div>
                    <h3 className="font-semibold text-gray-900">{r.name}</h3>
                    <div className="flex mt-1">
                      {[...Array(5)].map((_, i) => (
                        <FaStar
                          key={i}
                          className={
                            i < r.rating ? 'text-yellow-400' : 'text-gray-300'
                          }
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-gray-700">{r.text}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  )
}
