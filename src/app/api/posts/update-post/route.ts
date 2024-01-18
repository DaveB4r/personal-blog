import pool from "@/database/db";
import { NextResponse } from "next/server";
import { SaveImage } from "@/app/actions/SaveImage";
import { FileInterface } from "@/interfaces/FileInterface";
import { DeleteImage } from "@/app/actions/DeleteImage";


export const dynamic = 'force-dynamic';
export async function PUT(req: Request) {
  try {
    let query = "UPDATE posts SET ";
    const connection = await pool.getConnection();
    const data = await req.formData();
    let file: FileInterface | any;
    const postId = data.get("post_id");
    let title = data.get("title");
    const category = data.get("category");
    const slug = String(title)
      .replaceAll(" ", "-")
      .replace(/'/g, "\\'")
      .replace(/"/g, '\\"');
    title = String(title).replace(/'/g, "\\'").replace(/"/g,'\\"');
    let content = data.get("content");
    content = String(content).replace(/'/g, "\\'").replace(/"/g, '\\"');
    const currentDate = new Date().toISOString().slice(0, 10).replace("T", "");
    // delete the image
    if (data.get("file") && process.env.NODE_ENV === 'development') {
      const [imageToDelete] = await connection.query(`SELECT image FROM posts WHERE id='${postId}'`);
      if(String(imageToDelete[0]).includes('images')) await DeleteImage(String(imageToDelete[0]));
    }
    // Save the new image in public or in imgbb server
    if(process.env.NODE_ENV === 'development') {
      const fileToSave = data.get("file") as FileInterface;
      file = await SaveImage(fileToSave, title);
    } else {
      file = data.get("file");
    }
    query += `title = '${title}', category = '${category}', date = '${String(
      currentDate
    )}', content = '${content}', slug = '${slug}' `;
    
    query += `, image = '${file}' `;
    query += `WHERE id='${postId}'`;
    await connection.query(query);
    connection.release();
    let message = "Post updated successfully";
    return NextResponse.json({ message });
  } catch (e) {
    console.error(e);
  }
}
