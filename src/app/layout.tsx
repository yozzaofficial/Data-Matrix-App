// app/layout.tsx (Server Component - SENZA "use client")
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import getRank from "./components/getRank";
import ClientLayout from "./ClientLayout";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const userRank = await getRank(); // ✅ Funziona qui

  return (
    <html lang="it">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <ClientLayout userRank={userRank}>
          {children}
        </ClientLayout>
      </body>
    </html>
  );
}