import { Suspense } from "react";
import PortfolioItemClient from "./PortfolioList";

export default async function PortfolioItemPage({
  params,
}: {
  // In Next.js App Router, params may be a Promise
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <Suspense
      fallback={
        <div className='fixed inset-0 z-50 bg-[#18181B]/90 backdrop-blur-lg flex items-center justify-center '>
          <div className='w-16 h-16 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin shadow-lg' />
        </div>
      }
    >
      <div className='min-h-screen w-full flex items-start justify-center bg-[#18181B] px-1 py-0 sm:px-2 pt-16 relative overflow-hidden'>
        <PortfolioItemClient id={id} />
      </div>
    </Suspense>
  );
}
