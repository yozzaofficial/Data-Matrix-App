// app/todo/page.tsx
import { redirect } from "next/navigation";

export default function TodoPage({
    searchParams,
}: {
    searchParams: { user?: string };
}) {
    const params = searchParams;
    const user = params.user;

    // Mantieni il parametro user nel redirect
    if (user) {
        redirect(`/todo/emergency?user=${user}`);
    } else {
        redirect("/todo/emergency");
    }
}