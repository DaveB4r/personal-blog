import { unlink } from "fs/promises";
import path from "path";

export async function DeleteImage (img: string){
  return await unlink(path.join(process.cwd(),'public',img));
}