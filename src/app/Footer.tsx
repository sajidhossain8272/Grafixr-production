"use client";

import Link from "next/link";
import React from "react";
import {
  FaFacebookF,
  FaYoutube,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-t from-gray-900 to-black text-gray-200">
      <div className="container mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Brand */}
        <div>
          <Link
            href="/"
            className="text-3xl font-bold text-white hover:text-gray-300 transition-colors"
          >
            Grafixr
          </Link>
          <p className="mt-2 text-sm text-gray-400">
            We create stunning designs that elevate your brand.
          </p>
        </div>

        {/* Contact Info */}
        <div className="text-sm space-y-2">
          <p>
            <span className="font-medium text-white">Address:</span>{" "}
            Kawla, Dhaka, Bangladesh
          </p>
          <p>
            <span className="font-medium text-white">Email:</span>{" "}
            <a
              href="mailto:grafixr07@gmail.com"
              className="hover:underline text-blue-400"
            >
              grafixr07@gmail.com
            </a>
          </p>
          <p>
            <span className="font-medium text-white">Phone:</span>{" "}
            <a
              href="tel:+8801329530468"
              className="hover:underline text-blue-400"
            >
              +8801329530468
            </a>
          </p>
        </div>

        {/* Navigation Links */}
        <div className="flex flex-col items-start md:items-end space-y-2 text-sm">
          <Link href="/about" className="hover:text-blue-400 transition">
            About Us
          </Link>
          <Link href="/portfolio" className="hover:text-blue-400 transition">
            Portfolio
          </Link>
          <Link href="/contact" className="hover:text-blue-400 transition">
            Contact
          </Link>
        </div>
      </div>

      <div className="border-t border-white/10 mt-8">
        <div className="container mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between">
          <p className="text-xs text-gray-400">
            &copy; {currentYear} Grafixr. All rights reserved.
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0 text-lg">
            <a
              href="https://facebook.com/designerrony1"
              aria-label="Facebook"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-500 transition-transform transform hover:scale-110"
            >
              <FaFacebookF />
            </a>
            <a
              href="https://youtube.com/@GrafiXr07/featured"
              aria-label="YouTube"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-red-500 transition-transform transform hover:scale-110"
            >
              <FaYoutube />
            </a>
            <a
              href="https://instagram.com/grafixr07"
              aria-label="Instagram"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-pink-500 transition-transform transform hover:scale-110"
            >
              <FaInstagram />
            </a>
            <a
              href="https://www.linkedin.com/in/your-linkedin-handle"
              aria-label="LinkedIn"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-300 transition-transform transform hover:scale-110"
            >
              <FaLinkedinIn />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
