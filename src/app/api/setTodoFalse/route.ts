import { sql } from "../../../../lib/db";

export async function POST(req: Request) {
    const { id } = await req.json();

    try {
        await sql`
    UPDATE items
    SET "to-do-value" = FALSE
    WHERE id = ${id};
  `;

        return Response.json({ success: true });
    } catch (error) {
        console.error("Errore inserimento todo_item:", error);
        return Response.json({ error: "Errore nell'inserimento" }, { status: 500 });
    }
}