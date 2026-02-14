import { sql } from "../../../../lib/db";
import { randomUUID } from "crypto";
import { cookies } from "next/headers";

export async function POST(req: Request) {
    const { nome, password } = await req.json();

    console.log("🔍 Login attempt for:", nome);

    const rows = await sql`
        SELECT id, nome, password, rank
        FROM users
        WHERE LOWER(nome) = LOWER(${nome})
        LIMIT 1
    `;

    const user = rows[0];
    if (!user) {
        console.log("❌ User not found");
        return new Response("Unauthorized", { status: 401 });
    }

    // confronto diretto senza hash
    if (password !== user.password) {
        console.log("❌ Wrong password");
        return new Response("Unauthorized", { status: 401 });
    }

    const sessionId = randomUUID();

    console.log("✅ Creating session:", sessionId);

    await sql`
        INSERT INTO sessions (id, user_id, created_at, expires_at)
        VALUES (${sessionId}, ${user.id}, NOW(), NOW() + INTERVAL '20 minutes')
    `;

    // Usa cookies() di Next.js invece di Set-Cookie manualmente
    (await cookies()).set("session", sessionId, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24 * 30, // 30 giorni
    });

    console.log("✅ Cookie set, login successful");

    return new Response("OK", { status: 200 });
}