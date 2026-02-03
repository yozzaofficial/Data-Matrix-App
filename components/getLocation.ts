"use client"
import { usePathname } from "next/navigation";


export default function getLocation() {
    const location = usePathname();
    return location
}