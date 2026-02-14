import { Client } from "pg";

export async function handler() {
    const client = new Client({
        connectionString: process.env.DATABASE_URL,
        ssl: { rejectUnauthorized: false }
    });

    await client.connect();

    await client.query(`
    DELETE FROM sessions
    WHERE expires_at < NOW()
  `);

    await client.end();

    return {
        statusCode: 200,
        body: "Expired sessions cleaned"
    };
}
