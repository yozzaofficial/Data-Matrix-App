// app/todo/page.tsx
import { redirect } from "next/navigation";
import WorkList from "../components/todoComponents/WorkList";

export default function TodoPage() {
    return <>
        <WorkList />
    </>
}