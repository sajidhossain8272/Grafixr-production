'use client';

import React, { useEffect, useState } from 'react';
import {
  FaPaintBrush,
  FaIdCard,
  FaTshirt,
  FaFacebookF,
  FaFileAlt,
  FaImage,
} from 'react-icons/fa';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { JSX } from 'react/jsx-runtime';

interface Category {
  _id: string;
  mainCategory: string;
  subCategories: string[];
}

const API_URL = process.env.NEXT_PUBLIC_API_URL!;

const iconMap: { [key: string]: JSX.Element } = {
  'Logo Design': <FaPaintBrush />,
  'Business Cards': <FaIdCard />,
  'T-shirt Graphics': <FaTshirt />,
  'Social Media Design': <FaFacebookF />,
  'Flyers & Brochures': <FaFileAlt />,
  'Banners & Signs': <FaImage />,
};

const defaultDescriptions: { [key: string]: string } = {
  'Logo Design': 'Custom brand logos tailored to your vision.',
  'Business Cards': 'Professional and creative card layouts.',
  'T-shirt Graphics': 'Unique designs for apparel and merchandise.',
  'Social Media Design': 'Eye-catching content for all platforms.',
  'Flyers & Brochures': 'Promotional material that converts.',
  'Banners & Signs': 'Large-scale visuals that grab attention.',
};

const gradientStyles = [
  'from-pink-500 to-yellow-500',
  'from-purple-500 to-blue-500',
  'from-green-400 to-teal-500',
  'from-indigo-500 to-purple-600',
  'from-red-500 to-orange-500',
  'from-yellow-400 to-pink-500',
];

const Services: React.FC = () => {
  const [services, setServices] = useState<string[]>([]);

  useEffect(() => {
    fetch(`${API_URL}/admin/categories`)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch categories');
        return res.json() as Promise<Category[]>;
      })
      .then((data) => {
        const graphicDesign = data.find(
          (cat) => cat.mainCategory === 'graphic-design'
        );
        if (graphicDesign) {
          setServices(graphicDesign.subCategories);
        }
      })
      .catch(console.error);
  }, []);

  return (
    <section className="py-20 bg-gradient-to-br from-black via-gray-900 to-black text-white relative overflow-hidden">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold">Services Offered</h2>
        <p className="text-gray-300 mt-2 text-lg">
          Creative solutions tailored to elevate your brand
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 max-w-7xl mx-auto px-6">
        {services.map((title, index) => {
          const queryString = new URLSearchParams({
            subCategory: title,
          }).toString();
          const gradient = gradientStyles[index % gradientStyles.length];

          return (
            <Link href={`/portfolio?${queryString}`} key={title} className="group">
              <motion.div
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`relative p-8 rounded-xl backdrop-blur-lg bg-white/10 border border-white/20 shadow-2xl transition-transform transform hover:-translate-y-2 hover:scale-[1.02] hover:shadow-[0_10px_60px_rgba(255,255,255,0.2)]`}
              >
                {/* Glow Background */}
                <div
                  className={`absolute -inset-0.5 z-0 rounded-xl blur-lg opacity-30 bg-gradient-to-r ${gradient}`}
                ></div>

                <div className="relative z-10 flex flex-col items-center text-center">
                  <div className="relative mb-5 w-16 h-16 rounded-full flex items-center justify-center text-2xl text-white bg-gradient-to-br from-white/20 to-white/5 shadow-inner shadow-white/10 backdrop-blur-sm">
                    {iconMap[title] || <FaPaintBrush />}
                  </div>
                  <h3 className="text-xl font-bold mb-2">{title}</h3>
                  <p className="text-sm text-gray-300">
                    {defaultDescriptions[title] ||
                      'Creative and professional design service.'}
                  </p>
                </div>
              </motion.div>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default Services;
