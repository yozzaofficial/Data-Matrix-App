import { cookies } from "next/headers";
import { sql } from "./db";
import { redirect } from "next/navigation";

export async function requireUser(location: string) {
  const cookieStore = await cookies();
  const session = cookieStore.get("session")?.value;
  const autoLoginUser = cookieStore.get("auto_login_user")?.value;

  console.log("Requested location:", location);

  // Se non c'è sessione, redirect a login passando anche il parametro user se presente
  if (!session) {
    const params = new URLSearchParams({ path: location });
    if (autoLoginUser) {
      params.set("user", autoLoginUser);
      // Rimuovi il cookie temporaneo
      cookieStore.delete("auto_login_user");
    }
    redirect(`/login?${params.toString()}`);
  }

  const rows = await sql`
    SELECT u.id, u.nome, u.rank
    FROM sessions s
    JOIN users u ON u.id = s.user_id
    WHERE s.id = ${session}
  `;

  if (!rows[0]) redirect(`/login?path=${encodeURIComponent(location)}`);

  return rows[0];
}