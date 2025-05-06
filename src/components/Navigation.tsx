'use client'

import Link from 'next/link'
import Image from 'next/image'
import {
  useState,
  useEffect,
  useRef,
  useCallback,
} from 'react'
import { usePathname } from 'next/navigation'
import {
  FaBars,
  FaTimes,
  FaDesktop,
  FaVideo,
  FaCode,
} from 'react-icons/fa'
import clsx from 'clsx'

interface Category {
  _id: string
  mainCategory: string
  subCategories: string[]
}

const API_URL = process.env.NEXT_PUBLIC_API_URL!

function titleize(str: string) {
  return str
    .replace(/[-_]/g, ' ')
    .replace(/\b\w/g, c => c.toUpperCase())
}

export default function Navigation() {
  const pathname = usePathname()
  const [categories, setCategories] = useState<Category[]>([])
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [openCategory, setOpenCategory] = useState<string | null>(null)

  const navRef = useRef<HTMLElement>(null)
  const mobileRef = useRef<HTMLDivElement>(null)

  // Fetch categories
  useEffect(() => {
    fetch(`${API_URL}/admin/categories`)
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch categories')
        return res.json() as Promise<Category[]>
      })
      .then(setCategories)
      .catch(console.error)
  }, [])

  // Close dropdowns or mobile menu on outside click or Escape
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpenCategory(null)
      }
      if (
        isMenuOpen &&
        mobileRef.current &&
        !mobileRef.current.contains(e.target as Node)
      ) {
        setIsMenuOpen(false)
      }
    }
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        setOpenCategory(null)
        setIsMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('keydown', handleKey)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleKey)
    }
  }, [isMenuOpen])

  // Prevent background scroll when mobile open
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [isMenuOpen])

  const toggleMenu = useCallback(() => {
    setIsMenuOpen(v => !v)
  }, [])

  const toggleCategory = useCallback((cat: string) => {
    setOpenCategory(o => (o === cat ? null : cat))
  }, [])

  const isActive = (path: string) =>
    path === '/' ? pathname === '/' : pathname.startsWith(path)

  return (
    <>
      <nav
        ref={navRef}
        className="sticky top-0 bg-white border-b border-gray-200 shadow z-50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex-shrink-0">
              <Image
                src="/GrafiXr-logo-transparent-white.png"
                alt="GrafiXr"
                width={240}
                height={48}
                className="h-12 w-auto"
                priority
              />
            </Link>

            {/* Desktop menu */}
            <ul
              role="menubar"
              className="hidden md:flex items-center space-x-10 font-semibold text-lg"
            >
              <li role="none">
                <Link
                  href="/"
                  className={clsx(
                    'px-3 py-2 rounded transition',
                    isActive('/')
                      ? 'bg-gray-800 text-white'
                      : 'text-gray-900 hover:text-blue-600'
                  )}
                >
                  Home
                </Link>
              </li>

              <li role="none">
                <Link
                  href="/portfolio"
                  className={clsx(
                    'px-3 py-2 rounded transition',
                    isActive('/portfolio')
                      ? 'bg-gray-800 text-white'
                      : 'text-gray-900 hover:text-blue-600'
                  )}
                >
                  Portfolio
                </Link>
              </li>

              {/* Category dropdowns */}
              {categories.map(cat => (
                <li key={cat._id} role="none" className="relative">
                  <button
                    onClick={() => toggleCategory(cat.mainCategory)}
                    className="flex items-center gap-2 px-3 py-2 rounded transition text-gray-900 hover:text-blue-600 focus:outline-none"
                    aria-haspopup="true"
                    aria-expanded={openCategory === cat.mainCategory}
                  >
                    {cat.mainCategory === 'graphic-design' && <FaDesktop />}
                    {cat.mainCategory === 'video-editing' && <FaVideo />}
                    {cat.mainCategory === 'web-development' && <FaCode />}
                    {titleize(cat.mainCategory)}
                    <FaTimes
                      className={clsx(
                        'ml-1 transform transition-transform',
                        openCategory === cat.mainCategory
                          ? 'rotate-0'
                          : 'rotate-45'
                      )}
                    />
                  </button>
                  {openCategory === cat.mainCategory && (
                    <ul
                      role="menu"
                      className="absolute left-0 top-full mt-2 min-w-[180px] rounded-md border border-gray-200 bg-white shadow-lg py-2 z-20"
                    >
                      {cat.subCategories.map(sub => {
                        const qs = new URLSearchParams({
                          subCategory: sub,
                        }).toString() // => "subCategory=Logo+Design"
                        return (
                          <li key={sub} role="none">
                            <Link
                              href={`/portfolio?${qs}`}
                              role="menuitem"
                              onClick={() => setOpenCategory(null)}
                              className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                            >
                              {titleize(sub)}
                            </Link>
                          </li>
                        )
                      })}
                    </ul>
                  )}
                </li>
              ))}

              <li role="none">
                <Link
                  href="/about"
                  className={clsx(
                    'px-3 py-2 rounded transition',
                    isActive('/about')
                      ? 'bg-gray-800 text-white'
                      : 'text-gray-900 hover:text-blue-600'
                  )}
                >
                  About Us
                </Link>
              </li>
              <li role="none">
                <Link
                  href="/contact"
                  className={clsx(
                    'px-3 py-2 rounded transition',
                    isActive('/contact')
                      ? 'bg-gray-800 text-white'
                      : 'text-gray-900 hover:text-blue-600'
                  )}
                >
                  Contact Us
                </Link>
              </li>
            </ul>

            {/* Mobile toggle */}
            <button
              onClick={toggleMenu}
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMenuOpen}
              className="md:hidden p-2 text-gray-900 hover:text-gray-700 focus:outline-none"
            >
              {isMenuOpen ? (
                <FaTimes className="w-6 h-6" />
              ) : (
                <FaBars className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile overlay */}
      {isMenuOpen && (
        <div
          ref={mobileRef}
          className="fixed inset-0 z-50 bg-gradient-to-br from-gray-900 to-black text-white p-6 pt-24 overflow-auto"
        >
          {/* Close icon */}
          <button
            onClick={toggleMenu}
            aria-label="Close menu"
            className="absolute top-6 right-6 p-2 text-white hover:text-gray-300 focus:outline-none"
          >
            <FaTimes className="w-6 h-6" />
          </button>

          <ul className="space-y-8 text-xl font-semibold">
            <li>
              <Link href="/" onClick={toggleMenu} className="block hover:text-gray-300">
                Home
              </Link>
            </li>
            <li>
              <Link href="/portfolio" onClick={toggleMenu} className="block hover:text-gray-300">
                Portfolio
              </Link>
            </li>

            {categories.map(cat => (
              <li key={cat._id}>
                <div className="mb-3 text-2xl">{titleize(cat.mainCategory)}</div>
                <ul className="ml-4 space-y-2 text-lg">
                  {cat.subCategories.map(sub => {
                    const qs = new URLSearchParams({ subCategory: sub }).toString()
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
                    )
                  })}
                </ul>
              </li>
            ))}

            <li>
              <Link href="/about" onClick={toggleMenu} className="block hover:text-gray-300">
                About Us
              </Link>
            </li>
            <li>
              <Link href="/contact" onClick={toggleMenu} className="block hover:text-gray-300">
                Contact Us
              </Link>
            </li>
          </ul>
        </div>
      )}
    </>
  )
}
