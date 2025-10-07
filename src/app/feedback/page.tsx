"use client";
import React, { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import { motion } from "framer-motion";

interface Review {
  _id: string;
  name: string;
  photo: string;
  text: string;
  rating: number;
}

export default function FeedbackGrid() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    fetch(`${API_URL}/reviews`)
      .then((res) => res.json())
      .then(setReviews)
      .catch(() => console.error("Failed to fetch reviews"));
  }, [API_URL]);

  return (
    <section className="min-h-screen w-full flex items-center justify-center bg-[#18181B] relative py-0 px-0 overflow-hidden pt-20">
      {/* Faint BG gradient overlays for subtle glassmorphism glow */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-1/3 left-0 w-2/3 h-2/3 rounded-full bg-gradient-to-br from-[#31ffe633] via-[#fd43ad26] to-transparent blur-3xl opacity-60" />
        <div className="absolute bottom-0 right-0 w-1/3 h-1/2 rounded-full bg-gradient-to-tr from-[#fd43ad33] to-transparent blur-2xl opacity-60" />
      </div>
      {/* Outer white rounded border (main container) */}
      <div className="w-full max-w-[1450px] min-h-[92vh] bg-black/90 rounded-[32px] border-2 border-white/60 px-2 sm:px-12 py-2 sm:py-10 mx-auto relative shadow-[0_0_90px_8px_rgba(56,246,255,0.09)] flex flex-col items-center justify-start overflow-visible z-10 backdrop-blur-xl">
        {/* Feedback Title */}
        <h2
          className="text-white text-5xl md:text-6xl font-extrabold tracking-tight text-left md:text-center mb-0 mt-10 md:mt-14 drop-shadow-xl"
          style={{ fontFamily: "Montserrat, Arial, sans-serif", letterSpacing: ".5px" }}
        >
          FEEDBACK
        </h2>
        {/* Decorative Arrow */}
        <motion.img
          src="/Arrow-left.png"
          alt="Arrow"
          className="absolute left-1/2 top-[38%] -translate-x-1/2 w-[120px] md:w-[160px] z-20 select-none pointer-events-none"
          draggable={false}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 1 }}
        />
        {/* Decorative Threedot (bottom left) */}
        <motion.img
          src="/Threedot.png"
          alt="Threedot"
          className="absolute left-10 bottom-12 w-[100px] md:w-[140px] z-10 select-none pointer-events-none"
          draggable={false}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 1.1 }}
        />

        {/* Feedback Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-32 gap-x-16 w-full max-w-[1200px] pt-20 pb-12 mx-auto relative z-10">
          {reviews.map((r, idx) => {
            // Zig-zag: 1st card normal, 2nd up, 3rd down, 4th up, etc.
            const isOdd = idx % 2 === 1;
            return (
              <motion.div
                key={r._id}
                initial={{ opacity: 0, y: 80, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.16, duration: 0.7 }}
                whileHover={{
                  scale: 1.03,
                  boxShadow: "0 8px 80px 2px #31ffe655,0 1px 44px 2px #fd43ad44",
                }}
                className={`
                  relative border-2 border-white/40 rounded-[26px] px-12 pt-20 pb-10
                  min-h-[260px] max-w-[630px] w-full mx-auto flex flex-col items-center shadow-xl bg-black/70
                  backdrop-blur-[8px] transition-all duration-300
                  ${isOdd ? "md:rotate-[5deg] md:-mt-16 md:mb-8" : "md:-rotate-[3deg] md:mb-16"}
                `}
                style={{
                  fontFamily: "Montserrat, Arial, sans-serif",
                  marginTop: idx === 1 ? "80px" : undefined,
                  transition: "box-shadow 0.3s, transform 0.2s",
                  borderImage:
                    "linear-gradient(92deg,rgba(56,246,255,0.20),rgba(253,67,173,0.16)) 1",
                }}
              >
                {/* 3D Ellipse: left for left/top card, right for right/bottom card */}
                {idx % 2 === 0 ? (
                  <img
                    src="/Base-design.png"
                    alt="Ellipse"
                    className="absolute -left-16 top-14 w-[100px] z-10 select-none pointer-events-none"
                    draggable={false}
                    style={{ filter: "drop-shadow(0 4px 22px #31ffe677)" }}
                  />
                ) : (
                  <img
                    src="/Base-design.png"
                    alt="Ellipse"
                    className="absolute -right-16 bottom-10 w-[100px] z-10 rotate-180 select-none pointer-events-none"
                    draggable={false}
                    style={{ filter: "drop-shadow(0 2px 20px #e93baffb)" }}
                  />
                )}
                {/* For the bottom-right card, also show a big cone/cube (optional) */}
               {idx === 1 && (
  <motion.img
    src="/Cylinder.png"
    alt="Cylinder"
    className="fixed md:absolute right-8 md:-right-20 bottom-4 md:bottom-10 w-[100px] md:w-[120px] z-30 select-none pointer-events-none"
    draggable={false}
    initial={{ y: 0, x: 0 }}
    animate={{
      y: [0, -18, 0, 10, 0],
      x: [0, 10, 16, 10, 0],
      rotate: [-5, 5, 0, -7, -5],
    }}
    transition={{
      duration: 6,
      repeat: Infinity,
      repeatType: "loop",
      ease: "easeInOut"
    }}
    style={{
      filter: "drop-shadow(0 10px 40px #31ffe6cc)",
      willChange: "transform",
    }}
  />
)}

                {/* Top-center Avatar, with floating effect */}
                <motion.div
                  className="absolute -top-12 left-1/2 -translate-x-1/2 z-30"
                  initial={{ y: -10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5 + idx * 0.08, duration: 0.8 }}
                >
                  <div className="w-24 h-24 rounded-full border-[5px] border-white/90 bg-gradient-to-br from-[#c7fffc] via-[#81d9f7] to-[#fd43ad] shadow-[0_6px_32px_0_rgba(56,246,255,0.19)] flex items-center justify-center overflow-hidden">
                    <img
                      src={r.photo}
                      alt={r.name}
                      className="w-[82px] h-[82px] rounded-full object-cover"
                      draggable={false}
                      style={{ boxShadow: "0 2px 18px 4px #fd43ad22" }}
                    />
                  </div>
                </motion.div>
                {/* Name */}
                <h3 className="text-2xl md:text-3xl font-extrabold text-white mt-8 mb-1 text-center drop-shadow" style={{ letterSpacing: "0.5px" }}>
                  {r.name}
                </h3>
                {/* Blue stars, with a subtle shimmer */}
                <div className="flex justify-center my-2 mb-3 gap-1 relative">
                  {[...Array(5)].map((_, i) => (
                    <span className="relative" key={i}>
                      <FaStar
                        className={`${
                          i < r.rating
                            ? "text-cyan-400"
                            : "text-gray-700"
                        } text-2xl drop-shadow`}
                        style={{
                          filter: i < r.rating ? "drop-shadow(0 0 6px #2ed1fa77)" : "none",
                          transition: "filter 0.2s",
                        }}
                      />
                      {i === 2 && (
                        <span className="absolute inset-0 animate-pulse rounded-full bg-cyan-400/10 blur-[2px]" />
                      )}
                    </span>
                  ))}
                </div>
                {/* Testimonial text */}
                <p className="text-white/90 text-lg leading-relaxed text-center tracking-wide font-light">
                  {r.text}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
