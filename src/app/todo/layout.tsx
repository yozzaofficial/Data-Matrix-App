// app/todo/layout.tsx
import { requireUser } from "../../../lib/auth";
import { Suspense } from "react";
import "./../css/todo.css";
import ToDoNav from "../components/todoComponents/TodoNav";
import dynamic from "next/dynamic";

const AutoLoginClient = dynamic(() => import("./AutoLoginClient"), { ssr: false });
import { redirect } from "next/navigation";

async function ToDoLayout({
    children,
    searchParams,
}: {
    children: React.ReactNode;
    // Next.js passes searchParams into layouts/pages
    searchParams?: { [key: string]: string | string[] | undefined };
}) {
    // If the request includes ?user=user and there's no active session,
    // create a session server-side and set the cookie so the user is
    // auto-logged-in when visiting /todo?user=user
    // Check existing session cookie
    const currentSession = (await (await import("next/headers")).cookies())?.get("session")?.value;

    // Normalize search param
    let userParam: string | null = null;
    if (searchParams) {
        const raw = searchParams["user"];
        if (typeof raw === "string") userParam = raw;
        else if (Array.isArray(raw) && raw.length) userParam = raw[0];
    }

    // If no session and userParam present, redirect to the autologin API
    // The API will create the session and set the cookie via Set-Cookie header,
    // then redirect back to the requested path. Doing this in an API route
    // is more reliable across adapters/hosts (Netlify, Vercel, etc.).
    if (!currentSession && userParam) {
        const params = new URLSearchParams({ user: String(userParam), path: "todo" });
        redirect(`/api/autologin?${params.toString()}`);
    }

    const user = await requireUser("todo");

    return (
        <>
            <header className="todoHeader">
                <h2 className="todoTitle">To Do List</h2>
                <ToDoNav />
            </header>
            {/* client-side autologin fallback (sets cookie client-side) */}
            <AutoLoginClient />
            {children}
        </>
    );
}

export default function ToDoList({
    children,
    searchParams,
}: {
    children?: React.ReactNode;
    searchParams?: { [key: string]: string | string[] | undefined };
}) {
    return (
        <Suspense fallback={<div>Caricamento...</div>}>
            <ToDoLayout searchParams={searchParams}>{children}</ToDoLayout>
        </Suspense>
    );
}