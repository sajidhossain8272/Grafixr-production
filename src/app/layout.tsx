import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Providers from "./providers"; // <-- your new client component
import Navigation from "@/components/Navigation";
import Footer from "./Footer";
import WhatsApp from "@/components/WhatsApp";

<link href="https://fonts.googleapis.com/css2?family=Amatic+SC&family=Comic+Neue&family=Pacifico&family=Bangers&family=Fredericka+the+Great&family=Rubik+Doodle+Shadow&family=Indie+Flower&family=Permanent+Marker&display=swap" rel="stylesheet" />


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

          <Navigation  />
          {children}
          {/* WhatsApp Icon - Bottom Right */}
        <WhatsApp />
          <Footer />

        </Providers>
      </body>
    </html>
  );
}
