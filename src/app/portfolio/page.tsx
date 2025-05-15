'use client';

import { Suspense } from 'react';
import PortfolioList from './PortfolioList';

export default function PortfolioPage() {
  return (
    <section className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-white px-6 py-20">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-extrabold text-center text-gray-900 mt-10 ">
          Explore Our <span className="text-[#00CFFF]">Portfolio</span>
        </h1>

        <Suspense
          fallback={
            <div className="flex justify-center items-center py-32">
              <div className="w-14 h-14 border-4 border-[#00CFFF] border-t-transparent rounded-full animate-spin" />
            </div>
          }
        >
          <PortfolioList />
        </Suspense>
      </div>
    </section>
  );
}
