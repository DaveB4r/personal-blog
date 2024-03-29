import pool from "@/database/db";
import { NextResponse  } from "next/server";

export const dynamic = 'force-dynamic';
export async function GET(req: Request){
  try {
    const connection = await pool.getConnection();
    const {searchParams} = new URL (req.url);
    const category = searchParams.get('category');
    const search = searchParams.get('search');
    const noId = searchParams.get('noId');
    const limit = searchParams.get('limit');
    let sqlQuery = "SELECT * FROM posts WHERE status = '1'";
    if(category) sqlQuery += ` AND category = '${category}'`;
    if(search) sqlQuery += ` AND ( title LIKE '%${search}%' OR category LIKE '%${search}%' OR content LIKE '%${search}%')`;
    if(noId) sqlQuery += ` AND id != '${noId}'`;
    sqlQuery += " ORDER BY id DESC"
    if(limit) sqlQuery += ` LIMIT ${limit}`;
    const [rows] = await connection.query(sqlQuery);
    connection.release();
    return NextResponse.json({posts: rows})
  } catch (e) {
    console.log(e);
  }
}