import pool from "@/database/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    let response = {
      favorites: [],
      message: "Something wrong happened"
    }
    let favorites = [];
    const connection = await pool.getConnection();
    const body = await req.json();
    const [data] = await connection.query(
      `SELECT user_id, favorites FROM favorites WHERE user_id = '${body.user_id}'`
    );
    if(data.toString()){
      if(body.selected){
        favorites = String(data[0].favorites).split(',');
        favorites.push(String(body.id));
        response.favorites = favorites;
        await connection.query(
          `UPDATE favorites SET favorites = '${favorites.join(',')}' WHERE user_id = '${body.user_id}'`
        );
        response.message = "Post added to favorites successfully"
      }else{
        favorites = String(data[0].favorites).split(',');
        const index = favorites.indexOf(String(body.id));
        if(index > -1){
          favorites.splice(index, 1);
        }
        response.favorites = favorites;
        await connection.query(
          `UPDATE favorites SET favorites = '${favorites.join(',')}' WHERE user_id = '${body.user_id}'`
        );
        response.message = "Post removed from favorites successfully"
      }
    }else{
      await connection.query(
        `INSERT INTO favorites (user_id, favorites) VALUES ('${body.user_id}', '${body.id}')`
      );
      response.favorites = [String(body.id)];
      response.message = "Post added to favorites successfully"
    }
    connection.release();
    return NextResponse.json(response);
  } catch (e) {
    console.error(e);
  }
}