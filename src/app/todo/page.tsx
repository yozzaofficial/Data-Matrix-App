import { requireUser } from "../../../lib/auth"
import { Suspense } from "react";

async function ToDo({ searchParams }: { searchParams: { user?: string } }) {
    const params = await searchParams; // Unwrap la Promise
    const item = params.user || "nessun user"; // Default più chiaro
    const pathLocation = `todo?user=${item}`
    const user = await requireUser(pathLocation);

    return <>
        <h2>Item: {item}</h2>
    </>
}

export default function ToDoList({ searchParams }: { searchParams: { user?: string } }) {
    return (
        <Suspense fallback={<div>Caricamento...</div>}>
            <ToDo searchParams={searchParams} />
        </Suspense>
    );
}