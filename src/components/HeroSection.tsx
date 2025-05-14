"use client";

import React, { useRef, useEffect, forwardRef } from "react";
import { motion, useInView, useAnimation } from "framer-motion";
import Image from "next/image";
import { FiChevronDown } from "react-icons/fi";
import { useHeroVisibility } from "@/components/HeroVisibilityContext";

import Logo1File from "/public/logo1.jpg";
import Logo2File from "/public/logo2.jpg";
import Logo3File from "/public/logo3.jpg";

export default function HeroSection() {
  const section2Ref = useRef<HTMLDivElement | null>(null);
  const section3Ref = useRef<HTMLDivElement | null>(null);
  const heroRef = useRef<HTMLDivElement | null>(null);
  const { setHeroVisible } = useHeroVisibility();

  // Detect visibility of HeroSection to toggle navbar
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setHeroVisible(entry.isIntersecting),
      { threshold: 0.3 }
    );
    if (heroRef.current) observer.observe(heroRef.current);
    return () => observer.disconnect();
  }, [setHeroVisible]);

  const scrollToNext = (ref: React.RefObject<HTMLDivElement | null>) => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section ref={heroRef} className="w-full overflow-hidden">
      <SectionBlock
        image={Logo1File}
        priority
        showButton
        onClick={() => scrollToNext(section2Ref)}
      />
      <SectionBlock
        ref={section2Ref}
        image={Logo2File}
        showButton
        onClick={() => scrollToNext(section3Ref)}
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

import type { StaticImport } from "next/dist/shared/lib/get-img-props";

type SectionBlockProps = {
  image: string | StaticImport;
  priority?: boolean;
  showButton?: boolean;
  onClick?: () => void;
  text?: {
    title: string;
    subtitle?: string;
  };
};

const SectionBlock = forwardRef<HTMLDivElement, SectionBlockProps>(
  ({ image, priority = false, showButton, onClick, text }, forwardedRef) => {
    const localRef = useRef<HTMLDivElement | null>(null);
    const ref = (forwardedRef && typeof forwardedRef !== "function" ? forwardedRef : localRef);
    const isInView = useInView(ref as React.RefObject<Element>, { once: false, amount: 0.5 });
    const controls = useAnimation();

    useEffect(() => {
      if (isInView) {
        controls.start({ opacity: 1, scale: 1 });
      } else {
        controls.start({ opacity: 0.9, scale: 1.01 });
      }
    }, [isInView, controls]);

    return (
      <div
        ref={(node) => {
          if (typeof forwardedRef === "function") {
            forwardedRef(node);
          } else if (forwardedRef) {
            (forwardedRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
          }
          localRef.current = node;
        }}
        className="relative w-full h-screen flex items-center justify-center"
      >
        {/* Background image */}
        <motion.div
          initial={{ opacity: 0, scale: 1.02 }}
          animate={controls}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="absolute inset-0"
        >
          <Image
            src={image}
            alt="Visual background"
            fill
            className="object-cover"
            priority={priority}
            sizes="100vw"
          />
        </motion.div>

        {/* Enhanced Blur Overlay */}
        <motion.div
          className="absolute inset-0 z-10 bg-gradient-to-t from-black/60 to-black/20 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2 }}
        />

        {/* Text Content */}
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
            {text.subtitle && (
              <p className="text-lg md:text-2xl text-gray-200 drop-shadow-md max-w-xl">
                {text.subtitle}
              </p>
            )}
          </motion.div>
        )}

        {/* Scroll Button */}
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
