import { sql } from "../../../../lib/db";
import bcrypt from "bcryptjs";
import { randomUUID } from "crypto";

export async function POST(req: Request) {
    const { nome, password } = await req.json();

    // Recupero utente dal DB
    const rows = await sql`
    SELECT id, nome, password, rank
    FROM users
    WHERE nome = ${nome}
    LIMIT 1
  `;

    const user = rows[0] as { id: number; nome: string; password: string; rank: number } | undefined;

    if (!user) {
        return new Response("Unauthorized", { status: 401 });
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
        return new Response("Unauthorized", { status: 401 });
    }

    // Creo sessione
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
