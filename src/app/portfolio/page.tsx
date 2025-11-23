'use client';

import { Suspense } from 'react';
import PortfolioList from './PortfolioList';
import { motion } from 'framer-motion';

export default function PortfolioPage() {
  return (
    <section className="min-h-screen w-full flex items-center justify-center bg-[#18181B] px-1 py-20 sm:px-2 relative overflow-hidden">
      {/* Large outer border with cube and cone SVG */}
      <div className="w-full max-w-[1420px] min-h-[94vh] bg-black rounded-[32px] border-2 border-white/50 px-1 sm:px-6 py-4 sm:py-10 mx-auto relative shadow-[0_0_60px_5px_rgba(255,255,255,0.08)] flex flex-col items-center overflow-visible">
        {/* Top right 3D Cube */}
        <motion.div
          initial={{ opacity: 0, y: -20, rotate: 10 }}
          animate={{ opacity: 1, y: 0, rotate: 0 }}
          transition={{ duration: 1, delay: 0.35 }}
          className="absolute right-24 top-12 z-10 hidden md:block"
        >
          <svg width="105" height="105" viewBox="0 0 120 120">
            <g>
              <polygon points="30,100 100,100 70,60 0,60" fill="#fd43ad" />
              <polygon points="0,0 70,0 100,40 30,40" fill="#C7FFFC" />
              <polygon points="0,0 0,60 30,100 30,40" fill="#81D9F7" />
            </g>
          </svg>
        </motion.div>
        {/* Bottom left cone/cylinder */}
        <motion.img
          src="/Cylinder.png"
          alt="Cone"
          className="absolute left-12 bottom-6 w-[110px] z-10 hidden md:block"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 1 }}
          draggable={false}
        />

        {/* Main heading */}
        <h1
          className="text-white text-4xl sm:text-6xl font-extrabold tracking-tight text-left mt-16 pl-4 md:pl-0"
          style={{
            fontFamily: "Montserrat, Arial, sans-serif",
            letterSpacing: "-1px",
          }}
        >
          PORTFOLIO
        </h1>

        {/* Portfolio Grid List */}
        <div className="w-full px-1 sm:px-4 md:px-8 lg:py-4 sm:py-8">
          <Suspense
            fallback={
              <div className="flex justify-center items-center py-32">
                <div className="w-14 h-14 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin" />
              </div>
            }
          >
            <div className="w-full max-w-7xl mx-auto pt-8 lg:pt-20">
            <PortfolioList />
            </div>
          </Suspense>
        </div>
      </div>
    </section>
  );
}
