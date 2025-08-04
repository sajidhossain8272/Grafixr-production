"use client";

import Image from "next/image";
import Link from "next/link";
import {
  FaFacebookF,
  FaYoutube,
  FaInstagram,
} from "react-icons/fa";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative w-full min-h-[380px] bg-black dark:bg-black flex flex-col items-center pt-24 pb-8 transition-colors duration-500">
      {/* Card with top curve */}
      <div className="
        relative z-10 w-full max-w-3xl mx-auto
        bg-[#282828] dark:bg-[#222] rounded-t-[160px] rounded-b-[28px]
        px-6 md:px-10 py-14 flex flex-col items-center shadow-xl 
      ">
        {/* Brand logo and name */}
        <div className="flex flex-col items-center justify-center mb-4">
          <span className="flex items-center gap-2">
            <Image width={500} height={500} src="/Grafixrt-logo-new.png" alt="Logo" className="w-60 h-60 mr-2 select-none pointer-events-none" draggable={false} />
          </span>
        </div>

        {/* Contact */}
        <div className="flex flex-col items-center text-white text-xl md:text-2xl font-light mb-3">
          <span>Email : <a href="mailto:grafixr07@gmail.com" className="underline hover:text-cyan-300">grafixr07@gmail.com</a></span>
          <span>Phone : <a href="tel:+8801628083370" className="underline hover:text-cyan-300">+8801628083370</a></span>
        </div>

        {/* Navigation and Socials */}
        <div className="w-full flex flex-col md:flex-row items-center justify-between mt-6 gap-5 md:gap-0">
          {/* Links */}
          <nav className="flex flex-col md:flex-row gap-3 md:gap-8 items-center">
            <Link href="/about" className="text-white/80 hover:text-cyan-300 font-semibold text-lg transition">About Us</Link>
            <Link href="/portfolio" className="text-white/80 hover:text-cyan-300 font-semibold text-lg transition">Portfolio</Link>
            <Link href="/contact" className="text-white/80 hover:text-cyan-300 font-semibold text-lg transition">Contact</Link>
          </nav>
          {/* Social icons */}
          <div className="flex flex-row gap-6 items-center mt-5 md:mt-0">
            <a href="https://facebook.com/designerrony1" target="_blank" rel="noopener noreferrer"
              className="hover:text-blue-500 text-white text-2xl transition-transform transform hover:scale-125"
              aria-label="Facebook">
              <FaFacebookF />
            </a>
            <a href="https://youtube.com/@GrafiXr07/featured" target="_blank" rel="noopener noreferrer"
              className="hover:text-red-500 text-white text-2xl transition-transform transform hover:scale-125"
              aria-label="YouTube">
              <FaYoutube />
            </a>
            <a href="https://instagram.com/grafixr07" target="_blank" rel="noopener noreferrer"
              className="hover:text-pink-500 text-white text-2xl transition-transform transform hover:scale-125"
              aria-label="Instagram">
              <FaInstagram />
            </a>
            {/* <a href="https://www.linkedin.com/in/your-linkedin-handle" target="_blank" rel="noopener noreferrer"
              className="hover:text-blue-400 text-white text-2xl transition-transform transform hover:scale-125"
              aria-label="LinkedIn">
              <FaLinkedinIn />
            </a> */}
          </div>
        </div>
      </div>

      {/* copyright */}
      <div className="w-full max-w-3xl mx-auto flex justify-center items-center pt-10 text-center">
        <p className="text-gray-400 text-sm font-light">&copy; {currentYear} Grafixr. All rights reserved.</p>
      </div>
    </footer>
  );
}
