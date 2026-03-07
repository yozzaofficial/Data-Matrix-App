import { sql } from "../../../../lib/db";

export async function POST(req: Request) {
    try {
        const { iditem, nameitem, done, last_maintenance, note, technician } = await req.json();

        const inserted = await sql`
      INSERT INTO todo_items
        (iditem, nameitem, done, last_maintenance, note, technician)
      VALUES
        (${iditem}, ${nameitem}, ${done}, ${last_maintenance}, ${note}, ${technician})
      RETURNING *
    `;

        return Response.json(inserted[0]);
    } catch (error) {
        console.error("Errore inserimento todo_item:", error);
        return Response.json({ error: "Errore nell'inserimento" }, { status: 500 });
    }
}