/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React, { useState, ChangeEvent, FormEvent } from "react";
import type { NextPage } from "next";
import { FaEnvelope, FaCheckCircle } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

interface FormData {
  name: string;
  email: string;
  phone: string;
  projectType: string;
  requirements: string;
  budget: string;
  deadline: string;
}

const Page: NextPage = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    projectType: "",
    requirements: "",
    budget: "",
    deadline: "",
  });

  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    setSuccess(false);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await res.json();

      if (res.ok) {
        setSuccess(true);
        setFormData({
          name: "",
          email: "",
          phone: "",
          projectType: "",
          requirements: "",
          budget: "",
          deadline: "",
        });
      } else {
        setError(result.error || "Submission failed");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className='min-h-screen w-full flex items-center justify-center bg-[#18181B] px-2 py-16 relative overflow-hidden'>
      {/* Glassy & glow bg gradient */}
      <div className='absolute inset-0 z-0 pointer-events-none'>
        <div className='absolute -top-40 -left-40 w-[650px] h-[450px] rounded-full bg-gradient-to-br from-[#31ffe655] via-[#fd43ad33] to-transparent blur-3xl opacity-80' />
        <div className='absolute bottom-0 right-0 w-1/2 h-1/2 rounded-full bg-gradient-to-tr from-[#fd43ad33] via-[#31ffe633] to-transparent blur-2xl opacity-70' />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className='w-full max-w-4xl mx-auto bg-black/70 backdrop-blur-2xl border-2 border-white/30 rounded-3xl shadow-[0_4px_64px_6px_rgba(56,246,255,0.12)] p-8 sm:p-14 relative z-10'
        style={{
          boxShadow: "0 0 120px 0 #31ffe62f, 0 2px 22px #fd43ad33",
        }}
      >
        <h1
          className='text-4xl font-extrabold text-center mb-2 text-white tracking-tight drop-shadow'
          style={{ fontFamily: "Montserrat, Arial, sans-serif" }}
        >
          Start Your Project with{" "}
          <span className='bg-gradient-to-tr from-[#00CFFF] via-white to-[#fd43ad] text-transparent bg-clip-text'>
            Grafixr
          </span>
        </h1>
        <p className='text-center text-white/70 mb-7 font-medium'>
          We typically reply within 24 hours. Let’s bring your ideas to life.
        </p>

        {/* Animated status feedback */}
        <AnimatePresence>
          {success && (
            <motion.div
              className='bg-green-100/90 text-green-900 p-4 rounded-xl mb-4 flex items-center gap-3 shadow-inner'
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 16 }}
            >
              <FaCheckCircle className='text-green-600 text-xl' />
              Your inquiry has been submitted! We&apos;ll get back to you
              shortly.
            </motion.div>
          )}
        </AnimatePresence>
        <AnimatePresence>
          {error && (
            <motion.div
              className='bg-red-100/90 text-red-800 p-4 rounded-xl mb-4 shadow-inner'
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 16 }}
            >
              {error}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Form */}
        <form onSubmit={handleSubmit} className='space-y-8'>
          <div className='flex flex-wrap -mx-4'>
            {/* Left side */}
            <div className='w-full md:w-1/2 px-4 space-y-6'>
              <input
                type='text'
                name='name'
                placeholder='Full Name *'
                value={formData.name}
                onChange={handleChange}
                required
                className='w-full border-2 border-white/10 bg-black/30 text-white shadow-inner p-3 rounded-xl transition-all focus:outline-none focus:ring-2 focus:ring-cyan-400/60 focus:border-cyan-300/80 placeholder:text-white/70'
              />
              <input
                type='email'
                name='email'
                placeholder='Email Address *'
                value={formData.email}
                onChange={handleChange}
                required
                className='w-full border-2 border-white/10 bg-black/30 text-white shadow-inner p-3 rounded-xl transition-all focus:outline-none focus:ring-2 focus:ring-cyan-400/60 focus:border-cyan-300/80 placeholder:text-white/70'
              />
              <input
                type='tel'
                name='phone'
                placeholder='Phone Number'
                value={formData.phone}
                onChange={handleChange}
                className='w-full border-2 border-white/10 bg-black/30 text-white shadow-inner p-3 rounded-xl transition-all focus:outline-none focus:ring-2 focus:ring-cyan-400/60 focus:border-cyan-300/80 placeholder:text-white/70'
              />
            </div>
            {/* Right side */}
            <div className='w-full md:w-1/2 px-4 space-y-6'>
              <select
                name='projectType'
                value={formData.projectType}
                onChange={handleChange}
                required
                className='w-full border-2 border-white/10 bg-black/30 text-white p-3 rounded-xl transition-all focus:outline-none focus:ring-2 focus:ring-pink-400/70 focus:border-pink-300/80'
              >
                <option value=''>Select Project Type *</option>
                <option value='graphicDesign'>Graphic Design</option>
                <option value='webDevelopment'>Web Development</option>
                <option value='both'>Both</option>
              </select>
              <input
                type='text'
                name='budget'
                placeholder='Estimated Budget (e.g. $500 - $3000)'
                value={formData.budget}
                onChange={handleChange}
                className='w-full border-2 border-white/10 bg-black/30 text-white shadow-inner p-3 rounded-xl transition-all focus:outline-none focus:ring-2 focus:ring-pink-400/70 focus:border-pink-300/80 placeholder:text-white/70'
              />
              <input
                type='date'
                name='deadline'
                value={formData.deadline}
                onChange={handleChange}
                className='w-full border-2 border-white/10 bg-black/30 text-white shadow-inner p-3 rounded-xl transition-all focus:outline-none focus:ring-2 focus:ring-pink-400/70 focus:border-pink-300/80'
              />
            </div>
          </div>
          <textarea
            name='requirements'
            rows={5}
            required
            placeholder='Describe your project in detail. What do you need? What are your goals, style preferences, or specific features? Share as much as you can to help us understand your vision.'
            value={formData.requirements}
            onChange={handleChange}
            className='w-full border-2 border-white/10 bg-black/30 text-white shadow-inner p-3 rounded-xl transition-all focus:outline-none focus:ring-2 focus:ring-cyan-400/70 focus:border-cyan-300/80 placeholder:text-white/70'
          ></textarea>
          <motion.button
            type='submit'
            disabled={submitting}
            className={`w-full py-3 font-semibold rounded-xl text-lg shadow-md transition-all duration-300 flex items-center justify-center ${
              submitting
                ? "bg-cyan-300/70 text-white cursor-not-allowed"
                : "bg-gradient-to-r from-[#00CFFF] via-[#41f4c8] to-[#fd43ad] hover:from-[#00B8E6] hover:to-[#ff77bb] text-white"
            }`}
            whileTap={{ scale: 0.97 }}
          >
            {submitting ? (
              <span className='flex items-center gap-3'>
                <svg
                  className='w-6 h-6 animate-spin text-white'
                  fill='none'
                  viewBox='0 0 24 24'
                >
                  <circle
                    className='opacity-30'
                    cx='12'
                    cy='12'
                    r='10'
                    stroke='#fff'
                    strokeWidth='4'
                  />
                  <path
                    className='opacity-80'
                    fill='#00CFFF'
                    d='M4 12a8 8 0 018-8v4l3-3-3-3v4A8 8 0 014 12z'
                  />
                </svg>
                Submitting...
              </span>
            ) : (
              <>
                <p className='text-gray-900'> Contact Us! </p>
              </>
            )}
          </motion.button>
        </form>
      </motion.div>

      {/* Floating Email Icon */}
      <a
        href='mailto:grafixr07@gmail.com'
        className='group fixed bottom-5 left-5 z-50'
        target='_blank'
        rel='noopener noreferrer'
      >
        <div className='bg-gradient-to-tr from-[#00CFFF] to-[#fd43ad] text-white rounded-full p-4 shadow-lg shadow-cyan-400/30 hover:scale-110 hover:shadow-pink-400/30 transition-transform duration-300'>
          <FaEnvelope className='w-6 h-6' />
        </div>
        <motion.div
          className='absolute bottom-[60px] left-14 transform -translate-x-1/2 bg-black/90 border border-white/10 text-white text-xs rounded-lg py-1 px-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-md'
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          grafixr07@gmail.com
        </motion.div>
      </a>
    </section>
  );
};

export default Page;
