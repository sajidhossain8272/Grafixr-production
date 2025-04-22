import { Suspense } from 'react'
import PortfolioList from './PortfolioList'

export default function PortfolioPage() {
  return (
    <Suspense
      fallback={
        <div className="flex justify-center items-center py-16">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <PortfolioList />
    </Suspense>
  )
}
