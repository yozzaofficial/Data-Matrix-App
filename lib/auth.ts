import { cookies, headers } from "next/headers";
import { sql } from "./db";
import { redirect } from "next/navigation";

export async function requireUser(location: string) {
  const session = (await cookies()).get("session")?.value;

  let userParam: string | null = null;

  try {
    // Prova a leggere l'URL dagli headers
    const headersList = await headers();
    const referer = headersList.get("referer");

    if (referer) {
      const url = new URL(referer);
      userParam = url.searchParams.get("user");
    }
  } catch (error) {
    console.log("Non riesco a leggere l'URL dagli headers:", error);
  }

  console.log("Requested location:", location);
  console.log("User param from URL:", userParam);

  // Se non c'è sessione, redirect a login con il parametro user se presente
  if (!session) {
    const params = new URLSearchParams({ path: location });
    if (userParam) {
      params.set("user", userParam);
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