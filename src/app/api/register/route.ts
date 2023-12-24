import pool from "@/database/db";
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic';
export async function POST(req: Request) {
  try {
    let response = {
      user : {
        id: "",
        username: "",
        email: "",
        avatar: "",
        isLogged: false,
        favorites: [],
      },
      message: "User already exists"
    }
    const connection = await pool.getConnection();
    const body = await req.json();
    //Encrypt Password
    const bcrypt = require("bcryptjs");
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(body.password, salt);
    const [user] = await connection.query(
      `SELECT users.*, favorites FROM users LEFT JOIN favorites ON users.id = favorites.user_id WHERE username = '${body.username}' OR email = '${body.email}'`
    );
    if(user.toString() && body.via){ // if signin with google and the user already exists
      response.user.id = user[0].id;
      response.user.username = user[0].username;
      response.user.email = user[0].email;
      response.user.avatar = user[0].image;
      response.user.isLogged = true;
      response.user.favorites = String(user[0].favorites).split(',');
      response.message = "Session Created With Google User";
    }else if(!user.toString() && body.via){
      await connection.query(
        `INSERT INTO users (username, email, password, image, session) VALUES ('${body.username}', '${body.email}', '${hash}', '${body.avatar}', '${body.via}')`
      );
      const [user_id] = await connection.query(
        `SELECT LAST_INSERT_ID() as lastId`
      );
      response.user.id = user_id[0].lastId;
      response.user.username = body.username;
      response.user.email = body.email;
      response.user.avatar = body.avatar;
      response.user.isLogged = true;
      response.message = "User Created With Google";
    }
    if(!user.toString() && !body.via){
      const avatar = `https://ui-avatars.com/api/?name=${body.username}&background=random`;
      await connection.query(
        `INSERT INTO users (username, email, password, image) VALUES ('${body.username}', '${body.email}', '${hash}', '${avatar}')`
      );
      const [user_id] = await connection.query(
        `SELECT LAST_INSERT_ID() as lastId`
      );
      response.user.id = user_id[0].lastId;
      response.user.username = body.username;
      response.user.email = body.email;
      response.user.avatar = avatar;
      response.user.isLogged = true;
      response.message = "User Created Successfully";
    }
    connection.release();
    return NextResponse.json(response)
  } catch (e) {
    console.error(e);
  }
}