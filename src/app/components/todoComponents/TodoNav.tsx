"use client"
import Link from "next/link"
import { usePathname } from "next/navigation";

export default function ToDoNav() {
    const pathname = usePathname();
    return <>
        <nav className="todoNav">
            <Link
                href="/todo/emergency"
                className={pathname == "/todo/emergency" ? "todoNavActive" : ""}
            >Emergency</Link>
            <Link
                href="/todo/regular"
                className={pathname == "/todo/regular" ? "todoNavActive" : ""}
            >Regular</Link>
        </nav>
    </>
}   