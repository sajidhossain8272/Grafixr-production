import { Suspense } from 'react'
import PortfolioItemClient from './PortfolioList'

export default async function PortfolioItemPage({
  params,
}: {
  // In Next.js App Router, params may be a Promise
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  return (
    <Suspense
      fallback={
        <div className="fixed inset-0 bg-white z-50 flex items-center justify-center">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <PortfolioItemClient id={id} />
    </Suspense>
  )
}
