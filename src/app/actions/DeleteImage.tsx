import { unlink } from "fs/promises";

export async function DeleteImage (path: string){
  return await unlink(path);
}