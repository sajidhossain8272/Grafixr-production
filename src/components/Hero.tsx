/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import React, { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

const Hero: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = theme === 'dark';
  const router = useRouter();

  if (!mounted) {
    // Optionally render a skeleton/placeholder here
    return <div className="w-full min-h-screen bg-black" />;
  }

  return (
    <section className="w-full min-h-screen flex items-center justify-center bg-black dark:bg-black px-2 transition-colors duration-500">
      <div
        className={`
          relative w-full max-w-[1460px] 
          rounded-[26px] md:rounded-[48px] border
          ${isDark ? 'border-white/30 bg-[#101013]' : 'border-white/30 bg-[#101013]'}
          px-3 sm:px-6 md:px-12 py-7 sm:py-10 md:py-14
          flex flex-col md:flex-row items-center md:items-start gap-8 md:gap-0
          transition-colors duration-500
          overflow-hidden
        `}
      >
        {/* LEFT SIDE */}
        <div className="flex-1 flex flex-col justify-center items-start z-10 w-full md:w-auto">
          <h1
            className={`
              text-[12vw] sm:text-[8vw] md:text-[110px] lg:text-[144px]
              leading-none font-extrabold tracking-tight
              ${isDark ? 'text-white' : 'text-white'} 
              mt-2 md:mt-0 mb-5 sm:mb-6
              whitespace-nowrap
            `}
            style={{
              fontFamily: 'Montserrat, sans-serif',
              letterSpacing: '-.02em',
              lineHeight: 1,
            }}
          >
            RONY
          </h1>
          <p
            className={`
              mt-2 text-base sm:text-lg md:text-2xl max-w-xl font-light
              mb-6 sm:mb-8 md:mb-10 
              ${isDark ? 'text-white/90' : 'text-white/90'}
            `}
            style={{ fontFamily: 'Montserrat, Arial, sans-serif' }}
          >
            Hello! I am a professional Graphic Designer Since 2017. I Have a team to Help me. I also provide other services through my expert team members.
          </p>
      <button
  className="w-[160px] sm:w-[195px] h-[44px] sm:h-[54px] flex items-center justify-center rounded-full bg-gradient-to-r from-cyan-400 via-white to-pink-500 shadow-md transition hover:scale-105 font-bold text-base sm:text-xl text-gray-900"
  onClick={() => router.push('/about')}
>
  READ MORE
</button>

        </div>

        {/* RIGHT SIDE */}
        <div className="flex-1 flex justify-center items-center relative w-full md:w-auto min-w-[230px] min-h-[220px] sm:min-w-[320px] sm:min-h-[320px] md:min-w-[430px] md:min-h-[420px] z-10">
          {/* CARD SHAPE */}
 <div
  className={`
    relative w-[230px] h-[220px]
    sm:w-[320px] sm:h-[320px]
    md:w-[430px] md:h-[420px]
    rounded-[32px] sm:rounded-[44px] md:rounded-[64px]
    border-4 border-white
    flex items-center justify-center
    bg-[#101013]
    transition-all duration-500
    z-10
  `}
  style={{
    clipPath: 'polygon(4% 0, 96% 0, 100% 8%, 100% 92%, 96% 100%, 4% 100%, 0 92%, 0 8%)',
    overflow: 'hidden',
  }}
>
            {/* IMAGE */}
            <Image
              src="/man-working.webp"
              width={500}
              height={500}
              alt="profile"
              className="w-full h-full object-cover grayscale opacity-30 rounded-[32px] sm:rounded-[44px] md:rounded-[64px]"
              draggable={false}
            />

            {/* LOGO & BRAND TEXT */}
            <div className="absolute left-3 sm:left-6 md:left-8 bottom-6 sm:bottom-10 md:bottom-12 flex items-center gap-2 sm:gap-3 z-10">
              <Image
                src="/Grafixrt-logo-new.png"
                width={500}
                height={500}
                alt="Logo"
                className="w-40 h-40 sm:w-80 sm:h-80 drop-shadow-[0_2px_16px_rgba(229,50,215,0.8)]"
              />
        
             
            </div>
          </div>
          {/* THEME TOGGLE (top right, functional) */}
          {/* <button
            className="absolute top-3 right-3 sm:top-6 sm:right-6 z-20"
            aria-label="Toggle Dark Mode"
            onClick={() => setTheme(isDark ? 'light' : 'dark')}
          >
            <div className="w-12 h-7 sm:w-14 sm:h-7 rounded-full flex items-center bg-black dark:bg-white border-2 border-white/70 dark:border-black/30 shadow-md px-1 transition-colors duration-300">
              <div
                className={`
                  w-6 h-6 sm:w-8 sm:h-6 rounded-full bg-gradient-to-r from-cyan-400 via-white to-pink-500 transition-all duration-300
                  ${isDark ? 'translate-x-0' : 'translate-x-6'}
                `}
              />
            </div>
          </button> */}
        </div>

        {/* 3D CUBE: bottom left of the image card, adapts position for mobile */}
        <img
          src="/Cube.png"
          alt="Cube"
          className={`
            absolute
            left-1/5 md:left-[54%]
            bottom-[2%] sm:bottom-[4%] md:bottom-[6%]
            w-16 sm:w-24 md:w-32 h-16 sm:h-24 md:h-32 object-contain
            z-[11]
            -translate-x-1/2 md:translate-x-0
            [transform:translate(-50%,0)_rotate(-15deg)]
          `}
          draggable={false}
        />

        {/* OUTER BORDER */}
        <div
          className={`pointer-events-none absolute inset-0 rounded-[26px] md:rounded-[48px] border ${isDark ? 'border-white/20' : 'border-black/10'}`}
          style={{ zIndex: 0 }}
        />
      </div>
    </section>
  );
};

export default Hero;
