"use client"
import Link from "next/link"
import { useSearchParams } from "next/navigation";

export default function DoneNav(){
    const searchParams = useSearchParams();
    const filter = searchParams.get("filter");
    console.log(filter)
    return<>
        <nav className="doneNav">
            <Link
                href="/done?filter=date"
                className={filter === "date" ? "doneNavActive" : ""}
            >
                Date//Select    
            </Link>

            <Link
                href="/done?filter=technican"
                className={filter === "technican" ? "doneNavActive" : ""}
            >
                Technican//select
            </Link>
        </nav>
    </>
}