import { cookies } from "next/headers";
import { sql } from "./db";
import { redirect } from "next/navigation";

export async function requireUser(location: string) {
  const session = (await cookies()).get("session")?.value;

  console.log("Requested location:", location);

  // Se non c'è sessione, redirect a login
  if (!session) redirect(`/login?path=${encodeURIComponent(location)}`);

  const rows = await sql`
    SELECT u.id, u.nome, u.rank
    FROM sessions s
    JOIN users u ON u.id = s.user_id
    WHERE s.id = ${session}
  `;

  // Se sessione non valida, redirect a login
  if (!rows[0]) redirect(`/login?path=${encodeURIComponent(location)}`);

  return rows[0];
}