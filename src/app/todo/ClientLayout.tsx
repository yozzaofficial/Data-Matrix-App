"use client"
import { usePathname, useSearchParams } from "next/navigation";
import ToDoNav from "../components/todoComponents/TodoNav";

type ToDoProps = Readonly<{
    children?: React.ReactNode;
}>;

export default function ToDoLayout({ children }: ToDoProps) {
    // Client layout: only UI and client-side logic. Authentication is handled
    // by the server layout or by the AutoLoginClient which runs earlier.
    const pathname = usePathname();
    const searchParams = useSearchParams();

    // Percorso completo (utile per debugging only)
    const fullPath = searchParams.toString() ? `${pathname}?${searchParams.toString()}` : pathname;
    console.log("Percorso completo:", fullPath);

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