"use client";

import React, { useState, ChangeEvent, FormEvent } from "react";
import type { NextPage } from "next";
import { FaEnvelope, FaCheckCircle } from "react-icons/fa";

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
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className='min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6'>
      <div className='max-w-4xl w-full bg-white shadow-lg rounded-lg px-10 py-14'>
        <h1 className='text-4xl font-bold text-center mb-2'>
          Start Your Project with Grafi<span className="text-[#00CFFF]">xr</span>
        </h1>
        <p className='text-center text-sm text-gray-600 mb-6'>
          We typically reply within 24 hours. Let&apos;s bring your ideas to
          life.
        </p>

        {/* Success Message */}
        {success && (
          <div className='bg-green-100 text-green-800 p-4 rounded mb-4 flex items-center gap-2'>
            <FaCheckCircle className='text-green-600' />
            Your inquiry has been submitted! We&apos;ll get back to you shortly.
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className='bg-red-100 text-red-700 p-4 rounded mb-4'>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className='space-y-6'>
          <div className='flex flex-wrap -mx-4'>
            <div className='w-full md:w-1/2 px-4 space-y-6'>
              <input
                type='text'
                name='name'
                placeholder='Full Name *'
                value={formData.name}
                onChange={handleChange}
                required
                className='w-full border border-gray-100 shadow p-3 rounded focus:ring-1 focus:ring-blue-500'
              />
              <input
                type='email'
                name='email'
                placeholder='Email Address *'
                value={formData.email}
                onChange={handleChange}
                required
                className='w-full border border-gray-100 shadow p-3 rounded focus:ring-1 focus:ring-blue-500'
              />
              <input
                type='tel'
                name='phone'
                placeholder='Phone Number'
                value={formData.phone}
                onChange={handleChange}
                className='w-full border border-gray-100 shadow p-3 rounded focus:ring-1 focus:ring-blue-500'
              />
            </div>
            <div className='w-full md:w-1/2 px-4 space-y-6'>
              <select
                name='projectType'
                value={formData.projectType}
                onChange={handleChange}
                required
                className='w-full border border-gray-100 shadow p-3 rounded text-gray-700 bg-white focus:ring-1 focus:ring-blue-500'
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
                className='w-full border border-gray-100 shadow p-3 rounded focus:ring-1 focus:ring-blue-500'
              />
              <input
                type='date'
                name='deadline'
                value={formData.deadline}
                onChange={handleChange}
                className='w-full border border-gray-100 shadow p-3 rounded focus:ring-1 focus:ring-blue-500'
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
            className='w-full border border-gray-100 shadow p-3 rounded focus:ring-1 focus:ring-blue-500'
          ></textarea>

          <button
            type='submit'
            disabled={submitting}
            className={`w-full py-3 font-semibold rounded text-white transition cursor-pointer ${
              submitting ? "bg-gray-500" : "bg-[#00CFFF] hover:bg-[#00B8E6]"
            }`}
          >
            {submitting ? "Submitting..." : "Contact Us!"}
          </button>
        </form>
      </div>

      {/* Floating Email Icon */}
      <a
        href='mailto:sajidhossain8272@gmail.com'
        className='group fixed bottom-4 left-4 z-50'
        target='_blank'
        rel='noopener noreferrer'
      >
        <div className='bg-blue-600 text-white rounded-full p-4 shadow-md hover:scale-105 transition-transform'>
          <FaEnvelope className='w-6 h-6' />
        </div>
        <div className='absolute bottom-[60px] left-[50px] transform -translate-x-1/2 bg-blue-700 text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow'>
          sajidhossain8272@gmail.com
        </div>
      </a>
    </div>
  );
};

export default Page;
