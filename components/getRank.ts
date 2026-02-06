import { sql } from "../lib/db"
import { cookies } from "next/headers";

export default async function getRank() {
    const session = (await cookies()).get("session")?.value;

    const rows = await sql`
    SELECT u.id, u.nome, u.rank
    FROM sessions s
    JOIN users u ON u.id = s.user_id
    WHERE s.id = ${session}
  `;

    return rows[0]?.rank == 0 ? "user" : "admin"
}