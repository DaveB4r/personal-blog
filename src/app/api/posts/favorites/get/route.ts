import pool from "@/database/db";
import { NextResponse } from "next/server";

export async function GET(req: Request): Promise<NextResponse>{
  try {
    const connection = await pool.getConnection();
    const {searchParams} = new URL (req.url);
    const ids = searchParams.get("ids");
    const [rows] = await connection.query(`SELECT * FROM posts WHERE id IN (${ids})`);
    connection.release();
    return NextResponse.json({posts: rows});
  } catch (e) {
    console.error(e);
  }
}