'use client';

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import { NeonSpinner } from "./NeonSpinner";

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

const shimmer =
  "animate-pulse bg-gradient-to-r from-[#ff40b2]/30 via-[#40e0ff]/30 to-[#ff40b2]/30";

const RecentProjects: React.FC<RecentProjectsProps> = ({
  latest,
  loading = false,
  error = null,
}) => (
  <section className="py-20 bg-black text-white transition-colors duration-500">
    <div className="max-w-[97rem] mx-auto px-4">
      <motion.h2
        className="text-5xl md:text-6xl font-extrabold text-center mb-2 tracking-tight"
        style={{ fontFamily: "Montserrat, Arial, sans-serif" }}
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        RECENT PROJECTS
      </motion.h2>
      <motion.p
        className="text-center text-lg md:text-xl text-white/90 mb-14 max-w-2xl mx-auto font-semibold"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
      >
        These are our most recent and exciting projects. Take a look at what we’ve been working on!
      </motion.p>

      {loading ? (
        <div className="flex justify-center items-center min-h-[300px]">
          <NeonSpinner />
        </div>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : (
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.15,
              },
            },
          }}
        >
          {latest.map((item, idx) => (
            <motion.div
              key={item._id}
              variants={{
                hidden: { opacity: 0, y: 40 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.7, delay: idx * 0.1 }}
            >
              <Link
                href={`/portfolio?subCategory=${encodeURIComponent(item.subCategory)}`}
                className="group block h-full"
              >
                <div
                  className="rounded-[30px] bg-black shadow-2xl overflow-hidden flex flex-col justify-between min-h-[480px] transition-colors duration-500 border border-white/10 hover:border-[#40e0ff]/60 hover:shadow-[0_8px_48px_#40e0ff33]"
                  style={{
                    boxShadow: "0 8px 48px rgba(0,0,0,0.18)",
                  }}
                >
                  {/* Image or Gradient Section */}
                  <div
                    className={`w-full h-[260px] md:h-[300px] relative flex items-center justify-center ${item.files[0] ? "" : gradientClass}`}
                  >
                    {item.files[0] ? (
                      <Image
                        src={item.files[0]}
                        alt={item.title}
                        width={420}
                        height={220}
                        className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                        style={{
                          borderTopLeftRadius: 24,
                          borderTopRightRadius: 24,
                        }}
                        priority={idx < 3}
                        placeholder="blur"
                        blurDataURL="/placeholder.png"
                      />
                    ) : (
                      <div className={`w-full h-full flex items-center justify-center ${shimmer}`}>
                        <span className="text-3xl text-white/60 font-bold">No Image</span>
                      </div>
                    )}
                    {/* Category Badge */}
                    <span className="absolute top-4 left-4 bg-[#ff40b2]/90 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg uppercase tracking-wider z-10">
                      {item.mainCategory}
                    </span>
                  </div>

                  {/* Content Section */}
                  <div className="flex flex-col items-center text-center px-7 pb-8 pt-6 flex-1 bg-black">
                    <h3
                      className="text-md md:text-xl font-semibold mb-3 tracking-wide group-hover:text-[#40e0ff] transition-colors"
                      style={{
                        fontFamily: "Montserrat, Arial, sans-serif",
                        letterSpacing: "0.01em",
                      }}
                    >
                      {item.title || "PROJECT TITLE"}
                    </h3>
                    <p
                      className="text-base md:text-sm text-white/80 font-light mb-4 line-clamp-3"
                      style={{
                        fontFamily: "var(--font-geist-sans), 'Montserrat', Arial, sans-serif",
                        letterSpacing: "0.01em",
                      }}
                    >
                      {item.description ||
                        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s..."}
                    </p>
                    <div className="flex flex-wrap gap-2 justify-center mt-auto">
                      <span className="bg-[#40e0ff]/20 text-[#40e0ff] text-xs px-2 py-1 rounded-full font-medium">
                        {item.subCategory}
                      </span>
               
           
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  </section>
);

export default RecentProjects;
