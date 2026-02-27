import { Suspense } from "react";
import "./../css/todo.css";
import ReportNav from "../components/reportComponents/ReportNav";

export default function ToDoLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <Suspense fallback={<div>Caricamento...</div>}>
            <header className="reportHeader">
                <h2 className="todoTitle">Report an Item</h2>
            </header>
            <ReportNav/>
            {children}
        </Suspense>
    );
}