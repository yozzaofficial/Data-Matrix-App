import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google"
import "../globals.css";  // Importa il CSS

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Login",
    description: "Login page",
};

export default function AuthLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="it">
            <body className={`${geistSans.variable} ${geistMono.variable}`}>
                {children}  {/* NO navbar qui! */}
            </body>
        </html>
    );
}