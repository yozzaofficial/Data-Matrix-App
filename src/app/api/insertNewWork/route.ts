// pages/api/insertItem.ts
import { NextResponse } from "next/server";
import { sql } from "../../../../lib/db";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        if (!body) return NextResponse.json({ error: "Missing body" }, { status: 400 });

        // const { iditem, nameitem, todo, lastMaintenance, note, loadedBy } = body;
        const iditem = 1
        const nameitem = "ciao";
        const todo = "niente";
        const lastMaintenance = "ora";
        const note = "salve";
        const loadedBy = "me";
        const emergency = false
        const result = await sql`
      INSERT INTO maintenance_items
      (iditem, nameitem, todo, last_maintenance, note, emergency, loaded_by)
      VALUES (${iditem}, ${nameitem}, ${todo}, ${lastMaintenance}, ${note}, ${emergency}, ${loadedBy})
      RETURNING *;
    `;

        return NextResponse.json(result, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: String(error) }, { status: 500 });
    }
}