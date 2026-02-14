// app/todo/layout.tsx
import { Suspense } from "react";
import "./../css/todo.css";
import ToDoNav from "../components/todoComponents/TodoNav";

export default function ToDoLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <Suspense fallback={<div>Caricamento...</div>}>
            <header className="todoHeader">
                <h2 className="todoTitle">To Do List</h2>
                <ToDoNav />
            </header>
            {children}
        </Suspense>
    );
}