import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Providers from "./providers"; // <-- your new client component
import Navigation from "@/components/Navigation";
import Footer from "./Footer";
import { FaWhatsapp } from "react-icons/fa";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "GrafiXr",
  description: "A modern agency website built with Next.js and Tailwind CSS.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* Wrap everything in our client-based ThemeProvider */}
        <Providers>
          <Navigation />
          {children}
          {/* WhatsApp Icon - Bottom Right */}
          <div>
            <a
              href='https://wa.link/8aofmz'
              className='group fixed bottom-4 right-4'
              target='_blank'
              rel='noopener noreferrer'
            >
              <div className='bg-green-500 text-white rounded-full p-4 cursor-pointer transform transition-transform hover:scale-110 glow-green'>
                <FaWhatsapp className='w-8 h-8' />
              </div>
              <div className='absolute bottom-[60px] left-1/3 transform -translate-x-1/2 bg-gray-800 text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap'>
                +8801628083370
              </div>
            </a>
          </div>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
