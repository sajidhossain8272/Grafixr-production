/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React, { useEffect, useRef } from "react";

const VideoSection: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video
            .play()
            .catch(() => {
              // autoplay might be blocked; it's fine
            });
        } else {
          video.pause();
        }
      },
      { threshold: 0.35 }
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="w-full bg-black py-14 md:py-16 px-2 sm:px-4 md:px-6">
      {/* 👇 same max width as Hero: max-w-[1460px] */}
      <div className="w-full max-w-[1460px] mx-auto relative">
        {/* Glow */}
        <div className="pointer-events-none absolute inset-x-8 -top-8 h-40 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.15),_transparent)] blur-3xl opacity-60" />

        {/* Full-width card */}
        <div
          className="
            relative z-10
            w-full
            rounded-[26px] md:rounded-[32px]
            border border-white/12
            bg-gradient-to-br from-white/5 via-white/[0.03] to-black
            px-4 sm:px-6 md:px-10
            py-7 sm:py-9 md:py-12
            flex flex-col md:flex-row gap-8 md:gap-10
            shadow-[0_0_40px_rgba(0,0,0,0.7)]
          "
        >
          {/* LEFT – text */}
          <div className="md:w-2/5 flex flex-col justify-center space-y-4">
            <p className="text-[11px] uppercase tracking-[0.25em] text-white/50">
              GRAFIXR STUDIO LIFE
            </p>
            <h2
              className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-white"
              style={{ fontFamily: "Montserrat, sans-serif" }}
            >
              We live inside{" "}
              <span className="bg-gradient-to-r from-cyan-300 via-white to-pink-400 bg-clip-text text-transparent">
                your brand
              </span>
              .
            </h2>
            <p className="text-sm sm:text-base text-white/70 max-w-md leading-relaxed">
              Late nights, endless tweaks, and screens full of artboards —
              this is how we keep our clients’ brands moving. Every frame,
              layout, and color choice is tested on real work, not just mockups.
            </p>
            <p className="text-sm text-white/60 max-w-md leading-relaxed">
              From daily assets to big launches, we’re constantly refining
              systems so your brand looks sharp everywhere: social, decks,
              campaigns, and beyond.
            </p>
          </div>

          {/* RIGHT – video */}
          <div className="md:w-3/5">
            <div
              className="
                relative
                w-full
                rounded-3xl
                border border-white/20
                bg-black/60
                overflow-hidden
                shadow-[0_0_60px_rgba(0,0,0,0.9)]
              "
            >
              {/* top gradient overlay */}
              <div className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-white/10 to-transparent z-10" />

              <video
                ref={videoRef}
                src="/video.mp4"
                className="w-full h-full object-cover rounded-3xl"
                muted
                loop
                playsInline
                autoPlay
              />

              {/* “browser” top bar */}
              <div className="absolute top-0 left-0 right-0 flex items-center gap-2 px-4 py-2 z-20">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-400/60" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400/60" />
                <span className="ml-3 text-[11px] uppercase tracking-[0.18em] text-white/55">
                  GRAFIXR · WORK SESSION
                </span>
              </div>

              {/* bottom label */}
              <div className="absolute bottom-0 left-0 right-0 px-4 py-3 flex items-center justify-between text-[11px] sm:text-xs text-white/70 bg-gradient-to-t from-black/70 to-transparent z-20">
                <span className="font-medium tracking-wide">
                  Behind the scenes of building for brands
                </span>
                <span className="text-white/50">Real projects. Real timelines.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoSection;
