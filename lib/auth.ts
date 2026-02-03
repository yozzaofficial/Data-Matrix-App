import { cookies } from "next/headers";
import { sql } from "./db";
import { redirect } from "next/navigation";

export async function requireUser(location: string) {
  const session = (await cookies()).get("session")?.value;
  console.log(location)
  if (!session) redirect("/login");

  const rows = await sql`
    SELECT u.id, u.nome, u.rank
    FROM sessions s
    JOIN users u ON u.id = s.user_id
    WHERE s.id = ${session}
  `;

  if (!rows[0]) redirect("/login");

  return rows[0]; // ritorna l’utente
}
