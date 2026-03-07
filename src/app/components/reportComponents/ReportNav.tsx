"use client"
import Link from "next/link"
import { useSearchParams, useRouter } from "next/navigation";
import React from "react";
import { useClickAway } from "ahooks";

export default function ReportNav() {
    const searchParams = useSearchParams();
    const filter = searchParams.get("mode");
    return <>
        <nav className="reportNav">
            <Link href="/report?mode=itemlist" className={filter === "itemlist" ? "reportNavActive" : ""}>Item List</Link>
            <Link href="/report?mode=scan" className={filter === "scan" ? "reportNavActive" : ""}>Scan code</Link>
        </nav>
    </>
}