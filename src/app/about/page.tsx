/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React, { useState, useEffect } from "react";
import { FaArrowRight, FaPhoneAlt } from "react-icons/fa";
import { motion } from "framer-motion";
import Image from "next/image";
import { useRouter } from 'next/navigation';


export default function AboutPage() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState(""); // "", "success", "error"
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const API_URL = process.env.NEXT_PUBLIC_API_URL || "";

  const handleSubscribe = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setStatus("");
    setMessage("");
    setLoading(true);

    try {
      const res = await fetch(`${API_URL}/newsletter/subscribe`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();

      if (res.ok) {
        setStatus("success");
        setMessage("Subscribed successfully! 🎉");
        setEmail("");
        setShowModal(true);
      } else {
        setStatus("error");
        setMessage(data?.error || "Subscription failed. Try again.");
        setShowModal(true);
      }
    } catch (err) {
      setStatus("error");
      setMessage("Something went wrong. Please try again.");
      setShowModal(true);
    }
    setLoading(false);
  };

  // Hide modal after 3 seconds
  useEffect(() => {
    if (showModal) {
      const timer = setTimeout(() => {
        setShowModal(false);
        setStatus("");
        setMessage("");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showModal]);
  const router = useRouter();

  return (
    <section className="min-h-screen w-full flex items-center justify-center bg-[#18181B] px-1 sm:px-2 relative overflow-hidden">
      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40">
          <div
            className={`px-7 py-6 rounded-xl shadow-lg backdrop-blur-md bg-white/90 text-center max-w-xs w-full border-2 ${
              status === "success"
                ? "border-green-400"
                : "border-red-400"
            }`}
          >
            <span
              className={`block font-semibold text-lg mb-1 ${
                status === "success"
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              {status === "success" ? "Success" : "Error"}
            </span>
            <span className="block text-base text-gray-900">{message}</span>
          </div>
        </div>
      )}

      {/* Soft BG Gradient */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute -top-32 -left-24 w-2/3 h-2/3 rounded-full bg-gradient-to-br from-[#31ffe633] via-[#fd43ad18] to-transparent blur-3xl opacity-60" />
        <div className="absolute bottom-0 right-0 w-1/2 h-1/2 rounded-full bg-gradient-to-tr from-[#fd43ad33] to-transparent blur-2xl opacity-50" />
      </div>

      {/* Main Card */}
      <div className="w-full max-w-6xl bg-black/90 rounded-[22px] sm:rounded-[32px] border-2 border-white/60 px-2 sm:px-6 md:px-10 py-5 sm:py-10 md:py-14 mx-auto relative shadow-[0_0_80px_10px_rgba(56,246,255,0.09)] overflow-visible backdrop-blur-xl">
        {/* 3D Pill Shape */}
        <motion.img
          src="/Arrow-left.png"
          alt="3D Pill"
          className="absolute left-[-34px] top-[-24px] w-[70px] md:w-[110px] lg:w-[150px] z-0 hidden md:block"
          initial={{ opacity: 0, x: -50, rotate: 30 }}
          animate={{ opacity: 1, x: 0, rotate: 0 }}
          transition={{ duration: 1, delay: 0.18 }}
          draggable={false}
          style={{ pointerEvents: "none" }}
        />

        {/* 3D Cube (SVG) */}
        <motion.div
          initial={{ opacity: 0, y: -30, rotate: 20 }}
          animate={{ opacity: 1, y: 0, rotate: 0 }}
          transition={{ duration: 1, delay: 0.32 }}
          className="absolute right-[-28px] top-[32px] w-[58px] md:w-[90px] lg:w-[120px] z-0 hidden sm:block"
        >
          <svg width="100%" height="100%" viewBox="0 0 120 120">
            <g>
              <polygon points="30,100 100,100 70,60 0,60" fill="#fd43ad" />
              <polygon points="0,0 70,0 100,40 30,40" fill="#C7FFFC" />
              <polygon points="0,0 0,60 30,100 30,40" fill="#81D9F7" />
            </g>
          </svg>
        </motion.div>

        {/* Upper Right Arrow */}
   <div
      onClick={() => router.push('/contact')}
      className="cursor-pointer"
      style={{ position: 'absolute', top: '1rem', right: '0.75rem', zIndex: 50 }}
    >
      <motion.img
        src="/Arrow-upper-right.png"
        alt="Upper right arrow"
        className="w-[26px] sm:w-[32px] md:w-[32px]"
        initial={{ opacity: 0, y: -25, scale: 0.9, rotate: 25 }}
        animate={{ opacity: 1, y: 0, scale: 1, rotate: 0 }}
        transition={{ duration: 1.1, delay: 0.45 }}
        draggable={false}
        style={{ pointerEvents: 'none' }}
      />
    </div>

        {/* Main Content */}
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-0 justify-between relative z-10 min-h-[360px] sm:min-h-[400px]">
          {/* Left: Headline & CTA */}
          <div className="flex-1 flex flex-col gap-7 sm:gap-8 items-start justify-center pt-3 md:pt-0 w-full min-w-0">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9, delay: 0.25 }}
              className="relative w-full flex flex-col items-start"
            >
              <div className="relative z-10 px-4 sm:px-7 py-6 sm:py-8 border-2 border-white/40 rounded-xl sm:rounded-2xl bg-black/40 shadow-lg backdrop-blur-md w-full">
                <span
                  className="text-white font-extrabold text-2xl sm:text-3xl md:text-5xl leading-tight font-[Montserrat,sans-serif] drop-shadow-lg"
                  style={{
                    letterSpacing: "-1.2px",
                  }}
                >
                  Interested in<br />
                  working<br />
                  together?
                </span>
              </div>
            </motion.div>
            {/* Animated Gradient Arrow Button */}
    <a
  href="https://wa.link/8aofmz"
  target="_blank"
  rel="noopener noreferrer"
>
  <motion.button
    initial={{ opacity: 0, scale: 0.7 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 1, delay: 0.7 }}
    className="mt-5 sm:mt-7 flex items-center gap-3 cursor-pointer px-6 sm:px-8 py-2 rounded-full border-2 border-white/40 bg-black/70 transition shadow-[0_0_18px_2px_rgba(56,246,255,0.13)] hover:shadow-xl focus:outline-none active:scale-98"
    style={{
      background:
        "linear-gradient(92deg,rgba(56,246,255,0.10) 0%,rgba(253,67,173,0.18) 100%)",
      color: "#fff",
      fontWeight: 600,
      fontFamily: "Montserrat,sans-serif",
      fontSize: "1rem",
    }}
  >
    <Image
      height={28}
      width={28}
      src="/Arrow-upper-right.png"
      alt="Gradient Arrow"
      className="w-7 h-7 sm:w-10 sm:h-10 mr-1"
      draggable={false}
      style={{ filter: "drop-shadow(0 2px 10px #31ffe655)" }}
    />
    <span className="">Let’s Connect</span>
    <span className="inline sm:hidden">
      <FaArrowRight className="text-lg" />
    </span>
  </motion.button>
</a>

          </div>
          {/* Right: Description */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.55 }}
            className="flex-1 flex flex-col items-end justify-center pr-1 sm:pr-3 pt-6 md:pt-0 w-full min-w-0"
          >
            <div className="text-white/90 text-base sm:text-[1.08rem] max-w-[92vw] sm:max-w-md leading-relaxed font-medium drop-shadow-md">
              We believe every brand has a story worth telling — and our passion
              is bringing those stories to life through design. What began as a
              solo journey has grown into a creative team dedicated to delivering
              bold visuals and real results for clients worldwide. If you’re ready
              to turn your ideas into an unforgettable visual experience, let’s
              connect and create something exceptional together.
            </div>
          </motion.div>
        </div>

        {/* Bottom Contact Bar */}
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="w-full border border-white/30 rounded-full flex flex-col sm:flex-row items-center justify-between gap-4 mt-10 sm:mt-14 px-3 sm:px-4 py-3 sm:py-4 bg-black/40 shadow-lg relative z-20 backdrop-blur-lg"
        >
          <div className="flex items-center gap-4 w-full sm:w-auto justify-center">
            <span className="font-semibold text-white/90 text-sm sm:text-base">
              Contact Us:
            </span>
            <span className="flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg border border-white/20 bg-black/50 text-white/80 text-base sm:text-lg font-mono">
              <FaPhoneAlt className="mr-1" /> +88 01628083370
            </span>
          </div>
          <form
            className="flex items-center w-full sm:w-auto max-w-md mx-auto gap-2"
            onSubmit={handleSubscribe}
          >
            <input
              className="flex-1 px-4 sm:px-5 py-2 rounded-full border-2 border-white/30 bg-black/20 text-white placeholder:text-white/70 outline-none backdrop-blur-md text-sm sm:text-base min-w-0"
              placeholder="Write your e-mail here ..."
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
            />
            <button
              type="submit"
              className="ml-2 px-4 sm:px-6 py-2 rounded-full border-2 border-white/40 bg-black/70 text-white font-bold transition hover:scale-105 shadow text-sm sm:text-base"
              disabled={loading || !email}
            >
              {loading ? "Subscribing..." : "Subscribe"}
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
