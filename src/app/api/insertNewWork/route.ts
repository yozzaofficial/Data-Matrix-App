// pages/api/insertItem.ts
import { NextResponse } from "next/server";
import { sql } from "../../../../lib/db";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        if (!body) return NextResponse.json({ error: "Missing body" }, { status: 400 });

        // Prefer values from the request body; fallback to sensible defaults.
        const {
            id = undefined,
            nameitem = "",
            todo = "",
            lastMaintenance = null,
            note = "",
            loadedBy = "",
            emergency = false,
        } = body as Record<string, any>;

        console.log("/api/insertNewWork payload:", { id, nameitem, todo, lastMaintenance, note, loadedBy, emergency });

        // If id is provided by the client, use it; otherwise omit it and let
        // the DB use gen_random_uuid() to generate the UUID.
        let result;
        if (id) {
            // Client provided an explicit id (UUID)
            result = await sql`
                INSERT INTO maintenance_items
                (id, nameitem, todo, last_maintenance, note, emergency, loaded_by)
                VALUES (${id}, ${nameitem}, ${todo}, ${lastMaintenance}, ${note}, ${emergency}, ${loadedBy})
                RETURNING *;
            `;
        } else {
            // Omit id; DB will use gen_random_uuid() default
            result = await sql`
                INSERT INTO maintenance_items
                (nameitem, todo, last_maintenance, note, emergency, loaded_by)
                VALUES (${nameitem}, ${todo}, ${lastMaintenance}, ${note}, ${emergency}, ${loadedBy})
                RETURNING *;
            `;
        }

        console.log("/api/insertNewWork result:", result);

        return NextResponse.json(result, { status: 200 });
    } catch (error) {
        console.error("/api/insertNewWork error:", error);
        return NextResponse.json({ error: String(error) }, { status: 500 });
    }
}