import { NextResponse } from "next/server";
import { sql } from "../../../../lib/db";

export async function POST(request: Request) {
    try {
        // Parse the request body
        const body = await request.json();
        // nameitem: string (TEXT in DB) - name/description of the maintenance item
        const nameitem = body.nameitem || "Unnamed Item";
        // todo: string (TEXT in DB) - description of what needs to be done
        const todo = body.todo || "";
        // last_maintenance: string (TIMESTAMP in DB) - ISO string or null
        const last_maintenance = body.last_maintenance || new Date().toISOString();
        // note: string (TEXT in DB) - additional notes
        const note = body.note || "";
        // emergency: boolean (BOOLEAN in DB) - whether this is an emergency
        const emergency = body.emergency === true;
        // loaded_by: string (TEXT in DB) - username of who created this
        const loaded_by = body.loaded_by || "unknown";

        // iditem: integer (INTEGER NOT NULL in DB) - unique identifier for this item
        const iditem = body.iditem;

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


// async function testInsertNewWork() {
//     try {
//         const payload = {
//             nameitem: "Pump Motor",              // string: nome dell'item
//             todo: "Replace bearings",           // string: cosa fare
//             last_maintenance: "2026-02-15T10:00:00Z", // string (TIMESTAMP ISO)
//             note: "Bearings are worn out",      // string: note
//             emergency: true,                     // boolean: è urgente?
//             loaded_by: "john_doe",              // string: chi crea il record
//             // iditem è opzionale - se non lo passi, il server ne genera uno
//         };

//         const response = await fetch("/api/insertNewWork", {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//             },
//             body: JSON.stringify(payload),
//         });

//         const result = await response.json();

//         if (response.ok) {
//             console.log("✅ Insert successful! Result:", result);
//             return result;
//         } else {
//             console.error("❌ Insert failed! Error:", result);
//             return null;
//         }
//     } catch (error) {
//         console.error("❌ Test error:", error);
//         return null;
//     }
// }