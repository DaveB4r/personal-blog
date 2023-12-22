import pool from "@/database/db";
import { writeFile } from "fs/promises";
import path from "path";
import { NextResponse } from "next/server";

interface File {
  arrayBuffer: () => Promise<ArrayBuffer>;
  name: string;
}

export async function PUT(req: Request) {
  try {
    let query = "UPDATE posts SET ";
    const connection = await pool.getConnection();
    const data = await req.formData();
    const file: File | null = data.get("file") as File;
    const postId = data.get("post_id");
    let title = data.get("title");
    const category = data.get("category");
    const slug = String(title)
      .replaceAll(" ", "-")
      .replace(/'/g, "\\'")
      .replace(/"/g, '\\"');

    let content = data.get("content");
    content = String(content).replace(/'/g, "\\'").replace(/"/g, '\\"');
    const currentDate = new Date().toISOString().slice(0, 10).replace("T", "");

    query += `title = '${title}', category = '${category}', date = '${String(
      currentDate
    )}', content = '${content}', slug = '${slug}' `;
    if (data.get("file")) {
      const imageName = String(title + path.extname(file.name)).replace(
        /'|"|\s/g,
        "_"
      );
      title = String(title).replace(/'/g, "\\'").replace(/"/g, '\\"');
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
      await writeFile(filePath, buffer);
      query += `, image = '${fileRoute}' `;
    }
    query += `WHERE id='${postId}'`;
    await connection.query(query);
    connection.release();
    let message = "Post updated successfully";
    return NextResponse.json({ message });
  } catch (e) {
    console.error(e);
  }
}
