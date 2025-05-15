"use client";

import React, { useRef, useEffect, forwardRef, useState } from "react";
import { motion, useInView, useAnimation } from "framer-motion";
import Image from "next/image";
import { FiChevronDown } from "react-icons/fi";
import {
  FaBrush,
  FaPalette,
  FaPenNib,
  FaVectorSquare,
  FaBezierCurve,
  FaShapes,
} from "react-icons/fa";
import dynamic from "next/dynamic";
import type { StaticImport } from "next/dist/shared/lib/get-img-props";

const Typewriter = dynamic(
  () => import("react-simple-typewriter").then((mod) => mod.Typewriter),
  { ssr: false }
);

// Replace with actual image paths
import Logo1File from "/public/img.webp";
import Logo2File from "/public/img.webp";
import Logo3File from "/public/img.webp";

export default function HeroSection() {
  const section2Ref = useRef<HTMLDivElement | null>(null);
  const section3Ref = useRef<HTMLDivElement | null>(null);
  const heroRef = useRef<HTMLDivElement | null>(null);

  const scrollToNext = (ref: React.RefObject<HTMLDivElement | null>) => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section ref={heroRef} className="w-full overflow-hidden scroll-smooth">
      <SectionBlock
        image={Logo1File}
        priority
        showButton
        onClick={() => scrollToNext(section2Ref)}
        customContent={<AnimatedIcons />}
      />
      <SectionBlock
        ref={section2Ref}
        image={Logo2File}
        showButton
        onClick={() => scrollToNext(section3Ref)}
        customContent={<FontShowcase />}
      />
      <SectionBlock
        ref={section3Ref}
        image={Logo3File}
        text={{
          title: "Where Creativity Meets Clarity",
          subtitle: "Designing visuals that connect, convert, and stay remembered.",
        }}
      />
    </section>
  );
}

type SectionBlockProps = {
  image: string | StaticImport;
  priority?: boolean;
  showButton?: boolean;
  onClick?: () => void;
  text?: {
    title: string;
    subtitle?: string;
  };
  customContent?: React.ReactNode;
};

const SectionBlock = forwardRef<HTMLDivElement, SectionBlockProps>(
  ({ image, priority = false, showButton, onClick, text, customContent }, forwardedRef) => {
    const localRef = useRef<HTMLDivElement | null>(null);
    const ref = forwardedRef ?? localRef;
    const isInView = useInView(ref as React.RefObject<Element>, { once: false, amount: 0.4 });
    const controls = useAnimation();

    useEffect(() => {
      controls.start({
        opacity: isInView ? 1 : 0.9,
        scale: isInView ? 1 : 1.01,
      });
    }, [isInView, controls]);

    return (
      <div
        ref={(node) => {
          if (typeof forwardedRef === "function") forwardedRef(node);
          else if (forwardedRef)
            (forwardedRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
          localRef.current = node;
        }}
        className="relative w-full h-screen flex items-center justify-center"
      >
        <motion.div
          initial={{ opacity: 0, scale: 1.02 }}
          animate={controls}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="absolute inset-0"
        >
          <Image
            src={image}
            alt="Background Visual"
            fill
            className="object-cover"
            priority={priority}
            sizes="100vw"
          />
        </motion.div>

        <motion.div
          className="absolute inset-0 z-10 bg-gradient-to-t from-black/80 to-black/20 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2 }}
        />

        {text && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center text-white px-4"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-lg leading-tight">
              {text.title}
            </h1>
            <p className="text-lg md:text-2xl text-gray-200 drop-shadow-md max-w-xl">
              {text.subtitle}
            </p>
          </motion.div>
        )}

        {customContent && (
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center px-6 text-white">
            {customContent}
          </div>
        )}

        {showButton && (
          <motion.button
            onClick={onClick}
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30 px-6 py-3 bg-white/20 text-white backdrop-blur-md rounded-full hover:bg-white/30 transition duration-300 flex items-center space-x-2 text-sm md:text-base"
            aria-label="Scroll to next section"
          >
            <span>Explore Next</span>
            <FiChevronDown className="w-5 h-5" />
          </motion.button>
        )}
      </div>
    );
  }
);
SectionBlock.displayName = "SectionBlock";

