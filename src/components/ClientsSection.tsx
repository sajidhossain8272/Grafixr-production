'use client';

import React from 'react';

const clients = [
  {
    name: 'Facebook',
    logo: 'https://via.placeholder.com/100x100?text=Facebook',
  },
  {
    name: 'Microsoft',
    logo: 'https://via.placeholder.com/100x100?text=Microsoft',
  },
  {
    name: 'Netflix',
    logo: 'https://via.placeholder.com/100x100?text=Netflix',
  },
  {
    name: 'Google',
    logo: 'https://via.placeholder.com/100x100?text=Google',
  },
  {
    name: 'Spotify',
    logo: 'https://via.placeholder.com/100x100?text=Spotify',
  },
  {
    name: 'Adobe',
    logo: 'https://via.placeholder.com/100x100?text=Adobe',
  },
];

export default function ClientsSection() {
  return (
    <section className="bg-white py-12 px-4">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-4">Trusted by Leading Brands</h2>
        <p className="text-gray-600 mb-10">
          We&apos;ve had the privilege of working with global leaders in tech and media.
        </p>
        <div className="flex flex-wrap justify-center gap-10 items-center">
          {clients.map((client) => (
            <div
              key={client.name}
              className="w-24 h-24 grayscale hover:grayscale-0 transition"
            >
              <img
                src={client.logo}
                alt={client.name}
                className="w-full h-full object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
