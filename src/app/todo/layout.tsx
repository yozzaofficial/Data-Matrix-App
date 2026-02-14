import { requireUser } from "../../../lib/auth"
import { Suspense } from "react";
import getRank from "../components/getRank";
import Link from "next/link";
import "./../css/todo.css"
import ToDoNav from "../components/todoComponents/TodoNav";

type ToDoProps = Readonly<{
    children: React.ReactNode;
    searchParams: {
        user?: string;
    };
}>;

async function ToDoLayout({ searchParams, children }: ToDoProps) {
    const item = searchParams?.user || "nessun user";
    const pathLocation = `todo?user=${item}`
    const user = await requireUser(pathLocation);

    const userRank = getRank()

    return <>
        <header className="todoHeader">
            <h2 className="todoTitle">To Do List</h2>
            <ToDoNav></ToDoNav>
        </header>
        {children}
    </>
}

export default function ToDoList({
    children,
    searchParams,
}: {
    children?: React.ReactNode;
    searchParams: { user?: string };
}) {
    return (
        <Suspense fallback={<div>Caricamento...</div>}>
            <ToDoLayout searchParams={searchParams}>{children}</ToDoLayout>
        </Suspense>
    );
}