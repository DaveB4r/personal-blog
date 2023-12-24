import pool from "@/database/db";
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic';
export async function GET(req: Request) {
  try {
    const connection = await pool.getConnection();
    const { searchParams } = new URL(req.url);
    const user = searchParams.get("user");
    let sqlQuery = `SELECT id, image, title, category, date FROM posts WHERE user_id = '${user}' ORDER BY id DESC`;
    const [rows] = await connection.query(sqlQuery);
    connection.release();
    return NextResponse.json({posts: rows});
  } catch (e) {
    console.log(e);
  }
}
