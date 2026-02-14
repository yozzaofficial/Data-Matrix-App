import { requireUser } from "../../../lib/auth";
import { Suspense } from "react";
import "./../css/todo.css";
import ToDoNav from "../components/todoComponents/TodoNav";

async function ToDoLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const user = await requireUser("todo");

    return (
        <>
            <header className="todoHeader">
                <h2 className="todoTitle">To Do List</h2>
                <ToDoNav />
            </header>
            {children}
        </>
    );
}

export default function ToDoList({
    children,
}: {
    children?: React.ReactNode;
}) {
    return (
        <Suspense fallback={<div>Caricamento...</div>}>
            <ToDoLayout>{children}</ToDoLayout>
        </Suspense>
    );
}