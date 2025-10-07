'use client';

import Image from 'next/image';
import React from 'react';
import {
  Roboto_Slab,
  Montserrat,
  Lora,
  Raleway,
  Bebas_Neue,
  Great_Vibes,
  Sacramento,
} from 'next/font/google';

// Load real fonts (tree-shaken & preloaded by Next.js)
const slab = Roboto_Slab({ subsets: ['latin'] });
const sans = Montserrat({ subsets: ['latin'] });
const serif = Lora({ subsets: ['latin'] });
const variable = Raleway({ subsets: ['latin'] });        // variable family
const display = Bebas_Neue({ subsets: ['latin'], weight: '400' });
const script = Great_Vibes({ subsets: ['latin'], weight: '400' });
const signature = Sacramento({ subsets: ['latin'], weight: '400' });

type FontChip = {
  label: string;
  className: string;
  extra?: string;
};

const fontChips: FontChip[] = [
  { label: 'Slab-serif',  className: slab.className },
  { label: 'Sans-serif',  className: sans.className },
  { label: 'Serif',       className: serif.className },
  { label: 'Variable',    className: variable.className },
  // punch up stylistic ones a bit
  { label: 'Display',     className: display.className,   extra: 'uppercase tracking-wider text-base sm:text-lg' },
  { label: 'Script',      className: script.className,    extra: 'text-lg sm:text-xl leading-none' },
  { label: 'Signature',   className: signature.className, extra: 'text-lg sm:text-xl leading-none' },
];

const FontsWeWorkWith: React.FC = () => (
  <section className="w-full flex items-center justify-center px-2 sm:px-3 py-8 sm:py-10 md:py-16">
    <div
      className="
        relative w-full max-w-[1500px]
        overflow-hidden
        rounded-2xl sm:rounded-[36px] md:rounded-[60px]
        shadow-2xl
        px-3 sm:px-6 md:px-16
        py-6 sm:py-8 md:py-16
        flex flex-col md:flex-row items-center justify-between gap-8 sm:gap-10 md:gap-0
        ring-1 ring-white/10
        bg-gradient-to-br from-[#07192A] via-[#0B0F22] to-[#1D0F2A]
      "
    >
      {/* Soft ambient glows */}
      <div className="pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full bg-cyan-400/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-20 -right-20 h-72 w-72 rounded-full bg-fuchsia-500/20 blur-3xl" />

      {/* Left Graphic */}
      <div className="relative">
        <div className="absolute -inset-3 rounded-2xl bg-cyan-400/10 blur-xl" />
        <Image
          width={160}
          height={160}
          src="/Cylinder.png"
          alt="Font Graphic Left"
          className="
            relative
            w-[70px] xs:w-[80px] sm:w-[100px] md:w-[160px]
            h-auto object-contain select-none pointer-events-none
            mb-3 md:mb-0
          "
          draggable={false}
        />
      </div>

      {/* Center Content */}
      <div className="flex flex-col items-center text-center flex-1 px-2 sm:px-4">
        <h2
          className="
            text-2xl sm:text-3xl md:text-5xl font-extrabold tracking-tight mb-2 sm:mb-3
            bg-gradient-to-r from-cyan-300 via-white to-fuchsia-300
            bg-clip-text text-transparent
          "
          style={{ fontFamily: 'Montserrat, Arial, sans-serif' }}
        >
          FONTS WE WORK WITH
        </h2>

        <p className="text-sm xs:text-base sm:text-lg md:text-xl text-white/80 font-semibold mb-4 max-w-3xl">
          A curated collection of funky, bold, expressive fonts that elevate your designs.
        </p>

        {/* Actual-font chips */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mt-1">
          {fontChips.map(({ label, className, extra }) => (
            <span
              key={label}
              className={`
                px-3 sm:px-4 py-1.5 sm:py-2 rounded-full
                text-xs sm:text-sm md:text-base
                text-white/90
                bg-white/5 backdrop-blur
                border border-white/15
                hover:bg-white/8 hover:border-white/25 transition
                shadow-[0_2px_12px_rgba(0,0,0,0.25)]
                ${className} ${extra ?? ''}
              `}
            >
              {label}
            </span>
          ))}
        </div>
      </div>

      {/* Right Graphic */}
      <div className="relative">
        <div className="absolute -inset-3 rounded-2xl bg-fuchsia-500/10 blur-xl" />
        <Image
          width={160}
          height={160}
          src="/Cylinder.png"
          alt="Font Graphic Right"
          className="
            relative
            w-[70px] xs:w-[80px] sm:w-[100px] md:w-[160px]
            h-auto object-contain select-none pointer-events-none
            rotate-180
            mt-3 md:mt-0
          "
          draggable={false}
        />
      </div>
    </div>
  </section>
);

export default FontsWeWorkWith;
