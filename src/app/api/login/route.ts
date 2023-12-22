import pool from "../../../database/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    let response = {
      id: "",
      username: "",
      email: "",
      avatar: "",
      isLogged: false,
      favorites: [],
    };
    const connection = await pool.getConnection();
    const body  = await req.json();
    // Valid Password
    const bcrypt = require("bcryptjs");
    const [user] = await connection.query(
      `SELECT id,username, password, image FROM users LEFT JOIN favorites ON users.id = favorites.user_id WHERE email = '${body.email}'`
    );
    if (user.toString()) {
      const isMatch = await bcrypt.compare(body.password, user[0].password);
      if (isMatch) {
        response.id = user[0].id;
        response.username = user[0].username;
        response.email = body.email;
        response.avatar = user[0].image;
        response.isLogged = true;
        response.favorites = String(user[0].favorites).split(',');
      }
    }
    connection.release();
    return NextResponse.json(response);
  } catch (e) {
    console.error(e);
  }
}
