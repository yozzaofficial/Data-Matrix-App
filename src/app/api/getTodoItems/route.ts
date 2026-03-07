import { sql } from "../../../../lib/db";

export async function GET() {
    try {
        const rows = await sql`
      SELECT 
        id,
        name,
        description,
        "to-do",
        "to-do-value",
        "last-maintance",
        note,
        emergency
      FROM items
      ORDER BY id
    `;

        return Response.json(rows);
    } catch (error) {
        console.error("Errore lettura items:", error);

        return Response.json(
            { error: "Errore nel recupero dati" },
            { status: 500 }
        );
    }
}