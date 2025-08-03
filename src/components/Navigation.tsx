/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import Link from "next/link";
import { useState, useEffect, useRef, useCallback } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  FaBars,
  FaTimes,
  FaDesktop,
  FaVideo,
  FaCode,
  FaSearch,
} from "react-icons/fa";
import clsx from "clsx";
import { motion, AnimatePresence } from "framer-motion";

const CYAN = "#31ffe6";
const PINK = "#fd43ad";
const DARK = "#18181B";

interface Category {
  _id: string;
  mainCategory: string;
  subCategories: string[];
}

interface SearchPortfolioItem {
  _id: string;
  title: string;
  mainCategory: string;
  subCategory: string;
  files: string[];
}

const API_URL = process.env.NEXT_PUBLIC_API_URL!;

function titleize(str: string) {
  return str.replace(/[-_]/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

export default function Navigation() {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [categories, setCategories] = useState<Category[]>([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openCategory, setOpenCategory] = useState<string | null>(null);
  const [showNav, setShowNav] = useState(true);

  const [searchInput, setSearchInput] = useState("");
  const [searchResults, setSearchResults] = useState<SearchPortfolioItem[]>([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [focusedIdx, setFocusedIdx] = useState<number>(-1);

  const navRef = useRef<HTMLElement>(null);
  const mobileRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const lastScrollY = useRef(0);

  // Fetch categories
  useEffect(() => {
    fetch(`${API_URL}/admin/categories`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch categories");
        return res.json() as Promise<Category[]>;
      })
      .then(setCategories)
      .catch(console.error);
  }, []);

  // Show/hide nav on scroll
  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      setShowNav(currentScroll <= lastScrollY.current || currentScroll <= 100);
      lastScrollY.current = currentScroll;
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menus on click outside or ESC
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (navRef.current && !navRef.current.contains(e.target as Node)) setOpenCategory(null);
      if (isMenuOpen && mobileRef.current && !mobileRef.current.contains(e.target as Node))
        setIsMenuOpen(false);
      if (
        searchRef.current &&
        !searchRef.current.contains(e.target as Node) &&
        !(e.target as HTMLElement)?.closest(".search-dropdown")
      ) {
        setShowDropdown(false);
      }
    }
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setOpenCategory(null);
        setIsMenuOpen(false);
        setShowDropdown(false);
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

  // Keep searchInput in sync with URL's "search" param (if changed externally)
  useEffect(() => {
    setSearchInput(searchParams.get("search") ?? "");
    // eslint-disable-next-line
  }, [searchParams]);

  // LIVE SEARCH: Fetch results as user types (debounced)
  useEffect(() => {
    if (!searchInput.trim()) {
      setSearchResults([]);
      setSearchLoading(false);
      return;
    }
    setSearchLoading(true);
    const timeout = setTimeout(() => {
      fetch(`${API_URL}/portfolio?search=${encodeURIComponent(searchInput.trim())}`)
        .then(res => res.ok ? res.json() : [])
        .then((results: SearchPortfolioItem[]) => {
          setSearchResults(results.slice(0, 8));
          setSearchLoading(false);
        })
        .catch(() => {
          setSearchResults([]);
          setSearchLoading(false);
        });
    }, 330);
    return () => clearTimeout(timeout);
  }, [searchInput]);

  // Show dropdown if input focused and not empty
  function handleInputFocus() {
    if (searchInput.trim()) setShowDropdown(true);
  }
  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchInput(e.target.value);
    setShowDropdown(!!e.target.value.trim());
    setFocusedIdx(-1);
  }
  function handleResultClick(id: string) {
    setShowDropdown(false);
    setSearchInput("");
    router.push(`/portfolio/${id}`);
    setIsMenuOpen(false);
  }

  // Keyboard nav in dropdown
  function handleSearchKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (!searchResults.length) return;
    if (e.key === "ArrowDown") {
      setFocusedIdx(idx => (idx + 1) % searchResults.length);
    } else if (e.key === "ArrowUp") {
      setFocusedIdx(idx => (idx - 1 + searchResults.length) % searchResults.length);
    } else if (e.key === "Enter" && focusedIdx >= 0 && focusedIdx < searchResults.length) {
      e.preventDefault();
      handleResultClick(searchResults[focusedIdx]._id);
    }
  }

  // Search submit handler: If dropdown is open and an item is focused, go to that item; else route to portfolio with search param
  function handleSearchSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (showDropdown && focusedIdx >= 0 && focusedIdx < searchResults.length) {
      handleResultClick(searchResults[focusedIdx]._id);
      return;
    }
    const url = new URL(window.location.origin + "/portfolio");
    if (searchInput.trim()) url.searchParams.set("search", searchInput.trim());
    router.push(url.pathname + url.search);
    setShowDropdown(false);
    setIsMenuOpen(false);
  }

  return (
    <>
      {/* Main Nav */}
      <motion.nav
        initial={{ y: 0 }}
        animate={{ y: showNav ? 0 : -100 }}
        transition={{ duration: 0.28, ease: "easeInOut" }}
        ref={navRef}
        className="fixed top-0 left-0 w-full z-50 text-white shadow-md border-b border-white/10 bg-gradient-to-r from-[#18181B]/80 via-[#23232b]/70 to-[#18181B]/85 backdrop-blur-xl"
        style={{
          background:
            "linear-gradient(90deg, #101013 0%, #18181B 55%, #23232b 100%)",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="flex h-16 items-center justify-between">
            {/* Logo Placeholder */}
            {/* <Link href="/" className="flex-shrink-0">
              <img src="/GrafiXr-logo-transparent.png" alt="GrafiXr" className="h-12 w-auto" />
            </Link> */}

            {/* Desktop Menu */}
            <ul className="hidden md:flex items-center space-x-10 font-semibold text-[1.13rem] tracking-tight">
              <li>
                <Link
                  href="/"
                  className={clsx(
                    isActive("/") ? "text-cyan-400 drop-shadow-[0_2px_10px_#31ffe6cc] font-bold" : "hover:text-cyan-300 transition"
                  )}
                >
                  HOME
                </Link>
              </li>
              <li>
                <Link
                  href="/portfolio"
                  className={clsx(
                    isActive("/portfolio")
                      ? "text-pink-400 drop-shadow-[0_2px_10px_#fd43adcc] font-bold"
                      : "hover:text-pink-400 transition"
                  )}
                >
                  PORTFOLIO
                </Link>
              </li>
              {/* {categories.map((cat) => (
                <li key={cat._id} className="relative">
                  <button
                    onClick={() => toggleCategory(cat.mainCategory)}
                    className={clsx(
                      "flex items-center gap-2 px-3 py-1 hover:text-cyan-300 hover:drop-shadow-[0_2px_10px_#31ffe6] rounded transition",
                      openCategory === cat.mainCategory && "bg-cyan-400/10 text-cyan-300"
                    )}
                  >
                    {cat.mainCategory === "graphic-design" && <FaDesktop />}
                    {cat.mainCategory === "video-editing" && <FaVideo />}
                    {cat.mainCategory === "web-development" && <FaCode />}
                    {titleize(cat.mainCategory)}
                    <span
                      className={clsx(
                        "ml-1 text-xs inline-block transition-transform duration-150",
                        openCategory === cat.mainCategory ? "rotate-0" : "rotate-45"
                      )}
                    >
                      <FaTimes />
                    </span>
                  </button>
                </li>
              ))} */}
              <li>
                <Link
                  href="/feedback"
                  className={clsx(
                    isActive("/feedback")
                      ? "text-cyan-400 font-bold drop-shadow-[0_2px_10px_#31ffe6cc]"
                      : "hover:text-cyan-300 transition"
                  )}
                >
                  FEEDBACK
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className={clsx(
                    isActive("/about")
                      ? "text-pink-400 font-bold drop-shadow-[0_2px_10px_#fd43adcc]"
                      : "hover:text-pink-300 transition"
                  )}
                >
                  ABOUT
                </Link>
              </li>
            </ul>

            {/* Hamburger for Mobile */}
            <button
              onClick={toggleMenu}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              className="md:hidden p-2 text-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-300"
            >
              {isMenuOpen ? <FaTimes className="w-7 h-7" /> : <FaBars className="w-7 h-7" />}
            </button>

            {/* Search Bar (ALWAYS on right, even on mobile) */}
            <div className="relative" style={{ maxWidth: "280px" }}>
              <form
                onSubmit={handleSearchSubmit}
                className="flex items-center gap-2 md:static md:ml-4 md:relative z-50"
                autoComplete="off"
              >
                <input
                  type="text"
                  ref={searchRef}
                  value={searchInput}
                  onChange={handleInputChange}
                  placeholder="Search"
                  className="rounded-full border border-cyan-400/50 bg-black/60 px-4 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-pink-400 shadow-inner transition w-full"
                  style={{ minWidth: 80, maxWidth: 220 }}
                  onFocus={handleInputFocus}
                  onKeyDown={handleSearchKeyDown}
                  spellCheck={false}
                />
                <button
                  type="submit"
                  className="text-cyan-400 p-2 hover:scale-110 focus:outline-none"
                  tabIndex={-1}
                >
                  <FaSearch />
                </button>
                {/* Dropdown renders only here! */}
                <AnimatePresence>
                  {showDropdown && searchInput.trim() && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      className={`
                        search-dropdown absolute left-0 top-full mt-2
                        w-[320px] max-w-[92vw]
                        bg-[#18181B] border-2 border-cyan-400/40
                        rounded-2xl shadow-2xl z-[9999] py-2
                      `}
                      style={{
                        pointerEvents: "auto",
                      }}
                    >
                      {searchLoading && (
                        <div className="px-4 py-3 text-cyan-300 text-center">
                          Searching...
                        </div>
                      )}
                      {!searchLoading && searchResults.length === 0 && (
                        <div className="px-4 py-3 text-gray-400 text-center">
                          No matches found.
                        </div>
                      )}
                      {!searchLoading &&
                        searchResults.map((item, idx) => (
                          <button
                            type="button"
                            key={item._id}
                            className={clsx(
                              "flex items-center w-full gap-4 px-3 py-2 hover:bg-cyan-400/10 rounded-lg transition text-left",
                              focusedIdx === idx ? "bg-cyan-400/20" : ""
                            )}
                            onClick={() => handleResultClick(item._id)}
                            onMouseEnter={() => setFocusedIdx(idx)}
                            tabIndex={-1}
                          >
                            <div className="w-12 h-12 rounded-xl bg-cyan-400/10 border border-cyan-300 overflow-hidden flex-shrink-0 flex items-center justify-center">
                              <img
                                src={item.files?.[0]}
                                alt={item.title}
                                className="w-full h-full object-cover"
                                style={{ borderRadius: 8 }}
                                onError={e => {
                                  (e.target as HTMLImageElement).style.display = "none";
                                }}
                              />
                            </div>
                            <div>
                              <div className="font-bold text-cyan-200 leading-tight">
                                {item.title}
                              </div>
                              <div className="text-xs text-white/60">
                                {titleize(item.mainCategory)} • {titleize(item.subCategory)}
                              </div>
                            </div>
                          </button>
                        ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </form>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            ref={mobileRef}
            initial={{ opacity: 0, x: 32 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 32 }}
            transition={{ duration: 0.26, ease: "easeOut" }}
            className="fixed inset-0 z-[100] bg-gradient-to-br from-[#101013] via-[#191924] to-[#18181B] bg-opacity-95 backdrop-blur-xl text-white p-8 pt-24 overflow-auto"
          >
            {/* Close Icon - floating top-right */}
            <button
              onClick={toggleMenu}
              aria-label="Close menu"
              className="fixed top-8 right-7 bg-cyan-400/90 text-[#18181B] rounded-full p-3 shadow-2xl z-[101] transition hover:scale-110 hover:bg-pink-400/90"
              style={{
                boxShadow: "0 0 32px 0 #31ffe6cc",
              }}
            >
              <FaTimes className="w-7 h-7" />
            </button>

            <ul className="space-y-9 text-2xl font-bold mt-2 mb-8">
              <li>
                <Link href="/" onClick={toggleMenu} className="block hover:text-cyan-300 transition">Home</Link>
              </li>
              <li>
                <Link href="/portfolio" onClick={toggleMenu} className="block hover:text-pink-400 transition">Portfolio</Link>
              </li>
              {categories.map((cat) => (
                <li key={cat._id}>
                  <div className="mb-2 text-[1.2em] text-cyan-300">{titleize(cat.mainCategory)}</div>
                  <ul className="ml-4 space-y-2 text-lg">
                    {cat.subCategories.map((sub) => {
                      const qs = new URLSearchParams({ subCategory: sub }).toString();
                      return (
                        <li key={sub}>
                          <Link
                            href={`/portfolio?${qs}`}
                            onClick={toggleMenu}
                            className="block hover:text-pink-300 transition"
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
                <Link href="/feedback" onClick={toggleMenu} className="block hover:text-cyan-300 transition">Feedback</Link>
              </li>
              <li>
                <Link href="/about" onClick={toggleMenu} className="block hover:text-pink-400 transition">About</Link>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
