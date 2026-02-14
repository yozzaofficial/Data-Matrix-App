// app/todo/layout.tsx
import { requireUser } from "../../../lib/auth";
import { Suspense } from "react";
import "./../css/todo.css";
import ToDoNav from "../components/todoComponents/TodoNav";
import { cookies } from "next/headers";
import { randomUUID } from "crypto";
import { sql } from "../../../lib/db";

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
    // cookies() here returns a promise for the request cookies (per lib/auth pattern)
    const cookieStore = (await cookies()) as any;
    const currentSession = cookieStore.get("session")?.value;

    // Normalize search param
    let userParam: string | null = null;
    if (searchParams) {
        const raw = searchParams["user"];
        if (typeof raw === "string") userParam = raw;
        else if (Array.isArray(raw) && raw.length) userParam = raw[0];
    }

    if (!currentSession && userParam === "user") {
        // Try to find the user and create a session for them
        const rows = await sql`
            SELECT id
            FROM users
            WHERE LOWER(nome) = LOWER(${userParam})
            LIMIT 1
        `;

        const found = rows[0];
        if (found) {
            const sessionId = randomUUID();
            await sql`
                INSERT INTO sessions (id, user_id)
                VALUES (${sessionId}, ${found.id})
            `;

            // Set the session cookie so subsequent requireUser() will see it
            cookieStore.set({
                name: "session",
                value: sessionId,
                httpOnly: true,
                path: "/",
                sameSite: "lax",
            });
        }
    }

    const user = await requireUser("todo");

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