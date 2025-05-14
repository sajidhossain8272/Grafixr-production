"use client";

import Link from "next/link";
import React, { JSX } from "react";
import {
  FaFacebookF,
  FaYoutube,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";

export default function Footer(): JSX.Element {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-200">
      <div className="container mx-auto px-4 py-8 flex flex-col md:flex-row justify-between items-start gap-6">
        {/* Logo and Tagline */}
        <div className="md:w-1/3">
          <Link
            href="/"
            className="text-3xl font-bold text-white hover:text-gray-300 transition-colors"
          >
            Grafixr
          </Link>
          <p className="mt-2 text-sm">
            We create stunning designs that elevate your brand.
          </p>
        </div>

        {/* Contact Info */}
        <div className="md:w-1/3 text-sm space-y-2">
          <p>
            <strong>Address:</strong> Kawla, Dhaka, Bangladesh
          </p>
          <p>
            <strong>Email:</strong>{" "}
            <a href="mailto:grafixr07@gmail.com" className="hover:underline">
              grafixr07@gmail.com
            </a>
          </p>
          <p>
            <strong>Phone:</strong>{" "}
            <a href="tel:+8801329530468" className="hover:underline">
              +8801329530468
            </a>
          </p>
        </div>

        {/* Navigation Links */}
        <div className="md:w-1/3 flex flex-col space-y-2 md:items-end">
          <Link href="/about" className="hover:text-white transition-colors">
            About Us
          </Link>
          <Link href="/portfolio" className="hover:text-white transition-colors">
            Portfolio
          </Link>
          <Link href="/contact" className="hover:text-white transition-colors">
            Contact
          </Link>
        </div>
      </div>

      <div className="border-t border-gray-800 mt-6">
        <div className="container mx-auto px-4 py-4 flex flex-col md:flex-row items-center justify-between">
          <p className="text-sm">
            &copy; {currentYear} Grafixr. All rights reserved.
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0 text-lg">
            <a
              href="https://facebook.com/designerrony1"
              aria-label="Facebook"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              <FaFacebookF />
            </a>
            <a
              href="https://youtube.com/@GrafiXr07/featured"
              aria-label="YouTube"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              <FaYoutube />
            </a>
            <a
              href="https://instagram.com/grafixr07"
              aria-label="Instagram"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              <FaInstagram />
            </a>
            <a
              href="https://www.linkedin.com/in/your-linkedin-handle"
              aria-label="LinkedIn"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              <FaLinkedinIn />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
