// app/todo/page.tsx
import { redirect } from "next/navigation";

export default function TodoPage() {
    redirect("/todo/emergency");
}