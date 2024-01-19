import { DeleteImage } from "@/app/actions/DeleteImage";
import pool from "@/database/db";
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic';
export async function DELETE(req: Request) {
  try {
    const connection = await pool.getConnection();
    const body = await req.json();
    if(process.env.NODE_ENV === 'development'){
      const [imageToDelete] = await connection.query(
        `SELECT image FROM posts WHERE id = '${body}'`
      );
      if(String(imageToDelete[0].image).includes('images')) await DeleteImage(String(imageToDelete[0].image));
    }
    await connection.query(`DELETE FROM posts WHERE id = '${body}'`);
    connection.release();
    return NextResponse.json({message: 'Post deleted succesfully'})
  } catch (e) {
    console.error(e);
  }
}