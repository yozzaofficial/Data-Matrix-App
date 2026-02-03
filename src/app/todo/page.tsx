import { requireUser } from "../../../lib/auth"
import { Suspense } from "react";

async function ToDo({ searchParams }: { searchParams: { item?: string } }) {
    const location = "todo"
    const params = await searchParams; // Unwrap la Promise
    const item = params.item || "nessun item"; // Default più chiaro
    const pathLocation = `${location}?item=${item}`
    const user = await requireUser(pathLocation);

    return <>
        <h2>Item: {item}</h2>
    </>
}

export default function ToDoList({ searchParams }: { searchParams: { item?: string } }) {
    return (
        <Suspense fallback={<div>Caricamento...</div>}>
            <ToDo searchParams={searchParams} />
        </Suspense>
    );
}