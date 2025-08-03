// /app/not-found.tsx or /app/404.tsx
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#18181B] text-white flex-col">
      <h1 className="text-5xl font-bold mb-6">404</h1>
      <p className="text-lg mb-6">Page not found.</p>
      <Link href="/" className="text-cyan-400 underline text-lg">Go Home</Link>
    </div>
  );
}
