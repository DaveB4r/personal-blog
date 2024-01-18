import pool from "@/database/db";
import { NextResponse } from "next/server";
import { SaveImage } from "@/app/actions/SaveImage";
import { FileInterface } from "@/interfaces/FileInterface";

export const dynamic = "force-dynamic";
export async function POST(req: Request) {
  try {
    const connection = await pool.getConnection();
    const data = await req.formData();
    let file: FileInterface | any;
    const userId = data.get("user_id");
    let title = data.get("title");
    const category = data.get("category");
    const slug = String(title)
      .replaceAll(" ", "-")
      .replace(/'/g, "\\'")
      .replace(/"/g, '\\"');    
    title = String(title).replace(/'/g, "\\'").replace(/"/g, '\\"');
    let content = data.get("content");
    content = String(content).replace(/'/g, "\\'").replace(/"/g, '\\"');
    const currentDate = new Date().toISOString().slice(0, 10).replace("T", "");
    let message = "Post Already Exists";    
    // Save the image in public or in imgbb server
    if (process.env.NODE_ENV === "development") {
      const fileToSave = data.get("file") as FileInterface;
      file = await SaveImage(fileToSave, title);
    } else {
      file = data.get("file");
    }
    const [post] = await connection.query(
      `SELECT id FROM posts WHERE title = '${title}'`
    );
    if (!post.toString()) {
      message = "Post Created Successfully";
      await connection.query(
        `INSERT INTO posts (user_id, title, category, date, content, image, status, slug) VALUES(${userId}, '${title}','${category}', '${String(
          currentDate
        )}', '${content}', '${file}', 1, '${slug}')`
      );
    }
    connection.release();
    return NextResponse.json({ message });
  } catch (e) {
    console.error(e);
  }
}
