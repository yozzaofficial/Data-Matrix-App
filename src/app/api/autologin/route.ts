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

        // Return a small HTML page that sets the cookie client-side and redirects.
        // Some hosts (Netlify) may perform internal redirects that prevent the
        // Set-Cookie header from being applied to the client, so using JS to set
        // document.cookie ensures the browser will have the cookie before the
        // following navigation. We also include a Set-Cookie header as a best-effort
        // server-side fallback.
        const location = path ? `/${path}` : "/todo";
        const body = `<!doctype html><html><head><meta charset="utf-8"><title>Autologin</title></head><body>
    <script>
      // set cookie (non-HttpOnly) so client's next request will include it
      document.cookie = "session=${sessionId}; Path=/; SameSite=Lax";
      // fallback: navigate to destination
      window.location.replace("${location}");
    </script>
    <noscript>
      <meta http-equiv="refresh" content="0;url=${location}">
    </noscript>
    </body></html>`;

        return new Response(body, {
            status: 200,
            headers: {
                "Content-Type": "text/html; charset=utf-8",
                "Set-Cookie": `session=${sessionId}; HttpOnly; Path=/; SameSite=Lax`,
            },
        });
    } catch (err) {
        console.error("autologin error", err);
        return new Response("Internal Server Error", { status: 500 });
    }
}
