import { sql } from "../../../../lib/db";

export async function GET() {
    try {
        const rows = await sql`
      SELECT
        id,
        iditem,
        nameitem,
        done,
        last_maintenance,
        note,
        technician
      FROM maintance_done
      ORDER BY last_maintenance DESC
    `;

        return Response.json(rows);
    } catch (error) {
        console.error("Errore lettura todo_items:", error);
        return Response.json(
            { error: "Errore nel recupero dati" },
            { status: 500 }
        );
    }
}