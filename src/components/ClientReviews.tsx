'use client';

import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import { FaStar } from 'react-icons/fa';
import { motion } from 'framer-motion';
import 'swiper/css';
import 'swiper/css/pagination';

interface Review {
  _id: string;
  name: string;
  photo: string;
  text: string;
  rating: number;
}

export default function ClientReviews() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    fetch(`${API_URL}/reviews`)
      .then(res => res.json())
      .then(setReviews)
      .catch(() => console.error('Failed to fetch reviews'));
  }, [API_URL]);

  return (
    <section className="py-20 bg-gradient-to-br from-black via-gray-900 to-black text-white">
      <div className="max-w-3xl mx-auto text-center mb-12 px-4">
        <h2 className="text-4xl font-bold mb-3">What Our Clients Say</h2>
        <p className="text-gray-300">
          Real feedback from those we’ve helped bring their ideas to life.
        </p>
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
          autoplay={{ delay: 5000 }}
          loop
        >
          {reviews.map((r, idx) => (
            <SwiperSlide key={r._id}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2, duration: 0.6 }}
                className="bg-white/10 backdrop-blur-lg p-6 rounded-2xl border border-white/10 shadow-xl transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl h-full flex flex-col justify-between"
              >
                <div className="flex items-center mb-4">
                  <div className="relative w-14 h-14 mr-4 rounded-full overflow-hidden border-2 border-white/20 shadow-lg">
                    <img
                      src={r.photo}
                      alt={r.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">{r.name}</h3>
                    <div className="flex mt-1">
                      {[...Array(5)].map((_, i) => (
                        <FaStar
                          key={i}
                          className={`${
                            i < r.rating
                              ? 'text-yellow-400 drop-shadow-md'
                              : 'text-gray-500'
                          } text-sm`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-gray-200 text-sm leading-relaxed">{r.text}</p>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
