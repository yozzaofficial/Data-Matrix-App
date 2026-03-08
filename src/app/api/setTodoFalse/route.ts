import { sql } from "../../../../lib/db";

export async function POST(req: Request) {
    const { id } = await req.json();

    await sql`
    UPDATE nome_tabella
    SET "to-do-value" = FALSE
    WHERE id = ${id};
  `;

    return Response.json({ success: true });
}