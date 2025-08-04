'use client';

import Image from 'next/image';
import React from 'react';

const fontList =
  "Slab-serif | Sans-serif | Serif | Variable | Display | Script | Signature";

const FontsWeWorkWith: React.FC = () => (
  <section className="w-full flex items-center justify-center px-2 sm:px-3 py-8 sm:py-10 md:py-16">
    <div
      className="
        relative w-full max-w-[1500px]
        bg-white
        rounded-2xl sm:rounded-[36px] md:rounded-[60px]
        flex flex-col md:flex-row items-center justify-between
        gap-8 sm:gap-10 md:gap-0
        px-3 sm:px-6 md:px-16
        py-6 sm:py-8 md:py-16
        shadow transition-colors duration-500
      "
    >
      {/* Left Graphic */}
      <Image
        width={160}
        height={160}
        src="/Cylinder.png"
        alt="Font Graphic Left"
        className="
          w-[70px] xs:w-[80px] sm:w-[100px] md:w-[160px]
          h-auto object-contain select-none pointer-events-none
          mb-3 md:mb-0
        "
        draggable={false}
      />

      {/* Center Content */}
      <div className="flex flex-col items-center text-center flex-1 px-2 sm:px-4">
        <h2
          className="
            text-xl xs:text-2xl sm:text-3xl md:text-5xl
            font-extrabold text-black tracking-tight mb-1 sm:mb-3
          "
          style={{ fontFamily: "Montserrat, Arial, sans-serif" }}
        >
          FONTS WE WORK WITH
        </h2>
        <div className="text-sm xs:text-base sm:text-lg md:text-xl text-black/90 font-semibold mb-2 sm:mb-4">
          A Curated Collection of funky, Bold, Expressive fonts that elevate your designs.
        </div>
        <div
          className="
            text-base xs:text-lg sm:text-2xl md:text-4xl
            font-light mt-2 md:mt-3 text-[#222] 
          "
          style={{
            fontFamily: "var(--font-geist-sans), 'Montserrat', Arial, sans-serif",
            letterSpacing: "0.01em",
            lineHeight: "1.25",
          }}
        >
          {fontList.split("|").map((item, idx, arr) => (
            <span key={idx}>
              {item.trim()}
              {idx !== arr.length - 1 && (
                <span className="mx-1 sm:mx-2 text-sm sm:text-xl align-middle text-[#888]">|</span>
              )}
              {idx === arr.length - 1 && <br />}
            </span>
          ))}
        </div>
      </div>

      {/* Right Graphic */}
      <Image
        width={160}
        height={160}
        src="/Cylinder.png"
        alt="Font Graphic Right"
        className="
          w-[70px] xs:w-[80px] sm:w-[100px] md:w-[160px]
          h-auto object-contain select-none pointer-events-none
          rotate-180
          mt-3 md:mt-0
        "
        draggable={false}
      />
    </div>
  </section>
);

export default FontsWeWorkWith;
