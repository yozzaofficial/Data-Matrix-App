// app/ClientLayout.tsx
"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function ClientLayout({
    userRank,
    children,
}: {
    userRank: string;
    children: React.ReactNode;
}) {
    const pathname = usePathname(); // ✅ Funziona qui (Client Component)
    const isLoginPage = pathname === '/login';

    return (
        <>
            {!isLoginPage && (
                <header>
                    <nav>
                        <Link href="/todo">Lavori da fare</Link>
                        {userRank === "admin" && <Link href="/">Lavori fatti</Link>}
                    </nav>
                </header>
            )}
            {children}
        </>
    );
}