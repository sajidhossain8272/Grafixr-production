import type { Metadata } from "next";
import Script from "next/script";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Providers from "./providers";
import Navigation from "@/components/Navigation";
import Footer from "./Footer";
import WhatsApp from "@/components/WhatsApp";
import { Suspense } from "react";

// Font setup
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// FULL SEO & SOCIAL METADATA – Place at the very top, only once
export const metadata: Metadata = {
  title: "GrafiXr – Modern Design Agency | Recent Projects & Reviews",
  description:
    "Discover GrafiXr's portfolio, recent projects, glowing client reviews, and the premium fonts we work with. Experience your brand’s next visual breakthrough with us.",
  keywords:
    "GrafiXr, design agency, modern portfolio, creative reviews, branding, web design, client testimonials, premium fonts",
  openGraph: {
    title: "GrafiXr – Modern Design Agency | Recent Projects & Reviews",
    description:
      "Explore recent projects, read client reviews, and see the fonts GrafiXr works with. Elevate your brand with world-class design.",
    url: "https://grafixr.com/",
    siteName: "GrafiXr",
    images: [
      {
        url: "https://grafixr.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "GrafiXr portfolio, projects, and client reviews",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "GrafiXr – Modern Design Agency",
    description:
      "Explore recent work, client reviews, and creative excellence from GrafiXr.",
    images: ["https://grafixr.com/og-image.png"],
    site: "@grafixr",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="apple-mobile-web-app-title" content="Grafixr" />
        {/* No analytics scripts directly here! */}
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen transition-colors duration-500`}
      >
        {/* Google Analytics - best practice */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-Y4WW57N2R5"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-Y4WW57N2R5');
          `}
        </Script>
        <Providers>
          <Suspense fallback={null}>
            <Navigation />
          </Suspense>
          {children}
          <WhatsApp />
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
