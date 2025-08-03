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
    <section className="py-20 bg-black dark:bg-white transition-colors duration-500">
      <div className="max-w-4xl mx-auto text-center mb-12 px-4">
        <h2 className="text-5xl md:text-6xl font-extrabold mb-3 tracking-tight text-white dark:text-black"
          style={{ fontFamily: "Montserrat, Arial, sans-serif" }}>
          WHAT OUR CLIENTS SAY
        </h2>
        <p className="text-lg md:text-xl text-white/80 dark:text-black/70 font-medium">
          Real feedback from those we’ve helped bring their ideas to life.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4">
        <Swiper
          modules={[Autoplay, Pagination]}
          spaceBetween={32}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 1 },
            900: { slidesPerView: 2 },
            1200: { slidesPerView: 3 },
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
                transition={{ delay: idx * 0.18, duration: 0.65 }}
                className="
                  relative
                  rounded-2xl 
                  shadow-xl 
                  flex flex-col items-center text-center px-8 py-8 min-h-[260px] h-full
                  transition-all duration-500
                  hover:scale-[1.025] hover:shadow-2xl
                  before:absolute before:inset-0 before:rounded-2xl before:z-0
                "
                style={{
                  fontFamily: "var(--font-geist-sans), Montserrat, Arial, sans-serif",
                  background: "linear-gradient(120deg, #ffffff 65%, #f0f4ff 100%)",
                  boxShadow: `
                    0 4px 32px 0 rgba(0,0,0,0.12),
                    0 0 0 4px rgba(56,246,255,0.16),
                    0 0 16px 4px #e93baf44
                  `,
                  zIndex: 1,
                }}
              >
                {/* Gradient Glow Border (with before pseudo for glowing border) */}
                <div
                  className="absolute inset-0 pointer-events-none z-[2] rounded-2xl"
                  style={{
                    padding: 2,
                    background: "linear-gradient(120deg, #31ffe6, #fff, #fd43ad 90%)",
                    filter: "blur(5px)",
                    opacity: 0.7,
                  }}
                  aria-hidden="true"
                />
                <div className="relative z-10">
                  <div className="flex items-center mb-5">
                    <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-cyan-400 shadow-md mr-4 bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                      <img
                        src={r.photo}
                        alt={r.name}
                        className="w-full h-full object-cover"
                        draggable={false}
                      />
                    </div>
                    <div className="flex flex-col items-start">
                      <h3 className="text-lg font-bold text-black dark:text-white">{r.name}</h3>
                      <div className="flex mt-1">
                        {[...Array(5)].map((_, i) => (
                          <FaStar
                            key={i}
                            className={`${
                              i < r.rating
                                ? 'text-yellow-400 drop-shadow'
                                : 'text-gray-300 dark:text-gray-500'
                            } text-base`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-700 dark:text-gray-100 text-md leading-relaxed mb-2">
                    “{r.text}”
                  </p>
                </div>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
