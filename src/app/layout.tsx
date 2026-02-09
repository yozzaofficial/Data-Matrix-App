// app/layout.tsx (Server Component - SENZA "use client")
import type { Metadata } from "next";
import "./globals.css";
import getRank from "./components/getRank";
import ClientLayout from "./ClientLayout";



export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const userRank = await getRank(); // ✅ Funziona qui

  return (
    <html lang="it">
      <body>
        <ClientLayout userRank={userRank}>
          {children}
        </ClientLayout>
      </body>
    </html>
  );
}