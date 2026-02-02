import { cookies } from "next/headers";
import { sql } from "./db";
import { redirect } from "next/navigation";

export async function requireUser(currentPath: string) {
  const session = (await cookies()).get("session")?.value;

  if (!session) {
    // Se non loggato, vai al login con redirect alla pagina originale
    redirect(`/login?redirect=${encodeURIComponent(currentPath)}`);
  }

  const rows = await sql`
        SELECT u.id, u.nome, u.rank
        FROM sessions s
        JOIN users u ON u.id = s.user_id
        WHERE s.id = ${session}
    `;

  if (!rows[0]) {
    redirect(`/login?redirect=${encodeURIComponent(currentPath)}`);
  }

  return rows[0];
}
