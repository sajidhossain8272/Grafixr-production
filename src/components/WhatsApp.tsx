"use client";
import React from "react";
import dynamic from "next/dynamic";

// dynamically grab only the FaWhatsapp icon (no wildcard export!)
const FaWhatsapp = dynamic(
  () => import("react-icons/fa").then((mod) => mod.FaWhatsapp),
  { ssr: false }
);

// dynamically grab only motion.div (no wildcard export!)
const MotionDiv = dynamic(
  () => import("framer-motion").then((mod) => mod.motion.div),
  { ssr: false }
);

const glowKeyframes = {
  boxShadow: [
    "0px 0px 8px rgba(72, 187, 120, 0.5)",
    "0px 0px 20px rgba(72, 187, 120, 1)",
    "0px 0px 8px rgba(72, 187, 120, 0.5)",
  ],
  scale: [1, 1.05, 1],
};

const glowTransition = {
  duration: 2,
  ease: "easeInOut",
  repeat: Infinity,
  repeatType: "loop",
} as const;

const WhatsApp: React.FC = () => (
  <a
    href="https://wa.link/8aofmz"
    className="fixed bottom-4 right-4 z-50 group"
    target="_blank"
    rel="noopener noreferrer"
  >
    <MotionDiv
      className="bg-green-500 text-white rounded-full lg:p-4 p-5 cursor-pointer"
      animate={glowKeyframes}
      transition={glowTransition}
    >
      <FaWhatsapp className="w-8 h-8" />
    </MotionDiv>

    <div className="absolute bottom-[60px] left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
      +8801628083370
    </div>
  </a>
);

export default WhatsApp;
