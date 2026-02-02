import { sql } from "../../../../lib/db";
import { randomUUID } from "crypto";

export async function POST(req: Request) {
    const { nome, password } = await req.json();

    const rows = await sql`
        SELECT id, nome, password, rank
        FROM users
        WHERE LOWER(nome) = LOWER(${nome})
        LIMIT 1
    `;

    const user = rows[0];
    if (!user) return new Response("Unauthorized", { status: 401 });

    // confronto diretto senza hash
    if (password !== user.password) {
        return new Response("Unauthorized", { status: 401 });
    }

    const sessionId = randomUUID();
    await sql`
        INSERT INTO sessions (id, user_id)
        VALUES (${sessionId}, ${user.id})
    `;

    return new Response("OK", {
        headers: {
            "Set-Cookie": `session=${sessionId}; HttpOnly; Path=/; SameSite=Lax`,
        },
    });
}
