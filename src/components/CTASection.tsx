'use client';

import React from 'react';
import Link from 'next/link';

const CTASection: React.FC = () => {
  return (
    <section className="flex justify-center items-center py-14 px-2 bg-black transition-colors duration-500">
      <div className="relative w-full max-w-[1500px] rounded-[48px] border border-white/70  px-6 md:px-0 py-12 md:py-20 bg-black  flex flex-col items-center text-center overflow-hidden">
        {/* Left Cube */}
        <img
          src="/Cube.png"
          alt="Cube"
          className="absolute left-0 md:left-12 top-1/2 -translate-y-1/2 w-[180px] md:w-[230px] object-contain z-10"
          style={{}}
          draggable={false}
        />
        {/* Right Cube */}
        <img
          src="/Cube.png"
          alt="Cube"
          className="absolute right-0 md:right-12 top-1/2 -translate-y-1/2 w-[180px] md:w-[230px] object-contain z-10"
          style={{}}
          draggable={false}
        />

        {/* Main Content */}
        <div className="relative z-20 flex flex-col items-center w-full">
          <h2
            className="text-[2.7rem] sm:text-[4.5rem] font-extrabold tracking-tight text-white  mb-1"
            style={{ fontFamily: "Montserrat, Arial, sans-serif" }}
          >
            Order Now
          </h2>
          <div className="text-lg md:text-xl font-semibold mb-8 text-white ">
            Whether you need branding, custom design, or a website — we’re here to help.
          </div>
          <div className="flex flex-col md:flex-row justify-center gap-5 mt-3 w-full md:w-auto">
            <Link
              href="/contact"
              className="font-bold text-2xl md:text-2xl px-8 py-3 rounded-xl bg-gradient-to-r from-pink-400 via-white to-cyan-400 text-black shadow-lg hover:scale-105 transition-all border-none w-full md:w-[270px] mb-2 md:mb-0"
              style={{ fontFamily: "Montserrat, Arial, sans-serif" }}
            >
              Get in Touch
            </Link>
            <a
              href="https://wa.link/8aofmz"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-2xl md:text-2xl px-8 py-3 rounded-xl bg-green-400 hover:bg-green-500 text-black shadow-lg hover:scale-105 transition-all border-none w-full md:w-[270px]"
              style={{ fontFamily: "Montserrat, Arial, sans-serif" }}
            >
              WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
