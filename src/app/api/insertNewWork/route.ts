// pages/api/insertItem.ts
import { NextResponse } from "next/server";
import { sql } from "../../../../lib/db";

export async function POST(request: Request) {
    try {
        console.log("🔍 insertNewWork: received request");

        // For now, use hardcoded test values to verify the schema works
        const iditem = 1;
        const nameitem = "Test Item";
        const todo = "Test Todo";
        const last_maintenance = new Date().toISOString();
        const note = "Test note";
        const emergency = false;
        const loaded_by = "test_user";

        console.log("📝 insertNewWork: inserting with values:", {
            iditem,
            nameitem,
            todo,
            last_maintenance,
            note,
            emergency,
            loaded_by,
        });

        const result = await sql`
            INSERT INTO maintenance_items
            (iditem, nameitem, todo, last_maintenance, note, emergency, loaded_by)
            VALUES (${iditem}, ${nameitem}, ${todo}, ${last_maintenance}, ${note}, ${emergency}, ${loaded_by})
            RETURNING *;
        `;

        console.log("✅ insertNewWork: insert successful, result:", result);

        return NextResponse.json(result[0], { status: 200 });
    } catch (error) {
        console.error("❌ insertNewWork error:", error);
        const message = error instanceof Error ? error.message : String(error);
        return NextResponse.json({ error: message }, { status: 500 });
    }
}
