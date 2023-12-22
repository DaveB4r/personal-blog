import pool from "@/database/db";
import type { NextApiRequest } from "next";
import { NextResponse  } from "next/server";

export async function GET(req: NextApiRequest){
  try {
    const connection = await pool.getConnection();
    const {searchParams} = new URL (req.url);
    const category = searchParams.get('category');
    const search = searchParams.get('search');
    const limit = searchParams.get('limit');
    let sqlQuery = "SELECT * FROM posts WHERE status = '1'";
    if(category) sqlQuery += ` AND category = '${category}'`;
    if(search) sqlQuery += ` AND ( title LIKE '%${search}%' OR category LIKE '%${search}%' OR content LIKE '%${search}%')`;
    sqlQuery += " ORDER BY id DESC"
    if(limit) sqlQuery += ` LIMIT ${limit}`
    const [rows] = await connection.query(sqlQuery);
    connection.release();
    return NextResponse.json({posts: rows})
  } catch (e) {
    console.log(e);
  }
}