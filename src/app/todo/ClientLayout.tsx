"use client"
import { usePathname, useSearchParams } from "next/navigation";
import ToDoNav from "../components/todoComponents/TodoNav";
import { requireUser } from "../../../lib/auth";
type ToDoProps = Readonly<{
    children?: React.ReactNode;
}>;

export default async function ToDoLayout({ children }: ToDoProps) {
    const pathname = usePathname(); // es: "/todo"
    const searchParams = useSearchParams(); // es: "user=user"

    // Percorso completo
    const fullPath = searchParams.toString()
        ? `${pathname}?${searchParams.toString()}`
        : pathname;

    console.log("Percorso completo:", fullPath); // "/todo?user=user"

    const user = await requireUser(fullPath);

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