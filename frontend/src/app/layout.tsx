import React, { Suspense } from "react";
import type { Metadata } from "next";
import { Nunito, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

import { ThemeProvider } from "@/context/ThemeContext";

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito",
  display: "swap",
  weight: ["400", "600", "700", "800", "900"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "MindAtlas — The Ever-Growing Human Knowledge Library",
  description:
    "An AI-powered knowledge and learning platform dedicated to collecting, evaluating, organizing, connecting, and teaching the world's best educational material on psychology, cognitive science, philosophy, critical thinking, logic, heuristics, and mental models.",
  keywords: [
    "MindAtlas",
    "Cognitive Dissonance",
    "Bounded Rationality",
    "Popperian Falsification",
    "Motivated Reasoning",
    "Loss Aversion",
    "Cognitive Biases",
    "Mental Models",
    "Epistemology",
    "Decision Science",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${nunito.variable} ${inter.variable} dark h-full`} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var stored = localStorage.getItem('mindatlas-theme');
                  if (stored === 'light') {
                    document.documentElement.classList.add('light');
                    document.documentElement.classList.remove('dark');
                    document.documentElement.setAttribute('data-theme', 'light');
                  } else {
                    document.documentElement.classList.add('dark');
                    document.documentElement.classList.remove('light');
                    document.documentElement.setAttribute('data-theme', 'dark');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-[var(--bg-page)] text-[var(--ink-primary)] antialiased selection:bg-[#d5cf66] selection:text-[#171412] transition-colors duration-150">
        <ThemeProvider>
          <Suspense fallback={<div className="h-18 w-full bg-[var(--bg-page)] border-b border-[var(--border-subtle)]" />}>
            <Navbar />
          </Suspense>
          <main className="flex-1 w-full">
            <Suspense fallback={<div className="py-20 text-center text-sm text-[var(--ink-secondary)]">Loading MindAtlas module...</div>}>
              {children}
            </Suspense>
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
