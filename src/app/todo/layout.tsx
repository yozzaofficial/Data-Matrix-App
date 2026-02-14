// app/todo/page.tsx
import { requireUser } from "../../../lib/auth";
import { Suspense } from "react";
import getRank from "../components/getRank";
import Link from "next/link";
import "./css/todo.css";
import ToDoNav from "../components/todoComponents/TodoNav";

type ToDoProps = {
    searchParams: {
        user?: string;
    };
};

async function ToDoContent({ searchParams }: ToDoProps) {
    const item = searchParams?.user || "nessun user";
    const pathLocation = `todo?user=${item}`;
    const user = await requireUser(pathLocation);

    const userRank = getRank();

    return (
        <>
            <header className="todoHeader">
                <h2 className="todoTitle">To Do List</h2>
                <ToDoNav />
            </header>
            {/* Qui metti il contenuto della todo list */}
        </>
    );
}

export default function ToDoPage({ searchParams }: ToDoProps) {
    return (
        <Suspense fallback={<div>Caricamento...</div>}>
            <ToDoContent searchParams={searchParams} />
        </Suspense>
    );
}