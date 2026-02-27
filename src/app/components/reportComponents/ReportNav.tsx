"use client"
import Link from "next/link"
import { useSearchParams, useRouter } from "next/navigation";
import CustomSelect from "../CustomSelect";
import React from "react";
import { useClickAway } from "ahooks";

export default function ReportNav() {
    
    return <>
        <nav className="doneNav">
            <Link href="/report?mode=itemlist">Item List</Link>
            <Link href="/report?mode=scan">Scan code</Link>
        </nav>
    </>
}