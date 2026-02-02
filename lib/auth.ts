import { headers } from "next/headers";
import { cookies } from "next/headers";
import { sql } from "./db";
import { redirect } from "next/navigation";

export async function requireUser() {
  const cookieStore = cookies();
  const session = (await cookieStore).get("session")?.value;

  // Ottieni l'URL della richiesta
  const currentUrl = (await headers()).get("x-invoke-path") || "/";

  if (!session) {
    redirect(`/login?redirect=${encodeURIComponent(currentUrl)}`);
  }

  const rows = await sql`
        SELECT u.id, u.nome, u.rank
        FROM sessions s
        JOIN users u ON u.id = s.user_id
        WHERE s.id = ${session}
    `;

  if (!rows[0]) {
    redirect(`/login?redirect=${encodeURIComponent(currentUrl)}`);
  }

  return rows[0];
}
