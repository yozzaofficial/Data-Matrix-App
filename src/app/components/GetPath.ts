"use client"
import { usePathname, useSearchParams } from "next/navigation";

export default function getPath() {
    const pathname = usePathname(); // es: /todo
    const searchParams = useSearchParams(); // es: ?user=user

    // Crea l'URL completo con i query parameters
    const fullPath = searchParams.toString()
        ? `${pathname}?${searchParams.toString()}`
        : pathname;

    return fullPath;
}