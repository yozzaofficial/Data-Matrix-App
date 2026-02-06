"use client";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google"
import Link from "next/link"
import { usePathname } from "next/navigation";
import "./globals.css";
import getRank from "../../components/getRank";

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
  const pathname = usePathname();
  const isLoginPage = pathname === '/login';
  const userRank = await getRank()
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {!isLoginPage && (
          <header>
            <nav>
              <Link href="/todo">Lavori da fare</Link>
              {userRank == "admin" && <Link href="/">Lavori fatti</Link>}
            </nav>
          </header>
        )}
        {children}
      </body>
    </html>
  );
}