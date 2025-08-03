"use client";

import Link from "next/link";
// import Image from "next/image";
import { useState, useEffect, useRef, useCallback } from "react";
import { usePathname } from "next/navigation";
import {
  FaBars,
  FaTimes,
  FaDesktop,
  FaVideo,
  FaCode,
  FaSearch,
} from "react-icons/fa";
import clsx from "clsx";
import { motion } from "framer-motion";

interface Category {
  _id: string;
  mainCategory: string;
  subCategories: string[];
}

const API_URL = process.env.NEXT_PUBLIC_API_URL!;

function titleize(str: string) {
  return str.replace(/[-_]/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

export default function Navigation() {
  const pathname = usePathname();
  const [categories, setCategories] = useState<Category[]>([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openCategory, setOpenCategory] = useState<string | null>(null);
  const [showNav, setShowNav] = useState(true);

  const navRef = useRef<HTMLElement>(null);
  const mobileRef = useRef<HTMLDivElement>(null);
  const lastScrollY = useRef(0);

  useEffect(() => {
    fetch(`${API_URL}/admin/categories`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch categories");
        return res.json() as Promise<Category[]>;
      })
      .then(setCategories)
      .catch(console.error);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      setShowNav(currentScroll <= lastScrollY.current || currentScroll <= 100);
      lastScrollY.current = currentScroll;
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (navRef.current && !navRef.current.contains(e.target as Node)) setOpenCategory(null);
      if (isMenuOpen && mobileRef.current && !mobileRef.current.contains(e.target as Node))
        setIsMenuOpen(false);
    }
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setOpenCategory(null);
        setIsMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKey);
    };
  }, [isMenuOpen]);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  const toggleMenu = useCallback(() => {
    setIsMenuOpen((v) => !v);
  }, []);

  const toggleCategory = useCallback((cat: string) => {
    setOpenCategory((o) => (o === cat ? null : cat));
  }, []);

  const isActive = (path: string) =>
    path === "/" ? pathname === "/" : pathname.startsWith(path);

  return (
    <>
      <motion.nav
        initial={{ y: 0 }}
        animate={{ y: showNav ? 0 : -100 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        ref={navRef}
        className="fixed top-0 left-0 w-full z-50 text-black shadow-md border-b border-white/10 bg-gradient-to-r from-cyan-400 via-white to-pink-400 backdrop-blur-md"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            {/* <Link href="/" className="flex-shrink-0">
              <Image
                src="/GrafiXr-logo-transparent.png"
                alt="GrafiXr"
                width={240}
                height={48}
                className="h-12 w-auto"
                priority
              />
            </Link> */}

            {/* Desktop Menu */}
            <ul className="hidden md:flex items-center space-x-10 font-semibold text-lg">
              <li>
                <Link
                  href="/"
                  className={clsx(
                    isActive("/") ? "text-black font-bold" : "hover:text-gray-700"
                  )}
                >
                  HOME
                </Link>
              </li>
              <li>
                <Link
                  href="/portfolio"
                  className={clsx(
                    isActive("/portfolio") ? "text-black font-bold" : "hover:text-gray-700"
                  )}
                >
                  PORTFOLIO
                </Link>
              </li>
              {categories.map((cat) => (
                <li key={cat._id} className="relative">
                  <button
                    onClick={() => toggleCategory(cat.mainCategory)}
                    className="flex items-center gap-2 px-2 py-1 hover:text-blue-500"
                  >
                    {cat.mainCategory === "graphic-design" && <FaDesktop />}
                    {cat.mainCategory === "video-editing" && <FaVideo />}
                    {cat.mainCategory === "web-development" && <FaCode />}
                    {titleize(cat.mainCategory)}
                    <FaTimes
                      className={clsx(
                        "ml-1 transform transition-transform",
                        openCategory === cat.mainCategory ? "rotate-0" : "rotate-45"
                      )}
                    />
                  </button>
                  {openCategory === cat.mainCategory && (
                    <ul className="absolute left-0 top-full mt-2 min-w-[180px] rounded-md border border-gray-600 bg-white text-black shadow-lg py-2 z-20">
                      {cat.subCategories.map((sub) => {
                        const qs = new URLSearchParams({ subCategory: sub }).toString();
                        return (
                          <li key={sub}>
                            <Link
                              href={`/portfolio?${qs}`}
                              onClick={() => setOpenCategory(null)}
                              className="block px-4 py-2 hover:bg-gray-100"
                            >
                              {titleize(sub)}
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </li>
              ))}
              <li>
                <Link
                  href="/feedback"
                  className={clsx(
                    isActive("/feedback") ? "text-black font-bold" : "hover:text-gray-700"
                  )}
                >
                  FEEDBACK
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className={clsx(
                    isActive("/about") ? "text-black font-bold" : "hover:text-gray-700"
                  )}
                >
                  ABOUT
                </Link>
              </li>
            </ul>

            {/* Search Bar */}
            <div className="hidden md:flex relative items-center">
              <input
                type="text"
                placeholder="Search"
                className="rounded-full border border-black px-4 py-1 text-sm focus:outline-none"
              />
              <FaSearch className="absolute right-3 text-black" />
            </div>

            {/* Mobile Menu Toggle */}
            <button
              onClick={toggleMenu}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              className="md:hidden p-2 text-black"
            >
              {isMenuOpen ? <FaTimes className="w-6 h-6" /> : <FaBars className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div
          ref={mobileRef}
          className="fixed inset-0 z-50 bg-gradient-to-br from-gray-900 to-black text-white p-6 pt-24 overflow-auto"
        >
          <ul className="space-y-8 text-xl font-semibold">
            <li>
              <Link href="/" onClick={toggleMenu}>
                Home
              </Link>
            </li>
            <li>
              <Link href="/portfolio" onClick={toggleMenu}>
                Portfolio
              </Link>
            </li>
            {categories.map((cat) => (
              <li key={cat._id}>
                <div className="mb-3 text-2xl">{titleize(cat.mainCategory)}</div>
                <ul className="ml-4 space-y-2 text-lg">
                  {cat.subCategories.map((sub) => {
                    const qs = new URLSearchParams({ subCategory: sub }).toString();
                    return (
                      <li key={sub}>
                        <Link
                          href={`/portfolio?${qs}`}
                          onClick={toggleMenu}
                          className="block hover:text-gray-300"
                        >
                          {titleize(sub)}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </li>
            ))}
            <li>
              <Link href="/feedback" onClick={toggleMenu}>
                Feedback
              </Link>
            </li>
            <li>
              <Link href="/about" onClick={toggleMenu}>
                About
              </Link>
            </li>
          </ul>
        </div>
      )}
    </>
  );
}
