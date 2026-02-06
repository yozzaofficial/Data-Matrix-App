import { requireUser } from "../../../lib/auth"
import { Suspense } from "react";
import getRank from "../components/getRank";
import { get } from "http";

async function ToDo({ searchParams }: { searchParams: { user?: string } }) {
    const params = await searchParams; // Unwrap la Promise
    const item = params.user || "nessun user"; // Default più chiaro
    const pathLocation = `todo?user=${item}`
    const user = await requireUser(pathLocation);

    const userRank = getRank()

    return <>
        <h2>Item: {userRank}</h2>
    </>
}

export default function ToDoList({ searchParams }: { searchParams: { user?: string } }) {
    return (
        <Suspense fallback={<div>Caricamento...</div>}>
            <ToDo searchParams={searchParams} />
        </Suspense>
    );
}