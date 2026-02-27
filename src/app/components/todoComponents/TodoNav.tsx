"use client"
import Link from "next/link"
import { useSearchParams,useRouter } from "next/navigation";

export default function ToDoNav() {
    const searchParams = useSearchParams();
    const filter = searchParams.get("filter");
    const filterId = searchParams.get("id") || ""
    const router = useRouter()

    function removeFilter(){
        
        router.replace("/todo")
    }

    return (
        <nav className="todoNav">
            <Link
                href={filterId !== "" ? `/todo?filter=emergency&id=${filterId}` : "/todo?filter=emergency"}
                className={filter === "emergency" ? "todoNavActive" : ""}
            >
                Emergency
            </Link>

            <Link
                href={filterId !== "" ? `/todo?filter=regular&id=${filterId}` : "/todo?filter=regular"}
                className={filter === "regular" ? "todoNavActive" : ""}
            >
                Regular
            </Link>
            {filterId !=="" ? <button className="removeTodoIdFilter" onClick={() => removeFilter()}>Remove Filter</button> : null}
        </nav>
    );
}
