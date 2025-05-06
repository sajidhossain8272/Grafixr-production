'use client';

import React from 'react';

const technologies = [
  {
    name: 'Adobe Photoshop',
    logo: 'https://via.placeholder.com/48x48?text=Ps',
  },
  {
    name: 'Adobe Illustrator',
    logo: 'https://via.placeholder.com/48x48?text=Ai',
  },
  {
    name: 'Adobe XD',
    logo: 'https://via.placeholder.com/48x48?text=XD',
  },
  {
    name: 'Figma',
    logo: 'https://via.placeholder.com/48x48?text=Figma',
  },
  {
    name: 'Blender',
    logo: 'https://via.placeholder.com/48x48?text=Blender',
  },
  {
    name: 'After Effects',
    logo: 'https://via.placeholder.com/48x48?text=AE',
  },
  {
    name: 'Premiere Pro',
    logo: 'https://via.placeholder.com/48x48?text=Pr',
  },
];

export default function TechStackSection() {
  return (
    <section className="bg-gray-100 py-12 px-4">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-4">Tools & Technologies</h2>
        <p className="text-gray-600 mb-10">
          We use cutting-edge software to deliver world-class design and media.
        </p>
        <div className="flex flex-wrap justify-center gap-8">
          {technologies.map((tech) => (
            <div key={tech.name} className="flex flex-col items-center w-24">
              <img
                src={tech.logo}
                alt={tech.name}
                className="w-12 h-12 object-contain"
              />
              <p className="text-sm mt-2 text-gray-700 text-center">{tech.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
