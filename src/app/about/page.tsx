"use client";
import React from "react";
import { FaArrowRight, FaPhoneAlt } from "react-icons/fa";
import { motion } from "framer-motion";

export default function AboutPage() {
  return (
    <section className='min-h-screen w-full flex items-center justify-center bg-[#18181B] px-2 relative'>
      {/* Main Glassmorphism Card */}
      <div className='w-full max-w-6xl bg-black rounded-[32px] border-2 border-white/50 p-4 sm:p-8 mx-auto relative shadow-[0_0_60px_5px_rgba(255,255,255,0.08)] overflow-hidden'>
        {/* 3D Pill Shape */}
        <motion.div
          initial={{ opacity: 0, x: -40, rotate: 20 }}
          animate={{ opacity: 1, x: 0, rotate: 0 }}
          transition={{ duration: 1, delay: 0.1 }}
          className='absolute left-[-60px] top-[-40px] z-0 hidden md:block'
        >
          <svg width='140' height='70' viewBox='0 0 140 70'>
            <ellipse
              cx='70'
              cy='35'
              rx='60'
              ry='26'
              fill='url(#paint0_linear_ellipse)'
            />
            <defs>
              <linearGradient
                id='paint0_linear_ellipse'
                x1='0'
                y1='0'
                x2='140'
                y2='70'
                gradientUnits='userSpaceOnUse'
              >
                <stop stopColor='#C7FFFC' />
                <stop offset='0.7' stopColor='#81D9F7' />
                <stop offset='1' stopColor='#FF54C1' />
              </linearGradient>
            </defs>
          </svg>
        </motion.div>

        {/* 3D Cube Shape */}
        <motion.div
          initial={{ opacity: 0, y: -30, rotate: 20 }}
          animate={{ opacity: 1, y: 0, rotate: 0 }}
          transition={{ duration: 1, delay: 0.25 }}
          className='absolute right-[-60px] top-[60px] z-0 hidden md:block'
        >
          <svg width='120' height='120' viewBox='0 0 120 120'>
            <g>
              <polygon points='30,100 100,100 70,60 0,60' fill='#fd43ad' />
              <polygon points='0,0 70,0 100,40 30,40' fill='#C7FFFC' />
              <polygon points='0,0 0,60 30,100 30,40' fill='#81D9F7' />
            </g>
          </svg>
        </motion.div>

        {/* Centered Content */}
        <div className='flex flex-col md:flex-row items-center gap-4 md:gap-0 justify-between relative z-10'>
          {/* Left: Headline & Button */}
          <div className='flex-1 flex flex-col gap-7 items-start justify-center pt-6 md:pt-0'>
            <div className='relative w-full flex flex-col items-start'>
              <div className='relative z-10 p-7 border-2 border-white/50 rounded-2xl bg-black/40'>
                <span
                  className='text-white font-extrabold text-3xl md:text-5xl leading-tight font-[Montserrat,sans-serif]'
                  style={{
                    letterSpacing: "-1.5px",
                  }}
                >
                  Interested in
                  <br />
                  working
                  <br />
                  together?
                </span>
              </div>
            </div>
            {/* Gradient Arrow Button */}
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              className='mt-8 flex items-center gap-3 px-6 py-2 rounded-full border-2 border-white/40 bg-black/60 transition shadow-[0_0_16px_2px_rgba(56,246,255,0.1)] hover:shadow-lg focus:outline-none'
              style={{
                background:
                  "linear-gradient(92deg,rgba(56,246,255,0.10) 0%,rgba(253,67,173,0.15) 100%)",
                color: "#fff",
                fontWeight: 600,
                fontFamily: "Montserrat,sans-serif",
                fontSize: "1.15rem",
              }}
            >
              <span className='pr-2'>
                <svg width='60' height='32'>
                  <rect
                    x='2'
                    y='2'
                    rx='16'
                    width='56'
                    height='28'
                    fill='none'
                    stroke='url(#arrow_gradient)'
                    strokeWidth='3'
                  />
                  <defs>
                    <linearGradient
                      id='arrow_gradient'
                      x1='0'
                      y1='0'
                      x2='60'
                      y2='32'
                      gradientUnits='userSpaceOnUse'
                    >
                      <stop stopColor='#31ffe6' />
                      <stop offset='1' stopColor='#fd43ad' />
                    </linearGradient>
                  </defs>
                </svg>
              </span>
              <FaArrowRight className='ml-[-45px] text-2xl text-gradient-to-r from-[#31ffe6] to-[#fd43ad]' />
            </motion.button>
          </div>
          {/* Right: Description */}
          <div className='flex-1 flex flex-col items-end justify-center pr-3 pt-10 md:pt-0'>
            <div className='text-white/90 text-[0.98rem] max-w-md leading-relaxed'>
              We believe every brand has a story worth telling—and our passion
              is bringing those stories to life through design. What began as a
              solo journey has grown into a creative team dedicated to
              delivering bold visuals and real results for clients worldwide. If
              you’re ready to turn your ideas into an unforgettable visual
              experience, let’s connect and create something exceptional
              together.
            </div>
          </div>
        </div>

        {/* Bottom Contact Bar */}
        <div className='w-full border border-white/40 rounded-full flex flex-col md:flex-row items-center justify-between gap-4 mt-16 px-4 py-4 bg-black/30 relative z-20'>
          <div className='flex items-center gap-4 w-full md:w-auto justify-center'>
            <span className='font-semibold text-white/90 text-base'>
              Contact Us:
            </span>
            <span className='flex items-center gap-2 px-4 py-2 rounded-lg border border-white/30 bg-black/50 text-white/80 text-lg font-mono'>
              <FaPhoneAlt className='mr-1' /> +88 01628083370
            </span>
          </div>
          <form className='flex items-center w-full md:w-auto max-w-md mx-auto gap-2'>
            <input
              className='flex-1 px-5 py-2 rounded-full border-2 border-white/40 bg-black/20 text-white placeholder:text-white/70 outline-none'
              placeholder='Write your e-mail here ...'
              type='email'
              required
            />
            <button
              type='submit'
              className='ml-2 px-6 py-2 rounded-full border-2 border-white/50 bg-black/60 text-white font-bold transition hover:scale-105'
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
