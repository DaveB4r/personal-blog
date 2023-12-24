import pool from "@/database/db";
import { writeFile } from "fs/promises";
import path from "path";
import { NextResponse } from "next/server";

interface File {
  arrayBuffer: () => Promise<ArrayBuffer>;
  name: string;
}

export const dynamic = 'force-dynamic';
export async function POST(req: Request) {
  try {
    const connection = await pool.getConnection();
    const data = await req.formData();
    const file: File | null = data.get("file") as File;
    const userId = data.get("user_id");
    let title = data.get("title");
    const category = data.get("category");
    const slug = String(title).replaceAll(" ", "-").replace(/'/g, "\\'").replace(/"/g, '\\"');
    const imageName = String(title + path.extname(file.name)).replace(/'|"|\s/g, "_");
    title = String(title).replace(/'/g, "\\'").replace(/"/g, '\\"');
    let content = data.get("content");
    content = String(content).replace(/'/g, "\\'").replace(/"/g, '\\"');
    const currentDate = new Date().toISOString().slice(0, 10).replace('T','');
    const bytes = await file!.arrayBuffer();
    const buffer = Buffer.from(bytes);    
    const fileRoute = `/images/posts/${imageName}`;
    const filePath = path.join(
      process.cwd(),
      "public",
      "images",
      "posts",
      imageName
    );
    let message = 'Post Already Exists';
    await writeFile(filePath, buffer);
    const [post] = await connection.query(`SELECT id FROM posts WHERE title = '${title}'`);
    if(!post.toString()) {
      message = 'Post Created Successfully';
      await connection.query(
        `INSERT INTO posts (user_id, title, category, date, content, image, status, slug) VALUES(${userId}, '${title}','${category}', '${String(currentDate)}', '${content}', '${fileRoute}', 1, '${slug}')`
      );
    }    
    connection.release();
    return NextResponse.json({message})
  } catch (e) {
    console.error(e);
  }
}
