import pool from "@/database/db";
import type { NextApiRequest } from "next";
import { NextResponse } from "next/server";

export async function GET(req: NextApiRequest) {
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
