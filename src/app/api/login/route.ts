import { sql } from "../../../../lib/db";
import bcrypt from "bcryptjs";
import { randomUUID } from "crypto";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        console.log("BODY RICEVUTO:", body);

        const { nome, password } = body;

        const rows = await sql`
            SELECT id, nome, password, rank
            FROM users
            WHERE nome = ${nome}
            LIMIT 1
        `;
        console.log("ROWS TROVATE:", rows);

        const user = rows[0];
        if (!user) {
            console.log("Utente non trovato");
            return new Response("Unauthorized", { status: 401 });
        }

        console.log("Hash dal DB:", user.password);

        const valid = await bcrypt.compare(password, user.password);
        console.log("Valid password?", valid);

        if (!valid) {
            console.log("Password errata");
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
    } catch (e) {
        console.error("ERRORE LOGIN:", e);
        return new Response("Internal Server Error", { status: 500 });
    }
}
