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
    let response = {
      user: {
        id: "",
        username: "",
        email: "",
        avatar: "",
        isLogged: false,
      },
      message: "Something wrong happened",
    };
    const connection = await pool.getConnection();
    const data = await req.formData();
    const file: File | null = data.get("avatar") as File;
    const user_id = data.get("user_id");
    const username = data.get("username");
    const email = data.get("email");
    const password = data.get("password");
    // Encrypt Password
    const bcrypt = require("bcryptjs");
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    let query = `UPDATE users SET id = ${user_id}`;
    if (username) query += `, username = '${username}'`;
    if (email) query += `, email = '${email}'`;
    if (password) query += `, password = '${hash}'`;
    if (data.get("avatar")) {
      const avatarName = String(`${user_id}${username}${path.extname(file.name)}`).replace(/'|"|\s/g, "-");
      const bytes = await file!.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const fileRoute = `/images/assets/profile/${avatarName}`;
      const filePath = path.join(
        process.cwd(),
        "public",
        "images",
        "assets",
        "profile",
        avatarName
      );
      await writeFile(filePath, buffer);
      query += `, image = '${fileRoute}' `;
    }
    query += ` WHERE id = ${user_id}`;
    await connection.query(query);
    const [user] = await connection.query(
      `SELECT * FROM users WHERE id = ${user_id}`
    );
    if (user.toString()) {
      response.user.id = user[0].id;
      response.user.username = user[0].username;
      response.user.email = user[0].email;
      response.user.avatar = user[0].image;
      response.user.isLogged = true;
      response.message = "User updated successfully";
    }
    connection.release();
    return NextResponse.json(response);
  } catch (e) {
    console.error(e);
  }
}
