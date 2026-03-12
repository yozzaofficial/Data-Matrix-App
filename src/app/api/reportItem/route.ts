import { sql } from "../../../../lib/db";

export async function POST(req: Request) {
  try {
    const { iditem, nameitem, note, technician } = await req.json();

    const inserted = await sql`
      INSERT INTO item_reported
        (iditem, nameitem, note, technician)
      VALUES
        (${iditem}, ${nameitem}, ${note}, ${technician})
      RETURNING *
    `;

    return Response.json(inserted[0]);
  } catch (error) {
    console.error("Errore inserimento report_item:", error);
    return Response.json({ error: "Errore nell'inserimento" }, { status: 500 });
  }
}
