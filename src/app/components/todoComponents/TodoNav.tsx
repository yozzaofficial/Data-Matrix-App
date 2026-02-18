"use client"
import Link from "next/link"
import { useSearchParams } from "next/navigation";

export default function ToDoNav() {
    const searchParams = useSearchParams();
    const filter = searchParams.get("filter");
    return (
        <nav className="todoNav">
            <Link
                href="/todo?filter=emergency"
                className={filter === "emergency" ? "todoNavActive" : ""}
            >
                Emergency
            </Link>

            <Link
                href="/todo?filter=regular"
                className={filter === "regular" ? "todoNavActive" : ""}
            >
                Regular
            </Link>
        </nav>
    );
}
