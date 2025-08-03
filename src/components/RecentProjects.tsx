'use client';

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";

interface Project {
  _id: string;
  title: string;
  description: string;
  mainCategory: string;
  subCategory: string;
  mediaType: "image" | "video";
  files: string[];
  createdAt: string;
}

interface RecentProjectsProps {
  latest: Project[];
  loading?: boolean;
  error?: string | null;
}

const gradientClass =
  "bg-gradient-to-b from-[#ff40b2] via-white to-[#40e0ff]";

const RecentProjects: React.FC<RecentProjectsProps> = ({
  latest,
  loading = false,
  error = null,
}) => (
  <section className="py-20 bg-black  text-white  transition-colors duration-500">
    <h2 className="text-5xl md:text-6xl font-extrabold text-center mb-2 tracking-tight"
      style={{ fontFamily: "Montserrat, Arial, sans-serif" }}>
      RECENT PROJECTS
    </h2>
    <p className="text-center text-lg md:text-xl text-white/90 mb-14 max-w-2xl mx-auto font-semibold">
      These are our most recent and exciting projects. Take a look at what we’ve been working on!
    </p>
    {loading ? (
      <div className="flex justify-center items-center min-h-[180px]">Loading...</div>
    ) : error ? (
      <p className="text-center text-red-500">{error}</p>
    ) : (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 max-w-7xl mx-auto px-6">
        {latest.map((item, idx) => (
          <Link
            key={item._id}
            href={`/portfolio?subCategory=${encodeURIComponent(item.subCategory)}`}
            className="group"
          >
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: idx * 0.2 }}
              viewport={{ once: true }}
              className="rounded-[30px] border border-white/80  bg-black shadow-2xl overflow-hidden flex flex-col justify-between min-h-[480px] transition-colors duration-500"
              style={{
                boxShadow: "0 8px 48px rgba(0,0,0,0.18)",
              }}
            >
              {/* Gradient or Image Section */}
              <div className={`w-full h-[220px] ${gradientClass} flex items-center justify-center`}>
                {item.files[0] ? (
                  <Image
                    src={item.files[0]}
                    alt={item.title}
                    width={420}
                    height={220}
                    className="object-cover w-full h-full"
                    style={{ borderTopLeftRadius: 24, borderTopRightRadius: 24 }}
                  />
                ) : null}
                {!item.files[0] && (
                  // Gradient placeholder for projects with no image
                  <div className="w-full h-full" />
                )}
              </div>

              {/* Content Section */}
              <div className="flex flex-col items-center text-center px-6 pb-8 pt-6 flex-1 bg-black ">
                <h3
                  className="text-3xl md:text-3xl font-semibold mb-3 tracking-wide"
                  style={{ fontFamily: "Montserrat, Arial, sans-serif", letterSpacing: "0.01em" }}
                >
                  {item.title || "PROJECT TITLE"}
                </h3>
                <p className="text-base md:text-lg text-white/80 font-light"
                  style={{
                    fontFamily: "var(--font-geist-sans), 'Montserrat', Arial, sans-serif",
                    letterSpacing: "0.01em",
                  }}>
                  {item.description ||
                    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s..."}
                </p>
              </div>
            </motion.div>
          </Link>
        ))}
      </div>
    )}
  </section>
);

export default RecentProjects;
