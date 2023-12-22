import pool from "../../../../database/db";
import { unlink } from "fs";
import { NextResponse } from "next/server";
import path from "path";

export async function DELETE(req: Request) {
  try {
    const connection = await pool.getConnection();
    const body = await req.json();
    const [post] = await connection.query(
      `SELECT image FROM posts WHERE id = '${body}'`
    );
    if(post[0].image.toString()){
      await unlink(path.join(process.cwd(),'public', post[0].image), err => {
        if(err){
          console.error(err);
          return
        }
        console.log('File deleted');
      });
    }
    await connection.query(`DELETE FROM posts WHERE id = '${body}'`);
    connection.release();
    return NextResponse.json({message: 'Post deleted succesfully'})
  } catch (e) {
    console.error(e);
  }
}