import { Suspense } from "react";
import "./../css/done.css";
import DoneNav from "../components/doneComponents/DoneNav";
export default function DoneLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (<Suspense fallback={<div>Caricamento...</div>}>
        <header>
            <h2 className="workdoneTitle">Work Done</h2>
            <DoneNav/>
        </header>
       {children}
    </Suspense>
    );
}