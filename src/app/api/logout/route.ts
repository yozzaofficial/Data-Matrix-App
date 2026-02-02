import { sql } from "../../../../lib/db";
import { cookies } from "next/headers";

export async function POST() {
    // prendo il cookie
    const session = (await cookies()).get("session")?.value;

    if (session) {
        // elimino la sessione dal DB
        await sql`
      DELETE FROM sessions
      WHERE id = ${session}
    `;
    }

    // cancello il cookie
    return new Response("Logged out", {
        headers: {
            "Set-Cookie": "session=; Path=/; Max-Age=0; HttpOnly; SameSite=Lax",
        },
    });
}
