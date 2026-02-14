// app/todo/page.tsx
import { redirect } from "next/navigation";

export default function TodoPage({
    searchParams,
}: {
    searchParams: { user?: string };
}) {
    const params = searchParams;

    // Mantieni user=user se presente
    if (params.user === "user") {
        redirect("/todo/emergency?user=user");
    } else {
        redirect("/todo/emergency");
    }
}