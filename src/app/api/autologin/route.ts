import { sql } from "../../../../lib/db";
import { randomUUID } from "crypto";

export async function GET(req: Request) {
    try {
        const url = new URL(req.url);
        const user = url.searchParams.get("user");
        const path = url.searchParams.get("path") || "";

        if (!user) {
            return new Response("Missing user", { status: 400 });
        }

        const rows = await sql`
      SELECT id
      FROM users
      WHERE LOWER(nome) = LOWER(${user})
      LIMIT 1
    `;

        const found = rows[0];
        if (!found) {
            return new Response("User not found", { status: 404 });
        }

        const sessionId = randomUUID();
        await sql`
      INSERT INTO sessions (id, user_id)
      VALUES (${sessionId}, ${found.id})
    `;

        // Redirect to the requested path and set the session cookie
        const location = path ? `/${path}` : "/todo";
        return new Response(null, {
            status: 307,
            headers: {
                Location: location,
                "Set-Cookie": `session=${sessionId}; HttpOnly; Path=/; SameSite=Lax`,
            },
        });
    } catch (err) {
        console.error("autologin error", err);
        return new Response("Internal Server Error", { status: 500 });
    }
}
