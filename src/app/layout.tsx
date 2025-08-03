import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Providers from "./providers";
import Navigation from "@/components/Navigation";
import Footer from "./Footer";
import WhatsApp from "@/components/WhatsApp";

// Google Fonts in _document.tsx or custom font loader, not in TSX file (move <link> tag out)

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
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen transition-colors duration-500`}
      >
        <Providers>
          <Navigation />
          {children}
          <WhatsApp />
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
