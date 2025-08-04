/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import Image from "next/image";

const Hero: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = theme === "dark";
  const router = useRouter();

  if (!mounted) {
    // Optionally render a skeleton/placeholder here
    return <div className='w-full min-h-screen bg-black' />;
  }

  return (
    <section className='w-full min-h-screen flex items-center justify-center bg-black dark:bg-black px-2 transition-colors duration-500'>
      <div
        className={`
          relative w-full max-w-[1460px] 
          rounded-[26px] md:rounded-[48px] border
          ${
            isDark
              ? "border-white/30 bg-[#101013]"
              : "border-white/30 bg-[#101013]"
          }
          px-3 sm:px-6 md:px-12 py-7 sm:py-10 md:py-14
          flex flex-col md:flex-row items-center md:items-start gap-8 md:gap-0
          transition-colors duration-500
          overflow-hidden
        `}
      >
        {/* LEFT SIDE */}
        <div className='flex-1 flex flex-col justify-center items-start z-10 w-full md:w-auto'>
          <h1
            className={`
              text-[12vw] sm:text-[8vw] md:text-[110px] lg:text-[144px]
              leading-none font-extrabold tracking-tight
              ${isDark ? "text-white" : "text-white"} 
              mt-2 md:mt-0 mb-5 sm:mb-6
              whitespace-nowrap
            `}
            style={{
              fontFamily: "Montserrat, sans-serif",
              letterSpacing: "-.02em",
              lineHeight: 1,
            }}
          >
            RONY
          </h1>
          <p
            className={`
              mt-2 text-base sm:text-lg md:text-2xl max-w-xl font-light
              mb-6 sm:mb-8 md:mb-10 
              ${isDark ? "text-white/90" : "text-white/90"}
            `}
            style={{ fontFamily: "Montserrat, Arial, sans-serif" }}
          >
            Hello! I am a professional Graphic Designer Since 2017. I Have a
            team to Help me. I also provide other services through my expert
            team members.
          </p>
          <button
            className='w-[160px] sm:w-[195px] h-[44px] sm:h-[54px] flex items-center justify-center rounded-full bg-gradient-to-r from-cyan-400 via-white to-pink-500 shadow-md transition hover:scale-105 font-bold text-base sm:text-xl text-gray-900'
            onClick={() => router.push("/about")}
          >
            READ MORE
          </button>
        </div>

      {/* RIGHT SIDE */}
<div className="relative flex justify-center items-center w-[300px] sm:w-[360px] md:w-[420px] h-[260px] sm:h-[320px] md:h-[360px] z-10">
  {/* OUTER WHITE BORDER */}
  <div
    className="absolute inset-0 z-0"
    style={{
      clipPath: `
        polygon(
          30% 4%, 72% 3%, 100% 42%,
          85% 100%, 22% 100%, 0% 48%
        )`,
      background: "#ffffff",
      padding: "5px",
    }}
  ></div>

  {/* INNER HEX SHAPE */}
  <div
    className="relative w-full h-full flex items-center justify-center z-10"
    style={{
      clipPath: `
        polygon(
          30% 4%, 72% 3%, 100% 42%,
          85% 100%, 22% 100%, 0% 48%
        )`,
      overflow: "hidden",
      background: "linear-gradient(145deg, #111113, #181818)",
      transform: "perspective(800px) rotateX(3deg)",
      boxShadow: "0 0 50px rgba(255, 255, 255, 0.07), 0 0 20px rgba(229, 50, 215, 0.2)",
    }}
  >
    {/* BACKGROUND IMAGE */}
    <Image
      src="/man-working.webp"
      width={500}
      height={500}
      alt="Profile"
      className="w-full h-full object-cover brightness-[0.85] grayscale contrast-125 opacity-35"
      draggable={false}
    />

    {/* LOGO */}
    <div className="absolute bottom-4 sm:bottom-6 flex justify-center items-center w-full z-20">
      <Image
        src="/Grafixrt-logo-new.png"
        width={400}
        height={400}
        alt="Logo"
        className="w-40 h-40 sm:w-60 sm:h-60 drop-shadow-[0_2px_20px_rgba(229,50,215,0.7)]"
      />
    </div>
  </div>
</div>


        {/* 3D CUBE: bottom left of the image card, adapts position for mobile */}
  <Image
  width={180}
  height={180}
  src="/Cube.png"
  alt="Cube"
  className={`
    absolute
    left-1/5 md:left-[54%]
    bottom-[2%] sm:bottom-[4%] md:bottom-[6%]
    w-16 sm:w-24 md:w-32 h-16 sm:h-24 md:h-32 object-contain
    z-[11]
    -translate-x-1/2 md:translate-x-0
    animate-float 
  `}
  draggable={false}
/>


        {/* OUTER BORDER */}
        <div
          className={`pointer-events-none absolute inset-0 rounded-[26px] md:rounded-[48px] border ${
            isDark ? "border-white/20" : "border-black/10"
          }`}
          style={{ zIndex: 0 }}
        />
        
      </div>
    </section>
  );
};

export default Hero;
