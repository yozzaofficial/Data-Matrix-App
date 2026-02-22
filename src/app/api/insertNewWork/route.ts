// pages/api/insertItem.ts
import { NextResponse } from "next/server";
import { sql } from "../../../../lib/db";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        if (!body) return NextResponse.json({ error: "Missing body" }, { status: 400 });

        // Prefer values from the request body; fallback to sensible defaults.
        const {
            iditem = undefined,
            nameitem = "",
            todo = "",
            lastMaintenance = null,
            note = "",
            loadedBy = "",
            emergency = false,
        } = body as Record<string, any>;

        console.log("/api/insertNewWork payload:", { iditem, nameitem, todo, lastMaintenance, note, loadedBy, emergency });

        // If iditem is missing, generate a fallback numeric id based on timestamp.
        // Ideally the DB should supply a serial/UUID default, but this prevents
        // the not-null constraint error during deploy when the client doesn't
        // provide an id.
        let finalId = iditem;
        if (finalId === undefined || finalId === null) {
            finalId = Date.now();
            console.log("/api/insertNewWork: generated iditem", finalId);
        }

        const result = await sql`
            INSERT INTO maintenance_items
            (iditem, nameitem, todo, last_maintenance, note, emergency, loaded_by)
            VALUES (${finalId}, ${nameitem}, ${todo}, ${lastMaintenance}, ${note}, ${emergency}, ${loadedBy})
            RETURNING *;
        `;

        console.log("/api/insertNewWork result:", result);

        return NextResponse.json(result, { status: 200 });
    } catch (error) {
        console.error("/api/insertNewWork error:", error);
        return NextResponse.json({ error: String(error) }, { status: 500 });
    }
}