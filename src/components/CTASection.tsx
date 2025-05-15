'use client';

import React from 'react';
import Link from 'next/link';
import { FaWhatsapp } from 'react-icons/fa';
import { motion } from 'framer-motion';

const CTASection: React.FC = () => {
  return (
    <section className="bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white py-20 px-6">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="max-w-4xl mx-auto text-center space-y-8"
      >
        <h2 className="text-4xl sm:text-5xl font-extrabold leading-tight">
          Ready to bring your vision to life?
        </h2>
        <p className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto">
          Whether you need branding, a website, or custom design — we’re here to help.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-6">
          {/* Contact Button */}
          <Link
            href="/contact"
            className="bg-gradient-to-r from-[#29C9FF] to-[#00B8FF] hover:from-[#00B8FF] hover:to-[#29C9FF] text-white font-semibold px-6 py-3 rounded-lg transition-transform transform hover:scale-105 duration-300 shadow-lg"
          >
            Get in Touch
          </Link>

          {/* WhatsApp Button */}
          <a
            href="https://wa.link/8aofmz"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-3 rounded-lg transition-transform transform hover:scale-105 duration-300 shadow-lg"
          >
            <FaWhatsapp className="w-5 h-5" />
            Message Us on WhatsApp
          </a>
        </div>
      </motion.div>
    </section>
  );
};

export default CTASection;
