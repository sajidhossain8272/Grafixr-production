import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { FaStar, FaQuoteLeft } from "react-icons/fa";
import { motion } from "framer-motion";
import "swiper/css";
import "swiper/css/pagination";

interface Review {
  _id: string;
  name: string;
  photo: string;
  text: string;
  rating: number;
}

export default function ClientReviews() {
  const [reviews, setReviews] = useState<Review[]>([]);

  // Fallback data if API fails
  const defaultReviews: Review[] = [
    {
      _id: "1",
      name: "Alex D.",
      photo: "https://i.pravatar.cc/150?img=33",
      text: "Absolutely mind-blowing results. The attention to detail and futuristic approach took our brand to the next level.",
      rating: 5,
    },
    {
      _id: "2",
      name: "Sarah L.",
      photo: "https://i.pravatar.cc/150?img=47",
      text: "A seamless experience from start to finish. The design language used is simply world-class.",
      rating: 5,
    },
    {
      _id: "3",
      name: "Michael K.",
      photo: "https://i.pravatar.cc/150?img=12",
      text: "They didn't just build a product; they crafted an experience. Highly recommended for visionary projects.",
      rating: 5,
    },
    {
      _id: "4",
      name: "Jessica T.",
      photo: "https://i.pravatar.cc/150?img=5",
      text: "Professional, timely, and incredibly creative. The new UI has increased our conversion by 200%.",
      rating: 5,
    },
  ];

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    if (API_URL) {
      fetch(`${API_URL}/reviews`)
        .then((res) => res.json())
        .then((data) => setReviews(data.length ? data : defaultReviews))
        .catch(() => setReviews(defaultReviews));
    } else {
      setReviews(defaultReviews);
    }
  }, [API_URL]);

  return (
    <section className='relative py-10 md:py-24 bg-black transition-colors duration-500'>
      {/* Content constrained like other sections */}
      <div className='relative z-10 max-w-[1460px] mx-auto px-4 sm:px-6'>
        {/* Header */}
        <div className='text-center mb-16'>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className='inline-block mb-4 px-4 py-1 rounded-full border border-cyan-500/30 bg-cyan-500/10 backdrop-blur-md'
          >
            <span className='text-cyan-400 text-xs font-bold tracking-[0.2em] uppercase'>
              Testimonials
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className='text-4xl sm:text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-white/40 tracking-tighter mb-5'
            style={{ fontFamily: "Montserrat, sans-serif" }}
          >
            WHAT OUR CLIENTS SAY
          </motion.h2>

          <p className='text-base sm:text-lg text-gray-300 max-w-2xl mx-auto'>
            Real feedback from those we’ve helped bring their ideas to life.
          </p>
        </div>

        {/* Swiper Container */}
        <div className='reviews-swiper-container relative'>
          <Swiper
            modules={[Autoplay, Pagination]}
            spaceBetween={24}
            slidesPerView={1}
            breakpoints={{
              640: { slidesPerView: 1, spaceBetween: 24 },
              900: { slidesPerView: 2, spaceBetween: 32 },
              1200: { slidesPerView: 3, spaceBetween: 40 },
            }}
            pagination={{
              clickable: true,
              dynamicBullets: true,
            }}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            loop={true}
            // 👇 prevent horizontal overflow on mobile
            className='pb-12 overflow-hidden md:overflow-visible'
          >
            {reviews.map((r, idx) => (
              <SwiperSlide key={r._id || idx} className='h-auto'>
                <div className='h-full pt-4 px-1 sm:px-2 pb-4'>
                  <ReviewCard review={r} index={idx} />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}

// Sub-component: glass review card
const ReviewCard = ({ review, index }: { review: Review; index: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className='group relative w-full h-full min-h-[320px] sm:min-h-[360px] flex flex-col'
    >
      {/* Gradient glow border */}
      <div
        className='absolute -inset-[1px] rounded-[28px] sm:rounded-[32px] bg-gradient-to-b 
        from-cyan-500/40 via-purple-500/20 to-transparent opacity-50 
        group-hover:opacity-100 group-hover:from-cyan-400 group-hover:via-purple-500 
        group-hover:to-cyan-600 transition-all duration-500 blur-[1px] group-hover:blur-[2px]'
      />

      {/* Card body */}
      <div className='relative h-full rounded-[26px] sm:rounded-[30px] bg-[#050505]/90 backdrop-blur-xl overflow-hidden border border-white/5 p-6 sm:p-8 md:p-10 flex flex-col'>
        {/* soft noise overlay */}
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

        {/* top glow */}
        <div className='absolute -top-16 -right-16 w-40 h-40 sm:w-60 sm:h-60 bg-cyan-500/20 rounded-full blur-[70px] sm:blur-[80px] transition-all duration-500 group-hover:bg-cyan-500/30' />

        {/* big quote icon */}
        <FaQuoteLeft className='absolute top-6 right-6 text-6xl sm:text-7xl md:text-8xl text-white/[0.03] group-hover:text-cyan-500/10 transition-colors duration-500 transform -scale-x-100' />

        {/* content */}
        <div className='relative z-10 flex flex-col h-full'>
          {/* profile */}
          <div className='flex items-center gap-4 mb-6 sm:mb-8'>
            <div className='relative'>
              <div className='absolute -inset-1 rounded-full bg-gradient-to-r from-cyan-400 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm' />
              <div className='relative w-14 h-14 sm:w-16 sm:h-16 rounded-full p-[2px] bg-gradient-to-br from-white/20 to-white/5'>
                <img
                  src={review.photo}
                  alt={review.name}
                  className='w-full h-full rounded-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500'
                />
              </div>
            </div>

            <div>
              <h4 className='text-lg sm:text-xl font-bold text-white group-hover:text-cyan-100 transition-colors'>
                {review.name}
              </h4>
              <div className='flex gap-1 mt-1'>
                {[...Array(5)].map((_, i) => (
                  <FaStar
                    key={i}
                    className={`text-xs ${
                      i < review.rating
                        ? "text-yellow-400 drop-shadow-[0_0_8px_rgba(250,204,21,0.5)]"
                        : "text-gray-700"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* text */}
          <div className='flex-grow'>
            <p className='text-sm sm:text-base md:text-lg text-gray-200 leading-relaxed italic font-light'>
              “{review.text}”
            </p>
          </div>

          {/* bottom line */}
          <div className='w-full h-[1px] bg-gradient-to-r from-transparent via-white/25 to-transparent mt-6 sm:mt-8 group-hover:via-cyan-500/60 transition-all duration-500' />
        </div>
      </div>
    </motion.div>
  );
};
