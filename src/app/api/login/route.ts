import { sql } from "../../../../lib/db";
import argon2 from "argon2";
import { randomUUID } from "crypto";

export async function POST(req: Request) {
    try {
        const { nome, password } = await req.json();

        // Recupera l'utente dal DB
        const rows = await sql`
            SELECT id, nome, password, rank
            FROM users
            WHERE LOWER(nome) = LOWER(${nome})
            LIMIT 1
        `;

        const user = rows[0];
        if (!user) return new Response("Unauthorized", { status: 401 });

        // Verifica la password con argon2
        const valid = await argon2.verify(user.password, password);
        if (!valid) return new Response("Unauthorized", { status: 401 });

        // Crea una sessione
        const sessionId = randomUUID();
        await sql`
            INSERT INTO sessions (id, user_id)
            VALUES (${sessionId}, ${user.id})
        `;

        // Restituisci OK con cookie della sessione
        return new Response("OK", {
            headers: {
                "Set-Cookie": `session=${sessionId}; HttpOnly; Path=/; SameSite=Lax`,
            },
        });
    } catch (err) {
        console.error("Login error:", err);
        return new Response("Internal Server Error", { status: 500 });
    }
}
