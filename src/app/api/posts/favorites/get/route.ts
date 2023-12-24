import pool from "@/database/db";

export const dynamic = 'force-dynamic';
export async function GET(req: Request): Promise<Response> {
  try {
    const connection = await pool.getConnection();
    const { searchParams } = new URL(req.url);
    const ids = searchParams.get("ids");
    const [rows] = await connection.query(
      `SELECT * FROM posts WHERE id IN (${ids})`
    );
    connection.release();
    return new Response(JSON.stringify({ posts: rows }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (e) {
    console.error(e);
  }
}