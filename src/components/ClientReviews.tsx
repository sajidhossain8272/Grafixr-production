// components/ClientReviews.tsx
'use client'

import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import { FaStar } from 'react-icons/fa'

interface Review {
  id: number
  name: string
  photo: string
  text: string
  rating: number // 1–5
}

interface ClientReviewsProps {
  reviews: Review[]
}

export default function ClientReviews({ reviews }: ClientReviewsProps) {
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
          slidesPerView={3}
          pagination={{ clickable: true }}
          autoplay={{ delay: 1000, disableOnInteraction: false }}
          loop
        >
          {reviews.map(r => (
            <SwiperSlide key={r.id}>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center mb-4">
                  <img
                    src={r.photo}
                    alt={r.name}
                    className="w-12 h-12 rounded-full mr-4 object-cover"
                  />
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      {r.name}
                    </h3>
                    <div className="flex mt-1">
                      {[...Array(5)].map((_, i) => (
                        <FaStar
                          key={i}
                          className={
                            i < r.rating
                              ? 'text-yellow-400'
                              : 'text-gray-300'
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
