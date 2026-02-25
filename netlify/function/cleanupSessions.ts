import { neon } from "@netlify/neon";

export const sql = neon();

// Schedule: ogni giorno alle 3:00 AM UTC
export const schedule = "*/40 * * * *"; // formato cron: minora ore giorno-mese mese giorno-settimana

export const handler = async () => {
    try {
        const result = await sql`
      DELETE FROM sessions
      WHERE expires_at < NOW()
    `;

        return {
            statusCode: 200,
            body: "Expired sessions cleaned",
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify(error),
        };
    }
};