// ICONS ROTATING ONE AT A TIME
function AnimatedIcons() {
  const icons = [
    { Icon: FaBrush, color: "text-red-400 drop-shadow-[0_0_6px_rgba(255,0,0,0.6)]" },
    { Icon: FaPalette, color: "text-blue-400 drop-shadow-[0_0_6px_rgba(0,0,255,0.6)]" },
    { Icon: FaPenNib, color: "text-yellow-300 drop-shadow-[0_0_6px_rgba(255,255,0,0.6)]" },
    { Icon: FaVectorSquare, color: "text-green-400 drop-shadow-[0_0_6px_rgba(0,255,0,0.6)]" },
    { Icon: FaBezierCurve, color: "text-pink-400 drop-shadow-[0_0_6px_rgba(255,0,255,0.6)]" },
    { Icon: FaShapes, color: "text-purple-400 drop-shadow-[0_0_6px_rgba(128,0,128,0.6)]" },
  ];

  const positions = [
    { top: "15%", left: "20%" },
    { top: "35%", left: "70%" },
    { top: "60%", left: "40%" },
    { top: "75%", left: "60%" },
    { top: "25%", left: "30%" },
    { top: "50%", left: "80%" },
  ];

  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % icons.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-full">
      {icons.map(({ Icon, color }, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0.3 }}
          animate={
            activeIndex === i
              ? { opacity: 1, scale: 1 }
              : { opacity: 0, scale: 0.3 }
          }
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className={`absolute text-6xl sm:text-7xl transition-all duration-500 ${color}`}
          style={positions[i]}
        >
          <Icon />
        </motion.div>
      ))}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute inset-0 flex items-center justify-center w-full h-full text-2xl sm:text-3xl font-semibold text-white text-center"
      >
        <Typewriter
          words={["Design that Speaks.", "Visuals that Sell.", "Creativity that Converts."]}
          loop
          cursor
          cursorStyle="|"
          typeSpeed={70}
          deleteSpeed={50}
          delaySpeed={500}
        />
      </motion.div>
    </div>
  );
}

function FontShowcase() {
  const fonts = [
    { name: "Comic Neue", font: "'Comic Neue', cursive" },
    { name: "Indie Flower", font: "'Indie Flower', cursive" },
    { name: "Amatic SC", font: "'Amatic SC', cursive" },
    { name: "Pacifico", font: "'Pacifico', cursive" },
    { name: "Bangers", font: "'Bangers', cursive" },
    { name: "Fredericka the Great", font: "'Fredericka the Great', cursive" },
    { name: "Rubik Doodle Shadow", font: "'Rubik Doodle Shadow', cursive" },
    { name: "Permanent Marker", font: "'Permanent Marker', cursive" },
  ];

  return (
    <div className="text-center space-y-6">
      <h2 className="text-3xl sm:text-5xl font-bold text-white">Fonts We Work With</h2>
      <p className="text-lg text-gray-300 max-w-2xl mx-auto">
        A curated collection of funky, bold, expressive fonts that elevate your designs.
      </p>
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.3 }}
        variants={{
          hidden: {},
          show: { transition: { staggerChildren: 0.1 } },
        }}
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 text-white text-center mt-6"
      >
        {fonts.map((font, i) => (
          <motion.div
            key={i}
            variants={{
              hidden: { opacity: 0, y: 20 },
              show: { opacity: 1, y: 0 },
            }}
            style={{ fontFamily: font.font }}
            className="text-xl sm:text-2xl font-semibold tracking-wide"
          >
            {font.name}
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
