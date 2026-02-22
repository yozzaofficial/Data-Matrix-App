import { Client } from "pg";

export const handler = async () => {
    const client = new Client({
        connectionString: process.env.DATABASE_URL,
        ssl: { rejectUnauthorized: false },
    });

    try {
        await client.connect();

        await client.query(`
      DELETE FROM sessions
      WHERE expires_at < NOW()
    `);

        return {
            statusCode: 200,
            body: "Expired sessions cleaned",
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify(error),
        };
    } finally {
        await client.end();
    }
};