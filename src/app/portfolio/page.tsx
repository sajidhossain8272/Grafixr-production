import React from "react";
import Image from "next/image";
import Link from "next/link";

interface Item {
  _id: string;
  title: string;
  description: string;
  mediaType: "image" | "video";
  files: string[];
}

const BASE_URL = "https://grafixr-backend.vercel.app";

export default async function PortfolioPage() {
  // Fetch all portfolio items, no query params
  const res = await fetch(`${BASE_URL}/portfolio`, {
    next: { revalidate: 60 },
  });
  const items: Item[] = res.ok ? await res.json() : [];

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl mb-4">Our Portfolio</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {items.map((it) => (
          <Link
            key={it._id}
            href={`/portfolio/${it._id}`}
            className="block cursor-pointer bg-white shadow rounded overflow-hidden"
          >
            {it.mediaType === "image" && it.files[0] && (
              <Image
                src={it.files[0]}
                alt={it.title}
                width={400}
                height={250}
                className="object-cover"
              />
            )}
            {it.mediaType === "video" && it.files[0] && (
              <video
                src={it.files[0]}
                className="w-full h-48 object-cover"
                muted
                controls
              />
            )}
            <div className="p-4">
              <h2 className="font-semibold">{it.title}</h2>
              <p className="text-gray-600 text-sm">{it.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
