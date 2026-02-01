import { neon } from '@netlify/neon';

// crea il client usando NETLIFY_DATABASE_URL
const sql = neon();

export async function getPostById() {
    try {
        const [post] = await sql`SELECT * FROM users`;
        return post; // undefined se non esiste
    } catch (err) {
        console.error("Errore nel DB:", err);
        return null;
    }
}
