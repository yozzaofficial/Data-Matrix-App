import { requireUser } from "../../../lib/auth"
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";

async function ToDo() {
    const location = "todo"
    const searchParams = useSearchParams();
    const item = searchParams.get("item") || "/"
    const pathLocation = `${location}?item${item}`
    const user = await requireUser(location);

    return <>
        <h2>Item 1</h2>
    </>
}
export default function ToDoList() {
    return (
        <Suspense fallback={<div>Caricamento...</div>}>
            <ToDo />
        </Suspense>
    );
}