import { writeFile } from "fs/promises";
import path from "path";
import { FileInterface } from "@/interfaces/FileInterface";

export async function SaveImage (file: FileInterface, title: string) {
  const imageName = String(title + path.extname(file.name)).replace(/'|"|\s/g, "_");
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
  return fileRoute;
};