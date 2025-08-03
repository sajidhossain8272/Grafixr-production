'use client';

import React from 'react';

const fontList =
  "Slab-serif | Sans-serif | Serif | Variable | display | Script | Signature";

const FontsWeWorkWith: React.FC = () => (
  <section className="w-full flex items-center justify-center py-7 px-2">
    <div
      className="
        relative w-full max-w-[1500px]
        bg-white dark:bg-black
        rounded-[36px] md:rounded-[60px]
        flex flex-col md:flex-row items-center justify-between
        px-3 sm:px-6 md:px-16 py-7 md:py-12
        shadow transition-colors duration-500
        gap-6 md:gap-0
      "
    >
      {/* Left Graphic */}
      <img
        src="Cylinder.png"
        alt="Font Graphic Left"
        className="
          w-[100px] sm:w-[150px] md:w-[210px]
          h-auto object-contain select-none pointer-events-none
          mb-2 md:mb-0
          "
        draggable={false}
      />

      {/* Center Content */}
      <div className="flex flex-col items-center text-center flex-1 px-1 sm:px-3">
        <h2
          className="
            text-2xl sm:text-3xl md:text-5xl
            font-extrabold text-black dark:text-white tracking-tight mb-1
          "
          style={{ fontFamily: "Montserrat, Arial, sans-serif" }}
        >
          FONTS WE WORK WITH
        </h2>
        <div className="text-base sm:text-lg md:text-xl text-black/90 dark:text-white/80 font-semibold mb-2 sm:mb-3">
          A Curated Collection of funkey, Bold, Expressive fonts that elevate your designs.
        </div>
        <div
          className="
            text-lg sm:text-2xl md:text-4xl
            font-light mt-2 md:mt-3 text-[#222] dark:text-gray-100
          "
          style={{
            fontFamily: "var(--font-geist-sans), 'Montserrat', Arial, sans-serif",
            letterSpacing: "0.01em",
            lineHeight: "1.22",
          }}
        >
          {fontList.split("|").map((item, idx, arr) => (
            <span key={idx}>
              {item.trim()}
              {idx !== arr.length - 1 && (
                <span className="mx-1 sm:mx-2 text-base sm:text-2xl align-middle text-[#888] dark:text-gray-400">|</span>
              )}
              {idx === arr.length - 1 && <br />}
            </span>
          ))}
        </div>
      </div>

      {/* Right Graphic */}
      <img
        src="Cylinder.png"
        alt="Font Graphic Right"
        className="
          w-[100px] sm:w-[150px] md:w-[210px]
          h-auto object-contain select-none pointer-events-none
          rotate-180
          mt-2 md:mt-0
          "
        draggable={false}
      />
    </div>
  </section>
);

export default FontsWeWorkWith;
