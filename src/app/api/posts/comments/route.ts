import pool from "@/database/db";
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic';
export async function POST(req: Request) {
  try {
    const message = "comment saved successfully"
    const connection = await pool.getConnection();
    const body = await req.json();
    const comment = String(body.comment).replace(/'/g, "\\").replace(/"/g,'\\"');
    await connection.query(
      `INSERT INTO comments (user_id, post_id, comment_text) values (${body.user_id}, ${body.post_id}, '${comment}')`
    );
    connection.release();
    return NextResponse.json({message});
  } catch (e) {
    console.error(e);
  }
}