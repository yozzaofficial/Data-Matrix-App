// app/todo/layout.tsx
import { Suspense } from "react";
import "./../css/todo.css";
import ToDoNav from "../components/todoComponents/TodoNav";
import AutoLoginClient from "./AutoLoginClient";
import { requireUser } from "../../../lib/auth";

export default async function ToDoLayout({
    children,
    searchParams,
}: {
    children: React.ReactNode;
    searchParams?: { user?: string };
}) {
    // If there's no `user` query param, perform server-side auth check so
    // unauthenticated visitors are redirected on the server (no flash).
    const userParam = searchParams?.user;
    if (!userParam) {
        await requireUser("todo");
    }

    return (
        <Suspense fallback={<div>Caricamento...</div>}>
            <AutoLoginClient />
            <header className="todoHeader">
                <h2 className="todoTitle">To Do List</h2>
                <ToDoNav />
            </header>
            {children}
        </Suspense>
    );
}