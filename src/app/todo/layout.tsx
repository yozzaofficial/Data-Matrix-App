import { Suspense } from "react";
import Link from "next/link";
import "./../css/todo.css"
import ToDoLayout from "./ClientLayout";

export default function ToDoList() {
    return (
        <Suspense fallback={<div>Caricamento...</div>}>
            <ToDoLayout></ToDoLayout>
        </Suspense >
    );
}