import { sql } from "../../../../lib/db";
import { randomUUID } from "crypto";

export async function GET(req: Request) {
    try {
        const url = new URL(req.url);
        const user = url.searchParams.get("user");
        if (!user) return new Response(JSON.stringify({ error: "missing user" }), { status: 400 });

        const rows = await sql`
      SELECT id
      FROM users
      WHERE LOWER(nome) = LOWER(${user})
      LIMIT 1
    `;
        const found = rows[0];
        if (!found) return new Response(JSON.stringify({ error: "not found" }), { status: 404 });

        const sessionId = randomUUID();
        await sql`
      INSERT INTO sessions (id, user_id)
      VALUES (${sessionId}, ${found.id})
    `;

        return new Response(JSON.stringify({ sessionId }), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    } catch (err) {
        console.error("autologin-client error", err);
        return new Response(JSON.stringify({ error: "internal" }), { status: 500 });
    }
}
