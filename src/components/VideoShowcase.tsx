/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React from "react";

const YOUTUBE_VIDEOS = [
  {
    id: "_CzIouoGpRc",
    title: "Grafixr Showreel",
    // Full embed URL (helps if you later need query params)
    src: "https://www.youtube.com/embed/3VzIjYZMEM0?si=EjHxYuFGKvHWImDL",
  },
  // 🔹 You can easily add more videos here later:
  // { id: "ANOTHER_ID", title: "Another Video", src: "https://www.youtube.com/embed/ANOTHER_ID" },
];

const VideoShowcase: React.FC = () => {
  return (
    <section className="w-full bg-black py-12 sm:py-16 px-4 sm:px-6 md:px-10">
      <div className="max-w-6xl mx-auto">
        {/* Section heading */}
        <div className="mb-8 sm:mb-10 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <h2
              className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-white"
              style={{ fontFamily: "Montserrat, sans-serif" }}
            >
              Watch Our Work in Action
            </h2>
            <p className="mt-2 text-sm sm:text-base text-white/70 max-w-2xl">
              Get a feel for how Grafixr brings stories to life with motion,
              typography, and bold visual storytelling.
            </p>
          </div>

          <div className="text-xs sm:text-sm text-white/50">
            YouTube ·{" "}
            <span className="font-semibold text-white/80">@GrafiXr07</span>
          </div>
        </div>

        {/* Video grid (currently 1, ready for more) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {YOUTUBE_VIDEOS.map((video) => (
            <article
              key={video.id}
              className="group rounded-3xl border border-white/15 bg-gradient-to-b from-white/5 to-transparent p-3 sm:p-4 md:p-5 hover:border-white/30 transition-colors duration-300"
            >
              <div className="relative w-full rounded-2xl overflow-hidden bg-black">
                {/* Responsive 16:9 wrapper */}
                <div className="relative pt-[56.25%]">
                  <iframe
                    src={video.src}
                    title={video.title}
                    className="absolute inset-0 w-full h-full rounded-2xl border border-white/10"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                  />
                </div>
              </div>

              <div className="mt-4">
                <h3 className="text-lg sm:text-xl font-semibold text-white">
                  {video.title}
                </h3>
                <p className="mt-1 text-sm text-white/60">
                  A glimpse into how Rony and the Grafixr team craft high-impact
                  visuals for brands that want to stand out.
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default VideoShowcase;
